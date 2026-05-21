import React, { useState, useEffect } from 'react';
import './RailWizard.css';

// Configurações padrão para cada período geológico selecionável
const PERIOD_DATA = {
    'Arqueano': {
        video: "/assets/videos/01_Arqueano_0204.mp4",
        hasMenu: false
    },
    'Proterozoico': {
        video: "/assets/videos/02_proterozoico_2704.mp4",
        hasMenu: false
    },
    'Cambriano': {
        video: "/assets/videos/03_Cambriano_0204.mp4",
        hasMenu: false
    },
    'Ordoviciano': {
        video: "/assets/videos/04_Ordoviciano_0604.mp4",
        hasMenu: true
    },
    'Siluriano': {
        video: "/assets/videos/05_Siluriano_0604.mp4",
        hasMenu: false
    },
    'Devoniano': {
        video: "/assets/videos/06_Devoniano_0604.mp4",
        hasMenu: true
    },
    'Carbonifero': {
        video: "/assets/videos/07_Carbonifero_0604.mp4",
        hasMenu: false
    },
    'Permiano': {
        video: "/assets/videos/08_Permiano_0604.mp4",
        hasMenu: true
    }
};

const RailWizard = ({ isVisible, onClose, currentPosition, railSettings, onSaveSettings, onResetSettings }) => {
    const [settings, setSettings] = useState(railSettings);
    const [activeZone, setActiveZone] = useState(null);

    // Sincroniza o estado do Wizard com as configurações ativas ao abrir
    useEffect(() => {
        if (isVisible && railSettings) {
            setSettings(railSettings);
        }
    }, [isVisible, railSettings]);

    useEffect(() => {
        if (currentPosition !== undefined && settings && settings.zones && settings.zones.length > 0) {
            let zone = settings.zones.find(z => currentPosition >= z.start && currentPosition <= z.end);
            if (!zone && currentPosition < settings.zones[0].start) {
                zone = settings.zones[0];
            }
            if (zone) setActiveZone(zone.id);
        }
    }, [currentPosition, settings]);

    // Permite mudar o período/seção de uma zona usando o selectable dropdown
    const handlePeriodChange = (id, newPeriodName) => {
        const periodDefaults = PERIOD_DATA[newPeriodName] || {};
        const newZones = settings.zones.map((zone) => {
            if (zone.id === id) {
                return { 
                     ...zone, 
                     name: newPeriodName,
                     video: periodDefaults.video || zone.video,
                     hasMenu: periodDefaults.hasMenu !== undefined ? periodDefaults.hasMenu : zone.hasMenu
                };
            }
            return zone;
        });
        setSettings({ ...settings, zones: newZones });
    };

    const handleZoneChange = (id, field, value) => {
        const val = parseInt(value) || 0;
        const newZones = settings.zones.map((zone) => {
            if (zone.id === id) {
                return { ...zone, [field]: val };
            }
            return zone;
        });

        // Aplica o encadeamento sem sobreposição: Início de um é o Fim do anterior + 1
        let chainedZones = [...newZones];
        if (chainedZones.length > 0) {
            chainedZones[0].start = 0;
        }
        for (let i = 0; i < chainedZones.length; i++) {
            if (i > 0) {
                chainedZones[i] = {
                    ...chainedZones[i],
                    start: chainedZones[i - 1].end + 1
                };
            }
            if (chainedZones[i].end < chainedZones[i].start) {
                chainedZones[i] = {
                    ...chainedZones[i],
                    end: chainedZones[i].start
                };
            }
        }

        setSettings({ ...settings, zones: chainedZones });
    };

    const saveToLocalStorage = async () => {
        try {
            const response = await fetch('/api/save-rail', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(settings)
            });
            if (response.ok) {
                localStorage.setItem('rail_settings', JSON.stringify(settings));
                alert('Configurações salvas com sucesso em rail_settings.json!');
                if (onSaveSettings) {
                    onSaveSettings(settings);
                }
            } else {
                throw new Error('Falha ao salvar no backend');
            }
        } catch (err) {
            console.error(err);
            alert('Erro ao salvar no arquivo de configuração do backend. Salvando localmente no navegador.');
            localStorage.setItem('rail_settings', JSON.stringify(settings));
            if (onSaveSettings) {
                onSaveSettings(settings);
            }
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(JSON.stringify(settings, null, 2));
        alert('JSON copiado! Cole no arquivo rail_settings.json');
    };

    if (!isVisible) return null;

    return (
        <div className="rail-wizard-overlay">
            <div className="rail-wizard-panel">
                <div className="rail-wizard-header">
                    <h2>Calibração e Mapeamento do Trilho</h2>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>

                <div className="rail-wizard-content">
                    <div className="rail-visualization">
                        <div className="rail-track">
                            {settings.zones.map(zone => (
                                <div 
                                    key={zone.id}
                                    className="zone-marker"
                                    style={{ top: `${(zone.end / settings.maxEncoderValue) * 100}%` }}
                                >
                                    <span className="zone-label-short">{zone.id}</span>
                                </div>
                            ))}
                            <div 
                                className="current-position-marker"
                                style={{ top: `${(currentPosition / settings.maxEncoderValue) * 100}%` }}
                            />
                        </div>
                    </div>

                    <div className="zones-editor">
                        {settings.zones.map((zone, index) => (
                            <div 
                                key={zone.id} 
                                className={`zone-card-aligned ${activeZone === zone.id ? 'active' : ''}`}
                            >
                                <div className="zone-info-main">
                                    <label className="input-title-label">Seção {zone.id}</label>
                                    <select
                                        className="zone-period-select"
                                        value={zone.name}
                                        onChange={(e) => handlePeriodChange(zone.id, e.target.value)}
                                    >
                                        <option value="Arqueano">Arqueano</option>
                                        <option value="Proterozoico">Proterozoico</option>
                                        <option value="Cambriano">Cambriano</option>
                                        <option value="Ordoviciano">Ordoviciano</option>
                                        <option value="Siluriano">Siluriano</option>
                                        <option value="Devoniano">Devoniano</option>
                                        <option value="Carbonifero">Carbonífero</option>
                                        <option value="Permiano">Permiano</option>
                                    </select>
                                    <div className="metadata-badge">
                                        {zone.hasMenu ? "Menu Interativo" : "Apenas Vídeo"}
                                    </div>
                                </div>
                                
                                <div className="zone-inputs-dual">
                                    <div className="dual-control">
                                        <label>Início (Fixo/Auto-calculado)</label>
                                        <div className="input-slider-row">
                                            <input 
                                                type="number" 
                                                value={zone.start} 
                                                disabled 
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="dual-control">
                                        <label>Fim (Ajuste Fino)</label>
                                        <div className="input-slider-row">
                                            <input 
                                                type="range" 
                                                min="0" 
                                                max={settings.maxEncoderValue} 
                                                value={zone.end} 
                                                onChange={(e) => handleZoneChange(zone.id, 'end', e.target.value)}
                                            />
                                            <input 
                                                type="number" 
                                                value={zone.end} 
                                                onChange={(e) => handleZoneChange(zone.id, 'end', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="zone-action-col">
                                    <button 
                                        className="calibration-btn"
                                        onClick={() => handleZoneChange(zone.id, 'end', currentPosition)}
                                        title="Define o fim deste período no ponto atual do totem"
                                    >
                                        Marcar Fim Aqui
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="wizard-footer">
                    <div className="footer-info">
                        Posição Atual do Encoder: <span className="position-highlight">{currentPosition}</span>
                        {activeZone && (
                            <span className="zone-highlight">
                                &nbsp;| Período Atual: <strong>{settings.zones.find(z => z.id === activeZone)?.name}</strong>
                            </span>
                        )}
                    </div>
                    <div className="footer-actions">
                        {onResetSettings && (
                            <button className="restore-btn" onClick={onResetSettings}>Restaurar Padrões</button>
                        )}
                        <button className="copy-btn" onClick={copyToClipboard}>Copiar JSON</button>
                        <button className="save-btn" onClick={saveToLocalStorage}>Salvar Configuração</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RailWizard;
