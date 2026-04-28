import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import './DevonianExtinctionEnvironments.css';

const DevonianExtinctionEnvironments = ({ onNavigate, slideData }) => {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                onNavigate('right');
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                onNavigate('left');
            } else if (e.key === 'Enter') {
                onNavigate('down');
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onNavigate]);

    return (
        <div className="view-dev-ext-environments">
            {/* Header Bar */}
            <div className="dev-ext-header-bar">
                <h1 className="dev-ext-header-text">EXTINÇÃO</h1>
            </div>

            <div className="dev-ext-environments-content">
                {/* UP SEGMENT */}
                <div className="env-segment">
                    <div className="env-image-container">
                        <img src={slideData.speciesLeft.imageSrc} alt={slideData.speciesLeft.name} className="env-image" />
                    </div>
                    <div className="env-caption">
                        <p className="env-description">{slideData.speciesLeft.subtitle}</p>
                    </div>
                </div>

                {/* DOWN SEGMENT */}
                <div className="env-segment">
                    <div className="env-image-container">
                        <img src={slideData.speciesRight.imageSrc} alt={slideData.speciesRight.name} className="env-image" />
                    </div>
                    <div className="env-caption">
                        <p className="env-description">{slideData.speciesRight.subtitle}</p>
                    </div>
                </div>
            </div>

            {/* Footer Logos removidos */}
        </div>
    );
};

export default DevonianExtinctionEnvironments;
