import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './RailIdleOverlay.css';

/**
 * RailIdleOverlay
 * Aparece em telas SEM menu de navegação após `idleTimeout` ms de inatividade.
 * Mostra c1 (ícone de tela) deslizando sobre c2 (instrução), mudando de cor —
 * azul (posição atual) → cinza (ao mover) — ensinando o usuário a mover o trilho.
 */
const RailIdleOverlay = ({ idleTimeout = 120000, isActive = true, forceVisible = false }) => {
    const [visible, setVisible] = useState(false);
    const timerRef = useRef(null);

    // forceVisible: mostra/esconde imediatamente (tecla I)
    useEffect(() => {
        setVisible(forceVisible);
    }, [forceVisible]);

    const scheduleShow = useCallback(() => {
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => setVisible(true), idleTimeout);
    }, [idleTimeout]);

    const handleInteraction = useCallback(() => {
        if (visible) setVisible(false);
        scheduleShow();
    }, [visible, scheduleShow]);

    useEffect(() => {
        if (!isActive) {
            setVisible(false);
            if (timerRef.current) clearTimeout(timerRef.current);
            return;
        }

        const events = ['keydown', 'touchstart', 'mousedown'];
        events.forEach(evt => window.addEventListener(evt, handleInteraction, { passive: true }));
        scheduleShow();

        return () => {
            events.forEach(evt => window.removeEventListener(evt, handleInteraction));
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [isActive, handleInteraction, scheduleShow]);

    // Sequência: esquerda (azul) → centro (cinza) → direita (cinza claro) → centro → esquerda
    const xKeyframes = [-280, 0, 280, 0, -280];
    const filterKeyframes = [
        'saturate(1) brightness(1)',      // esquerda — azul original
        'saturate(0.1) brightness(0.65)', // centro — cinza escuro
        'saturate(0.15) brightness(0.8)', // direita — cinza médio
        'saturate(0.1) brightness(0.65)', // centro — cinza escuro
        'saturate(1) brightness(1)',      // esquerda — volta ao azul
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

                        {/* Trilho visual — c1 desliza sobre a linha do c2 */}
                        <div className="rail-idle__rail-track">
                            {/* c1 — ícone de tela, desliza e muda cor */}
                            <motion.img
                                src="/assets/c1.svg"
                                alt="Tela deslizando no trilho"
                                className="rail-idle__screen-icon"
                                draggable={false}
                                animate={{
                                    x: xKeyframes,
                                    filter: filterKeyframes,
                                }}
                                transition={{
                                    duration: 8.0,
                                    ease: 'easeInOut',
                                    times,
                                    repeat: Infinity,
                                    repeatType: 'loop',
                                }}
                            />
                        </div>

                        {/* c2 — instrução "MOVA A TELA para escolher um período" */}
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
