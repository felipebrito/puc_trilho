import React, { useEffect, useState } from 'react';

const ScaleWrapper = ({ children }) => {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const scaleX = window.innerWidth / 1080;
      const scaleY = window.innerHeight / 1920;
      setScale(Math.min(scaleX, scaleY));
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'var(--color-bg-dark)',
      overflow: 'hidden'
    }}>
      <div style={{
        width: 1080,
        height: 1920,
        flexShrink: 0,
        transform: `scale(${scale})`,
        transformOrigin: 'center',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {children}
      </div>
    </div>
  );
};

export default ScaleWrapper;
