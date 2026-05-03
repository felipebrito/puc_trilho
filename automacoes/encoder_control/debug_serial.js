const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');

const ESP32_PORT = '/dev/cu.usbmodem5B3D0287021'; 
const BAUD_RATE = 115200;

console.log(`Tentando conectar na porta: ${ESP32_PORT}...`);

try {
  const port = new SerialPort({ path: ESP32_PORT, baudRate: BAUD_RATE });
  const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));

  port.on('open', () => {
    console.log(`✅ Conectado ao ESP32! Aguardando dados...`);
  });

  parser.on('data', (data) => {
    console.log(`[RAW]: ${data}`);
  });

  port.on('error', (err) => {
    console.error('❌ Erro na Porta Serial: ', err.message);
  });

} catch (error) {
  console.error("Erro ao abrir porta:", error);
}
