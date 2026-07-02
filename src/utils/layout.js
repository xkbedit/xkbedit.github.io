const { KEY_GAP, US_SHIFT_SYMBOLS } = require('../data/keyboard');
const { XKB_CODE_TO_WAYWALL_KEY } = require('../data/keyMaps');

const buildInitialLayout = () => ({});

const hasExplicitLevel = value => value !== undefined && value !== null;

const getSymbolDedupeKey = symbol => {
  if (!symbol) return null;
  const trimmed = symbol.trim();
  if (!trimmed) return null;
  return /^[A-Za-z]$/.test(trimmed) ? trimmed.toLowerCase() : trimmed;
};

const collectExplicitSymbols = layout => {
  const symbols = new Map();

  Object.entries(layout).forEach(([code, levels]) => {
    if (!levels) return;

    levels.forEach(value => {
      if (!hasExplicitLevel(value)) return;

      const key = getSymbolDedupeKey(value);
      if (!key) return;

      if (!symbols.has(key)) {
        symbols.set(key, new Set());
      }
      symbols.get(key).add(code);
    });
  });

  return symbols;
};

const shouldRemoveDefault = (key, value, explicitSymbols, removeUsedDefaults) => {
  if (!removeUsedDefaults) return false;

  const dedupeKey = getSymbolDedupeKey(value);
  if (!dedupeKey || !explicitSymbols.has(dedupeKey)) return false;

  return Array.from(explicitSymbols.get(dedupeKey)).some(code => code !== key.code);
};

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

const DEFAULT_KEY_SYMBOLS = {
  ESC: 'Escape',
  FK01: 'F1',
  FK02: 'F2',
  FK03: 'F3',
  FK04: 'F4',
  FK05: 'F5',
  FK06: 'F6',
  FK07: 'F7',
  FK08: 'F8',
  FK09: 'F9',
  FK10: 'F10',
  FK11: 'F11',
  FK12: 'F12',
  PRSC: 'Print',
  SCLK: 'Scroll_Lock',
  PAUS: 'Pause',
  HZTG: 'Zenkaku_Hankaku',
  BKSP: 'BackSpace',
  TAB: 'Tab',
  RTRN: 'Return',
  CAPS: 'Caps_Lock',
  LFSH: 'Shift_L',
  RTSH: 'Shift_R',
  LCTL: 'Control_L',
  RCTL: 'Control_R',
  LWIN: 'Super_L',
  RWIN: 'Menu',
  LALT: 'Alt_L',
  RALT: 'ISO_Level3_Shift',
  MUHE: 'Muhenkan',
  HENK: 'Henkan_Mode',
  HKTG: 'Hiragana_Katakana',
  INS: 'Insert',
  HOME: 'Home',
  PGUP: 'Prior',
  DELE: 'Delete',
  END: 'End',
  PGDN: 'Next',
  UP: 'Up',
  LEFT: 'Left',
  DOWN: 'Down',
  RGHT: 'Right',
  LSGT: 'less',
  AE13: 'yen',
  AB11: 'backslash'
};

const getShiftedSymbol = symbol => {
  if (!symbol) return symbol;
  if (/^[a-z]$/.test(symbol)) return symbol.toUpperCase();
  return SYMBOL_TO_SHIFT_SYMBOL[symbol] || symbol;
};

const getDefaultSymbol = (key, layer) => {
  if (layer === 0 && DEFAULT_KEY_SYMBOLS[key.code]) {
    return DEFAULT_KEY_SYMBOLS[key.code];
  }

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

const WAYWALL_KEY_ALIASES = {
  RIGHTMETA: ['COMPOSE']
};

const WAYWALL_KEY_TO_XKB_CODE = Object.entries(XKB_CODE_TO_WAYWALL_KEY).reduce((lookup, [code, key]) => {
  lookup[key] = code;
  return lookup;
}, {});

Object.entries(WAYWALL_KEY_ALIASES).forEach(([primary, aliases]) => {
  aliases.forEach(alias => {
    if (WAYWALL_KEY_TO_XKB_CODE[primary]) {
      WAYWALL_KEY_TO_XKB_CODE[alias] = WAYWALL_KEY_TO_XKB_CODE[primary];
    }
  });
});

const getWaywallKeyNames = key => {
  const primary = getWaywallKey(key);
  return [primary, ...(WAYWALL_KEY_ALIASES[primary] || [])];
};

const getXkbCodeForWaywallKey = key => WAYWALL_KEY_TO_XKB_CODE[key] || null;

const getRemapValue = (remaps, key) => {
  const names = getWaywallKeyNames(key);
  const matchedName = names.find(name => remaps[name]);
  return matchedName ? remaps[matchedName] : '';
};

const clearRemapForKey = (remaps, key) => {
  const copy = { ...remaps };
  getWaywallKeyNames(key).forEach(name => {
    delete copy[name];
  });
  return copy;
};

module.exports = {
  buildInitialLayout,
  clearRemapForKey,
  collectExplicitSymbols,
  getDefaultSymbol,
  getKeyStyle,
  getRemapValue,
  getShiftedSymbol,
  getSymbolDedupeKey,
  getWaywallKey,
  getWaywallKeyNames,
  getXkbCodeForWaywallKey,
  hasExplicitLevel,
  shouldRemoveDefault
};
