import React from 'react';

export const formatSpecies = (str) => {
    if (!str || typeof str !== 'string') return str;
    const parts = str.split(/(sp\.)/gi);
    return parts.map((part, index) => {
        if (part.toLowerCase() === 'sp.') {
            return <span key={index} style={{ fontStyle: 'normal' }}>{part}</span>;
        }
        return part;
    });
};
