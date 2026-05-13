import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './IdleOverlay.css';

/**
 * IdleOverlay
 * Aparece após `idleTimeout` ms de inatividade (sem keydown / touchstart).
 * Desaparece ao primeiro evento de interação.
 *
 * Props:
 *   idleTimeout  — ms até aparecer (default: 8000)
 *   isActive     — se a tela pai está montada e ativa
 */
const IdleOverlay = ({ idleTimeout = 8000, isActive = true, forceVisible = false }) => {
    const [visible, setVisible] = useState(false);
    const timerRef = useRef(null);

    // forceVisible: mostra/esconde imediatamente (tecla I)
    useEffect(() => {
        setVisible(forceVisible);
    }, [forceVisible]);

    const hide = useCallback(() => {
        setVisible(false);
    }, []);

    const scheduleShow = useCallback(() => {
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
            setVisible(true);
        }, idleTimeout);
    }, [idleTimeout]);

    const handleInteraction = useCallback(() => {
        if (visible) {
            hide();
        }
        scheduleShow();
    }, [visible, hide, scheduleShow]);

    useEffect(() => {
        if (!isActive) {
            setVisible(false);
            if (timerRef.current) clearTimeout(timerRef.current);
            return;
        }

        const events = ['keydown', 'touchstart', 'mousedown'];
        events.forEach(evt => window.addEventListener(evt, handleInteraction, { passive: true }));

        // Inicia o timer ao montar
        scheduleShow();

        return () => {
            events.forEach(evt => window.removeEventListener(evt, handleInteraction));
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [isActive, handleInteraction, scheduleShow]);

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
                        <motion.div
                            className="idle-overlay__instruction"
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                        >
                            <img
                                src="/assets/a2.svg"
                                alt="Instrução: gire para explorar"
                                className="idle-overlay__instruction-img"
                                draggable={false}
                            />
                        </motion.div>

                        {/* Divisor */}
                        <div className="idle-overlay__divider" />

                        {/* Instrução pressionar — b1 (botão piscando) + b2 (texto) */}
                        <motion.div
                            className="idle-overlay__press-section"
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                        >
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
                                    times: [0, 0.4, 0.7, 1],
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
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default IdleOverlay;
