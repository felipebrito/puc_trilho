const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

// Tenta pegar a porta do argumento do terminal (ex: node bridge.js /dev/cu.usb...)
// Se não houver argumento, usa a porta padrão do seu Mac atual
const ESP32_PORT = process.argv[2] || '/dev/cu.usbmodem5B3D0287021'; 
const BAUD_RATE = 115200;

let simulatedPosition = 0; // Começa no zero

// Configurações de hardware configuráveis
let config = {
  navStepsPerAction: 7,     // Quantos giros físicos para 1 ação na tela
  navDebounceMs: 150,       // Tempo mínimo entre comandos de seta
  clickDebounceMs: 500,     // Tempo mínimo entre cliques (Enter)
  ignoreDuringMoveMs: 800,  // Bloquear botões enquanto o trilho se move
  motionMinDelta: 15,       // Variação mínima acumulada para detectar movimento real (filtro ruído)
  motionWindowMs: 250       // Janela de análise de tempo em ms para filtro de ruído
};

const CONFIG_FILE = path.join(__dirname, 'hardware_settings.json');

// Carrega configurações existentes se houver
try {
  if (fs.existsSync(CONFIG_FILE)) {
    const savedConfig = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
    config = { ...config, ...savedConfig };
    console.log('📂 Configurações de hardware carregadas do arquivo:', config);
  } else {
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2), 'utf8');
    console.log('📄 Criado arquivo inicial de configurações de hardware:', config);
  }
} catch (e) {
  console.error('⚠️ Erro ao inicializar arquivo de configurações de hardware:', e.message);
}

function saveConfig() {
  try {
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2), 'utf8');
    console.log('💾 Configurações salvas em arquivo com sucesso:', config);
  } catch (e) {
    console.error('❌ Erro ao salvar configurações de hardware no arquivo:', e.message);
  }
}

let stepCounter = 0;
let lastActionDir = null;   // 'RIGHT' ou 'LEFT'
let lastNavActionTime = 0;  // Timestamp da última ação de navegação emitida
let lastClickActionTime = 0;// Timestamp da última ação de clique emitida

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
    console.log('⚙️ Configuração Atualizada via Socket:', config);
    saveConfig();
    io.emit('config_sync', config); // Sincroniza com todos os clientes
  });
});

let lastRealMoveTime = 0;   // Timestamp do último movimento físico real
let lastPosEmitTime = 0;    // Timestamp do último envio de posição via socket
const POS_THROTTLE_MS = 30; // Evita floodar a aplicação com dados de posição
let posHistory = [];        // Histórico deslizante de posições para filtro de ruído

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
       if (match) {
         const posValue = Math.round(parseFloat(match[1]));
         if (!isNaN(posValue)) {
           // 1. Registra a posição no histórico deslizante para detecção de movimento real
           posHistory.push({ pos: posValue, time: now });
           
           // Mantém apenas os itens dentro da janela deslizante (ex: 250ms)
           const windowMs = config.motionWindowMs || 250;
           posHistory = posHistory.filter(item => now - item.time <= windowMs);

           // Calcula delta (variação máxima) no histórico deslizante
           if (posHistory.length > 1) {
             const positions = posHistory.map(h => h.pos);
             const minPos = Math.min(...positions);
             const maxPos = Math.max(...positions);
             const delta = maxPos - minPos;

             const minDelta = config.motionMinDelta !== undefined ? config.motionMinDelta : 15;
             if (delta >= minDelta) {
               lastRealMoveTime = now; // Atualiza apenas para movimento físico real
             }
           }

           // 2. Throttle de emissão de posição para o frontend
           if (now - lastPosEmitTime > POS_THROTTLE_MS) {
             simulatedPosition = posValue;
             io.emit('encoder_update', posValue);
             lastPosEmitTime = now;
           }
         }
       }
    } else if (raw === 'D' || raw === 'E' || raw === 'C' || raw === 'H') {
      // 1. Bloqueia qualquer botão se o trilho estiver se movendo
      const timeSinceLastMove = now - lastRealMoveTime;
      if (timeSinceLastMove < config.ignoreDuringMoveMs) {
        console.log(`⚠️ [Bloqueio Movimento] Ignorando pulso serial '${raw}' porque o trilho está se movendo (último movimento real há ${timeSinceLastMove}ms)`);
        return;
      }

      let action = '';

      if (raw === 'D' || raw === 'E') {
        const dir = (raw === 'D') ? 'RIGHT' : 'LEFT';
        
        // Lógica de sensibilidade (Razão de giros)
        if (lastActionDir !== dir) {
           stepCounter = 0; // Reset se mudar de direção
           lastActionDir = dir;
        }
        
        stepCounter++;
        
        // Só emite ação se acumulou giros suficientes
        if (stepCounter >= config.navStepsPerAction) {
          // Debounce aplicado à ação de navegação, não ao pulso bruto do encoder
          if (now - lastNavActionTime > config.navDebounceMs) {
            action = dir;
            lastNavActionTime = now;
          } else {
            console.log(`⚠️ Ação ${dir} ignorada por debounce de navegação (${now - lastNavActionTime}ms)`);
          }
          stepCounter = 0;
        }
      } else if (raw === 'C') {
        // Debounce do Clique físico para evitar ruídos de KY-040
        if (now - lastClickActionTime > config.clickDebounceMs) {
          action = 'CLICK';
          lastClickActionTime = now;
        } else {
          console.log(`⚠️ Clique ignorado por debounce (${now - lastClickActionTime}ms)`);
        }
      } else if (raw === 'H') {
        action = 'RESET';
      }

      if (action) {
        console.log(`🚀 Evento emitido: ${action}`);
        io.emit('encoder_action', action);
        
        if (action === 'RESET') {
          simulatedPosition = 0;
          io.emit('encoder_update', 0);
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
