import React, { useState, useEffect } from 'react';

const cssConfigs = {
    'devoniano-home': [
        { label: 'Titles Margin Top', prop: '--devonian-titles-mt', value: 430, min: 0, max: 1000, suffix: 'px' },
        { label: 'Subtitle Size', prop: '--devonian-subtitle-size', value: 73, min: 10, max: 200, suffix: 'px' },
        { label: 'Subtitle Spacing', prop: '--devonian-subtitle-spacing', value: 7.8, min: -10, max: 50, suffix: 'px' },
        { label: 'Subtitle MB', prop: '--devonian-subtitle-mb', value: 0, min: -50, max: 100, suffix: 'px' },
        { label: 'Title Size', prop: '--devonian-title-size', value: 143, min: 10, max: 300, suffix: 'px' },
        { label: 'Title Spacing', prop: '--devonian-title-spacing', value: 9.7, min: -10, max: 50, suffix: 'px' },
        { label: 'Title Line Height', prop: '--devonian-title-lh', value: 0.9, min: 0.1, max: 3, suffix: '' },
        { label: 'Title MT', prop: '--devonian-title-mt', value: -16, min: -150, max: 150, suffix: 'px' },
        { label: 'Title MB', prop: '--devonian-title-mb', value: 62, min: -150, max: 150, suffix: 'px' },
        { label: 'Title ML', prop: '--devonian-title-ml', value: -5, min: -100, max: 100, suffix: 'px' },
        { label: 'Desc Size', prop: '--devonian-desc-size', value: 90, min: 10, max: 200, suffix: 'px' },
        { label: 'Desc MT', prop: '--devonian-desc-mt', value: 0, min: -150, max: 150, suffix: 'px' },
        { label: 'Desc Spacing', prop: '--devonian-desc-spacing', value: -5, min: -20, max: 20, suffix: 'px' },
        { label: 'Desc MB', prop: '--devonian-desc-mb', value: 9, min: -50, max: 100, suffix: 'px' },
        { label: 'SubDesc Size', prop: '--devonian-subdesc-size', value: 50, min: 10, max: 200, suffix: 'px' },
        { label: 'Menu Top', prop: '--devonian-menu-top', value: 1357, min: 0, max: 1920, suffix: 'px' },
        { label: 'Menu Left', prop: '--devonian-menu-left', value: 102, min: 0, max: 1080, suffix: 'px' },
        { label: 'Menu Gap', prop: '--devonian-menu-gap', value: 21, min: 0, max: 150, suffix: 'px' }
    ]
};

const DesignEditor = ({ referenceImage, viewKey }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [opacity, setOpacity] = useState(0.5);
    const [variables, setVariables] = useState({});

    // Load configs based on viewKey
    const currentConfig = cssConfigs[viewKey] || [];

    useEffect(() => {
        // Initialize default values
        const initialVars = {};
        currentConfig.forEach(cfg => {
            initialVars[cfg.prop] = cfg.value;
            document.documentElement.style.setProperty(cfg.prop, `${cfg.value}${cfg.suffix}`);
        });
        setVariables(initialVars);
    }, [viewKey]);

    const handleVarChange = (prop, value, suffix) => {
        setVariables(prev => ({ ...prev, [prop]: value }));
        document.documentElement.style.setProperty(prop, `${value}${suffix}`);
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'e' || e.key === 'E') {
                setIsVisible(prev => !prev);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    if (!isVisible) return null;

    return (
        <>
            {/* Reference Overlay */}
            {referenceImage && (
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '1080px',
                        height: '1920px',
                        backgroundImage: `url('${referenceImage}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        opacity: opacity,
                        pointerEvents: 'none',
                        zIndex: 9998
                    }}
                />
            )}

            {/* Controls Panel */}
            <div
                style={{
                    position: 'absolute',
                    top: '20px',
                    left: '20px',
                    background: 'rgba(0,0,0,0.85)',
                    padding: '20px',
                    borderRadius: '8px',
                    color: 'white',
                    zIndex: 9999,
                    fontFamily: 'sans-serif',
                    width: '320px',
                    maxHeight: '90vh',
                    overflowY: 'auto'
                }}
                onKeyDown={(e) => e.stopPropagation()} 
            >
                <h3 style={{ margin: '0 0 15px 0', fontSize: '16px' }}>Design Editor ({viewKey})</h3>
                
                <div style={{ marginBottom: '20px', paddingBottom: '15px', borderBottom: '1px solid #444' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>
                        Opacidade Ref: {Math.round(opacity * 100)}%
                    </label>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={opacity}
                        onChange={(e) => setOpacity(parseFloat(e.target.value))}
                        style={{ width: '100%' }}
                    />
                </div>

                {currentConfig.map(cfg => (
                    <div key={cfg.prop} style={{ marginBottom: '15px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                            <label style={{ fontSize: '13px' }}>{cfg.label}</label>
                            <span style={{ fontSize: '13px', color: '#4ade80' }}>
                                {variables[cfg.prop] ?? cfg.value}{cfg.suffix}
                            </span>
                        </div>
                        <input
                            type="range"
                            min={cfg.min}
                            max={cfg.max}
                            step={cfg.suffix === '' ? 0.05 : 1}
                            value={variables[cfg.prop] ?? cfg.value}
                            onChange={(e) => handleVarChange(cfg.prop, parseFloat(e.target.value), cfg.suffix)}
                            style={{ width: '100%' }}
                        />
                    </div>
                ))}

                <button 
                    onClick={() => {
                        const cssString = currentConfig.map(cfg => `${cfg.prop}: ${variables[cfg.prop]}${cfg.suffix};`).join('\n');
                        navigator.clipboard.writeText(cssString);
                        alert('CSS copiado!');
                    }}
                    style={{
                        marginTop: '10px', width: '100%', padding: '10px', background: '#4ade80', color: '#000', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold'
                    }}
                >
                    Copiar CSS
                </button>
            </div>
        </>
    );
};

export default DesignEditor;
