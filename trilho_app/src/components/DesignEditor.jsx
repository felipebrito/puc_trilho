import React, { useState, useEffect } from 'react';

// ==========================================================================
// HELPERS - DEFINED FIRST
// ==========================================================================

function createDevonianoIntroConfig(sectionPrefix, overrides = {}) {
    return [
        { label: 'BG Opacity',     prop: `--dev-${sectionPrefix}-bg-opacity`,      value: overrides.bgOpacity ?? 0.47, min: 0,    max: 1,    suffix: '' },
        { label: 'Label Top',      prop: `--dev-${sectionPrefix}-label-top`,        value: overrides.labelTop ?? 61,    min: -1000, max: 1920, suffix: 'px' },
        { label: 'Label Left',     prop: `--dev-${sectionPrefix}-label-left`,       value: overrides.labelLeft ?? 41,   min: -100, max: 500,  suffix: 'px' },
        { label: 'Label Size',     prop: `--dev-${sectionPrefix}-label-size`,       value: overrides.labelSize ?? 30,   min: 10,   max: 100,  suffix: 'px' },
        { label: 'Label Spacing',  prop: `--dev-${sectionPrefix}-label-spacing`,    value: overrides.labelSpacing ?? 6, min: 0,    max: 50,   suffix: 'px' },
        { label: 'Name Top',       prop: `--dev-${sectionPrefix}-name-top`,         value: overrides.nameTop ?? 102,    min: -1000, max: 1920, suffix: 'px' },
        { label: 'Name Left',      prop: `--dev-${sectionPrefix}-name-left`,        value: overrides.nameLeft ?? 36,    min: -100, max: 500,  suffix: 'px' },
        { label: 'Name Size',      prop: `--dev-${sectionPrefix}-name-size`,        value: overrides.nameSize ?? 60,    min: 10,   max: 200,  suffix: 'px' },
        { label: 'Name Spacing',   prop: `--dev-${sectionPrefix}-name-spacing`,     value: overrides.nameSpacing ?? 3,  min: 0,    max: 50,   suffix: 'px' },
        { label: 'Heading Top',    prop: `--dev-${sectionPrefix}-heading-top`,      value: overrides.headingTop ?? 0,   min: -1000, max: 1000, suffix: 'px' },
        { label: 'Heading Left',   prop: `--dev-${sectionPrefix}-heading-left`,     value: overrides.headingLeft ?? 0,  min: -200, max: 500,  suffix: 'px' },
        { label: 'Heading Size',   prop: `--dev-${sectionPrefix}-heading-size`,     value: overrides.headingSize ?? 96, min: 20,   max: 300,  suffix: 'px' },
        { label: 'Heading Width',  prop: `--dev-${sectionPrefix}-heading-w`,        value: overrides.headingW ?? 900,   min: 100,  max: 1080, suffix: 'px' },
        { label: 'Heading Spacing',prop: `--dev-${sectionPrefix}-heading-spacing`,  value: overrides.headingSpacing ?? 0, min: -10, max: 50,  suffix: 'px' },
        { label: 'Heading LH',     prop: `--dev-${sectionPrefix}-heading-lh`,       value: overrides.headingLH ?? 1.05, min: 0.1,  max: 2,    suffix: '' },
        { label: 'Body Top',       prop: `--dev-${sectionPrefix}-body-top`,         value: overrides.bodyTop ?? 599,    min: -1000, max: 1920, suffix: 'px' },
        { label: 'Body Left',      prop: `--dev-${sectionPrefix}-body-left`,        value: overrides.bodyLeft ?? 36,    min: 0,    max: 500,  suffix: 'px' },
        { label: 'Body Width',     prop: `--dev-${sectionPrefix}-body-w`,           value: overrides.bodyW ?? 821,      min: 100,  max: 1080, suffix: 'px' },
        { label: 'Body Size',      prop: `--dev-${sectionPrefix}-body-size`,        value: overrides.bodySize ?? 37,    min: 10,   max: 80,   suffix: 'px' },
        { label: 'Body LH',        prop: `--dev-${sectionPrefix}-body-lh`,          value: overrides.bodyLH ?? 1.3,     min: 0.8,  max: 3,    suffix: '' },
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
        { label: 'Name MT', prop: `--devonian-${id}-name-mt`, value: overrides.nameMt || 96, min: -200, max: 500, suffix: 'px' },
        { label: 'Name ML', prop: `--devonian-${id}-name-ml`, value: 0, min: -200, max: 500, suffix: 'px' },
        { label: 'Name Size', prop: `--devonian-${id}-name-size`, value: overrides.nameSize || 83, min: 20, max: 150, suffix: 'px' },
        { label: 'Sub MT', prop: `--devonian-${id}-sub-mt`, value: overrides.subMt || 51, min: -200, max: 500, suffix: 'px' },
        { label: 'Sub ML', prop: `--devonian-${id}-sub-ml`, value: 0, min: -200, max: 500, suffix: 'px' },
        { label: 'Sub Width', prop: `--devonian-${id}-sub-w`, value: overrides.subW || 590, min: 100, max: 1080, suffix: 'px' },
        { label: 'Sub Size', prop: `--devonian-${id}-sub-size`, value: overrides.subSize || 56, min: 20, max: 150, suffix: 'px' },
        { label: 'Desc MT', prop: `--devonian-${id}-desc-mt`, value: overrides.descMt || 96, min: -200, max: 800, suffix: 'px' },
        { label: 'Desc ML', prop: `--devonian-${id}-desc-ml`, value: 0, min: -200, max: 500, suffix: 'px' },
        { label: 'Desc Width', prop: `--devonian-${id}-desc-w`, value: overrides.descW || 752, min: 100, max: 1080, suffix: 'px' },
        { label: 'Desc Size', prop: `--devonian-${id}-desc-size`, value: overrides.descSize || 40, min: 10, max: 100, suffix: 'px' },
        { label: 'Desc LH', prop: `--devonian-${id}-desc-lh`, value: overrides.descLH || 50, min: 10, max: 150, suffix: 'px' },
        { label: 'BG Height', prop: `--devonian-${id}-bg-h`, value: overrides.bgH || 42, min: 20, max: 100, suffix: '%' },
        { label: 'BG Opacity', prop: `--devonian-${id}-bg-opacity`, value: overrides.bgOpacity || 1, min: 0, max: 1, suffix: '' },
        { label: 'BG Top', prop: `--devonian-${id}-bg-top`, value: overrides.bgTop || 0, min: -500, max: 1000, suffix: 'px' },
        { label: 'BG Scale', prop: `--devonian-${id}-bg-scale`, value: overrides.bgScale || 1, min: 0.5, max: 3, suffix: '' },
        { label: 'BG X', prop: `--devonian-${id}-bg-x`, value: overrides.bgX || 0, min: -1000, max: 1000, suffix: 'px' },
        { label: 'BG Y', prop: `--devonian-${id}-bg-y`, value: overrides.bgY || 0, min: -1000, max: 1000, suffix: 'px' },
        { label: 'White Top H', prop: `--devonian-${id}-white-h`, value: 34, min: 20, max: 80, suffix: '%' },
        { label: 'White Area MT', prop: `--devonian-${id}-white-mt`, value: overrides.whiteMt || 38, min: -200, max: 2000, suffix: 'px' },
        { label: 'Cut Y', prop: `--devonian-${id}-cut-y`, value: 40, min: 0, max: 200, suffix: 'px' },
        { label: 'Cut X1', prop: `--devonian-${id}-cut-x1`, value: 250, min: 0, max: 1080, suffix: 'px' },
        { label: 'Cut X2', prop: `--devonian-${id}-cut-x2`, value: 280, min: 0, max: 1080, suffix: 'px' },
        { label: 'TopText Top', prop: `--devonian-${id}-toptext-top`, value: overrides.topTextTop || 80, min: 0, max: 1000, suffix: 'px' },
        { label: 'TopText Left', prop: `--devonian-${id}-toptext-left`, value: 108, min: 0, max: 1000, suffix: 'px' },
        { label: 'TopText Width', prop: `--devonian-${id}-toptext-w`, value: 864, min: 200, max: 1080, suffix: 'px' },
        { label: 'TopText Size', prop: `--devonian-${id}-toptext-size`, value: 38, min: 10, max: 100, suffix: 'px' },
        { label: 'Selo Width', prop: `--devonian-${id}-selo-w`, value: 862, min: 50, max: 1500, suffix: 'px' },
        { label: 'Selo Top', prop: `--devonian-${id}-selo-top`, value: overrides.seloTop || 799, min: -200, max: 1500, suffix: 'px' },
        { label: 'Selo Left', prop: `--devonian-${id}-selo-left`, value: 0, min: -200, max: 1080, suffix: 'px' },
    ];
}

const createPermianoSpecimenConfig = (id, defaults = {}, prefixOverride) => {
    const prefix = prefixOverride || `perm-bio-${id}`;
    return [
        { label: 'Name MT', prop: `--devonian-${prefix}-name-mt`, value: defaults.nameMt || 96, min: -200, max: 1500, suffix: 'px' },
        { label: 'Name ML', prop: `--devonian-${prefix}-name-ml`, value: defaults.nameMl || 0, min: -200, max: 500, suffix: 'px' },
        { label: 'Name Size', prop: `--devonian-${prefix}-name-size`, value: defaults.nameSize || 83, min: 10, max: 200, suffix: 'px' },
        { label: 'Sub MT', prop: `--devonian-${prefix}-sub-mt`, value: defaults.subMt || 51, min: -100, max: 500, suffix: 'px' },
        { label: 'Sub ML', prop: `--devonian-${prefix}-sub-ml`, value: defaults.subMl || 0, min: -200, max: 500, suffix: 'px' },
        { label: 'Sub Width', prop: `--devonian-${prefix}-sub-w`, value: defaults.subW || 590, min: 100, max: 1080, suffix: 'px' },
        { label: 'Sub Size', prop: `--devonian-${prefix}-sub-size`, value: defaults.subSize || 56, min: 10, max: 150, suffix: 'px' },
        { label: 'Desc MT', prop: `--devonian-${prefix}-desc-mt`, value: defaults.descMt || 96, min: -200, max: 500, suffix: 'px' },
        { label: 'Desc ML', prop: `--devonian-${prefix}-desc-ml`, value: defaults.descMl || 0, min: -200, max: 500, suffix: 'px' },
        { label: 'Desc Width', prop: `--devonian-${prefix}-desc-w`, value: defaults.descW || 752, min: 100, max: 1080, suffix: 'px' },
        { label: 'Desc Size', prop: `--devonian-${prefix}-desc-size`, value: defaults.descSize || 40, min: 10, max: 100, suffix: 'px' },
        { label: 'Desc LH', prop: `--devonian-${prefix}-desc-lh`, value: defaults.descLH || 50, min: 10, max: 150, suffix: 'px' },
        { label: 'BG Height', prop: `--devonian-${prefix}-bg-h`, value: defaults.bgH || 42, min: 10, max: 100, suffix: '%' },
        { label: 'BG Opacity', prop: `--devonian-${prefix}-bg-opacity`, value: defaults.bgOpacity || 1, min: 0, max: 1, suffix: '' },
        { label: 'BG Scale', prop: `--devonian-${prefix}-bg-scale`, value: defaults.bgScale || 1, min: 0.1, max: 3, step: 0.05, suffix: '' },
        { label: 'BG X', prop: `--devonian-${prefix}-bg-x`, value: defaults.bgX || 0, min: -1080, max: 1080, suffix: 'px' },
        { label: 'BG Y', prop: `--devonian-${prefix}-bg-y`, value: defaults.bgY || 0, min: -1920, max: 1920, suffix: 'px' },
        { label: 'White Height', prop: `--devonian-${prefix}-white-h`, value: defaults.whiteH || 34, min: 10, max: 100, suffix: '%' },
        { label: 'White MT', prop: `--devonian-${prefix}-white-mt`, value: defaults.whiteMt || 38, min: -100, max: 2000, suffix: 'px' },
        { label: 'TopText Top', prop: `--devonian-${prefix}-toptext-top`, value: defaults.topTextTop || 80, min: -500, max: 1000, suffix: 'px' },
        { label: 'TopText Left', prop: `--devonian-${prefix}-toptext-left`, value: defaults.topTextLeft || 108, min: 0, max: 1000, suffix: 'px' },
        { label: 'TopText Width', prop: `--devonian-${prefix}-toptext-w`, value: defaults.topTextW || 864, min: 200, max: 1080, suffix: 'px' },
        { label: 'TopText Size', prop: `--devonian-${prefix}-toptext-size`, value: defaults.topTextSize || 38, min: 10, max: 100, suffix: 'px' },
        { label: 'Selo Width', prop: `--devonian-${prefix}-selo-w`, value: defaults.seloW || 862, min: 50, max: 1500, suffix: 'px' },
        { label: 'Selo Top', prop: `--devonian-${prefix}-selo-top`, value: defaults.seloTop || 799, min: -200, max: 1500, suffix: 'px' },
        { label: 'Selo Left', prop: `--devonian-${prefix}-selo-left`, value: defaults.seloLeft || 0, min: -200, max: 1080, suffix: 'px' },
    ];
}

// ==========================================================================
// CONFIGS
// ==========================================================================

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
    'permiano-home': [
        { label: 'Titles Margin Top', prop: '--devonian-permiano-home-titles-mt', value: 592, min: 0, max: 1500, suffix: 'px' },
        { label: 'Subtitle Size', prop: '--devonian-permiano-home-subtitle-size', value: 73, min: 10, max: 200, suffix: 'px' },
        { label: 'Subtitle Spacing', prop: '--devonian-permiano-home-subtitle-spacing', value: 7.8, min: -10, max: 50, suffix: 'px' },
        { label: 'Subtitle MB', prop: '--devonian-permiano-home-subtitle-mb', value: 0, min: -50, max: 100, suffix: 'px' },
        { label: 'Title Size', prop: '--devonian-permiano-home-title-size', value: 143, min: 10, max: 300, suffix: 'px' },
        { label: 'Title Spacing', prop: '--devonian-permiano-home-title-spacing', value: 9.7, min: -10, max: 50, suffix: 'px' },
        { label: 'Title Line Height', prop: '--devonian-permiano-home-title-lh', value: 0.9, min: 0.1, max: 3, suffix: '' },
        { label: 'Title MT', prop: '--devonian-permiano-home-title-mt', value: 0, min: -150, max: 150, suffix: 'px' },
        { label: 'Title MB', prop: '--devonian-permiano-home-title-mb', value: 0, min: -150, max: 150, suffix: 'px' },
        { label: 'Title ML', prop: '--devonian-permiano-home-title-ml', value: -5, min: -100, max: 100, suffix: 'px' },
        { label: 'Underline Width', prop: '--devonian-permiano-home-underline-w', value: 610, min: 0, max: 1080, suffix: 'px' },
        { label: 'Underline Height', prop: '--devonian-permiano-home-underline-h', value: 5, min: 0, max: 50, suffix: 'px' },
        { label: 'Underline MT', prop: '--devonian-permiano-home-underline-mt', value: 22, min: -50, max: 150, suffix: 'px' },
        { label: 'Underline MB', prop: '--devonian-permiano-home-underline-mb', value: 70, min: -100, max: 250, suffix: 'px' },
        { label: 'Desc Size', prop: '--devonian-permiano-home-desc-size', value: 96, min: 10, max: 200, suffix: 'px' },
        { label: 'Desc Spacing', prop: '--devonian-permiano-home-desc-spacing', value: -3, min: -20, max: 20, suffix: 'px' },
        { label: 'Desc MB', prop: '--devonian-permiano-home-desc-mb', value: 7, min: -100, max: 100, suffix: 'px' },
        { label: 'Desc MT', prop: '--devonian-permiano-home-desc-mt', value: 0, min: -100, max: 100, suffix: 'px' },
        { label: 'SubDesc Size', prop: '--devonian-permiano-home-subdesc-size', value: 50, min: 10, max: 200, suffix: 'px' },
        { label: 'SubDesc ML', prop: '--devonian-permiano-home-subdesc-ml', value: 0, min: -200, max: 400, suffix: 'px' },
        { label: 'SubDesc Weight', prop: '--devonian-permiano-home-subdesc-weight', value: 400, min: 100, max: 900, suffix: '' },
        { label: 'Extra Size', prop: '--devonian-permiano-home-extra-size', value: 32, min: 10, max: 100, suffix: 'px' },
        { label: 'Extra MT', prop: '--devonian-permiano-home-extra-mt', value: 30, min: 0, max: 200, suffix: 'px' },
        { label: 'Extra ML', prop: '--devonian-permiano-home-extra-ml', value: 0, min: -200, max: 200, suffix: 'px' },
        { label: 'Extra Weight', prop: '--devonian-permiano-home-extra-weight', value: 400, min: 100, max: 900, suffix: '' },
        { label: 'Extra Width', prop: '--devonian-permiano-home-extra-w', value: 600, min: 100, max: 1080, suffix: 'px' },
        { label: 'Extra LH', prop: '--devonian-permiano-home-extra-lh', value: 1.4, min: 0.5, max: 2.5, suffix: '' },
        { label: 'Extra Opacity', prop: '--devonian-permiano-home-extra-opacity', value: 0.8, min: 0, max: 1, suffix: '' },
        { label: 'Menu Top', prop: '--devonian-permiano-home-menu-top', value: 1278, min: 0, max: 1920, suffix: 'px' },
        { label: 'Menu Left', prop: '--devonian-permiano-home-menu-left', value: 110, min: 0, max: 1080, suffix: 'px' },
        { label: 'Menu Gap', prop: '--devonian-permiano-home-menu-gap', value: 21, min: 0, max: 150, suffix: 'px' },
        { label: 'Btn Width', prop: '--devonian-permiano-home-btn-w', value: 860, min: 100, max: 1080, suffix: 'px' },
        { label: 'Btn Height', prop: '--devonian-permiano-home-btn-h', value: 89, min: 50, max: 200, suffix: 'px' },
        { label: 'Btn Padding Left', prop: '--devonian-permiano-home-btn-pl', value: 45, min: 0, max: 300, suffix: 'px' }
    ],
    'devoniano-bio-intro': createDevonianoIntroConfig('bio', {
        labelTop: 57,
        nameTop: 101,
        nameSize: 61,
        bodyTop: 638,
        headingTop: -29,
        headingSize: 105,
        headingLH: 0.95,
    }),
    'devoniano-extincao-intro': createDevonianoIntroConfig('ext', {
        bgOpacity: 1,
        labelTop: 57,
        nameTop: 99,
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
        labelTop: 1208,
        nameTop: 1274,
        bodyTop: 599
    }),
    'devoniano-pos-globe': createDevonianoGlobeConfig('pos-glob', {
        headerTop: -61,
        globMt: 61,
        descMt: 92,
        descLH: 47
    }),
    'devoniano-pos-summary': createDevonianoGlobeConfig('pos-sum', {
        headerTop: -61,
        globMt: 61,
        descMt: 92,
        descLH: 47
    }),
    'devoniano-biodiversidade-dunkleosteus': createDevonianoSpecimenConfig('dunk', { subW: 590, nameSize: 83, descSize: 40 }),
    'devoniano-biodiversidade-campbellodus': createDevonianoSpecimenConfig('campbell', { subW: 657, descMt: 127, descW: 802 }),
    'devoniano-biodiversidade-ctenacanthus': createDevonianoSpecimenConfig('ctenacanthus', { subW: 802, descMt: 128, descW: 921 }),
    'devoniano-biodiversidade-gogonasus': createDevonianoSpecimenConfig('gogonasus', { subW: 641, descMt: 125, descW: 881 }),
    'devoniano-biodiversidade-griphognatus': createDevonianoSpecimenConfig('griphognatus', { subW: 858, descMt: 127, descW: 887 }),
    'devoniano-biodiversidade-furcaster': createDevonianoSpecimenConfig('furcaster', { subW: 831, descMt: 126, descW: 910 }),
    'devoniano-biodiversidade-palaeoisopus': createDevonianoSpecimenConfig('palaeoisopus', { subW: 755, descMt: 81, descW: 866 }),
    'devoniano-biodiversidade-archaeopteris': createDevonianoSpecimenConfig('archaeopteris', { subMt: 87, subW: 735, descMt: 150, descW: 898, descLH: 48 }),
    'devoniano-biodiversidade-tiktaalik': createDevonianoSpecimenConfig('tiktaalik', { subW: 590, descMt: -11, descW: 915, descLH: 48 }),
    'devoniano-biodiversidade-ichthyostega': createDevonianoSpecimenConfig('ichthyostega', { nameMt: 67, nameSize: 86, subW: 935, descMt: -33, descW: 869, descLH: 47 }),
    'devoniano-biodiversidade-drepanophycus': createDevonianoSpecimenConfig('drepanophycus', { subMt: 78, subW: 834, descMt: 124, descW: 870, descLH: 50 }),
    
    'perm-bio-intro': createDevonianoIntroConfig('perm-bio', {
        bgOpacity: 0.47,
        labelTop: 61,
        nameTop: 102,
        bodyTop: 937,
        headingTop: -62,
        headingSize: 100,
        headingW: 805,
        headingSpacing: -1,
        headingLH: 1.05
    }),
    'permiano-biodiversidade-archosaurus': createPermianoSpecimenConfig('archosaurus'),
    'permiano-biodiversidade-scutosaurus': createPermianoSpecimenConfig('scutosaurus'),
    'permiano-biodiversidade-dvinia': createPermianoSpecimenConfig('dvinia'),
    'permiano-biodiversidade-arctotypus': createPermianoSpecimenConfig('arctotypus'),
    'permiano-biodiversidade-dicynodon': createPermianoSpecimenConfig('dicynodon'),
    'permiano-biodiversidade-glossopteris': createPermianoSpecimenConfig('glossopteris'),
    'permiano-biodiversidade-phyllotheca': createPermianoSpecimenConfig('phyllotheca'),

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
    'ordoviciano-biodiversidade-ord-homotelus': createDevonianoSpecimenConfig('ord-homotelus'),
    'ordoviciano-biodiversidade-ord-cameroceras': createDevonianoSpecimenConfig('ord-cameroceras', {
        subMt: 38,
        subW: 790,
        descMt: 69,
        descW: 798
    }),
    'ordoviciano-biodiversidade-ord-megalograptus': createDevonianoSpecimenConfig('ord-megalograptus', {
        subMt: 40,
        subW: 719,
        descMt: 66,
        bgScale: 1.1,
        bgX: 50
    }),
    'ordoviciano-biodiversidade-ord-balacrinus': createDevonianoSpecimenConfig('ord-balacrinus', {
        subMt: 45,
        subW: 776,
        descMt: 60,
        descW: 893
    }),
    'ordoviciano-biodiversidade-ord-sacabambaspis': createDevonianoSpecimenConfig('ord-sacabambaspis', {
        descMt: 73,
        descW: 904
    }),
    'ordoviciano-biodiversidade-ord-promissum': createDevonianoSpecimenConfig('ord-promissum', {
        descMt: 47,
        descW: 916
    }),
    'ordoviciano-biodiversidade-ord-sowerbyella': createDevonianoSpecimenConfig('ord-sowerbyella', {
        subMt: 42,
        subW: 683,
        descMt: 62,
        descW: 804
    }),
    'ordoviciano-extincao-intro': createDevonianoIntroConfig('ord-ext'),
    'ordoviciano-extincao-content': [
        { label: 'Img Top', prop: '--dev-ext-img-top', value: 160, min: 0, max: 500, suffix: 'px' },
        { label: 'Img Height', prop: '--dev-ext-img-h', value: 660, min: 100, max: 1200, suffix: 'px' },
        { label: 'Img Scale', prop: '--dev-ext-img-scale', value: 1, min: 0.5, max: 2, suffix: '' },
        { label: 'Caption Top', prop: '--dev-ext-caption-top', value: 860, min: 0, max: 1500, suffix: 'px' },
        { label: 'Caption Left', prop: '--dev-ext-caption-left', value: 108, min: 0, max: 500, suffix: 'px' },
        { label: 'Caption Width', prop: '--dev-ext-caption-w', value: 900, min: 100, max: 1080, suffix: 'px' },
        { label: 'Caption Size', prop: '--dev-ext-caption-size', value: 26, min: 10, max: 80, suffix: 'px' },
        { label: 'Line Top', prop: '--dev-ext-line-top', value: 960, min: 0, max: 1500, suffix: 'px' },
        { label: 'Line Left', prop: '--dev-ext-line-left', value: 108, min: 0, max: 500, suffix: 'px' },
        { label: 'Line Width', prop: '--dev-ext-line-w', value: 890, min: 100, max: 1080, suffix: 'px' },
        { label: 'Text Top', prop: '--dev-ext-text-top', value: 1050, min: 0, max: 1800, suffix: 'px' },
        { label: 'Text Left', prop: '--dev-ext-text-left', value: 108, min: 0, max: 500, suffix: 'px' },
        { label: 'Text Width', prop: '--dev-ext-text-w', value: 864, min: 100, max: 1080, suffix: 'px' },
        { label: 'Text Line Height', prop: '--dev-ext-text-lh', value: 47, min: 20, max: 100, suffix: 'px' },
    ],
    'permiano-extincao-content': [
        { label: 'Img Top', prop: '--dev-ext-img-top', value: 160, min: 0, max: 500, suffix: 'px' },
        { label: 'Img Height', prop: '--dev-ext-img-h', value: 660, min: 100, max: 1200, suffix: 'px' },
        { label: 'Img Scale', prop: '--dev-ext-img-scale', value: 1, min: 0.5, max: 2, suffix: '' },
        { label: 'Caption Top', prop: '--dev-ext-caption-top', value: 860, min: 0, max: 1500, suffix: 'px' },
        { label: 'Caption Left', prop: '--dev-ext-caption-left', value: 108, min: 0, max: 500, suffix: 'px' },
        { label: 'Caption Width', prop: '--dev-ext-caption-w', value: 900, min: 100, max: 1080, suffix: 'px' },
        { label: 'Caption Size', prop: '--dev-ext-caption-size', value: 26, min: 10, max: 80, suffix: 'px' },
        { label: 'Line Top', prop: '--dev-ext-line-top', value: 960, min: 0, max: 1500, suffix: 'px' },
        { label: 'Line Left', prop: '--dev-ext-line-left', value: 108, min: 0, max: 500, suffix: 'px' },
        { label: 'Line Width', prop: '--dev-ext-line-w', value: 890, min: 100, max: 1080, suffix: 'px' },
        { label: 'Text Top', prop: '--dev-ext-text-top', value: 1050, min: 0, max: 1800, suffix: 'px' },
        { label: 'Text Left', prop: '--dev-ext-text-left', value: 108, min: 0, max: 500, suffix: 'px' },
        { label: 'Text Width', prop: '--dev-ext-text-w', value: 864, min: 100, max: 1080, suffix: 'px' },
        { label: 'Text Line Height', prop: '--dev-ext-text-lh', value: 47, min: 20, max: 100, suffix: 'px' },
    ],
    'ordoviciano-pos_extincao-intro': createDevonianoIntroConfig('ord-pos'),
    'ordoviciano-pos_extincao-dalmanites': createDevonianoSpecimenConfig('dalmanites', {
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
    'ordoviciano-pos_extincao-globe': createDevonianoGlobeConfig('ord-glob', {
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
    'ordoviciano-pos_extincao-halysites': createDevonianoSpecimenConfig('halysites'),
    'ordoviciano-pos_extincao-cooksonia': createDevonianoSpecimenConfig('cooksonia'),
    'ordoviciano-pos_extincao-favosites': createDevonianoSpecimenConfig('favosites'),

    // Carbonífero
    'devoniano-pos-carbon-meganeura': createDevonianoSpecimenConfig('meganeura'),
    'devoniano-pos-carbon-stethacanthus': createDevonianoSpecimenConfig('stethacanthus'),
    'devoniano-pos-carbon-arthropleura': createDevonianoSpecimenConfig('arthropleura'),
    'devoniano-pos-carbon-amphibamus': createDevonianoSpecimenConfig('amphibamus'),
    'devoniano-pos-carbon-sphenophyllum': createDevonianoSpecimenConfig('sphenophyllum'),
    'devoniano-pos-carbon-calamites': createDevonianoSpecimenConfig('calamites'),
    'devoniano-pos-carbon-cordaites': createDevonianoSpecimenConfig('cordaites'),
    'devoniano-pos-carbon-sigillaria': createDevonianoSpecimenConfig('sigillaria'),

    // Permiano Pós-Extinção
    'perm-pos-ext-intro': createDevonianoIntroConfig('perm-pos-ext'),
    'permiano-pos_extincao-mundo': [
        { label: 'Img Top', prop: '--dev-perm-pos-ext-mundo-img-top', value: 160, min: 0, max: 800, suffix: 'px' },
        { label: 'Img Height', prop: '--dev-perm-pos-ext-mundo-img-h', value: 660, min: 100, max: 1200, suffix: 'px' },
        { label: 'Img Scale', prop: '--dev-perm-pos-ext-mundo-img-scale', value: 1, min: 0.5, max: 3, suffix: '' },
        { label: 'Caption Top', prop: '--dev-perm-pos-ext-mundo-cap-top', value: 860, min: 0, max: 1500, suffix: 'px' },
        { label: 'Caption Left', prop: '--dev-perm-pos-ext-mundo-cap-left', value: 108, min: 0, max: 500, suffix: 'px' },
        { label: 'Caption Size', prop: '--dev-perm-pos-ext-mundo-cap-size', value: 26, min: 10, max: 80, suffix: 'px' },
        { label: 'Line Top', prop: '--dev-perm-pos-ext-mundo-line-top', value: 960, min: 0, max: 1500, suffix: 'px' },
        { label: 'Line Left', prop: '--dev-perm-pos-ext-mundo-line-left', value: 108, min: 0, max: 500, suffix: 'px' },
        { label: 'Text Area Top', prop: '--dev-perm-pos-ext-mundo-text-top', value: 1050, min: 0, max: 1800, suffix: 'px' },
        { label: 'TopText Top', prop: '--dev-perm-pos-ext-mundo-top-top', value: 1050, min: 0, max: 2000, suffix: 'px' },
        { label: 'TopText Left', prop: '--dev-perm-pos-ext-mundo-top-left', value: 108, min: 0, max: 500, suffix: 'px' },
        { label: 'TopText Width', prop: '--dev-perm-pos-ext-mundo-top-w', value: 864, min: 100, max: 1080, suffix: 'px' },
        { label: 'TopText Size', prop: '--dev-perm-pos-ext-mundo-top-size', value: 37, min: 10, max: 100, suffix: 'px' },
        { label: 'TopText LH', prop: '--dev-perm-pos-ext-mundo-top-lh', value: 47, min: 20, max: 100, suffix: 'px' },
        { label: 'BottomText Top', prop: '--dev-perm-pos-ext-mundo-bot-top', value: 1450, min: 0, max: 2000, suffix: 'px' },
        { label: 'BottomText Left', prop: '--dev-perm-pos-ext-mundo-bot-left', value: 108, min: 0, max: 500, suffix: 'px' },
        { label: 'BottomText Width', prop: '--dev-perm-pos-ext-mundo-bot-w', value: 864, min: 100, max: 1080, suffix: 'px' },
        { label: 'BottomText Size', prop: '--dev-perm-pos-ext-mundo-bot-size', value: 37, min: 10, max: 100, suffix: 'px' },
        { label: 'BottomText LH', prop: '--dev-perm-pos-ext-mundo-bot-lh', value: 47, min: 20, max: 100, suffix: 'px' },
    ],
    'permiano-pos_extincao-resistencia': [
        { label: 'Img Top', prop: '--dev-perm-pos-ext-resistencia-img-top', value: 160, min: 0, max: 800, suffix: 'px' },
        { label: 'Img Height', prop: '--dev-perm-pos-ext-resistencia-img-h', value: 660, min: 100, max: 1200, suffix: 'px' },
        { label: 'Img Scale', prop: '--dev-perm-pos-ext-resistencia-img-scale', value: 1, min: 0.5, max: 3, suffix: '' },
        { label: 'Img X', prop: '--dev-perm-pos-ext-resistencia-img-x', value: 0, min: -500, max: 500, suffix: 'px' },
        { label: 'Img Y', prop: '--dev-perm-pos-ext-resistencia-img-y', value: 0, min: -500, max: 500, suffix: 'px' },
        { label: 'Caption Top', prop: '--dev-perm-pos-ext-resistencia-cap-top', value: 860, min: 0, max: 1500, suffix: 'px' },
        { label: 'Line Top', prop: '--dev-perm-pos-ext-resistencia-line-top', value: 1600, min: 0, max: 2000, suffix: 'px' },
        { label: 'Line Left', prop: '--dev-perm-pos-ext-resistencia-line-left', value: 108, min: 0, max: 500, suffix: 'px' },
        { label: 'Text Area Top', prop: '--dev-perm-pos-ext-resistencia-text-top', value: 1050, min: 0, max: 1800, suffix: 'px' },
        { label: 'TopText Top', prop: '--dev-perm-pos-ext-resistencia-top-top', value: 1050, min: 0, max: 2000, suffix: 'px' },
        { label: 'TopText Left', prop: '--dev-perm-pos-ext-resistencia-top-left', value: 108, min: 0, max: 500, suffix: 'px' },
        { label: 'TopText Width', prop: '--dev-perm-pos-ext-resistencia-top-w', value: 864, min: 100, max: 1080, suffix: 'px' },
        { label: 'TopText Size', prop: '--dev-perm-pos-ext-resistencia-top-size', value: 45, min: 10, max: 100, suffix: 'px' },
        { label: 'TopText LH', prop: '--dev-perm-pos-ext-resistencia-top-lh', value: 60, min: 20, max: 150, suffix: 'px' },
    ],
    'permiano-pos_extincao-benthosuchus': createPermianoSpecimenConfig('benthosuchus', {}, 'benthosuchus'),
    'permiano-pos_extincao-lystrosaurus': createPermianoSpecimenConfig('lystrosaurus', {}, 'lystrosaurus'),
    'permiano-pos_extincao-thrinaxodon': createPermianoSpecimenConfig('thrinaxodon', {}, 'thrinaxodon'),
    'permiano-pos_extincao-procolophon': createPermianoSpecimenConfig('procolophon', {}, 'procolophon'),
    'permiano-pos_extincao-voltziopsis': createPermianoSpecimenConfig('voltziopsis', {}, 'voltziopsis'),
};

// ==========================================================================
// COMPONENT
// ==========================================================================

const DesignEditor = ({ referenceImage, viewId, period, section, slideId, savedSettings }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [opacity, setOpacity] = useState(0.5);
    const [variables, setVariables] = useState({});
    const [saveStatus, setSaveStatus] = useState('idle'); // idle | saving | saved | error

    const currentConfig = cssConfigs[viewId] || [];

    useEffect(() => {
        const initialVars = {};
        currentConfig.forEach(cfg => {
            // Tenta ler do JSON salvo (formato novo: chave = CSS var)
            const saved = savedSettings?.[cfg.prop];
            const numeric = saved !== undefined ? parseFloat(saved) : NaN;
            initialVars[cfg.prop] = isNaN(numeric) ? cfg.value : numeric;
            document.documentElement.style.setProperty(cfg.prop, `${initialVars[cfg.prop]}${cfg.suffix}`);
        });
        setVariables(initialVars);
        setSaveStatus('idle');
    }, [viewId]);

    const handleVarChange = (prop, value, suffix) => {
        console.log(`[DesignEditor] Alterando ${prop}: ${value}${suffix}`);
        setVariables(prev => ({ ...prev, [prop]: value }));
        document.documentElement.style.setProperty(prop, `${value}${suffix}`);
    };

    // Referências para garantir que o salvamento sempre use os dados mais recentes
    const stateRef = useRef({ period, section, slideId, viewId, variables });
    useEffect(() => {
        stateRef.current = { period, section, slideId, viewId, variables };
    }, [period, section, slideId, viewId, variables]);

    const handleSave = async () => {
        const { period: p, section: s, slideId: sid, variables: vars } = stateRef.current;
        
        console.log(`[DesignEditor] Iniciando salvamento para: ${p} / ${s} / ${sid}`);
        if (!p || !s || !sid) {
            console.error('[DesignEditor] Erro: Faltam IDs para salvar!', { p, s, sid });
            alert('Faltam dados de identificação (period/section/id) para salvar.');
            return;
        }

        const values = {};
        currentConfig.forEach(cfg => {
            values[cfg.prop] = `${vars[cfg.prop] ?? cfg.value}${cfg.suffix}`;
        });
        
        console.log('[DesignEditor] Valores que serão enviados:', values);
        setSaveStatus('saving');

        try {
            const res = await fetch('/api/save-design', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ period: p, section: s, id: sid, values }),
            });
            if (!res.ok) throw new Error(await res.text());
            console.log('[DesignEditor] Resposta do servidor: OK');
            setSaveStatus('saved');
            setTimeout(() => setSaveStatus('idle'), 2000);
        } catch (e) {
            console.error('[DesignEditor] Erro na requisição:', e);
            setSaveStatus('error');
            alert(`Erro ao salvar: ${e.message}`);
        }
    };

    useEffect(() => {
        // Expõe função global para debug
        window.saveDesign = handleSave;
        console.log(`[DesignEditor] Pronto para: ${period} / ${section} / ${slideId || viewId}`);
        
        const handleKeyDown = (e) => {
            if ((e.key === 'e' || e.key === 'E') && !e.target.matches('input, textarea')) {
                setIsVisible(prev => !prev);
            }
            if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                e.preventDefault();
                console.log('[DesignEditor] Atalho detectado via teclado');
                handleSave();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            delete window.saveDesign;
        };
    }, [period, section, slideId, viewId]); // Re-registra se os IDs mudarem

    if (!isVisible) return null;

    const saveLabel = { idle: 'Salvar JSON', saving: 'Salvando...', saved: '✓ Salvo!', error: 'Erro!' }[saveStatus];
    const saveBg = { idle: '#4ade80', saving: '#aaa', saved: '#22c55e', error: '#ef4444' }[saveStatus];

    return (
        <>
            {referenceImage && (
                <div
                    style={{
                        position: 'absolute', top: 0, left: 0,
                        width: '1080px', height: '1920px',
                        backgroundImage: `url('${referenceImage}')`,
                        backgroundSize: 'cover', backgroundPosition: 'center',
                        opacity: opacity, pointerEvents: 'none', zIndex: 9998
                    }}
                />
            )}

            <div
                style={{
                    position: 'absolute', top: '20px', left: '20px',
                    background: 'rgba(0,0,0,0.85)', padding: '20px',
                    borderRadius: '8px', color: 'white', zIndex: 9999,
                    fontFamily: 'sans-serif', width: '320px',
                    maxHeight: '90vh', overflowY: 'auto'
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <h3 style={{ margin: '0 0 4px 0', fontSize: '16px' }}>Design Editor</h3>
                <div style={{ fontSize: '11px', color: '#888', marginBottom: '15px' }}>
                    {period} / {section} / {slideId || viewId}
                </div>

                {referenceImage && (
                    <div style={{ marginBottom: '20px', paddingBottom: '15px', borderBottom: '1px solid #444' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>
                            Opacidade Ref: {Math.round(opacity * 100)}%
                        </label>
                        <input
                            type="range" min="0" max="1" step="0.05" value={opacity}
                            onChange={(e) => setOpacity(parseFloat(e.target.value))}
                            style={{ width: '100%' }}
                        />
                    </div>
                )}

                {currentConfig.length === 0 && (
                    <p style={{ fontSize: '13px', color: '#888' }}>Nenhuma config disponível para "{viewId}".</p>
                )}

                {currentConfig.map(cfg => (
                    <div key={cfg.prop} style={{ marginBottom: '15px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                            <label style={{ fontSize: '13px' }}>{cfg.label}</label>
                            <span style={{ fontSize: '13px', color: '#4ade80' }}>
                                {variables[cfg.prop] ?? cfg.value}{cfg.suffix}
                            </span>
                        </div>
                        <input
                            type="range" min={cfg.min} max={cfg.max}
                            step={cfg.suffix === '' ? 0.05 : 1}
                            value={variables[cfg.prop] ?? cfg.value}
                            onChange={(e) => handleVarChange(cfg.prop, parseFloat(e.target.value), cfg.suffix)}
                            style={{ width: '100%' }}
                        />
                    </div>
                ))}

                <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                    <button
                        onClick={handleSave}
                        disabled={saveStatus === 'saving'}
                        style={{ flex: 2, padding: '10px', background: saveBg, color: '#000', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                        {saveLabel}
                    </button>
                    <button
                        onClick={() => {
                            const css = currentConfig.map(cfg => `${cfg.prop}: ${variables[cfg.prop] ?? cfg.value}${cfg.suffix};`).join('\n');
                            navigator.clipboard.writeText(css);
                        }}
                        style={{ flex: 1, padding: '10px', background: '#334155', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
                    >
                        CSS
                    </button>
                </div>
            </div>

            {/* Reference Image Overlay for alignment comparison */}
            {referenceImage && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none',
                    zIndex: 9999,
                    opacity: 0.5
                }}>
                    <img 
                        src={referenceImage} 
                        alt="Reference" 
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
                    />
                </div>
            )}
        </>
    );
};

export default DesignEditor;
