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
        bodyLH: 1.3,
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
    'ordoviciano-extincao-intro': createDevonianoIntroConfig('ord-ext', {
        headerTop: 66,
        headerLeft: 0,
        labelTop: -5,
        labelLeft: 41,
        labelSize: 30,
        labelSpacing: 6,
        nameTop: 36,
        nameLeft: 36,
        nameSize: 60,
        nameSpacing: 3,
        headingTop: -259,
        headingLeft: 0,
        headingSize: 100,
        headingW: 466,
        headingSpacing: -1,
        headingLH: 1.05,
        bodyTop: 507,
        bodyLeft: 36,
        bodyW: 819,
        bodyLH: 1.25,
        bgOpacity: 1,
        lineDisplay: 0
    }),
    'ordoviciano-extincao-content': createDevonianoExtinctionConfig('ext', {
        imageTop: 0,
        imageHeight: 920,
        imageScale: 1.2,
        captionTop: 874,
        captionLeft: 75,
        captionSize: 27,
        captionW: 900,
        lineTop: 978,
        lineLeft: 97,
        lineW: 890,
        textTop: 1081,
        textLeft: 90,
        textW: 760,
        textLH: 46
    }),
    'ordoviciano-pos-intro': createDevonianoIntroConfig('ord-pos', {
        headerTop: 1534,
        headerLeft: 0,
        labelTop: -5,
        labelLeft: 41,
        labelSize: 30,
        labelSpacing: 6,
        nameTop: 36,
        nameLeft: 36,
        nameSize: 60,
        nameSpacing: 3,
        headingTop: -191,
        headingLeft: 0,
        headingSize: 116,
        headingW: 900,
        headingSpacing: 0,
        headingLH: 1.05,
        bodyTop: 755,
        bodyLeft: 36,
        bodyW: 817,
        bodyLH: 1.3,
        bgOpacity: 0.8,
        lineDisplay: 0
    }),
    'ordoviciano-pos-globe': createDevonianoGlobeConfig('ord-glob', {
        headerTitle: 'E DEPOIS?',
        headerTop: -61,
        globMt: 61,
        globW: 1080,
        globH: 629,
        descMt: 104,
        descW: 903,
        descSize: 38.5,
        descLH: 45,
        lineMt: 29
    }),

    'ordoviciano-pos-dalmanites': createDevonianoSpecimenConfig('dalmanites', {
        nameMt: 20,
        nameMl: 0,
        nameSize: 83,
        subMt: 29,
        subMl: 0,
        subW: 1070,
        subSize: 47,
        descMt: -9,
        descMl: 0,
        descW: 951,
        descSize: 36,
        descLH: 48,
        bgH: 45,
        bgTop: 304,
        bgY: -257,
        whiteMt: 926,
        seloTop: 543,
        topTextTop: 181,
        topTextLeft: 108,
        topTextW: 864,
        topTextSize: 38
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

function createDevonianoExtinctionConfig(sectionPrefix, overrides = {}) {
    return [
        { label: 'Image Top', prop: `--dev-${sectionPrefix}-img-top`, value: overrides.imageTop ?? 123.81, min: 0, max: 1000, suffix: 'px' },
        { label: 'Image Height', prop: `--dev-${sectionPrefix}-img-h`, value: overrides.imageHeight ?? 700, min: 100, max: 1500, suffix: 'px' },
        { label: 'Image Scale', prop: `--dev-${sectionPrefix}-img-scale`, value: overrides.imageScale ?? 1, min: 0.5, max: 3, suffix: '' },
        
        { label: 'Caption Top', prop: `--dev-${sectionPrefix}-caption-top`, value: overrides.captionTop ?? 860, min: 0, max: 1920, suffix: 'px' },
        { label: 'Caption Left', prop: `--dev-${sectionPrefix}-caption-left`, value: overrides.captionLeft ?? 108, min: 0, max: 1080, suffix: 'px' },
        { label: 'Caption Size', prop: `--dev-${sectionPrefix}-caption-size`, value: overrides.captionSize ?? 26, min: 10, max: 100, suffix: 'px' },
        { label: 'Caption Width', prop: `--dev-${sectionPrefix}-caption-w`, value: overrides.captionW ?? 900, min: 100, max: 1080, suffix: 'px' },
        
        { label: 'Line Top', prop: `--dev-${sectionPrefix}-line-top`, value: overrides.lineTop ?? 960, min: 0, max: 1920, suffix: 'px' },
        { label: 'Line Left', prop: `--dev-${sectionPrefix}-line-left`, value: overrides.lineLeft ?? 108, min: 0, max: 1080, suffix: 'px' },
        { label: 'Line Width', prop: `--dev-${sectionPrefix}-line-w`, value: overrides.lineW ?? 890, min: 10, max: 1080, suffix: 'px' },
        
        { label: 'Text Top', prop: `--dev-${sectionPrefix}-text-top`, value: overrides.textTop ?? 1050, min: 0, max: 1920, suffix: 'px' },
        { label: 'Text Left', prop: `--dev-${sectionPrefix}-text-left`, value: overrides.textLeft ?? 108, min: 0, max: 500, suffix: 'px' },
        { label: 'Text Width', prop: `--dev-${sectionPrefix}-text-w`, value: overrides.textW ?? 864, min: 100, max: 1080, suffix: 'px' },
        { label: 'Text LH', prop: `--dev-${sectionPrefix}-text-lh`, value: overrides.textLH ?? 47, min: 10, max: 100, suffix: 'px' },
    ];
}

function createDevonianoIntroConfig(sectionPrefix, overrides = {}) {
    return [
        // 1. Header (Labels e Nome do Período)
        { label: 'Header Top', prop: `--dev-${sectionPrefix}-header-top`, value: overrides.headerTop ?? 66, min: 0, max: 2000, suffix: 'px' },
        { label: 'Header Left', prop: `--dev-${sectionPrefix}-header-left`, value: overrides.headerLeft ?? 0, min: 0, max: 2000, suffix: 'px' },
        { label: 'Label Top', prop: `--dev-${sectionPrefix}-label-top`, value: overrides.labelTop ?? -5, min: -100, max: 100, suffix: 'px' },
        { label: 'Label Left', prop: `--dev-${sectionPrefix}-label-left`, value: overrides.labelLeft ?? 41, min: -100, max: 500, suffix: 'px' },
        { label: 'Label Size', prop: `--dev-${sectionPrefix}-label-size`, value: overrides.labelSize ?? 30, min: 10, max: 100, suffix: 'px' },
        { label: 'Label Spacing', prop: `--dev-${sectionPrefix}-label-spacing`, value: overrides.labelSpacing ?? 6, min: 0, max: 50, suffix: 'px' },
        { label: 'Name Top', prop: `--dev-${sectionPrefix}-name-top`, value: overrides.nameTop ?? 36, min: -100, max: 200, suffix: 'px' },
        { label: 'Name Left', prop: `--dev-${sectionPrefix}-name-left`, value: overrides.nameLeft ?? 36, min: -100, max: 500, suffix: 'px' },
        { label: 'Name Size', prop: `--dev-${sectionPrefix}-name-size`, value: overrides.nameSize ?? 60, min: 10, max: 200, suffix: 'px' },
        { label: 'Name Spacing', prop: `--dev-${sectionPrefix}-name-spacing`, value: overrides.nameSpacing ?? 3, min: 0, max: 50, suffix: 'px' },

        // 2. Heading (Título da Seção)
        { label: 'Heading Top', prop: `--dev-${sectionPrefix}-heading-top`, value: overrides.headingTop ?? 0, min: -800, max: 800, suffix: 'px' },
        { label: 'Heading Left', prop: `--dev-${sectionPrefix}-heading-left`, value: overrides.headingLeft ?? 0, min: -200, max: 500, suffix: 'px' },
        { label: 'Heading Size', prop: `--dev-${sectionPrefix}-heading-size`, value: overrides.headingSize ?? 96, min: 20, max: 300, suffix: 'px' },
        { label: 'Heading Width', prop: `--dev-${sectionPrefix}-heading-w`, value: overrides.headingW ?? 900, min: 100, max: 1080, suffix: 'px' },
        { label: 'Heading Spacing', prop: `--dev-${sectionPrefix}-heading-spacing`, value: overrides.headingSpacing ?? 0, min: -10, max: 50, suffix: 'px' },
        { label: 'Heading LH', prop: `--dev-${sectionPrefix}-heading-lh`, value: overrides.headingLH ?? 1.05, min: 0.1, max: 2, suffix: '' },

        // 3. Body (Texto de Descrição)
        { label: 'Body Top', prop: `--dev-${sectionPrefix}-body-top`, value: overrides.bodyTop ?? 599, min: 0, max: 1500, suffix: 'px' },
        { label: 'Body Left', prop: `--dev-${sectionPrefix}-body-left`, value: overrides.bodyLeft ?? 36, min: 0, max: 500, suffix: 'px' },
        { label: 'Body Width', prop: `--dev-${sectionPrefix}-body-w`, value: overrides.bodyW ?? 900, min: 100, max: 1080, suffix: 'px' },
        { label: 'Body LH', prop: `--dev-${sectionPrefix}-body-lh`, value: overrides.bodyLH ?? 1.3, min: 0.5, max: 3, suffix: '' },

        // 4. Background e Outros
        { label: 'BG Opacity', prop: `--dev-${sectionPrefix}-bg-opacity`, value: overrides.bgOpacity ?? 0.47, min: 0, max: 1, suffix: '' },
        { label: 'Underline Display', prop: `--dev-${sectionPrefix}-line-display`, value: overrides.lineDisplay ?? 0, min: 0, max: 1, suffix: '' },
    ];
}

function createDevonianoGlobeConfig(prefix, defaults = {}) {
    return [
        { label: 'Header Top', prop: `--dev-${prefix}-header-top`, value: defaults.headerTop ?? 0, min: -100, max: 200, suffix: 'px' },
        { label: 'Globe MT', prop: `--dev-${prefix}-glob-mt`, value: defaults.globMt ?? 0, min: -100, max: 300, suffix: 'px' },
        { label: 'Globe Width', prop: `--dev-${prefix}-glob-w`, value: defaults.globW ?? 1080, min: 200, max: 1500, suffix: 'px' },
        { label: 'Globe Height', prop: `--dev-${prefix}-glob-h`, value: defaults.globH ?? 600, min: 200, max: 1500, suffix: 'px' },
        { label: 'Description MT', prop: `--dev-${prefix}-glob-desc-mt`, value: defaults.descMt ?? 60, min: -200, max: 800, suffix: 'px' },
        { label: 'Desc Width', prop: `--dev-${prefix}-glob-desc-w`, value: defaults.descW ?? 930, min: 500, max: 1080, suffix: 'px' },
        { label: 'Desc Left', prop: `--dev-${prefix}-glob-desc-left`, value: defaults.descLeft ?? 20, min: -100, max: 500, suffix: 'px' },
        { label: 'Desc Size', prop: `--dev-${prefix}-glob-desc-size`, value: defaults.descSize ?? 38.5, min: 10, max: 100, suffix: 'px' },
        { label: 'Desc LH', prop: `--dev-${prefix}-glob-desc-lh`, value: defaults.descLH ?? 47, min: 10, max: 150, suffix: 'px' },
        { label: 'Line MT', prop: `--dev-${prefix}-glob-line-mt`, value: defaults.lineMt ?? 100, min: -200, max: 800, suffix: 'px' },
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
        { label: 'BG Top', prop: `--devonian-${id}-bg-top`, value: overrides.bgTop || 0, min: -100, max: 800, suffix: 'px' },
        { label: 'BG Scale', prop: `--devonian-${id}-bg-scale`, value: overrides.bgScale || 1, min: 0.5, max: 3, suffix: '' },
        { label: 'BG X', prop: `--devonian-${id}-bg-x`, value: overrides.bgX || 0, min: -1000, max: 1000, suffix: 'px' },
        { label: 'BG Y', prop: `--devonian-${id}-bg-y`, value: overrides.bgY || 0, min: -1000, max: 1000, suffix: 'px' },

        // 5. Área Branca
        { label: 'Box Top', prop: `--devonian-${id}-white-mt`, value: 38, min: -500, max: 1500, suffix: 'px' },

        // 6. Corte (Cut)
        { label: 'Cut Y', prop: `--devonian-${id}-cut-y`, value: 40, min: 0, max: 200, suffix: 'px' },
        { label: 'Cut X1', prop: `--devonian-${id}-cut-x1`, value: 250, min: 0, max: 1080, suffix: 'px' },
        { label: 'Cut X2', prop: `--devonian-${id}-cut-x2`, value: 280, min: 0, max: 1080, suffix: 'px' },

        // 7. Selo (Sempre por último)
        { label: 'Selo Width', prop: `--devonian-${id}-selo-w`, value: 862, min: 50, max: 1500, suffix: 'px' },
        { label: 'Selo Top', prop: `--devonian-${id}-selo-top`, value: 799, min: -200, max: 1500, suffix: 'px' },
        { label: 'Selo Left', prop: `--devonian-${id}-selo-left`, value: 0, min: -200, max: 1080, suffix: 'px' },
        
        // 8. Top Text (Transição)
        { label: 'TopText Top', prop: `--devonian-toptext-top`, value: 80, min: 0, max: 1500, suffix: 'px' },
        { label: 'TopText Left', prop: `--devonian-toptext-left`, value: 108, min: 0, max: 1000, suffix: 'px' },
        { label: 'TopText Width', prop: `--devonian-toptext-w`, value: 864, min: 100, max: 1080, suffix: 'px' },
        { label: 'TopText Size', prop: `--devonian-toptext-size`, value: 38, min: 10, max: 100, suffix: 'px' },
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
