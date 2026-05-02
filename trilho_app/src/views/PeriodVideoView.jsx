import React from 'react';
import { motion } from 'framer-motion';
import './PeriodVideoView.css';

const PeriodVideoView = ({ videoSrc, title, periodNumber, hasMenu, onOpenMenu }) => {
    return (
        <div className="period-video-container">
            <video 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="background-video"
                key={videoSrc}
            >
                <source src={videoSrc} type="video/mp4" />
            </video>

            <div className="video-overlay" />

            <motion.div 
                className="period-info"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
            >
                <span className="period-number">{periodNumber.toString().padStart(2, '0')}</span>
                <h1 className="period-title">{title}</h1>
            </motion.div>

            {hasMenu && (
                <motion.div 
                    className="menu-prompt"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    onClick={onOpenMenu}
                >
                    <div className="prompt-icon">⦿</div>
                    <span>NAVEGUE NO TRILHO</span>
                </motion.div>
            )}
        </div>
    );
};

export default PeriodVideoView;
