const { VK_TO_SYMBOL, VK_TO_WAYWALL_KEY, VK_TO_XKB_CODE } = require('../data/keyMaps');
const { getShiftedSymbol } = require('./layout');

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

module.exports = {
  parseToolscreenLayout
};
