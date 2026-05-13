import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './RailIdleOverlay.css';

/**
 * RailIdleOverlay — telas Home (tipo 'home') e PeriodVideoView.
 * NÃO aparece em páginas internas (conteúdo, espécimes, etc.).
 * Mostra c1 deslizando ±280px com mudança de cor, sobre c2 instrução.
 */
const RailIdleOverlay = ({ isActive = true, forceVisible = false }) => {
    // Agora o RailIdleOverlay é controlado centralmente pelo App.jsx via forceVisible (isIdle).
    // O timer interno foi removido para evitar redundância e conflitos.
    const visible = forceVisible;

    const xKeyframes = [-280, 0, 280, 0, -280];
    const filterKeyframes = [
        'saturate(1) brightness(1)',
        'saturate(0.1) brightness(0.65)',
        'saturate(0.15) brightness(0.8)',
        'saturate(0.1) brightness(0.65)',
        'saturate(1) brightness(1)',
    ];
    const times = [0, 0.25, 0.5, 0.75, 1];

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    className="rail-idle-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                >
                    {/* Backdrop blur — entra primeiro */}
                    <div className="rail-idle__backdrop" />

                    {/* Conteúdo central — entra depois do backdrop */}
                    <motion.div
                        className="rail-idle__center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.5, ease: 'easeOut' }}
                    >
                        <div className="rail-idle__rail-track">
                            <motion.img
                                src="/assets/c1.svg"
                                alt="Tela deslizando no trilho"
                                className="rail-idle__screen-icon"
                                draggable={false}
                                animate={{ x: xKeyframes, filter: filterKeyframes }}
                                transition={{
                                    duration: 8.0,
                                    ease: 'easeInOut',
                                    times,
                                    repeat: Infinity,
                                    repeatType: 'loop',
                                }}
                            />
                        </div>

                        <img
                            src="/assets/c2.svg"
                            alt="Mova a tela para escolher um período"
                            className="rail-idle__instruction"
                            draggable={false}
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default RailIdleOverlay;
