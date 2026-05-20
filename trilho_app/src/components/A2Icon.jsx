import React from 'react';

const A2Icon = ({ className }) => (
    <div className={className} style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ffffff',
        textTransform: 'uppercase'
    }}>
        <div style={{ fontFamily: 'Blender Pro Heavy, sans-serif', fontSize: '80px', fontWeight: 900, lineHeight: 0.85, letterSpacing: '2px', textAlign: 'center', color: '#ffffff' }}>
            GIRE
        </div>
        <div style={{ fontFamily: 'Canva Sans Regular, sans-serif', fontSize: '56px', fontWeight: 400, lineHeight: 1, paddingLeft: '0', textAlign: 'center', marginTop: '8px', color: '#ffffff' }}>
            para escolher
        </div>
    </div>
);

export default A2Icon;
