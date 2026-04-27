import React, { useEffect, useRef } from 'react';
import './BackgroundVideo.css';

const BackgroundVideo = ({ src, variant = 'full', children }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 0.8; // default to slightly slower for ambient feel
        }
    }, []);

    return (
        <div className={`video-container variant-${variant}`}>
            {src && (src.match(/\.(jpeg|jpg|gif|png)$/) != null ? (
                <img src={src} className="bg-video" alt="background" />
            ) : (
                <video
                    ref={videoRef}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="bg-video"
                >
                    <source src={src} type="video/mp4" />
                    Seu navegador não suporta vídeos.
                </video>
            ))}
            <div className="video-overlay"></div>
            <div className="video-content">
                {children}
            </div>
        </div>
    );
};

export default BackgroundVideo;
