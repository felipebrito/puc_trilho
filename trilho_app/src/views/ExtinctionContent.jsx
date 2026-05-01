import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Typewriter from '../components/Typewriter';
import './ExtinctionContent.css';

const ExtinctionContent = ({ onNavigate, slideData }) => {
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
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.95, y: 20 },
        visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
    };

    const blurVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 1.4, ease: 'easeOut' } }
    };

    return (
        <div className="view-extinction-content" style={{ width: '1080px', height: '1920px', position: 'relative', overflow: 'hidden', backgroundColor: '#ffffff' }}>
            <div id="LBp0D41Ffcn01kT5" style={{ position: 'absolute', width: '1080px', height: '123.81px', transform: 'translate(0px, 0px)' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, transformOrigin: '0px 0px', height: '123.81px', width: '1080px', transform: 'scale(1)' }}>
                    <div style={{ width: '1080px', height: '123.81px', marginLeft: 0, marginTop: 0 }}>
                        <svg style={{ position: 'absolute', width: 0, height: 0 }}>
                            <defs>
                                <clipPath id="__id3500">
                                    <path d="M0,0L2233.092515174864,0L2233.092515174864,256L0,256Z" />
                                </clipPath>
                            </defs>
                        </svg>
                        <div style={{ clipPath: 'url(#__id3500)', background: 'rgb(0, 95, 255)', width: '2233.09px', height: '256px', transform: 'scale(0.483634, 0.483634)', transformOrigin: '0 0' }}></div>
                    </div>
                </div>
            </div>

            <div id="LBqwsj88n4lFbpjM" style={{ position: 'absolute', width: '354.456px', height: '47.8681px', transform: 'translate(362.772px, 39.4381px)' }}>
                <div style={{ width: '354.456px', height: '49.4589px', transform: 'translate(0px, -0.309293px) rotate(0deg)' }}>
                    <img src="/assets/extincao_title.png" alt="Extinção Title" onError={(e) => { e.target.onerror = null; e.target.src = "https://media.canva.com/v2/image-resize/format:PNG/height:72/quality:100/uri:ifs%3A%2F%2FM%2Ff9c64eae-d753-40ea-ab83-44c614c9f1be/watermark:F/width:516"; }} style={{ width: '100%', height: '100%' }} />
                </div>
            </div>

            <div id="LBvmHtnvrPdyDXnW" style={{ position: 'absolute', width: '350.84px', height: '89.6831px', transform: 'translate(621.16px, 1723.87px)' }}>
                <img src="/assets/puc_minas.png" alt="PUC Minas Logo" onError={(e) => { e.target.onerror = null; e.target.src = "https://media.canva.com/v2/image-resize/format:PNG/height:125/quality:100/uri:ifs%3A%2F%2FM%2F9e9a11e5-ddff-48f7-8310-38478dac5927/watermark:F/width:489"; }} style={{ width: '100%', height: '100%' }} />
            </div>

            <div id="LBFDxrczDNrfHkCN" style={{ position: 'absolute', width: '344.755px', height: '88.1275px', transform: 'translate(108px, 1723.87px)' }}>
                <img src="/assets/museu.png" alt="Museu Logo" onError={(e) => { e.target.onerror = null; e.target.src = "https://media.canva.com/v2/image-resize/format:PNG/height:125/quality:100/uri:ifs%3A%2F%2FM%2F60c1fc46-c287-45e5-b695-4bc3016f100e/watermark:F/width:489"; }} style={{ width: '100%', height: '100%' }} />
            </div>

            {/* IMAGE (Top) */}
            <div className="extinction-image-container" style={{ 
                top: 'var(--dev-ext-img-top, 123.81px)', 
                height: 'var(--dev-ext-img-h, 700px)',
                width: '1080px',
                left: 0
            }}>
                <motion.img 
                    variants={blurVariants} 
                    initial="hidden" 
                    animate={{
                        ...blurVariants.visible,
                        scale: 'var(--dev-ext-img-scale, 1)'
                    }} 
                    src={slideData.imageSrc} 
                    alt="Extinção Image" 
                    style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'contain'
                    }} 
                />
            </div>

            {/* CAPTION (Below Image) */}
            <div className="extinction-caption" style={{ 
                top: 'var(--dev-ext-caption-top, 860px)',
                left: 'var(--dev-ext-caption-left, 108px)',
                width: 'var(--dev-ext-caption-w, 900px)',
                textAlign: 'center'
            }}>
                <motion.p variants={blurVariants} initial="hidden" animate="visible" style={{ fontSize: 'var(--dev-ext-caption-size, 26px)' }}>
                    {slideData.imageCaption}
                </motion.p>
            </div>

            {/* SEPARATOR LINE */}
            <div className="extinction-separator" style={{ 
                top: 'var(--dev-ext-line-top, 960px)',
                left: 'var(--dev-ext-line-left, 108px)',
                width: 'var(--dev-ext-line-w, 890px)'
            }} />

            {/* TEXT CONTENT (Bottom) */}
            <div className="extinction-text-content" style={{ 
                position: 'absolute', 
                top: 'var(--dev-ext-text-top, 1050px)', 
                left: 'var(--dev-ext-text-left, 108px)', 
                width: 'var(--dev-ext-text-w, 864px)' 
            }}>
                <div className="extinction-top-text" style={{ 
                    marginBottom: '60px',
                    lineHeight: 'var(--dev-ext-text-lh, 47px)'
                }}>
                    <p style={{ margin: 0, fontFamily: 'var(--font-canva)', fontSize: '37px', color: 'rgb(11, 14, 33)', lineHeight: 'inherit' }}>
                        {slideData.topText?.split('\n').map((line, i) => (
                            <React.Fragment key={i}>
                                {line}<br />
                            </React.Fragment>
                        ))}
                    </p>
                </div>

                <div className="extinction-bottom-text" style={{
                    lineHeight: 'var(--dev-ext-text-lh, 47px)'
                }}>
                    <p style={{ margin: 0, fontFamily: 'var(--font-canva)', fontSize: '37px', color: 'rgb(11, 14, 33)', lineHeight: 'inherit' }}>
                        {slideData.bottomText?.split('\n').map((line, i) => {
                            const parts = line.split(/(85% de todas as espécies)/g);
                            return (
                                <React.Fragment key={i}>
                                    {parts.map((part, j) => (
                                        part === '85% de todas as espécies' ? (
                                            <span key={j} style={{ color: 'var(--color-primary-blue)', fontWeight: 'bold' }}>
                                                {part}
                                            </span>
                                        ) : part
                                    ))}
                                    <br />
                                </React.Fragment>
                            );
                        })}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ExtinctionContent;
