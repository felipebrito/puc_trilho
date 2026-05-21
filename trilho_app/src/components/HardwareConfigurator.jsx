import React, { useState, useEffect } from 'react';
import './HardwareConfigurator.css';

const HardwareConfigurator = ({ 
    isVisible, 
    onClose, 
    lastAction, 
    hardwareConfig = {}, 
    onUpdateConfig, 
    idleTimeout = 60000, 
    onIdleTimeoutChange 
}) => {
    const [activeAction, setActiveAction] = useState(null);

    // Default configuration values
    const config = {
        navStepsPerAction: 7,
        navDebounceMs: 150,
        clickDebounceMs: 500,
        ignoreDuringMoveMs: 800,
        ...hardwareConfig
    };

    // Timer to clear visual action highlight
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

                <div className="config-grid">
                    <div className="config-section">
                        <label className="slider-title">Giro por Ação: <span className="highlight">{config.navStepsPerAction} passos</span></label>
                        <input 
                            type="range" 
                            min="1" 
                            max="20" 
                            value={config.navStepsPerAction} 
                            onChange={(e) => {
                                const val = parseInt(e.target.value);
                                if (onUpdateConfig) {
                                    onUpdateConfig({ navStepsPerAction: val });
                                }
                            }}
                        />
                        <div className="slider-hint">Menor valor = mais sensível ao girar</div>
                    </div>

                    <div className="config-section">
                        <label className="slider-title">Debounce de Navegação: <span className="highlight">{config.navDebounceMs} ms</span></label>
                        <input 
                            type="range" 
                            min="50" 
                            max="1000" 
                            step="10"
                            value={config.navDebounceMs} 
                            onChange={(e) => {
                                const val = parseInt(e.target.value);
                                if (onUpdateConfig) {
                                    onUpdateConfig({ navDebounceMs: val });
                                }
                            }}
                        />
                        <div className="slider-hint">Tempo mínimo entre disparos de seta</div>
                    </div>

                    <div className="config-section">
                        <label className="slider-title">Anti-Ruído do Clique: <span className="highlight">{config.clickDebounceMs} ms</span></label>
                        <input 
                            type="range" 
                            min="200" 
                            max="1500" 
                            step="50"
                            value={config.clickDebounceMs} 
                            onChange={(e) => {
                                const val = parseInt(e.target.value);
                                if (onUpdateConfig) {
                                    onUpdateConfig({ clickDebounceMs: val });
                                }
                            }}
                        />
                        <div className="slider-hint">Ignora cliques rápidos (ruídos KY-040)</div>
                    </div>

                    <div className="config-section">
                        <label className="slider-title">Bloqueio ao Mover Trilho: <span className="highlight">{config.ignoreDuringMoveMs} ms</span></label>
                        <input 
                            type="range" 
                            min="0" 
                            max="2000" 
                            step="50"
                            value={config.ignoreDuringMoveMs} 
                            onChange={(e) => {
                                const val = parseInt(e.target.value);
                                if (onUpdateConfig) {
                                    onUpdateConfig({ ignoreDuringMoveMs: val });
                                }
                            }}
                        />
                        <div className="slider-hint">Bloqueia entradas se trilho movedor estiver ativo</div>
                    </div>
                </div>

                <div className="config-section idle-timeout-wrapper">
                    <label className="slider-title">Tempo de Inatividade (telas de menu)</label>
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
