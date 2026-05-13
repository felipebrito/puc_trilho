import React, { useState, useEffect } from 'react';
import './HardwareConfigurator.css';

const HardwareConfigurator = ({ isVisible, onClose, lastAction, onSendCommand, idleTimeout = 120000, onIdleTimeoutChange }) => {
    const [sensitivity, setSensitivity] = useState(50);
    const [activeAction, setActiveAction] = useState(null);

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
                    <h3>Calibração do Encoder</h3>
                    <button className="close-btn" onClick={onClose}>×</button>
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
                            const val = parseInt(e.target.value);
                            setSensitivity(val);
                            if (onSendCommand) {
                                onSendCommand('SENSITIVITY', val);
                            }
                        }}
                    />
                </div>

                <div className="config-section">
                    <label>Tempo de Inatividade (telas de menu)</label>
                    <div className="idle-timeout-options">
                        {[1, 2, 3, 4, 5].map(min => (
                            <button
                                key={min}
                                className={`idle-timeout-btn ${idleTimeout === min * 60000 ? 'active' : ''}`}
                                onClick={() => onIdleTimeoutChange && onIdleTimeoutChange(min * 60000)}
                            >
                                {min} min
                            </button>
                        ))}
                    </div>
                </div>

                <div className="shortcuts-info">
                    Atalho: Tecla <strong>C</strong> para abrir/fechar
                </div>
            </div>
        </div>
    );
};

export default HardwareConfigurator;
