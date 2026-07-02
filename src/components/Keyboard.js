const React = require('react');
const {
  collectExplicitSymbols,
  getDefaultSymbol,
  getKeyStyle,
  getRemapValue,
  getWaywallKey,
  hasExplicitLevel,
  shouldRemoveDefault
} = require('../utils/layout');

const e = React.createElement;

const getKeyDisplay = ({ key, layout, remaps, activeLayer, explicitSymbols, removeUsedDefaults }) => {
  const storedLevels = layout[key.code];
  const legend = key.legend || key.label;
  const remapValue = getRemapValue(remaps, key);
  const storedVal = storedLevels ? storedLevels[activeLayer] : undefined;

  if (remapValue) {
    return {
      display: remapValue,
      isPlaceholder: false,
      shrink: remapValue.length > 3
    };
  }

  if (hasExplicitLevel(storedVal)) {
    return {
      display: storedVal,
      isPlaceholder: false,
      shrink: false
    };
  }

  if (storedLevels) {
    return {
      display: '',
      isPlaceholder: false,
      shrink: false
    };
  }

  const defaultSymbol = getDefaultSymbol(key, activeLayer);
  if (defaultSymbol !== undefined) {
    if (shouldRemoveDefault(key, defaultSymbol, explicitSymbols, removeUsedDefaults)) {
      return {
        display: '',
        isPlaceholder: false,
        shrink: false
      };
    }

    return {
      display: defaultSymbol,
      isPlaceholder: true,
      shrink: defaultSymbol.length > 3
    };
  }

  if (activeLayer === 0) {
    return {
      display: legend,
      isPlaceholder: true,
      shrink: legend.length > 1
    };
  }

  return {
    display: '',
    isPlaceholder: false,
    shrink: false
  };
};

const Keyboard = ({ keyRows, layout, remaps, triggers, activeKey, activeLayer, removeUsedDefaults, onKeyClick }) => {
  const explicitSymbols = React.useMemo(() => collectExplicitSymbols(layout), [layout]);

  return e(
    'div',
    { className: 'keyboard-wrapper' },
    e(
      'div',
      { className: 'keyboard' },
      keyRows.map((row, rowIdx) =>
        e(
          'div',
          { className: 'key-row', key: rowIdx },
          row.map((key, keyIdx) => {
            if (key.type === 'spacer') {
              return e('div', {
                key: key.code || `spacer-${rowIdx}-${keyIdx}`,
                className: 'key-spacer',
                style: getKeyStyle(key)
              });
            }

            const remapValue = getRemapValue(remaps, key);
            const triggerValue = triggers[key.code];
            const keyDisplay = getKeyDisplay({
              key,
              layout,
              remaps,
              activeLayer,
              explicitSymbols,
              removeUsedDefaults
            });

            return e(
              'button',
              {
                key: key.code,
                className: `key${activeKey === key.code ? ' key--active' : ''}${remapValue ? ' key--remapped' : ''}${triggerValue ? ' key--triggered' : ''}`,
                onClick: event => onKeyClick(key, event),
                style: getKeyStyle(key)
              },
              e(
                'span',
                {
                  className: `key-symbol${keyDisplay.shrink ? ' key-symbol--small' : ''}`,
                  style: { opacity: keyDisplay.isPlaceholder ? 0.5 : 1 }
                },
                keyDisplay.display
              ),
              triggerValue && e(
                'span',
                {
                  className: `key-trigger${triggerValue.length > 6 ? ' key-trigger--small' : ''}`,
                  title: `Trigger: ${triggerValue}`
                },
                triggerValue
              ),
              e('span', { className: 'key-code' }, key.code)
            );
          })
        )
      )
    )
  );
};

module.exports = Keyboard;
