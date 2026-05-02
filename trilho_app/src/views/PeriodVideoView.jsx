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

            {/* Section texts hidden as requested */}

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
