import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './IdleOverlay.css';

/**
 * IdleOverlay — telas COM menu (HomeOrdovician, HomeDevonian, HomePermian)
 * Aparece após `idleTimeout` ms sem interação.
 * forceVisible: toggle imediato via tecla I.
 */
const IdleOverlay = ({ isActive = true, forceVisible = false }) => {
    // Agora o IdleOverlay é controlado centralmente pelo App.jsx via forceVisible (isIdle).
    // O timer interno foi removido para evitar redundância e conflitos.
    const visible = forceVisible;

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    className="idle-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                >
                    {/* Backdrop blur — entra primeiro */}
                    <div className="idle-overlay__backdrop" />

                    {/* Central content — entra depois do backdrop */}
                    <motion.div
                        className="idle-overlay__center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.5, ease: 'easeOut' }}
                    >
                        {/* Knob animado (a1.svg) — centro → esquerda → centro → direita → centro */}
                        <motion.div
                            className="idle-overlay__knob"
                            animate={{ rotate: [0, -45, 0, 45, 0] }}
                            transition={{
                                duration: 3.0,
                                ease: 'easeInOut',
                                times: [0, 0.25, 0.5, 0.75, 1],
                                repeat: Infinity,
                                repeatType: 'loop',
                            }}
                        >
                            <img
                                src="/assets/a1.svg"
                                alt="Gire o botão para navegar"
                                className="idle-overlay__knob-img"
                                draggable={false}
                            />
                        </motion.div>

                        {/* Instrução rotação (a2.svg) */}
                        <div className="idle-overlay__instruction">
                            <img
                                src="/assets/a2.svg"
                                alt="Instrução: gire para explorar"
                                className="idle-overlay__instruction-img"
                                draggable={false}
                            />
                        </div>

                        {/* Divisor */}
                        <div className="idle-overlay__divider" />

                        {/* Instrução pressionar — b1 (botão piscando) + b2 (texto) */}
                        <div className="idle-overlay__press-section">
                            {/* b1 — botão com glow pulsante */}
                            <motion.img
                                src="/assets/b1.svg"
                                alt="Botão pressionar"
                                className="idle-overlay__press-btn"
                                draggable={false}
                                animate={{
                                    filter: [
                                        'drop-shadow(0 0 0px rgba(0,92,255,0))',
                                        'drop-shadow(0 0 36px rgba(0,92,255,1))',
                                        'drop-shadow(0 0 0px rgba(0,92,255,0))',
                                    ],
                                }}
                                transition={{
                                    duration: 1.6,
                                    ease: 'easeInOut',
                                    times: [0, 0.4, 1],
                                    repeat: Infinity,
                                    repeatType: 'loop',
                                }}
                            />
                            {/* b2 — texto instrução */}
                            <img
                                src="/assets/b2.svg"
                                alt="Pressione para acessar"
                                className="idle-overlay__press-label"
                                draggable={false}
                            />
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default IdleOverlay;
