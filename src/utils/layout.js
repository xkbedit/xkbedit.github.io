const { KEY_GAP, US_SHIFT_SYMBOLS } = require('../data/keyboard');
const { XKB_CODE_TO_WAYWALL_KEY } = require('../data/keyMaps');

const buildInitialLayout = () => ({});

const hasExplicitLevel = value => value !== undefined && value !== null;

const SYMBOL_TO_SHIFT_SYMBOL = {
  '`': '~',
  '1': '!',
  '2': '@',
  '3': '#',
  '4': '$',
  '5': '%',
  '6': '^',
  '7': '&',
  '8': '*',
  '9': '(',
  '0': ')',
  minus: 'underscore',
  equal: 'plus',
  bracketleft: 'braceleft',
  bracketright: 'braceright',
  backslash: 'bar',
  semicolon: 'colon',
  apostrophe: 'quotedbl',
  comma: 'less',
  period: 'greater',
  slash: 'question',
  grave: 'asciitilde'
};

const getShiftedSymbol = symbol => {
  if (!symbol) return symbol;
  if (/^[a-z]$/.test(symbol)) return symbol.toUpperCase();
  return SYMBOL_TO_SHIFT_SYMBOL[symbol] || symbol;
};

const getDefaultSymbol = (key, layer) => {
  if (key.code === 'SPCE' && layer === 0) return 'space';

  if (layer === 1 && US_SHIFT_SYMBOLS[key.code]) {
    return US_SHIFT_SYMBOLS[key.code];
  }

  if (key.label.length === 1 && /[A-Za-z]/.test(key.label)) {
    if (layer === 0) return key.label.toLowerCase();
    if (layer === 1) return key.label.toUpperCase();
    return undefined;
  }

  if (layer === 0 && key.label.length === 1) {
    return key.label;
  }

  return undefined;
};

const getKeyStyle = key => {
  const style = {};

  if (key.span) {
    const width = `calc(var(--key-size) * ${key.span} + ${(key.span - 1) * KEY_GAP}px)`;
    style.width = width;
    style.flex = `0 0 ${width}`;
  }

  if (key.afterGap) {
    style.marginRight = `calc(var(--key-size) * ${key.afterGap} + ${((2 * KEY_GAP) / 3).toFixed(3)}px)`;
  }

  return Object.keys(style).length ? style : undefined;
};

const getWaywallKey = key => XKB_CODE_TO_WAYWALL_KEY[key.code] || key.code;

module.exports = {
  buildInitialLayout,
  getDefaultSymbol,
  getKeyStyle,
  getShiftedSymbol,
  getWaywallKey,
  hasExplicitLevel
};
