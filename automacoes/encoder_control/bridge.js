const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

// Tenta pegar a porta do argumento do terminal (ex: node bridge.js /dev/cu.usb...)
// Se não houver argumento, usa a porta padrão do seu Mac atual
const ESP32_PORT = process.argv[2] || '/dev/cu.usbmodem5B3D0287021'; 
const BAUD_RATE = 115200;

let lastEventTime = 0;
let simulatedPosition = 0; // Começa no zero

// Configurações de hardware configuráveis
let config = {
  navStepsPerAction: 7,   // Quantos giros físicos para 1 ação na tela
  navDebounceMs: 150,     // Tempo mínimo entre comandos de seta
  clickDebounceMs: 500,   // Tempo mínimo entre cliques (Enter)
};

let stepCounter = 0;
let lastActionDir = null; // 'RIGHT' ou 'LEFT'

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
  const referer = socket.handshake.headers.referer || 'Desconhecido';
  console.log(`📱 Cliente conectado [${socket.id}] vindo de: ${referer}`);
  
  // Envia configurações atuais para o frontend
  socket.emit('config_sync', config);
  socket.emit('encoder_update', simulatedPosition);

  // Recebe atualizações de configuração do Debugger
  socket.on('update_config', (newConfig) => {
    config = { ...config, ...newConfig };
    console.log('⚙️ Configuração Atualizada:', config);
    io.emit('config_sync', config); // Sincroniza com todos os clientes
  });
});

let lastPosTime = 0;
const POS_THROTTLE_MS = 30; // Evita floodar a aplicação com dados de posição

try {
  const port = new SerialPort({ path: ESP32_PORT, baudRate: BAUD_RATE });
  // Parser ajustado para aceitar apenas \n (resolve o problema da escadinha)
  const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }));

  port.on('open', () => {
    console.log(`✅ Conectado ao ESP32 na porta ${ESP32_PORT}`);
  });

  parser.on('data', (data) => {
    // Trim remove espaços e tabs que vimos no terminal
    const raw = data.trim();
    if (raw.length > 0) {
      console.log(`[RAW]: ${raw}`);
      io.emit('serial_raw', raw);
    }
    const now = Date.now();

    if (raw.startsWith('P')) {
       // O trilho é o P. Regex para pegar números após P ou P:
       const match = raw.match(/P[:\s]*(-?\d+\.?\d*)/);
       if (match && (now - lastPosTime > POS_THROTTLE_MS)) {
         const posValue = Math.round(parseFloat(match[1]));
         if (!isNaN(posValue)) {
           io.emit('encoder_update', posValue);
           lastPosTime = now;
         }
       }
    } else if (raw === 'D' || raw === 'E' || raw === 'C' || raw === 'H') {
      const currentDebounce = (raw === 'C') ? config.clickDebounceMs : config.navDebounceMs;
      
      if (now - lastEventTime > currentDebounce) {
        let action = '';
        
        if (raw === 'D' || raw === 'E') {
          const dir = (raw === 'D') ? 'RIGHT' : 'LEFT';
          
          // Lógica de sensibilidade (Razão de giros)
          if (lastActionDir !== dir) {
             stepCounter = 0; // Reset se mudar de direção
             lastActionDir = dir;
          }
          
          stepCounter++;
          
          if (stepCounter >= config.navStepsPerAction) {
            action = dir;
            stepCounter = 0;
          }
        } else if (raw === 'C') {
          action = 'CLICK';
        } else if (raw === 'H') {
          action = 'RESET';
        }

        if (action) {
          console.log(`🚀 Evento: ${action}`);
          io.emit('encoder_action', action);
          
          if (action === 'RESET') io.emit('encoder_update', 0);
          lastEventTime = now;
        }
      }
    }
  });

  port.on('error', (err) => {
    console.error('❌ Erro na Porta Serial: ', err.message);
  });

} catch (error) {
  console.error("\n❌ Erro ao abrir porta:", error.message);
  console.log("\n🔍 Verifique as portas disponíveis abaixo e use:");
  console.log(`   node bridge.js [NOME_DA_PORTA]\n`);
  
  SerialPort.list().then(ports => {
    ports.forEach(p => console.log(`   > ${p.path} (${p.manufacturer || 'Desconhecido'})`));
  });
}

server.listen(3000, '0.0.0.0', () => {
  console.log('🌐 Servidor de Debug rodando em http://127.0.0.1:3000');
});
