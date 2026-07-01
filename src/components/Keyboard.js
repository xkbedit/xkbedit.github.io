const React = require('react');
const { KEY_ROWS } = require('../data/keyboard');
const {
  getDefaultSymbol,
  getKeyStyle,
  getWaywallKey,
  hasExplicitLevel
} = require('../utils/layout');

const e = React.createElement;

const getKeyDisplay = ({ key, layout, remaps, activeLayer }) => {
  const storedLevels = layout[key.code];
  const legend = key.legend || key.label;
  const remapValue = remaps[getWaywallKey(key)];
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
          row.map((key, keyIdx) => {
            if (key.type === 'spacer') {
              return e('div', {
                key: key.code || `spacer-${rowIdx}-${keyIdx}`,
                className: 'key-spacer',
                style: getKeyStyle(key)
              });
            }

            const remapValue = remaps[getWaywallKey(key)];
            const keyDisplay = getKeyDisplay({ key, layout, remaps, activeLayer });

            return e(
              'button',
              {
                key: key.code,
                className: `key${activeKey === key.code ? ' key--active' : ''}${remapValue ? ' key--remapped' : ''}`,
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
              e('span', { className: 'key-code' }, key.code)
            );
          })
        )
      )
    )
  );

module.exports = Keyboard;
