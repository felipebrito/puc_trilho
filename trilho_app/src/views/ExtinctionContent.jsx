import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Typewriter from '../components/Typewriter';
import './ExtinctionContent.css';

const ExtinctionContent = ({ onNavigate, slideData, viewId }) => {
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
            transition: { staggerChildren: 0.15 }
        }
    };

    const itemVariants = {
        initial: { opacity: 0, scale: 0.95, y: 20 },
        animate: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
    };

    const imageFadeVariants = {
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { duration: 1.5, ease: 'easeOut' } }
    };

    const blurVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0, transition: { duration: 1.4, ease: 'easeOut' } }
    };

    const getVar = (suffix, defaultValue) => {
        if (!viewId) return `var(--dev-ext-${suffix}, ${defaultValue})`;
        if (viewId.includes('extincao-content')) return `var(--dev-ext-${suffix}, ${defaultValue})`;
        return `var(--dev-${viewId}-${suffix}, ${defaultValue})`;
    };

    return (
        <div className="view-extinction-content" style={{ width: '1080px', height: '1920px', position: 'relative', overflow: 'hidden', backgroundColor: '#ffffff' }}>
            {slideData.bgImage && (
                <div 
                    className="extinction-bg-image" 
                    style={{ 
                        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                        backgroundImage: `url(${slideData.bgImage})`,
                        backgroundSize: 'cover', backgroundPosition: 'center',
                        opacity: getVar('bg-opacity', '1'),
                        zIndex: 0
                    }} 
                />
            )}
            {/* Header / Logos etc. */}
            <div id="LBp0D41Ffcn01kT5" style={{ position: 'absolute', width: '1080px', height: '123.81px', transform: 'translate(0px, 0px)' }}>
                {/* ... existing blue header ... */}
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
                    <img src="/assets/extincao_title.png" alt="Extinção Title" style={{ width: '100%', height: '100%' }} />
                </div>
            </div>



            {/* IMAGE (Top) */}
            <div className="extinction-image-container" style={{ 
                top: getVar('img-top', '123.81px'), 
                height: getVar('img-h', '700px'),
                width: '1080px',
                left: 0,
                backgroundColor: '#000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
            }}>
                <motion.img 
                    variants={imageFadeVariants} 
                    initial="initial" 
                    animate="animate" 
                    src={slideData.imageSrc} 
                    alt="Extinção Image" 
                    style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'contain',
                        transform: `scale(${getVar('img-scale', '1')}) translate(${getVar('img-x', '0px')}, ${getVar('img-y', '0px')})`
                    }} 
                />
            </div>

            {/* CAPTION (Below Image) */}
            <div className="extinction-caption" style={{ 
                top: getVar('cap-top', '860px'),
                left: getVar('cap-left', '108px'),
                width: getVar('cap-w', '900px'),
                textAlign: 'center'
            }}>
                <motion.p variants={blurVariants} initial="initial" animate="animate" style={{ fontSize: getVar('cap-size', '26px') }}>
                    {slideData.imageCaption}
                </motion.p>
            </div>

            {/* SEPARATOR LINE */}
            <div className="extinction-separator" style={{ 
                top: getVar('line-top', '960px'),
                left: getVar('line-left', '108px'),
                width: getVar('line-w', '890px')
            }} />

            {/* TEXT CONTENT (Bottom) */}
            <div className="extinction-text-content" style={{ 
                position: 'absolute', 
                top: getVar('text-top', '1050px'), 
                left: getVar('text-left', '108px'), 
                width: getVar('text-w', '864px') 
            }}>
                <div className="extinction-top-text" style={{ 
                    position: viewId?.includes('extincao-content') ? 'relative' : 'absolute',
                    top: viewId?.includes('extincao-content') ? '0' : `calc(${getVar('top-top', '0px')} - ${getVar('text-top', '1050px')})`,
                    left: viewId?.includes('extincao-content') ? '0' : `calc(${getVar('top-left', '108px')} - ${getVar('text-left', '108px')})`,
                    width: getVar('top-w', '864px'),
                    marginBottom: '60px',
                    lineHeight: getVar('top-lh', '47px')
                }}>
                    <p style={{ margin: 0, fontFamily: 'var(--font-canva)', fontSize: getVar('top-size', '37px'), color: 'rgb(11, 14, 33)', lineHeight: 'inherit' }}>
                        {slideData.topText?.split('\n').map((line, i) => (
                            <React.Fragment key={i}>
                                {line}<br />
                            </React.Fragment>
                        ))}
                    </p>
                </div>

                <div className="extinction-bottom-text" style={{
                    position: viewId.includes('extincao-content') ? 'relative' : 'absolute',
                    top: viewId.includes('extincao-content') ? '0' : `calc(${getVar('bot-top', '400px')} - ${getVar('text-top', '1050px')})`,
                    left: viewId.includes('extincao-content') ? '0' : `calc(${getVar('bot-left', '108px')} - ${getVar('text-left', '108px')})`,
                    width: getVar('bot-w', '864px'),
                    lineHeight: getVar('bot-lh', '47px')
                }}>
                    <p style={{ margin: 0, fontFamily: 'var(--font-canva)', fontSize: getVar('bot-size', '37px'), color: 'rgb(11, 14, 33)', lineHeight: 'inherit' }}>
                        {slideData.bottomText?.split('\n').map((line, i) => {
                            const highlightPhrase = '85% de todas as espécies';
                            if (line.includes(highlightPhrase)) {
                                const parts = line.split(new RegExp(`(${highlightPhrase})`, 'g'));
                                return (
                                    <React.Fragment key={i}>
                                        {parts.map((part, j) => (
                                            part === highlightPhrase ? (
                                                <span key={j} style={{ color: 'var(--color-primary-blue)', fontWeight: 'bold' }}>
                                                    {part}
                                                </span>
                                            ) : part
                                        ))}
                                        <br />
                                    </React.Fragment>
                                );
                            }
                            return (
                                <React.Fragment key={i}>
                                    {line}<br />
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
