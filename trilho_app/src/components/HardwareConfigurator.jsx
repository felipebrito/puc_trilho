import React, { useState, useEffect } from 'react';
import './HardwareConfigurator.css';

const HardwareConfigurator = ({ isVisible, onClose, lastAction, onSendCommand }) => {
    const [sensitivity, setSensitivity] = useState(50);
    const [activeAction, setActiveAction] = useState(null);
    const [status, setStatus] = useState('Desconectado');
    const [port, setPort] = useState(null);
    const [reader, setReader] = useState(null);
    const [firmwareFile, setFirmwareFile] = useState(null);

    // Conectar à Porta Serial
    const connectSerial = async () => {
        try {
            const selectedPort = await navigator.serial.requestPort();
            await selectedPort.open({ baudRate: 115200 });
            setPort(selectedPort);
            setStatus('Conectado');
            startReading(selectedPort);
        } catch (err) {
            console.error('Erro ao conectar serial:', err);
            setStatus('Erro na conexão');
        }
    };

    const startReading = async (selectedPort) => {
        const localReader = selectedPort.readable.getReader();
        setReader(localReader);
        try {
            while (true) {
                const { value, done } = await localReader.read();
                if (done) break;
                
                // Decodifica o comando (ex: 'L', 'R', 'C') vindo do Arduino/ESP32
                const command = new TextDecoder().decode(value).trim();
                handleSerialCommand(command);
            }
        } catch (err) {
            console.error('Erro na leitura:', err);
        } finally {
            localReader.releaseLock();
        }
    };

    const handleSerialCommand = (cmd) => {
        // Mapeia os caracteres da serial para as ações do app
        if (cmd.includes('L')) window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
        if (cmd.includes('R')) window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
        if (cmd.includes('C')) window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
        
        // Visual feedback
        if (cmd.includes('L')) setActiveAction('LEFT');
        if (cmd.includes('R')) setActiveAction('RIGHT');
        if (cmd.includes('C')) setActiveAction('CLICK');
    };

    const handleUploadFirmware = async () => {
        if (!port || !firmwareFile) {
            alert('Conecte a serial e selecione um arquivo .bin');
            return;
        }

        setStatus('Fazendo upload...');
        try {
            const writer = port.writable.getWriter();
            const reader = new FileReader();
            
            reader.onload = async (e) => {
                const data = new Uint8Array(e.target.result);
                // Envia em chunks para não saturar o buffer
                const chunkSize = 1024;
                for (let i = 0; i < data.length; i += chunkSize) {
                    await writer.write(data.slice(i, i + chunkSize));
                    setStatus(`Progresso: ${Math.round((i / data.length) * 100)}%`);
                }
                writer.releaseLock();
                setStatus('Upload concluído com sucesso!');
            };
            reader.readAsArrayBuffer(firmwareFile);
        } catch (err) {
            console.error('Erro no upload:', err);
            setStatus('Erro no upload');
        }
    };

    // Timer para limpar o destaque da ação visual
    useEffect(() => {
        if (lastAction) {
            setActiveAction(lastAction);
            const timer = setTimeout(() => setActiveAction(null), 300);
            return () => clearTimeout(timer);
        }
    }, [lastAction]);

    if (!isVisible) return null;

    return (
        <div className="hardware-config-overlay">
            <div className="hardware-config-panel">
                <div className="hardware-header">
                    <h3>Configuração de Hardware</h3>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>

                <div className="serial-status-bar">
                    <div className={`status-dot ${port ? 'online' : 'offline'}`}></div>
                    <span>{status}</span>
                    {!port && <button className="connect-btn" onClick={connectSerial}>Conectar Serial</button>}
                </div>

                <div className="test-area">
                    <div className="test-labels">Teste de Entrada (Encoder)</div>
                    <div className="indicators">
                        <div className={`indicator ${activeAction === 'LEFT' ? 'active' : ''}`}>
                            <span className="icon">↺</span>
                            <span className="label">Esquerda</span>
                        </div>
                        <div className={`indicator ${activeAction === 'CLICK' ? 'active' : ''}`}>
                            <span className="icon">⦿</span>
                            <span className="label">Clique</span>
                        </div>
                        <div className={`indicator ${activeAction === 'RIGHT' ? 'active' : ''}`}>
                            <span className="icon">↻</span>
                            <span className="label">Direita</span>
                        </div>
                    </div>
                </div>

                <div className="config-section">
                    <label>Sensibilidade do Encoder: {sensitivity}</label>
                    <input 
                        type="range" 
                        min="1" 
                        max="100" 
                        value={sensitivity} 
                        onChange={(e) => {
                            setSensitivity(parseInt(e.target.value));
                            // Opcional: Enviar comando de sensibilidade via serial
                            if (port) {
                                const writer = port.writable.getWriter();
                                writer.write(new TextEncoder().encode(`S${e.target.value}\n`));
                                writer.releaseLock();
                            }
                        }}
                    />
                </div>

                <div className="config-section">
                    <label className="file-label">Arquivo de Firmware (.bin)</label>
                    <input 
                        type="file" 
                        accept=".bin,.hex"
                        onChange={(e) => setFirmwareFile(e.target.files[0])}
                        className="file-input"
                    />
                    <button className="firmware-btn" onClick={handleUploadFirmware} disabled={!firmwareFile || !port}>
                        Flashear Hardware
                    </button>
                </div>

                <div className="shortcuts-info">
                    Atalho: Tecla <strong>C</strong> para abrir/fechar
                </div>
            </div>
        </div>
    );
};

export default HardwareConfigurator;
