import React, { useState, useEffect } from 'react';
import './RailWizard.css';
import initialSettings from '../data/rail_settings.json';

const RailWizard = ({ isVisible, onClose, currentPosition }) => {
    const [settings, setSettings] = useState(initialSettings);
    const [activeZone, setActiveZone] = useState(null);

    useEffect(() => {
        if (currentPosition !== undefined) {
            const zone = settings.zones.find(z => currentPosition >= z.start && currentPosition <= z.end);
            if (zone) setActiveZone(zone.id);
        }
    }, [currentPosition, settings]);

    const handleZoneChange = (id, field, value) => {
        const val = parseInt(value) || 0;
        const newZones = settings.zones.map((zone, index) => {
            if (zone.id === id) {
                return { ...zone, [field]: val };
            }
            return zone;
        });

        // Aplica o encadeamento: Início de um é o Fim do anterior
        const chainedZones = newZones.map((zone, index) => {
            if (index > 0) {
                return { ...zone, start: newZones[index - 1].end };
            }
            return zone;
        });

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
                alert('Configurações salvas com sucesso em rail_settings.json!');
            } else {
                throw new Error('Falha ao salvar');
            }
        } catch (err) {
            console.error(err);
            alert('Erro ao salvar no arquivo. Salvando apenas no navegador.');
            localStorage.setItem('rail_settings', JSON.stringify(settings));
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
                    <h2>Configuração de Trilho (7m)</h2>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>

                <div className="rail-wizard-content">
                    <div className="rail-visualization">
                        <div className="rail-track">
                            {settings.zones.map(zone => (
                                <div 
                                    key={zone.id}
                                    className="zone-marker"
                                    style={{ top: `${(zone.start / settings.maxEncoderValue) * 100}%` }}
                                >
                                    <span className="zone-label">{zone.name}</span>
                                </div>
                            ))}
                            <div 
                                className="current-position-marker"
                                style={{ top: `${(currentPosition / settings.maxEncoderValue) * 100}%` }}
                            />
                        </div>
                    </div>

                    <div className="zones-editor no-scroll">
                        {settings.zones.map((zone, index) => (
                            <div 
                                key={zone.id} 
                                className={`zone-card-aligned ${activeZone === zone.id ? 'active' : ''}`}
                                style={{ top: `${(zone.start / settings.maxEncoderValue) * 100}%` }}
                            >
                                <div className="zone-info-main">
                                    <h4>{zone.id}. {zone.name}</h4>
                                </div>
                                <div className="zone-inputs-dual">
                                    <div className="dual-control">
                                        <label>Início</label>
                                        <div className="input-slider-row">
                                            <input 
                                                type="range" 
                                                min="0" 
                                                max={settings.maxEncoderValue} 
                                                value={zone.start} 
                                                disabled={index > 0} 
                                                onChange={(e) => handleZoneChange(zone.id, 'start', e.target.value)}
                                            />
                                            <input 
                                                type="number" 
                                                value={zone.start} 
                                                disabled={index > 0}
                                                onChange={(e) => handleZoneChange(zone.id, 'start', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="dual-control">
                                        <label>Fim</label>
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
                            </div>
                        ))}
                    </div>
                </div>

                <div className="wizard-footer">
                    <div className="footer-info">
                        Posição Atual do Encoder: <strong>{currentPosition}</strong>
                    </div>
                    <div className="footer-actions">
                        <button className="copy-btn" onClick={copyToClipboard}>Copiar JSON</button>
                        <button className="save-btn" onClick={saveToLocalStorage}>Salvar Configuração</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RailWizard;
