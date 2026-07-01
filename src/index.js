const React = require('react');
const { createRoot } = require('react-dom/client');

const e = React.createElement;

const KEY_ROWS = [
  [
    { code: 'ESC', label: 'Esc', span: 1.5, afterGap: 0.5 },
    { code: 'FK01', label: 'F1' },
    { code: 'FK02', label: 'F2' },
    { code: 'FK03', label: 'F3' },
    { code: 'FK04', label: 'F4', afterGap: 0.5 },
    { code: 'FK05', label: 'F5' },
    { code: 'FK06', label: 'F6' },
    { code: 'FK07', label: 'F7' },
    { code: 'FK08', label: 'F8', afterGap: 0.5 },
    { code: 'FK09', label: 'F9' },
    { code: 'FK10', label: 'F10' },
    { code: 'FK11', label: 'F11' },
    { code: 'FK12', label: 'F12' }
  ],
  [
    { code: 'TLDE', label: '`' },
    { code: 'AE01', label: '1' },
    { code: 'AE02', label: '2' },
    { code: 'AE03', label: '3' },
    { code: 'AE04', label: '4' },
    { code: 'AE05', label: '5' },
    { code: 'AE06', label: '6' },
    { code: 'AE07', label: '7' },
    { code: 'AE08', label: '8' },
    { code: 'AE09', label: '9' },
    { code: 'AE10', label: '0' },
    { code: 'AE11', label: '-' },
    { code: 'AE12', label: '=' },
    { code: 'BKSP', label: 'Backspace', span: 2 }
  ],
  [
    { code: 'TAB', label: 'Tab', span: 1.5 },
    { code: 'AD01', label: 'Q' },
    { code: 'AD02', label: 'W' },
    { code: 'AD03', label: 'E' },
    { code: 'AD04', label: 'R' },
    { code: 'AD05', label: 'T' },
    { code: 'AD06', label: 'Y' },
    { code: 'AD07', label: 'U' },
    { code: 'AD08', label: 'I' },
    { code: 'AD09', label: 'O' },
    { code: 'AD10', label: 'P' },
    { code: 'AD11', label: '[' },
    { code: 'AD12', label: ']' },
    { code: 'BKSL', label: '\\', span: 1.5 }
  ],
  [
    { code: 'CAPS', label: 'Caps', span: 1.75 },
    { code: 'AC01', label: 'A' },
    { code: 'AC02', label: 'S' },
    { code: 'AC03', label: 'D' },
    { code: 'AC04', label: 'F' },
    { code: 'AC05', label: 'G' },
    { code: 'AC06', label: 'H' },
    { code: 'AC07', label: 'J' },
    { code: 'AC08', label: 'K' },
    { code: 'AC09', label: 'L' },
    { code: 'AC10', label: ';' },
    { code: 'AC11', label: '\'' },
    { code: 'RTRN', label: 'Enter', span: 2.25 }
  ],
  [
    { code: 'LFSH', label: 'Shift', span: 2.25 },
    { code: 'AB01', label: 'Z' },
    { code: 'AB02', label: 'X' },
    { code: 'AB03', label: 'C' },
    { code: 'AB04', label: 'V' },
    { code: 'AB05', label: 'B' },
    { code: 'AB06', label: 'N' },
    { code: 'AB07', label: 'M' },
    { code: 'AB08', label: ',' },
    { code: 'AB09', label: '.' },
    { code: 'AB10', label: '/' },
    { code: 'RTSH', label: 'Shift', span: 2.75 }
  ],
  [
    { code: 'LCTL', label: 'Ctrl', span: 1.25 },
    { code: 'LWIN', label: 'Super', span: 1.25 },
    { code: 'LALT', label: 'Alt', span: 1.25 },
    { code: 'SPCE', label: 'Space', legend: '[SP]', span: 6.25 },
    { code: 'RALT', label: 'Alt', span: 1.25 },
    { code: 'RWIN', label: 'Menu', span: 1.25 },
    { code: 'I255', label: 'Fn', span: 1.25 },
    { code: 'RCTL', label: 'Ctrl', span: 1.25 }
  ]
];

const LAYERS = [
  { id: 0, label: 'Normal' },
  { id: 1, label: 'Shift' },
  { id: 2, label: 'AltGr' },
  { id: 3, label: 'Shift+AltGr' }
];

const US_SHIFT_SYMBOLS = {
  TLDE: '~',
  AE01: '!', AE02: '@', AE03: '#', AE04: '$', AE05: '%',
  AE06: '^', AE07: '&', AE08: '*', AE09: '(', AE10: ')',
  AE11: '_', AE12: '+',
  AD11: '{', AD12: '}', BKSL: '|',
  AC10: ':', AC11: '"',
  AB08: '<', AB09: '>', AB10: '?'
};

const VK_TO_XKB_CODE = {
  8: 'BKSP',
  9: 'TAB',
  13: 'RTRN',
  16: 'LFSH',
  20: 'CAPS',
  27: 'ESC',
  32: 'SPCE',
  48: 'AE10',
  49: 'AE01',
  50: 'AE02',
  51: 'AE03',
  52: 'AE04',
  53: 'AE05',
  54: 'AE06',
  55: 'AE07',
  56: 'AE08',
  57: 'AE09',
  65: 'AC01',
  66: 'AB05',
  67: 'AB03',
  68: 'AC03',
  69: 'AD03',
  70: 'AC04',
  71: 'AC05',
  72: 'AC06',
  73: 'AD08',
  74: 'AC07',
  75: 'AC08',
  76: 'AC09',
  77: 'AB07',
  78: 'AB06',
  79: 'AD09',
  80: 'AD10',
  81: 'AD01',
  82: 'AD04',
  83: 'AC02',
  84: 'AD05',
  85: 'AD07',
  86: 'AB04',
  87: 'AD02',
  88: 'AB02',
  89: 'AD06',
  90: 'AB01',
  91: 'LWIN',
  92: 'RWIN',
  112: 'FK01',
  113: 'FK02',
  114: 'FK03',
  115: 'FK04',
  116: 'FK05',
  117: 'FK06',
  118: 'FK07',
  119: 'FK08',
  120: 'FK09',
  121: 'FK10',
  122: 'FK11',
  123: 'FK12',
  160: 'LFSH',
  161: 'RTSH',
  162: 'LCTL',
  163: 'RCTL',
  164: 'LALT',
  165: 'RALT',
  186: 'AC10',
  187: 'AE12',
  188: 'AB08',
  189: 'AE11',
  190: 'AB09',
  191: 'AB10',
  192: 'TLDE',
  219: 'AD11',
  220: 'BKSL',
  221: 'AD12',
  222: 'AC11'
};

const VK_TO_SYMBOL = {
  8: 'BackSpace',
  9: 'Tab',
  13: 'Return',
  27: 'Escape',
  32: 'space',
  48: '0',
  49: '1',
  50: '2',
  51: '3',
  52: '4',
  53: '5',
  54: '6',
  55: '7',
  56: '8',
  57: '9',
  65: 'a',
  66: 'b',
  67: 'c',
  68: 'd',
  69: 'e',
  70: 'f',
  71: 'g',
  72: 'h',
  73: 'i',
  74: 'j',
  75: 'k',
  76: 'l',
  77: 'm',
  78: 'n',
  79: 'o',
  80: 'p',
  81: 'q',
  82: 'r',
  83: 's',
  84: 't',
  85: 'u',
  86: 'v',
  87: 'w',
  88: 'x',
  89: 'y',
  90: 'z',
  112: 'F1',
  113: 'F2',
  114: 'F3',
  115: 'F4',
  116: 'F5',
  117: 'F6',
  118: 'F7',
  119: 'F8',
  120: 'F9',
  121: 'F10',
  122: 'F11',
  123: 'F12',
  160: 'Shift_L',
  161: 'Shift_R',
  162: 'Control_L',
  163: 'Control_R',
  164: 'Alt_L',
  165: 'Alt_R',
  186: 'semicolon',
  187: 'equal',
  188: 'comma',
  189: 'minus',
  190: 'period',
  191: 'slash',
  192: 'grave',
  219: 'bracketleft',
  220: 'backslash',
  221: 'bracketright',
  222: 'apostrophe'
};

const VK_TO_WAYWALL_KEY = {
  8: 'BACKSPACE',
  9: 'TAB',
  13: 'ENTER',
  20: 'CAPSLOCK',
  27: 'ESC',
  32: 'SPACE',
  48: '0',
  49: '1',
  50: '2',
  51: '3',
  52: '4',
  53: '5',
  54: '6',
  55: '7',
  56: '8',
  57: '9',
  65: 'A',
  66: 'B',
  67: 'C',
  68: 'D',
  69: 'E',
  70: 'F',
  71: 'G',
  72: 'H',
  73: 'I',
  74: 'J',
  75: 'K',
  76: 'L',
  77: 'M',
  78: 'N',
  79: 'O',
  80: 'P',
  81: 'Q',
  82: 'R',
  83: 'S',
  84: 'T',
  85: 'U',
  86: 'V',
  87: 'W',
  88: 'X',
  89: 'Y',
  90: 'Z',
  91: 'LEFTMETA',
  92: 'RIGHTMETA',
  112: 'F1',
  113: 'F2',
  114: 'F3',
  115: 'F4',
  116: 'F5',
  117: 'F6',
  118: 'F7',
  119: 'F8',
  120: 'F9',
  121: 'F10',
  122: 'F11',
  123: 'F12',
  160: 'LEFTSHIFT',
  161: 'RIGHTSHIFT',
  162: 'LEFTCTRL',
  163: 'RIGHTCTRL',
  164: 'LEFTALT',
  165: 'RIGHTALT',
  186: 'SEMICOLON',
  187: 'EQUAL',
  188: 'COMMA',
  189: 'MINUS',
  190: 'DOT',
  191: 'SLASH',
  192: 'GRAVE',
  219: 'LEFTBRACE',
  220: 'BACKSLASH',
  221: 'RIGHTBRACE',
  222: 'APOSTROPHE'
};

const XKB_CODE_TO_WAYWALL_KEY = {
  ESC: 'ESC',
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
  TLDE: 'GRAVE',
  AE01: '1',
  AE02: '2',
  AE03: '3',
  AE04: '4',
  AE05: '5',
  AE06: '6',
  AE07: '7',
  AE08: '8',
  AE09: '9',
  AE10: '0',
  AE11: 'MINUS',
  AE12: 'EQUAL',
  BKSP: 'BACKSPACE',
  TAB: 'TAB',
  AD01: 'Q',
  AD02: 'W',
  AD03: 'E',
  AD04: 'R',
  AD05: 'T',
  AD06: 'Y',
  AD07: 'U',
  AD08: 'I',
  AD09: 'O',
  AD10: 'P',
  AD11: 'LEFTBRACE',
  AD12: 'RIGHTBRACE',
  BKSL: 'BACKSLASH',
  CAPS: 'CAPSLOCK',
  AC01: 'A',
  AC02: 'S',
  AC03: 'D',
  AC04: 'F',
  AC05: 'G',
  AC06: 'H',
  AC07: 'J',
  AC08: 'K',
  AC09: 'L',
  AC10: 'SEMICOLON',
  AC11: 'APOSTROPHE',
  RTRN: 'ENTER',
  LFSH: 'LEFTSHIFT',
  AB01: 'Z',
  AB02: 'X',
  AB03: 'C',
  AB04: 'V',
  AB05: 'B',
  AB06: 'N',
  AB07: 'M',
  AB08: 'COMMA',
  AB09: 'DOT',
  AB10: 'SLASH',
  RTSH: 'RIGHTSHIFT',
  LCTL: 'LEFTCTRL',
  LWIN: 'LEFTMETA',
  LALT: 'LEFTALT',
  SPCE: 'SPACE',
  RALT: 'RIGHTALT',
  RWIN: 'COMPOSE',
  I255: 'FN',
  RCTL: 'RIGHTCTRL'
};

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

const parseInlineTable = source => {
  const entry = {};
  const pairs = source.match(/[A-Za-z][A-Za-z0-9_]*\s*=\s*(?:true|false|-?\d+(?:\.\d+)?|'[^']*'|"[^"]*")/g) || [];

  pairs.forEach(pair => {
    const eq = pair.indexOf('=');
    const key = pair.slice(0, eq).trim();
    const rawValue = pair.slice(eq + 1).trim();

    if (rawValue === 'true' || rawValue === 'false') {
      entry[key] = rawValue === 'true';
    } else if (/^['"]/.test(rawValue)) {
      entry[key] = rawValue.slice(1, -1);
    } else {
      entry[key] = Number(rawValue);
    }
  });

  return entry;
};

const getToolscreenRebindEntries = toml => {
  const keyRebindsStart = toml.indexOf('[keyRebinds]');
  if (keyRebindsStart === -1) return [];

  const nextSection = toml.slice(keyRebindsStart + 1).search(/\n\[/);
  const section = nextSection === -1
    ? toml.slice(keyRebindsStart)
    : toml.slice(keyRebindsStart, keyRebindsStart + 1 + nextSection);
  const rebindsStart = section.indexOf('rebinds = [');
  if (rebindsStart === -1) return [];

  const afterStart = section.slice(rebindsStart);
  const rebindsEnd = afterStart.indexOf('\n]');
  const rebindsBlock = rebindsEnd === -1 ? afterStart : afterStart.slice(0, rebindsEnd);

  return (rebindsBlock.match(/\{[^}]+\}/g) || []).map(parseInlineTable);
};

const getSymbolFromToolscreenRebind = rebind => {
  if (rebind.customOutputUnicode) {
    const symbol = String.fromCodePoint(rebind.customOutputUnicode);
    return rebind.baseOutputShifted ? getShiftedSymbol(symbol) : symbol;
  }

  if (rebind.useCustomOutput && rebind.customOutputVK) {
    const symbol = VK_TO_SYMBOL[rebind.customOutputVK];
    return rebind.baseOutputShifted ? getShiftedSymbol(symbol) : symbol;
  }

  if (!rebind.useCustomOutput && rebind.toKey) {
    const symbol = VK_TO_SYMBOL[rebind.toKey];
    return rebind.baseOutputShifted ? getShiftedSymbol(symbol) : symbol;
  }

  return undefined;
};

const getShiftLayerSymbolFromToolscreenRebind = rebind => {
  if (!rebind.shiftLayerEnabled) return undefined;
  if (rebind.shiftLayerOutputDisabled) return '';

  let symbol;
  if (rebind.shiftLayerOutputUnicode) {
    symbol = String.fromCodePoint(rebind.shiftLayerOutputUnicode);
  } else if (rebind.shiftLayerOutputVK) {
    symbol = VK_TO_SYMBOL[rebind.shiftLayerOutputVK];
  } else if (rebind.shiftLayerUsesCapsLock) {
    symbol = getSymbolFromToolscreenRebind(rebind);
  }

  return rebind.shiftLayerOutputShifted ? getShiftedSymbol(symbol) : symbol;
};

const parseToolscreenLayout = toml => {
  const layout = {};
  const remaps = {};
  const skipped = [];
  let importedCount = 0;
  let shiftCount = 0;
  let remapCount = 0;

  getToolscreenRebindEntries(toml).forEach(rebind => {
    if (!rebind.enabled) return;

    const keyCode = VK_TO_XKB_CODE[rebind.fromKey];
    const fromRemapKey = VK_TO_WAYWALL_KEY[rebind.fromKey];
    const toRemapKey = VK_TO_WAYWALL_KEY[rebind.toKey];

    if (!rebind.useCustomOutput && fromRemapKey && toRemapKey && rebind.toKey !== rebind.fromKey) {
      remaps[fromRemapKey] = toRemapKey;
      remapCount += 1;
      return;
    }

    const symbol = getSymbolFromToolscreenRebind(rebind);
    if (!keyCode || !symbol) {
      skipped.push(rebind.fromKey);
      return;
    }

    layout[keyCode] = [symbol, symbol, undefined, undefined];
    importedCount += 1;

    const shiftSymbol = getShiftLayerSymbolFromToolscreenRebind(rebind);
    if (shiftSymbol !== undefined) {
      layout[keyCode][1] = shiftSymbol;
      shiftCount += 1;
    }
  });

  return { layout, remaps, importedCount, shiftCount, remapCount, skipped };
};

const toXkbKeysym = symbol => {
  if (!symbol) return 'VoidSymbol';
  const trimmed = symbol.trim();
  if (!trimmed) return 'VoidSymbol';
  // If it's alphanumeric and matches XKB naming conventions, pass through.
  if (/^[A-Za-z0-9_]+$/.test(trimmed)) {
    return trimmed;
  }
  // Otherwise, use Unicode hex (robust for symbols like ! or { which aren't valid keysym names directly)
  const cp = trimmed.codePointAt(0);
  return 'U' + cp.toString(16).toUpperCase().padStart(4, '0');
};

const fromXkbKeysym = keysym => {
  const trimmed = keysym.trim();
  if (!trimmed || trimmed === 'VoidSymbol') return '';

  const unicodeMatch = trimmed.match(/^U([0-9A-Fa-f]{4,6})$/);
  if (unicodeMatch) {
    return String.fromCodePoint(parseInt(unicodeMatch[1], 16));
  }

  return trimmed;
};

const parseXkbSymbols = source => {
  const layout = {};
  const keyPattern = /key\s*<([A-Za-z0-9_]+)>\s*\{\s*\[\s*([^\]]*?)\s*\]\s*\};/g;
  let match;
  let importedCount = 0;

  while ((match = keyPattern.exec(source))) {
    const code = match[1];
    const symbols = match[2]
      .split(',')
      .map(symbol => fromXkbKeysym(symbol))
      .slice(0, 4);

    while (symbols.length < 4) {
      symbols.push(undefined);
    }

    layout[code] = symbols.map(symbol => symbol === undefined ? undefined : symbol);
    importedCount += 1;
  }

  return { layout, importedCount };
};

const getDefaultSymbol = (key, layer) => {
  // Special case for Space
  if (key.code === 'SPCE' && layer === 0) return 'space';

  // Handle Shift Layer (1) for standard US symbols
  if (layer === 1 && US_SHIFT_SYMBOLS[key.code]) {
    return US_SHIFT_SYMBOLS[key.code];
  }

  // Handle Alphabetic keys (A-Z)
  // We assume labels in KEY_ROWS are single char Uppercase (Q, W, E...)
  if (key.label.length === 1 && /[A-Za-z]/.test(key.label)) {
    if (layer === 0) return key.label.toLowerCase(); // a
    if (layer === 1) return key.label.toUpperCase(); // A
    return undefined; // Alt layers empty by default
  }

  // Handle Numeric/Symbol keys in Normal Layer
  if (layer === 0 && key.label.length === 1) {
    return key.label;
  }

  // Fallback for everything else (modifiers, function keys)
  return undefined;
};

const createXkbSnippet = layout => {
  const lines = [
    '// Generated by xkbedit',
    'default partial alphanumeric_keys',
    'xkb_symbols "basic" {',
    '    name[Group1]= "Custom Layout";',
    ''
  ];
  
  KEY_ROWS.forEach(row =>
    row.forEach(key => {
      const levels = layout[key.code];
      
      const highestLevel = levels
        ? levels.reduce((highest, value, index) => hasExplicitLevel(value) ? index : highest, -1)
        : -1;

      // Only output if user touched the key.
      if (highestLevel >= 0) {
        const symbols = Array.from({ length: highestLevel + 1 }, (_, i) => {
          // Use stored value if it exists. Fill only gaps before an explicitly edited level.
          const val = hasExplicitLevel(levels[i]) ? levels[i] : getDefaultSymbol(key, i);
          return toXkbKeysym(val);
        });
        lines.push(`    key <${key.code}> { [ ${symbols.join(', ')} ] };`);
      }
    })
  );
  lines.push('};');
  return lines.join('\n');
};

const escapeLuaString = value => String(value).replace(/\\/g, '\\\\').replace(/"/g, '\\"');

const unescapeLuaString = value => value.replace(/\\"/g, '"').replace(/\\\\/g, '\\');

const createRemapsLua = remaps => {
  const lines = [
    'return {',
    '    remapped_kb = {'
  ];

  Object.keys(remaps).sort().forEach(fromKey => {
    lines.push(`        ["${escapeLuaString(fromKey)}"] = "${escapeLuaString(remaps[fromKey])}",`);
  });

  lines.push(
    '',
    '    },',
    '',
    '    normal_kb = {',
    '',
    '    },',
    '',
    '}'
  );

  return lines.join('\n');
};

const parseRemapsLua = source => {
  const remaps = {};
  const remappedBlock = source.match(/remapped_kb\s*=\s*\{([\s\S]*?)\}/);
  if (!remappedBlock) return { remaps, importedCount: 0 };

  const entryPattern = /\[\s*"((?:\\"|[^"])*)"\s*\]\s*=\s*"((?:\\"|[^"])*)"/g;
  let match;
  let importedCount = 0;

  while ((match = entryPattern.exec(remappedBlock[1]))) {
    remaps[unescapeLuaString(match[1])] = unescapeLuaString(match[2]);
    importedCount += 1;
  }

  return { remaps, importedCount };
};

const KEY_GAP = 5;

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

const LayerSwitcher = ({ activeLayer, onChange }) => {
  return e(
    'div',
    { className: 'layer-tabs' },
    LAYERS.map(layer =>
      e(
        'button',
        {
          key: layer.id,
          className: `layer-tab${activeLayer === layer.id ? ' layer-tab--active' : ''}`,
          onClick: () => onChange(layer.id)
        },
        layer.label
      )
    )
  );
};

const Keyboard = ({ layout, remaps, activeKey, activeLayer, onKeyClick }) =>
  e(
    'div',
    { className: 'keyboard-wrapper' },
    e(
      'div',
      { className: 'keyboard' },
      KEY_ROWS.map((row, rowIdx) =>
        e(
          'div',
          { className: 'key-row', key: rowIdx },
          row.map(key =>
            e(
              'button',
              {
                key: key.code,
                className: `key${activeKey === key.code ? ' key--active' : ''}${remaps[XKB_CODE_TO_WAYWALL_KEY[key.code] || key.code] ? ' key--remapped' : ''}`,
                onClick: event => onKeyClick(key, event),
                style: getKeyStyle(key)
              },
              (() => {
                const storedLevels = layout[key.code];
                const legend = key.legend || key.label;
                const remapValue = remaps[XKB_CODE_TO_WAYWALL_KEY[key.code] || key.code];
                
                // Determine what to show on the key cap
                let display;
                let shrink = false;
                let isPlaceholder = false;

                // Value from state?
                const storedVal = storedLevels ? storedLevels[activeLayer] : undefined;

                if (remapValue) {
                  display = remapValue;
                  shrink = remapValue.length > 3;
                } else if (hasExplicitLevel(storedVal)) {
                  // User explicitly set this (even if empty string)
                  display = storedVal;
                } else if (storedLevels) {
                  display = '';
                } else {
                  // Try to get a default for this layer
                  const def = getDefaultSymbol(key, activeLayer);
                  if (def !== undefined) {
                    display = def;
                    isPlaceholder = !storedLevels; // Dim if purely inferred
                  } else {
                    // No default for this layer
                    // If it's the base layer and we haven't touched the key, show the physical label (e.g. "Shift")
                    if (activeLayer === 0 && !storedLevels) {
                       display = legend;
                       shrink = legend.length > 1;
                       isPlaceholder = true;
                    } else {
                       display = '';
                    }
                  }
                }

                return e(
                  'span',
                  {
                    className: `key-symbol${shrink ? ' key-symbol--small' : ''}`,
                    style: { opacity: isPlaceholder ? 0.5 : 1 }
                  },
                  display
                );
              })(),
              e('span', { className: 'key-code' }, key.code)
            )
          )
        )
      )
    )
  );

const App = () => {
  const [layout, setLayout] = React.useState(() => buildInitialLayout());
  const [remaps, setRemaps] = React.useState({});
  const [triggers, setTriggers] = React.useState({});
  const [activeKey, setActiveKey] = React.useState(null);
  const [activeLayer, setActiveLayer] = React.useState(0); // 0..3
  const [importStatus, setImportStatus] = React.useState('');
  const [keyEditor, setKeyEditor] = React.useState(null);
  const fileInputRef = React.useRef(null);
  const xkbFileInputRef = React.useRef(null);
  const remapsFileInputRef = React.useRef(null);

  const xkbSnippet = React.useMemo(() => createXkbSnippet(layout), [layout]);
  const remapsLua = React.useMemo(() => createRemapsLua(remaps), [remaps]);

  const getLayerValue = (key, layer) => {
    const storedLevels = layout[key.code];
    if (storedLevels && hasExplicitLevel(storedLevels[layer])) {
      return storedLevels[layer];
    }

    const defaultSymbol = getDefaultSymbol(key, layer);
    if (defaultSymbol !== undefined) return defaultSymbol;
    if (layer === 0) return key.label;
    return '';
  };

  const handleKeyClick = (key, event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const waywallKey = getWaywallKey(key);

    if (keyEditor && keyEditor.pickTarget) {
      const pickedKey = getWaywallKey(key);

      if (keyEditor.pickTarget === 'trigger') {
        const targetCode = keyEditor.pickForCode;

        setTriggers(prev => {
          const copy = { ...prev };
          copy[targetCode] = pickedKey;
          return copy;
        });
      }

      if (keyEditor.pickTarget === 'full') {
        const sourceKey = getWaywallKey(keyEditor.key);

        setLayout(prev => {
          const copy = { ...prev };
          delete copy[keyEditor.key.code];
          return copy;
        });

        setRemaps(prev => {
          const copy = { ...prev };
          copy[sourceKey] = pickedKey;
          return copy;
        });
      }

      setKeyEditor(current => current
        ? {
            ...current,
            pickTarget: null,
            pickForCode: null,
            mode: current.pickTarget === 'full' ? 'full' : 'split'
          }
        : current
      );
      setActiveKey(keyEditor.pickTarget === 'full' ? keyEditor.key.code : keyEditor.pickForCode);
      return;
    }

    setActiveKey(key.code);
    setKeyEditor({
      key,
      mode: remaps[waywallKey] ? 'full' : 'split',
      x: Math.round(rect.left + rect.width / 2 + window.scrollX),
      y: Math.round(rect.top + rect.height / 2 + window.scrollY)
    });
  };

  const setKeyEditorMode = mode => {
    if (keyEditor && mode === 'split') {
      setRemaps(prev => {
        const copy = { ...prev };
        delete copy[getWaywallKey(keyEditor.key)];
        return copy;
      });
    }

    if (keyEditor && mode === 'full') {
      setLayout(prev => {
        const copy = { ...prev };
        delete copy[keyEditor.key.code];
        return copy;
      });
    }

    setKeyEditor(current => current ? { ...current, mode } : current);
  };

  const updateSplitTypes = value => {
    if (!keyEditor) return;

    setRemaps(prev => {
      const copy = { ...prev };
      delete copy[getWaywallKey(keyEditor.key)];
      return copy;
    });

    setLayout(prev => {
      const copy = { ...prev };
      const currentLevels = copy[keyEditor.key.code]
        ? [...copy[keyEditor.key.code]]
        : [undefined, undefined, undefined, undefined];
      
      currentLevels[activeLayer] = value;
      copy[keyEditor.key.code] = currentLevels;
      return copy;
    });
  };

  const getWaywallKey = key => XKB_CODE_TO_WAYWALL_KEY[key.code] || key.code;

  const getTriggerValue = key => triggers[key.code] || getWaywallKey(key);

  const startTriggerPick = () => {
    if (!keyEditor) return;

    setKeyEditor(current => current
      ? {
          ...current,
          pickTarget: 'trigger',
          pickForCode: current.key.code,
          mode: 'split'
        }
      : current
    );
  };

  const startFullRebindPick = () => {
    if (!keyEditor) return;

    setKeyEditor(current => current
      ? {
          ...current,
          pickTarget: 'full',
          pickForCode: current.key.code,
          mode: 'full'
        }
      : current
    );
  };

  const clearTrigger = () => {
    if (!keyEditor) return;

    setTriggers(prev => {
      const copy = { ...prev };
      delete copy[keyEditor.key.code];
      return copy;
    });
  };

  const getFullRebindValue = key => remaps[getWaywallKey(key)] || '';

  const updateFullRebind = value => {
    if (!keyEditor) return;

    setLayout(prev => {
      const copy = { ...prev };
      delete copy[keyEditor.key.code];
      return copy;
    });

    setRemaps(prev => {
      const sourceKey = getWaywallKey(keyEditor.key);
      const copy = { ...prev };

      if (value.trim()) {
        copy[sourceKey] = value.trim().toUpperCase();
      } else {
        delete copy[sourceKey];
      }

      return copy;
    });
  };

  const resetLayout = () => {
    if (window.confirm('Reset the layout to the default symbols?')) {
      setLayout(buildInitialLayout());
      setRemaps({});
      setTriggers({});
      setActiveKey(null);
      setKeyEditor(null);
      setImportStatus('');
    }
  };

  const importToolscreenLayout = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const importXkbSymbols = () => {
    if (xkbFileInputRef.current) {
      xkbFileInputRef.current.click();
    }
  };

  const importRemapsLua = () => {
    if (remapsFileInputRef.current) {
      remapsFileInputRef.current.click();
    }
  };

  const handleToolscreenFile = async event => {
    const file = event.target.files && event.target.files[0];
    event.target.value = '';

    if (!file) return;

    try {
      const toml = await file.text();
      const result = parseToolscreenLayout(toml);

      if (!result.importedCount && !result.remapCount) {
        setImportStatus(`No enabled Toolscreen rebinds found in ${file.name}.`);
        return;
      }

      setLayout(result.layout);
      setRemaps(result.remaps);
      setTriggers({});
      setActiveKey(null);
      setKeyEditor(null);
      setActiveLayer(0);
      setImportStatus(
        `Imported ${result.importedCount} types, ${result.remapCount} full remaps (${result.shiftCount} shift) from ${file.name}${
          result.skipped.length ? ` (${result.skipped.length} skipped)` : ''
        }.`
      );
    } catch (error) {
      setImportStatus(`Could not import ${file.name}: ${error.message}`);
    }
  };

  const handleXkbSymbolsFile = async event => {
    const file = event.target.files && event.target.files[0];
    event.target.value = '';

    if (!file) return;

    try {
      const source = await file.text();
      const result = parseXkbSymbols(source);

      if (!result.importedCount) {
        setImportStatus(`No xkb_symbols keys found in ${file.name}.`);
        return;
      }

      setLayout(result.layout);
      setActiveLayer(0);
      setActiveKey(null);
      setKeyEditor(null);
      setImportStatus(`Imported ${result.importedCount} xkb_symbols keys from ${file.name}.`);
    } catch (error) {
      setImportStatus(`Could not import ${file.name}: ${error.message}`);
    }
  };

  const handleRemapsLuaFile = async event => {
    const file = event.target.files && event.target.files[0];
    event.target.value = '';

    if (!file) return;

    try {
      const source = await file.text();
      const result = parseRemapsLua(source);

      if (!result.importedCount) {
        setImportStatus(`No remapped_kb entries found in ${file.name}.`);
        return;
      }

      setRemaps(result.remaps);
      setActiveKey(null);
      setKeyEditor(null);
      setImportStatus(`Imported ${result.importedCount} remaps from ${file.name}.`);
    } catch (error) {
      setImportStatus(`Could not import ${file.name}: ${error.message}`);
    }
  };

  const downloadSnippet = () => {
    const blob = new Blob([xkbSnippet], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'mc';
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 0);
  };

  const downloadRemapsLua = () => {
    const blob = new Blob([remapsLua], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'remaps.lua';
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 0);
  };

  return e(
    'div',
    { className: 'app-shell' },
    e(
      'header',
      { className: 'site-header' },
      e(
        'div',
        { className: 'brand-block' },
        e('h1', null, 'xkbedit')
      ),
      e(
        'div',
        { className: 'header-actions' },
        e('span', { className: 'header-meta' }, '4 levels'),
        e('button', { type: 'button', className: 'text-action text-action--strong', onClick: importToolscreenLayout }, 'Import Toolscreen'),
        e('button', { type: 'button', className: 'text-action text-action--strong', onClick: importXkbSymbols }, 'Import xkb_symbols'),
        e('button', { type: 'button', className: 'text-action text-action--strong', onClick: importRemapsLua }, 'Import remaps.lua'),
        e('button', { type: 'button', className: 'text-action', onClick: resetLayout }, 'Reset')
      ),
      e('input', {
        ref: fileInputRef,
        type: 'file',
        accept: '.toml,text/plain',
        className: 'visually-hidden',
        onChange: handleToolscreenFile
      }),
      e('input', {
        ref: xkbFileInputRef,
        type: 'file',
        accept: '.xkb,.symbols,text/plain',
        className: 'visually-hidden',
        onChange: handleXkbSymbolsFile
      }),
      e('input', {
        ref: remapsFileInputRef,
        type: 'file',
        accept: '.lua,text/plain',
        className: 'visually-hidden',
        onChange: handleRemapsLuaFile
      }),
      e(
        'p',
        { className: 'intro' },
        'Select a layer, click a key, and assign a symbol.'
      ),
      importStatus && e(
        'p',
        { className: 'import-status' },
        importStatus
      )
    ),
    e(
      'section',
      { className: 'content-section keyboard-section' },
      e(
        'div',
        { className: 'section-heading' },
        e('h2', null, 'Keyboard'),
        e('span', { className: 'layer-indicator' }, LAYERS[activeLayer].label)
      ),
      e(LayerSwitcher, { activeLayer, onChange: setActiveLayer }),
      e(Keyboard, { layout, remaps, activeKey, activeLayer, onKeyClick: handleKeyClick }),
      keyEditor && e(
        'div',
        {
          className: `key-editor-popover${keyEditor.pickTarget ? ' key-editor-popover--picking' : ''}`,
          style: {
            left: `${keyEditor.x}px`,
            top: `${keyEditor.y}px`
          }
        },
        e(
          'div',
          { className: 'key-editor-header' },
          e(
            'div',
            null,
            e(
              'span',
              { className: 'key-editor-title' },
              e('span', { className: 'key-editor-name' }, keyEditor.key.label),
              e('span', { className: 'key-editor-code' }, ` <${keyEditor.key.code}>`)
            ),
            e('span', { className: 'key-editor-layer' }, LAYERS[activeLayer].label)
          ),
          e('button', { type: 'button', className: 'key-editor-close', onClick: () => setKeyEditor(null) }, 'Close')
        ),
        e(
          'div',
          { className: 'rebind-mode-tabs' },
          e(
            'button',
            {
              type: 'button',
              className: `rebind-mode-tab${keyEditor.mode === 'full' ? ' rebind-mode-tab--active' : ''}`,
              onClick: () => setKeyEditorMode('full')
            },
            'Full Rebind'
          ),
          e(
            'button',
            {
              type: 'button',
              className: `rebind-mode-tab${keyEditor.mode === 'split' ? ' rebind-mode-tab--active' : ''}`,
              onClick: () => setKeyEditorMode('split')
            },
            'Split Rebind'
          )
        ),
        keyEditor.mode === 'full'
          ? e(
              'div',
              { className: 'rebind-block' },
              e(
                'label',
                { className: 'field-row' },
                e('span', null, 'To'),
                e(
                  'div',
                  { className: 'trigger-picker-row' },
                  e('input', {
                    className: 'rebind-input',
                    value: keyEditor.pickTarget === 'full' ? 'pick a key on layout' : getFullRebindValue(keyEditor.key),
                    placeholder: getWaywallKey(keyEditor.key),
                    onChange: event => updateFullRebind(event.target.value),
                    autoFocus: true
                  }),
                  e(
                    'button',
                    {
                      type: 'button',
                      className: `trigger-picker-button${keyEditor.pickTarget === 'full' ? ' trigger-picker-button--active' : ''}`,
                      onClick: startFullRebindPick
                    },
                    'Pick'
                  ),
                  e(
                    'button',
                    {
                      type: 'button',
                      className: 'trigger-picker-button',
                      onClick: () => updateFullRebind('')
                    },
                    'Clear'
                  )
                )
              )
            )
          : e(
              'div',
              { className: 'rebind-block' },
              e(
                'label',
                { className: 'field-row' },
                e('span', null, 'Types'),
                e('input', {
                  className: 'rebind-input',
                  value: getLayerValue(keyEditor.key, activeLayer),
                  onChange: event => updateSplitTypes(event.target.value),
                  autoFocus: true
                })
              ),
              e(
                'label',
                { className: 'field-row' },
                e('span', null, 'Triggers'),
                e(
                  'div',
                  { className: 'trigger-picker-row' },
                  e('input', {
                    className: 'rebind-input',
                    value: keyEditor.pickTarget === 'trigger' ? 'pick a key on layout' : getTriggerValue(keyEditor.key),
                    readOnly: true
                  }),
                  e(
                    'button',
                    {
                      type: 'button',
                      className: `trigger-picker-button${keyEditor.pickTarget === 'trigger' ? ' trigger-picker-button--active' : ''}`,
                      onClick: startTriggerPick
                    },
                    'Pick'
                  ),
                  e(
                    'button',
                    {
                      type: 'button',
                      className: 'trigger-picker-button',
                      onClick: clearTrigger
                    },
                    'Clear'
                  )
                )
              )
            )
      )
    ),
    e(
      'section',
      { className: 'content-section export-section' },
      e(
        'div',
        { className: 'section-heading' },
        e('h2', null, 'xkb_symbols export'),
        e('span', { className: 'header-meta' }, '~/.xkb/symbols/custom')
      ),
      e(
        'div',
        { className: 'download-actions' },
        e('button', { type: 'button', className: 'text-action text-action--strong', onClick: downloadSnippet }, 'Download mc'),
        e('button', { type: 'button', className: 'text-action text-action--strong', onClick: downloadRemapsLua }, 'Download remaps.lua')
      ),
      e('textarea', {
        className: 'snippet',
        readOnly: true,
        value: xkbSnippet,
        onFocus: evt => evt.target.select()
      }),
      e('textarea', {
        className: 'snippet',
        readOnly: true,
        value: remapsLua,
        onFocus: evt => evt.target.select()
      })
    )
  );
};

const root = createRoot(document.getElementById('root'));
root.render(e(App));
