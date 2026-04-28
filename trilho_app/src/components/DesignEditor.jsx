import React, { useState, useEffect } from 'react';

const cssConfigs = {
    'ordoviciano-home': [
        { label: 'Titles Margin Top', prop: '--ordovician-titles-mt', value: 516, min: 0, max: 1000, suffix: 'px' },
        { label: 'Subtitle Size', prop: '--ordovician-subtitle-size', value: 73, min: 10, max: 200, suffix: 'px' },
        { label: 'Subtitle Spacing', prop: '--ordovician-subtitle-spacing', value: 7.8, min: -10, max: 50, suffix: 'px' },
        { label: 'Subtitle MB', prop: '--ordovician-subtitle-mb', value: 0, min: -50, max: 100, suffix: 'px' },
        { label: 'Title Size', prop: '--ordovician-title-size', value: 143, min: 10, max: 300, suffix: 'px' },
        { label: 'Title Spacing', prop: '--ordovician-title-spacing', value: 9.7, min: -10, max: 50, suffix: 'px' },
        { label: 'Title Line Height', prop: '--ordovician-title-lh', value: 0.9, min: 0.1, max: 3, suffix: '' },
        { label: 'Title MT', prop: '--ordovician-title-mt', value: -18, min: -150, max: 150, suffix: 'px' },
        { label: 'Title MB', prop: '--ordovician-title-mb', value: 62, min: -150, max: 150, suffix: 'px' },
        { label: 'Title ML', prop: '--ordovician-title-ml', value: -5, min: -100, max: 100, suffix: 'px' },
        { label: 'Desc Size', prop: '--ordovician-desc-size', value: 90, min: 10, max: 200, suffix: 'px' },
        { label: 'Desc Width', prop: '--ordovician-desc-w', value: 900, min: 100, max: 1080, suffix: 'px' },
        { label: 'Desc MT', prop: '--ordovician-desc-mt', value: 90, min: -150, max: 250, suffix: 'px' },
        { label: 'Desc Spacing', prop: '--ordovician-desc-spacing', value: -5, min: -20, max: 20, suffix: 'px' },
        { label: 'Desc MB', prop: '--ordovician-desc-mb', value: -8, min: -100, max: 100, suffix: 'px' },
        { label: 'SubDesc Size', prop: '--ordovician-subdesc-size', value: 50, min: 10, max: 200, suffix: 'px' },
        { label: 'SubDesc Width', prop: '--ordovician-subdesc-w', value: 823, min: 100, max: 1080, suffix: 'px' },
        { label: 'Menu Top', prop: '--ordovician-menu-top', value: 1357, min: 0, max: 1920, suffix: 'px' },
        { label: 'Menu Left', prop: '--ordovician-menu-left', value: 102, min: 0, max: 1080, suffix: 'px' },
        { label: 'Menu Gap', prop: '--ordovician-menu-gap', value: 21, min: 0, max: 150, suffix: 'px' }
    ],
    'devoniano-home': [
        { label: 'Titles Margin Top', prop: '--devonian-titles-mt', value: 430, min: 0, max: 1000, suffix: 'px' },
        { label: 'Subtitle Size', prop: '--devonian-subtitle-size', value: 73, min: 10, max: 200, suffix: 'px' },
        { label: 'Subtitle Spacing', prop: '--devonian-subtitle-spacing', value: 7.8, min: -10, max: 50, suffix: 'px' },
        { label: 'Subtitle MB', prop: '--devonian-subtitle-mb', value: 0, min: -50, max: 100, suffix: 'px' },
        { label: 'Title Size', prop: '--devonian-title-size', value: 143, min: 10, max: 300, suffix: 'px' },
        { label: 'Title Spacing', prop: '--devonian-title-spacing', value: 9.7, min: -10, max: 50, suffix: 'px' },
        { label: 'Title Line Height', prop: '--devonian-title-lh', value: 0.9, min: 0.1, max: 3, suffix: '' },
        { label: 'Title MT', prop: '--devonian-title-mt', value: -16, min: -150, max: 150, suffix: 'px' },
        { label: 'Title MB', prop: '--devonian-title-mb', value: 62, min: -150, max: 150, suffix: 'px' },
        { label: 'Title ML', prop: '--devonian-title-ml', value: -5, min: -100, max: 100, suffix: 'px' },
        { label: 'Desc Size', prop: '--devonian-desc-size', value: 90, min: 10, max: 200, suffix: 'px' },
        { label: 'Desc MT', prop: '--devonian-desc-mt', value: 0, min: -150, max: 150, suffix: 'px' },
        { label: 'Desc Spacing', prop: '--devonian-desc-spacing', value: -5, min: -20, max: 20, suffix: 'px' },
        { label: 'Desc MB', prop: '--devonian-desc-mb', value: 9, min: -50, max: 100, suffix: 'px' },
        { label: 'SubDesc Size', prop: '--devonian-subdesc-size', value: 50, min: 10, max: 200, suffix: 'px' },
        { label: 'Menu Top', prop: '--devonian-menu-top', value: 1357, min: 0, max: 1920, suffix: 'px' },
        { label: 'Menu Left', prop: '--devonian-menu-left', value: 102, min: 0, max: 1080, suffix: 'px' },
        { label: 'Menu Gap', prop: '--devonian-menu-gap', value: 21, min: 0, max: 150, suffix: 'px' }
    ],
    'devoniano-bio-intro': createDevonianoIntroConfig('bio', { 
        headerTop: 62, 
        labelTop: -5,
        nameTop: 39,
        nameSize: 61,
        bodyTop: 638, 
        headingTop: -29,
        headingSize: 105, 
        headingLH: 0.95,
        lineDisplay: 0 
    }),
    'devoniano-extincao-intro': createDevonianoIntroConfig('ext', {
        bgOpacity: 1,
        headerTop: 62,
        nameTop: 37,
        bodyTop: 643,
        headingW: 699,
        headingSpacing: 4,
        headingLH: 1.15
    }),
    'devoniano-extincao-ambientes': [
        { label: 'Header Top', prop: '--dev-ext-amb-header-top', value: -85, min: -200, max: 200, suffix: 'px' },
        { label: 'Images Gap', prop: '--dev-ext-amb-gap', value: 78, min: 0, max: 200, suffix: 'px' },
        { label: 'Image Height', prop: '--dev-ext-amb-img-h', value: 599, min: 100, max: 1000, suffix: 'px' },
        { label: 'Caption Padding V', prop: '--dev-ext-amb-cap-pv', value: 30, min: 0, max: 200, suffix: 'px' },
        { label: 'Desc Width', prop: '--dev-ext-amb-desc-w', value: 820, min: 100, max: 1080, suffix: 'px' },
        { label: 'Desc Left', prop: '--dev-ext-amb-desc-left', value: 59, min: 0, max: 500, suffix: 'px' },
        { label: 'Desc Size', prop: '--dev-ext-amb-desc-size', value: 37, min: 10, max: 100, suffix: 'px' },
        { label: 'Desc LH', prop: '--dev-ext-amb-desc-lh', value: 1.35, min: 0.5, max: 2.5, suffix: '' },
    ],
    'devoniano-pos-extincao-intro': createDevonianoIntroConfig('pos', {
        bgOpacity: 1,
        headerTop: 1238,
        labelTop: -30,
        bodyTop: 599
    }),
    'devoniano-pos-extincao-globe': createDevonianoGlobeConfig('pos-glob', {
        headerTop: -61,
        globMt: 61,
        descMt: 92,
        descLH: 47
    }),
    'devoniano-pos-extincao-summary': createDevonianoGlobeConfig('pos-sum', {
        headerTop: -61,
        globMt: 61,
        descMt: 92,
        descLH: 47
    }),
    'devoniano-bio-dunkleosteus': createDevonianoSpecimenConfig('dunk', { subW: 590, nameSize: 83, descSize: 40 }),
    'devoniano-bio-campbellodus': createDevonianoSpecimenConfig('campbell', { subW: 657, descMt: 127, descW: 802 }),
    'devoniano-bio-ctenacanthus': createDevonianoSpecimenConfig('ctenacanthus', { subW: 802, descMt: 128, descW: 921 }),
    'devoniano-bio-gogonasus': createDevonianoSpecimenConfig('gogonasus', { subW: 641, descMt: 125, descW: 881 }),
    'devoniano-bio-griphognatus': createDevonianoSpecimenConfig('griphognatus', { subW: 858, descMt: 127, descW: 887 }),
    'devoniano-bio-furcaster': createDevonianoSpecimenConfig('furcaster', { subW: 831, descMt: 126, descW: 910 }),
    'devoniano-bio-palaeoisopus': createDevonianoSpecimenConfig('palaeoisopus', { subW: 755, descMt: 81, descW: 866 }),
    'devoniano-bio-archaeopteris': createDevonianoSpecimenConfig('archaeopteris', { subMt: 87, subW: 735, descMt: 150, descW: 898, descLH: 48 }),
    'devoniano-bio-tiktaalik': createDevonianoSpecimenConfig('tiktaalik', { subW: 590, descMt: -11, descW: 915, descLH: 48 }),
    'devoniano-bio-ichthyostega': createDevonianoSpecimenConfig('ichthyostega', { nameMt: 67, nameSize: 86, subW: 935, descMt: -33, descW: 869, descLH: 47 }),
    'devoniano-bio-drepanophycus': createDevonianoSpecimenConfig('drepanophycus', { subMt: 78, subW: 834, descMt: 124, descW: 870, descLH: 50 }),
    
    // Ordoviciano
    'ordoviciano-bio-intro': createDevonianoIntroConfig('ord-bio', { 
        bodyTop: 937, 
        bodyW: 651,
        headingTop: -62, 
        headingSize: 100,
        headingW: 805, 
        headingSpacing: -1,
        headingLH: 1.05 
    }),
    'ordoviciano-bio-homotelus': createDevonianoSpecimenConfig('ord-homotelus', {
        subMt: 40,
        descMt: 82,
        descW: 880
    }),
    'ordoviciano-bio-cameroceras': createDevonianoSpecimenConfig('ord-cameroceras', {
        subMt: 38,
        subW: 790,
        descMt: 69,
        descW: 798
    }),
    'ordoviciano-bio-megalograptus': createDevonianoSpecimenConfig('ord-megalograptus', {
        subMt: 40,
        subW: 719,
        descMt: 66,
        bgScale: 1.1,
        bgX: 50
    }),
    'ordoviciano-bio-balacrinus': createDevonianoSpecimenConfig('ord-balacrinus', {
        subMt: 45,
        subW: 776,
        descMt: 60,
        descW: 893
    }),
    'ordoviciano-bio-sacabambaspis': createDevonianoSpecimenConfig('ord-sacabambaspis', {
        descMt: 73,
        descW: 904
    }),
    'ordoviciano-bio-promissum': createDevonianoSpecimenConfig('ord-promissum', {
        descMt: 47,
        descW: 916
    }),
    'ordoviciano-bio-sowerbyella': createDevonianoSpecimenConfig('ord-sowerbyella', {
        subMt: 42,
        subW: 683,
        descMt: 62,
        descW: 804
    }),
    'ordoviciano-extincao-intro': createDevonianoIntroConfig('ord-ext'),
    'ordoviciano-pos-intro': createDevonianoIntroConfig('ord-pos'),

    'ordoviciano-pos-dalmanites': createDevonianoSpecimenConfig('dalmanites', {
        nameMt: 20,
        subMt: 29,
        subSize: 47,
        subW: 1070,
        descMt: -9,
        descLH: 48,
        bgH: 45,
        bgTop: 304,
        bgY: -257,
        whiteMt: 926,
        seloTop: 543,
        topTextTop: 181
    }),
    'ordoviciano-pos-globe': createDevonianoGlobeConfig('ord-glob', {
        headerTop: -61,
        globMt: 61,
        globW: 1080,
        globH: 629,
        descMt: 104,
        descW: 903,
        descLeft: 20,
        descSize: 38.5,
        descLH: 45,
        lineMt: 29
    }),
    'ordoviciano-pos-halysites': createDevonianoSpecimenConfig('halysites'),
    'ordoviciano-pos-cooksonia': createDevonianoSpecimenConfig('cooksonia'),
    'ordoviciano-pos-atrypa': createDevonianoSpecimenConfig('atrypa'),

    // Carbonífero
    'devoniano-pos-carbon-meganeura': createDevonianoSpecimenConfig('meganeura'),
    'devoniano-pos-carbon-stethacanthus': createDevonianoSpecimenConfig('stethacanthus'),
    'devoniano-pos-carbon-arthropleura': createDevonianoSpecimenConfig('arthropleura'),
    'devoniano-pos-carbon-amphibamus': createDevonianoSpecimenConfig('amphibamus'),
    'devoniano-pos-carbon-sphenophyllum': createDevonianoSpecimenConfig('sphenophyllum'),
    'devoniano-pos-carbon-calamites': createDevonianoSpecimenConfig('calamites'),
    'devoniano-pos-carbon-cordaites': createDevonianoSpecimenConfig('cordaites'),
    'devoniano-pos-carbon-sigillaria': createDevonianoSpecimenConfig('sigillaria'),
};

function createDevonianoIntroConfig(sectionPrefix, overrides = {}) {
    return [
        { label: 'BG Opacity', prop: `--dev-${sectionPrefix}-bg-opacity`, value: overrides.bgOpacity ?? 0.47, min: 0, max: 1, suffix: '' },
        { label: 'Header Top', prop: `--dev-${sectionPrefix}-header-top`, value: overrides.headerTop ?? 66, min: 0, max: 1500, suffix: 'px' },
        { label: 'Header Left', prop: `--dev-${sectionPrefix}-header-left`, value: overrides.headerLeft ?? 0, min: 0, max: 1500, suffix: 'px' },
        { label: 'Label Top', prop: `--dev-${sectionPrefix}-label-top`, value: overrides.labelTop ?? -5, min: -100, max: 100, suffix: 'px' },
        { label: 'Label Left', prop: `--dev-${sectionPrefix}-label-left`, value: overrides.labelLeft ?? 41, min: -100, max: 500, suffix: 'px' },
        { label: 'Label Size', prop: `--dev-${sectionPrefix}-label-size`, value: overrides.labelSize ?? 30, min: 10, max: 100, suffix: 'px' },
        { label: 'Label Spacing', prop: `--dev-${sectionPrefix}-label-spacing`, value: overrides.labelSpacing ?? 6, min: 0, max: 50, suffix: 'px' },
        { label: 'Name Top', prop: `--dev-${sectionPrefix}-name-top`, value: overrides.nameTop ?? 36, min: -100, max: 200, suffix: 'px' },
        { label: 'Name Left', prop: `--dev-${sectionPrefix}-name-left`, value: overrides.nameLeft ?? 36, min: -100, max: 500, suffix: 'px' },
        { label: 'Name Size', prop: `--dev-${sectionPrefix}-name-size`, value: overrides.nameSize ?? 60, min: 10, max: 200, suffix: 'px' },
        { label: 'Name Spacing', prop: `--dev-${sectionPrefix}-name-spacing`, value: overrides.nameSpacing ?? 3, min: 0, max: 50, suffix: 'px' },
        { label: 'Underline Display', prop: `--dev-${sectionPrefix}-line-display`, value: overrides.lineDisplay ?? 0, min: 0, max: 1, suffix: '' },
        { label: 'Body Top', prop: `--dev-${sectionPrefix}-body-top`, value: overrides.bodyTop ?? 599, min: 0, max: 1500, suffix: 'px' },
        { label: 'Body Left', prop: `--dev-${sectionPrefix}-body-left`, value: overrides.bodyLeft ?? 36, min: 0, max: 500, suffix: 'px' },
        { label: 'Body Width', prop: `--dev-${sectionPrefix}-body-w`, value: overrides.bodyW ?? 900, min: 100, max: 1080, suffix: 'px' },
        { label: 'Heading Top', prop: `--dev-${sectionPrefix}-heading-top`, value: overrides.headingTop ?? 0, min: -200, max: 500, suffix: 'px' },
        { label: 'Heading Left', prop: `--dev-${sectionPrefix}-heading-left`, value: overrides.headingLeft ?? 0, min: -200, max: 500, suffix: 'px' },
        { label: 'Heading Size', prop: `--dev-${sectionPrefix}-heading-size`, value: overrides.headingSize ?? 96, min: 20, max: 300, suffix: 'px' },
        { label: 'Heading Width', prop: `--dev-${sectionPrefix}-heading-w`, value: overrides.headingW ?? 900, min: 100, max: 1080, suffix: 'px' },
        { label: 'Heading Spacing', prop: `--dev-${sectionPrefix}-heading-spacing`, value: overrides.headingSpacing ?? 0, min: -10, max: 50, suffix: 'px' },
        { label: 'Heading LH', prop: `--dev-${sectionPrefix}-heading-lh`, value: overrides.headingLH ?? 1.05, min: 0.1, max: 2, suffix: '' },
    ];
}

function createDevonianoGlobeConfig(prefix, defaults = {}) {
    return [
        { label: 'Header Top', prop: `--dev-${prefix}-header-top`, value: defaults.headerTop ?? 0, min: -100, max: 200, suffix: 'px' },
        { label: 'Globe MT', prop: `--dev-${prefix}-glob-mt`, value: defaults.globMt ?? 0, min: -100, max: 300, suffix: 'px' },
        { label: 'Globe Width', prop: `--dev-${prefix}-glob-w`, value: defaults.globW ?? 1080, min: 200, max: 1500, suffix: 'px' },
        { label: 'Globe Height', prop: `--dev-${prefix}-glob-h`, value: defaults.globH ?? 600, min: 200, max: 1000, suffix: 'px' },
        { label: 'Description MT', prop: `--dev-${prefix}-glob-desc-mt`, value: defaults.descMt ?? 60, min: -200, max: 400, suffix: 'px' },
        { label: 'Desc Width', prop: `--dev-${prefix}-glob-desc-w`, value: defaults.descW ?? 930, min: 500, max: 1080, suffix: 'px' },
        { label: 'Desc Left', prop: `--dev-${prefix}-glob-desc-left`, value: defaults.descLeft ?? 20, min: -100, max: 500, suffix: 'px' },
        { label: 'Desc Size', prop: `--dev-${prefix}-glob-desc-size`, value: defaults.descSize ?? 38.5, min: 10, max: 100, suffix: 'px' },
        { label: 'Desc LH', prop: `--dev-${prefix}-glob-desc-lh`, value: defaults.descLH ?? 47, min: 10, max: 150, suffix: 'px' },
    ];
}
function createDevonianoSpecimenConfig(id, overrides = {}) {
    return [
        // 1. Nome (Título)
        { label: 'Name MT', prop: `--devonian-${id}-name-mt`, value: overrides.nameMt || 96, min: -200, max: 500, suffix: 'px' },
        { label: 'Name ML', prop: `--devonian-${id}-name-ml`, value: 0, min: -200, max: 500, suffix: 'px' },
        { label: 'Name Size', prop: `--devonian-${id}-name-size`, value: overrides.nameSize || 83, min: 20, max: 150, suffix: 'px' },

        // 2. Subtítulo
        { label: 'Sub MT', prop: `--devonian-${id}-sub-mt`, value: overrides.subMt || 51, min: -200, max: 500, suffix: 'px' },
        { label: 'Sub ML', prop: `--devonian-${id}-sub-ml`, value: 0, min: -200, max: 500, suffix: 'px' },
        { label: 'Sub Width', prop: `--devonian-${id}-sub-w`, value: overrides.subW || 590, min: 100, max: 1080, suffix: 'px' },
        { label: 'Sub Size', prop: `--devonian-${id}-sub-size`, value: 56, min: 20, max: 150, suffix: 'px' },

        // 3. Descrição
        { label: 'Desc MT', prop: `--devonian-${id}-desc-mt`, value: overrides.descMt || 96, min: -200, max: 800, suffix: 'px' },
        { label: 'Desc ML', prop: `--devonian-${id}-desc-ml`, value: 0, min: -200, max: 500, suffix: 'px' },
        { label: 'Desc Width', prop: `--devonian-${id}-desc-w`, value: overrides.descW || 752, min: 100, max: 1080, suffix: 'px' },
        { label: 'Desc Size', prop: `--devonian-${id}-desc-size`, value: overrides.descSize || 40, min: 10, max: 100, suffix: 'px' },
        { label: 'Desc LH', prop: `--devonian-${id}-desc-lh`, value: overrides.descLH || 50, min: 10, max: 150, suffix: 'px' },

        // 4. Fundo (BG)
        { label: 'BG Height', prop: `--devonian-${id}-bg-h`, value: overrides.bgH || 42, min: 20, max: 100, suffix: '%' },
        { label: 'BG Top', prop: `--devonian-${id}-bg-top`, value: overrides.bgTop || 0, min: -500, max: 1000, suffix: 'px' },
        { label: 'BG Scale', prop: `--devonian-${id}-bg-scale`, value: overrides.bgScale || 1, min: 0.5, max: 3, suffix: '' },
        { label: 'BG X', prop: `--devonian-${id}-bg-x`, value: overrides.bgX || 0, min: -1000, max: 1000, suffix: 'px' },
        { label: 'BG Y', prop: `--devonian-${id}-bg-y`, value: overrides.bgY || 0, min: -1000, max: 1000, suffix: 'px' },

        // 5. Área Branca
        { label: 'White Top H', prop: `--devonian-${id}-white-h`, value: 34, min: 20, max: 80, suffix: '%' },
        { label: 'White Area MT', prop: `--devonian-${id}-white-mt`, value: 38, min: -200, max: 500, suffix: 'px' },

        // 6. Corte (Cut)
        { label: 'Cut Y', prop: `--devonian-${id}-cut-y`, value: 40, min: 0, max: 200, suffix: 'px' },
        { label: 'Cut X1', prop: `--devonian-${id}-cut-x1`, value: 250, min: 0, max: 1080, suffix: 'px' },
        { label: 'Cut X2', prop: `--devonian-${id}-cut-x2`, value: 280, min: 0, max: 1080, suffix: 'px' },

        // 7. Texto de Topo (Siluriano)
        { label: 'TopText Top', prop: `--devonian-${id}-toptext-top`, value: 80, min: 0, max: 1000, suffix: 'px' },
        { label: 'TopText Left', prop: `--devonian-${id}-toptext-left`, value: 108, min: 0, max: 1000, suffix: 'px' },
        { label: 'TopText Width', prop: `--devonian-${id}-toptext-w`, value: 864, min: 200, max: 1080, suffix: 'px' },
        { label: 'TopText Size', prop: `--devonian-${id}-toptext-size`, value: 38, min: 10, max: 100, suffix: 'px' },

        // 8. Selo (Sempre por último)
        { label: 'Selo Width', prop: `--devonian-${id}-selo-w`, value: 862, min: 50, max: 1500, suffix: 'px' },
        { label: 'Selo Top', prop: `--devonian-${id}-selo-top`, value: 799, min: -200, max: 1500, suffix: 'px' },
        { label: 'Selo Left', prop: `--devonian-${id}-selo-left`, value: 0, min: -200, max: 1080, suffix: 'px' },
    ];
}

const DesignEditor = ({ referenceImage, viewKey }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [opacity, setOpacity] = useState(0.5);
    const [variables, setVariables] = useState({});

    // Load configs based on viewKey
    const currentConfig = cssConfigs[viewKey] || [];

    useEffect(() => {
        // Initialize default values
        const initialVars = {};
        currentConfig.forEach(cfg => {
            initialVars[cfg.prop] = cfg.value;
            document.documentElement.style.setProperty(cfg.prop, `${cfg.value}${cfg.suffix}`);
        });
        setVariables(initialVars);
    }, [viewKey]);

    const handleVarChange = (prop, value, suffix) => {
        setVariables(prev => ({ ...prev, [prop]: value }));
        document.documentElement.style.setProperty(prop, `${value}${suffix}`);
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'e' || e.key === 'E') {
                setIsVisible(prev => !prev);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    if (!isVisible) return null;

    return (
        <>
            {/* Reference Overlay */}
            {referenceImage && (
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '1080px',
                        height: '1920px',
                        backgroundImage: `url('${referenceImage}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        opacity: opacity,
                        pointerEvents: 'none',
                        zIndex: 9998
                    }}
                />
            )}

            {/* Controls Panel */}
            <div
                style={{
                    position: 'absolute',
                    top: '20px',
                    left: '20px',
                    background: 'rgba(0,0,0,0.85)',
                    padding: '20px',
                    borderRadius: '8px',
                    color: 'white',
                    zIndex: 9999,
                    fontFamily: 'sans-serif',
                    width: '320px',
                    maxHeight: '90vh',
                    overflowY: 'auto'
                }}
                onKeyDown={(e) => e.stopPropagation()} 
            >
                <h3 style={{ margin: '0 0 15px 0', fontSize: '16px' }}>Design Editor ({viewKey})</h3>
                
                <div style={{ marginBottom: '20px', paddingBottom: '15px', borderBottom: '1px solid #444' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>
                        Opacidade Ref: {Math.round(opacity * 100)}%
                    </label>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={opacity}
                        onChange={(e) => setOpacity(parseFloat(e.target.value))}
                        style={{ width: '100%' }}
                    />
                </div>

                {currentConfig.map(cfg => (
                    <div key={cfg.prop} style={{ marginBottom: '15px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                            <label style={{ fontSize: '13px' }}>{cfg.label}</label>
                            <span style={{ fontSize: '13px', color: '#4ade80' }}>
                                {variables[cfg.prop] ?? cfg.value}{cfg.suffix}
                            </span>
                        </div>
                        <input
                            type="range"
                            min={cfg.min}
                            max={cfg.max}
                            step={cfg.suffix === '' ? 0.05 : 1}
                            value={variables[cfg.prop] ?? cfg.value}
                            onChange={(e) => handleVarChange(cfg.prop, parseFloat(e.target.value), cfg.suffix)}
                            style={{ width: '100%' }}
                        />
                    </div>
                ))}

                <button 
                    onClick={() => {
                        const cssString = currentConfig.map(cfg => `${cfg.prop}: ${variables[cfg.prop]}${cfg.suffix};`).join('\n');
                        navigator.clipboard.writeText(cssString);
                        alert('CSS copiado!');
                    }}
                    style={{
                        marginTop: '10px', width: '100%', padding: '10px', background: '#4ade80', color: '#000', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold'
                    }}
                >
                    Copiar CSS
                </button>
            </div>
        </>
    );
};

export default DesignEditor;
