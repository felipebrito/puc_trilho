import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import BackgroundVideo from '../components/BackgroundVideo';
import Typewriter from '../components/Typewriter';
import './SectionIntro.css';

const SectionIntro = ({ onNavigate, slideData }) => {
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

    const periodLabel = slideData.periodLabel || "PERÍODO";
    const periodName = slideData.periodName || slideData.period?.toUpperCase() || "ORDOVICIANO";

    return (
        <div className={`view-section-intro ${slideData.period || ''} ${slideData.section || ''}`}>
            {slideData.videoSrc ? (
                <BackgroundVideo src={slideData.videoSrc} variant="full" />
            ) : (
                <img className="section-bg-image" src={slideData.bgImage || '/assets/extinction_map.png'} alt="Background" />
            )}

            <div className="section-intro-content">
                <motion.div
                    className="section-html-overlay"
                    variants={containerVariants}
                >
                    <div className="section-intro-header">
                        <motion.h3 variants={itemVariants} className="section-intro-period-label">{periodLabel}</motion.h3>
                        <motion.h2 variants={itemVariants} className="section-intro-period-name">{periodName}</motion.h2>
                        {!slideData.hideLines && <motion.img variants={itemVariants} className="section-title-underline" src="/assets/linha.svg" alt="" />}
                    </div>

                    <div className="section-intro-body">
                        <motion.h1 variants={itemVariants} className="section-intro-main-heading">
                            <Typewriter text={slideData.title} delay={50} initialDelay={800} />
                        </motion.h1>
                        
                        {!slideData.hideLines && <motion.img variants={itemVariants} className="section-body-top-line" src="/assets/linha.svg" alt="" />}
                        
                        <motion.div variants={itemVariants} className="section-intro-main-text">
                            <Typewriter
                                text={slideData.content || slideData.description}
                                delay={15}
                                initialDelay={1800}
                            />
                        </motion.div>
                        
                        {!slideData.hideLines && <motion.img variants={itemVariants} className="section-body-bottom-line" src="/assets/linha.svg" alt="" />}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default SectionIntro;
