import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import BackgroundVideo from '../components/BackgroundVideo';
import { slidesData, periodStartIndex } from '../data/slides';
import './HomeOrdovician.css';

// Absolute indices in slidesData for each ordoviciano section
const ORDOVICIAN_OFFSET = periodStartIndex.ordoviciano;
const BIODIVERSIDADE_IDX = ORDOVICIAN_OFFSET + slidesData.slice(ORDOVICIAN_OFFSET).findIndex(s => s.section === 'biodiversidade');
const EXTINCAO_IDX = ORDOVICIAN_OFFSET + slidesData.slice(ORDOVICIAN_OFFSET).findIndex(s => s.section === 'extincao');
const POS_EXTINCAO_IDX = ORDOVICIAN_OFFSET + slidesData.slice(ORDOVICIAN_OFFSET).findIndex(s => s.section === 'pos_extincao');

const HomeOrdovician = ({ onNavigate }) => {
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
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, filter: 'blur(15px)', y: 20 },
        visible: { opacity: 1, filter: 'blur(0px)', y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
    };

    return (
        <div className="view-home-ordovician">
            <BackgroundVideo src="/assets/ordoviciano/home_bg.png" variant="full">
                <motion.div
                    className="home-ordovician-content"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <div className="home-ordovician-titles">
                        <motion.h2 variants={itemVariants} className="ordovician-subtitle">PERÍODO</motion.h2>
                        <motion.h1 variants={itemVariants} className="ordovician-title">ORDOVICIANO</motion.h1>
                        <motion.p variants={itemVariants} className="ordovician-description">486 a 444 milhões de anos</motion.p>
                        <motion.p variants={itemVariants} className="ordovician-sub-description">
                            A primeira extinção em massa marca o final do período.
                        </motion.p>
                    </div>

                    <motion.div variants={itemVariants} className="home-ordovician-menu">
                        <button
                            className={`btn-ordovician ${activeIndex === 0 ? 'btn-ordovician-active' : 'btn-ordovician-inactive'}`}
                            onClick={() => onNavigate('up', BIODIVERSIDADE_IDX)}
                            onMouseEnter={() => setActiveIndex(0)}
                        >
                            <span>A BIODIVERSIDADE DA ÉPOCA</span>
                            <span className={activeIndex === 0 ? "btn-ordovician-icon-active" : "btn-ordovician-icon-inactive"}>›</span>
                        </button>
                        <button
                            className={`btn-ordovician ${activeIndex === 1 ? 'btn-ordovician-active' : 'btn-ordovician-inactive'}`}
                            onClick={() => onNavigate('up', EXTINCAO_IDX)}
                            onMouseEnter={() => setActiveIndex(1)}
                        >
                            <span>A 1ª EXTINÇÃO EM MASSA</span>
                            <span className={activeIndex === 1 ? "btn-ordovician-icon-active" : "btn-ordovician-icon-inactive"}>›</span>
                        </button>
                        <button
                            className={`btn-ordovician ${activeIndex === 2 ? 'btn-ordovician-active' : 'btn-ordovician-inactive'}`}
                            onClick={() => onNavigate('up', POS_EXTINCAO_IDX)}
                            onMouseEnter={() => setActiveIndex(2)}
                        >
                            <span>E DEPOIS?</span>
                            <span className={activeIndex === 2 ? "btn-ordovician-icon-active" : "btn-ordovician-icon-inactive"}>›</span>
                        </button>
                    </motion.div>
                </motion.div>
            </BackgroundVideo>
        </div>
    );
};

export default HomeOrdovician;
