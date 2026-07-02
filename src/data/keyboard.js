const FUNCTION_ROW = [
  [
    { code: 'ESC', label: 'Esc', afterGap: 0.5 },
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
    { code: 'FK12', label: 'F12', afterGap: 0.9 },
    { code: 'PRSC', label: 'PrtSc', legend: 'Prt' },
    { code: 'SCLK', label: 'Scroll', legend: 'Scr' },
    { code: 'PAUS', label: 'Pause', legend: 'Paus' }
  ]
];

const NAV_ROW_1 = [
  { code: 'INS', label: 'Ins' },
  { code: 'HOME', label: 'Home' },
  { code: 'PGUP', label: 'PgUp' }
];

const NAV_ROW_2 = [
  { code: 'DELE', label: 'Del' },
  { code: 'END', label: 'End' },
  { code: 'PGDN', label: 'PgDn' }
];

const ARROW_ROW_UP = [
  { type: 'spacer', code: 'ARSP1' },
  { code: 'UP', label: 'Up', legend: 'Up' },
  { type: 'spacer', code: 'ARSP2' }
];

const ARROW_ROW_DOWN = [
  { code: 'LEFT', label: 'Left', legend: 'Left' },
  { code: 'DOWN', label: 'Down', legend: 'Down' },
  { code: 'RGHT', label: 'Right', legend: 'Right' }
];

const ANSI_ROWS = [
  ...FUNCTION_ROW,
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
    { code: 'BKSP', label: 'Backspace', span: 2, afterGap: 0.5 },
    ...NAV_ROW_1
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
    { code: 'BKSL', label: '\\', span: 1.5, afterGap: 0.5 },
    ...NAV_ROW_2
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
    { code: 'RTRN', label: 'Enter', span: 2.25, afterGap: 0.5 },
    { type: 'spacer', code: 'NAVSP1', span: 3 }
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
    { code: 'RTSH', label: 'Shift', span: 2.75, afterGap: 0.5 },
    ...ARROW_ROW_UP
  ],
  [
    { code: 'LCTL', label: 'Ctrl', span: 1.25 },
    { code: 'LWIN', label: 'Super', span: 1.25 },
    { code: 'LALT', label: 'Alt', span: 1.25 },
    { code: 'SPCE', label: 'Space', legend: '[SP]', span: 6.25 },
    { code: 'RALT', label: 'Alt', span: 1.25 },
    { code: 'RWIN', label: 'Menu', span: 1.25 },
    { code: 'I255', label: 'Fn', span: 1.25 },
    { code: 'RCTL', label: 'Ctrl', span: 1.25, afterGap: 0.5 },
    ...ARROW_ROW_DOWN
  ]
];

const ISO_ROWS = [
  ...FUNCTION_ROW,
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
    { code: 'BKSP', label: 'Backspace', span: 2, afterGap: 0.5 },
    ...NAV_ROW_1
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
    { type: 'spacer', code: 'ISOENTSP', span: 1.5, afterGap: 0.5 },
    ...NAV_ROW_2
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
    { code: 'BKSL', label: '\\' },
    { code: 'RTRN', label: 'Enter', span: 1.25, afterGap: 0.5 },
    { type: 'spacer', code: 'NAVSP1', span: 3 }
  ],
  [
    { code: 'LFSH', label: 'Shift', span: 1.25 },
    { code: 'LSGT', label: '<' },
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
    { code: 'RTSH', label: 'Shift', span: 2.75, afterGap: 0.5 },
    ...ARROW_ROW_UP
  ],
  [
    { code: 'LCTL', label: 'Ctrl', span: 1.25 },
    { code: 'LWIN', label: 'Super', span: 1.25 },
    { code: 'LALT', label: 'Alt', span: 1.25 },
    { code: 'SPCE', label: 'Space', legend: '[SP]', span: 6.25 },
    { code: 'RALT', label: 'Alt', span: 1.25 },
    { code: 'RWIN', label: 'Menu', span: 1.25 },
    { code: 'I255', label: 'Fn', span: 1.25 },
    { code: 'RCTL', label: 'Ctrl', span: 1.25, afterGap: 0.5 },
    ...ARROW_ROW_DOWN
  ]
];

const JIS_ROWS = [
  ...FUNCTION_ROW,
  [
    { code: 'HZTG', label: '半/全', legend: '半' },
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
    { code: 'AE12', label: '^' },
    { code: 'AE13', label: '¥' },
    { code: 'BKSP', label: 'Bksp', afterGap: 0.5 },
    ...NAV_ROW_1
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
    { code: 'AD11', label: '@' },
    { code: 'AD12', label: '[' },
    { code: 'BKSL', label: ']', span: 1.5, afterGap: 0.5 },
    ...NAV_ROW_2
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
    { code: 'AC11', label: ':' },
    { code: 'RTRN', label: 'Enter', span: 2.25, afterGap: 0.5 },
    { type: 'spacer', code: 'NAVSP1', span: 3 }
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
    { code: 'AB11', label: '\\' },
    { code: 'RTSH', label: 'Shift', span: 1.75, afterGap: 0.5 },
    ...ARROW_ROW_UP
  ],
  [
    { code: 'LCTL', label: 'Ctrl', span: 1.25 },
    { code: 'LWIN', label: 'Super', span: 1.25 },
    { code: 'LALT', label: 'Alt', span: 1.25 },
    { code: 'MUHE', label: '無変', legend: '無' },
    { code: 'SPCE', label: 'Space', legend: '[SP]', span: 3.25 },
    { code: 'HENK', label: '変換', legend: '変' },
    { code: 'HKTG', label: 'かな', legend: 'かな' },
    { code: 'RALT', label: 'Alt', span: 1.25 },
    { code: 'RWIN', label: 'Menu', span: 1.25 },
    { code: 'I255', label: 'Fn', span: 1.25 },
    { code: 'RCTL', label: 'Ctrl', span: 1.25, afterGap: 0.5 },
    ...ARROW_ROW_DOWN
  ]
];

const KEY_LAYOUTS = [
  { id: 'ansi', label: 'ANSI', rows: ANSI_ROWS },
  { id: 'iso', label: 'ISO', rows: ISO_ROWS },
  { id: 'jis', label: 'JIS', rows: JIS_ROWS }
];

const DEFAULT_LAYOUT_ID = 'ansi';

const getKeyboardRows = layoutId => {
  const layout = KEY_LAYOUTS.find(item => item.id === layoutId);
  return layout ? layout.rows : ANSI_ROWS;
};

const KEY_ROWS = ANSI_ROWS;

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
  AE11: '_', AE12: '+', AE13: '|',
  AD11: '{', AD12: '}', BKSL: '|',
  AC10: ':', AC11: '"',
  AB08: '<', AB09: '>', AB10: '?', AB11: '_', LSGT: '>'
};

const KEY_GAP = 5;

module.exports = {
  DEFAULT_LAYOUT_ID,
  getKeyboardRows,
  KEY_LAYOUTS,
  KEY_ROWS,
  KEY_GAP,
  LAYERS,
  US_SHIFT_SYMBOLS
};
