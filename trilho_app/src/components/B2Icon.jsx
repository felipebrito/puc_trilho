import React from 'react';

const B2Icon = ({ className }) => (
    <div className={className} style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ffffff',
        textTransform: 'uppercase'
    }}>
        <div style={{ fontFamily: 'Blender Pro Heavy, sans-serif', fontSize: '64px', fontWeight: 900, lineHeight: 0.85, letterSpacing: '2px', textAlign: 'center', color: '#ffffff' }}>
            PRESSIONE
        </div>
        <div style={{ fontFamily: 'Canva Sans Regular, sans-serif', fontSize: '44px', fontWeight: 400, lineHeight: 1, paddingLeft: '0', textAlign: 'center', marginTop: '5px', color: '#ffffff' }}>
            para acessar
        </div>
    </div>
);

export default B2Icon;
