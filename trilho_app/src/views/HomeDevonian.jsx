import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import BackgroundVideo from '../components/BackgroundVideo';
import { slidesData, periodStartIndex } from '../data/slides';
import './HomeDevonian.css';

// Absolute indices in slidesData for each devoniano section
const DEVONIAN_OFFSET = periodStartIndex.devoniano;
const BIODIVERSIDADE_IDX = DEVONIAN_OFFSET + slidesData.slice(DEVONIAN_OFFSET).findIndex(s => s.section === 'biodiversidade');
const EXTINCAO_IDX = DEVONIAN_OFFSET + slidesData.slice(DEVONIAN_OFFSET).findIndex(s => s.section === 'extincao');
const POS_EXTINCAO_IDX = DEVONIAN_OFFSET + slidesData.slice(DEVONIAN_OFFSET).findIndex(s => s.section === 'pos_extincao');

const HomeDevonian = ({ onNavigate }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                setActiveIndex((prev) => (prev < 2 ? prev + 1 : 0));
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                setActiveIndex((prev) => (prev > 0 ? prev - 1 : 2));
            } else if (e.key === 'Enter') {
                if (activeIndex === 0) {
                    onNavigate('up', BIODIVERSIDADE_IDX);
                } else if (activeIndex === 1) {
                    onNavigate('up', EXTINCAO_IDX);
                } else if (activeIndex === 2) {
                    onNavigate('up', POS_EXTINCAO_IDX);
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [activeIndex, onNavigate]);

    const containerVariants = {
        initial: { opacity: 1 },
        animate: {
            opacity: 1,
            transition: { 
                delayChildren: 0.6,
                staggerChildren: 0.15 
            }
        }
    };

    const itemVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
    };

    return (
        <div className="view-home-devonian">
            <BackgroundVideo src="/_conteudo/Videos/06_Devoniano_0604.mp4" variant="full">
                <motion.div
                    className="home-devonian-content"
                    variants={containerVariants}
                >
                    {/* Titles hidden as requested */}

                    <motion.div variants={itemVariants} className="home-devonian-menu">
                        <button
                            className={`btn-devonian ${activeIndex === 0 ? 'btn-devonian-active' : 'btn-devonian-inactive'}`}
                            onClick={() => onNavigate('up', BIODIVERSIDADE_IDX)}
                            onMouseEnter={() => setActiveIndex(0)}
                        >
                            <span>A BIODIVERSIDADE DA ÉPOCA</span>
                            <span className={activeIndex === 0 ? "btn-devonian-icon-active" : "btn-devonian-icon-inactive"}>›</span>
                        </button>
                        <button
                            className={`btn-devonian ${activeIndex === 1 ? 'btn-devonian-active' : 'btn-devonian-inactive'}`}
                            onClick={() => onNavigate('up', EXTINCAO_IDX)}
                            onMouseEnter={() => setActiveIndex(1)}
                        >
                            <span>A 2ª EXTINÇÃO EM MASSA</span>
                            <span className={activeIndex === 1 ? "btn-devonian-icon-active" : "btn-devonian-icon-inactive"}>›</span>
                        </button>
                        <button
                            className={`btn-devonian ${activeIndex === 2 ? 'btn-devonian-active' : 'btn-devonian-inactive'}`}
                            onClick={() => onNavigate('up', POS_EXTINCAO_IDX)}
                            onMouseEnter={() => setActiveIndex(2)}
                        >
                            <span>E DEPOIS?</span>
                            <span className={activeIndex === 2 ? "btn-devonian-icon-active" : "btn-devonian-icon-inactive"}>›</span>
                        </button>
                    </motion.div>
                </motion.div>
            </BackgroundVideo>
        </div>
    );
};

export default HomeDevonian;
