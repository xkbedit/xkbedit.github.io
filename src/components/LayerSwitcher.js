const React = require('react');
const { LAYERS } = require('../data/keyboard');

const e = React.createElement;

const LayerSwitcher = ({ activeLayer, onChange }) =>
  e(
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

module.exports = LayerSwitcher;
