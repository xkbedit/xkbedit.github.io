const { XKB_CODE_TO_WAYWALL_KEY } = require('../data/keyMaps');

const escapeLuaString = value => String(value).replace(/\\/g, '\\\\').replace(/"/g, '\\"');

const unescapeLuaString = value => value.replace(/\\"/g, '"').replace(/\\\\/g, '\\');

const getTriggerRemaps = triggers => {
  const triggerRemaps = {};

  Object.entries(triggers || {}).forEach(([targetCode, triggerKey]) => {
    const targetKey = XKB_CODE_TO_WAYWALL_KEY[targetCode] || targetCode;
    if (!triggerKey || triggerKey === targetKey) return;
    triggerRemaps[triggerKey] = targetKey;
  });

  return triggerRemaps;
};

const createRemapsLua = (remaps, triggers = {}) => {
  const exportedRemaps = {
    ...remaps,
    ...getTriggerRemaps(triggers)
  };
  const lines = [
    'return {',
    '    remapped_kb = {'
  ];

  Object.keys(exportedRemaps).sort().forEach(fromKey => {
    lines.push(`        ["${escapeLuaString(fromKey)}"] = "${escapeLuaString(exportedRemaps[fromKey])}",`);
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

module.exports = {
  createRemapsLua,
  parseRemapsLua
};
