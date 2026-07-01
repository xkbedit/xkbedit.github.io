const React = require('react');
const { LAYERS } = require('../data/keyboard');

const e = React.createElement;

const KeyEditor = ({
  activeLayer,
  clearTrigger,
  editor,
  getFullRebindValue,
  getLayerValue,
  getTriggerValue,
  getWaywallKey,
  setEditor,
  setMode,
  startEditorDrag,
  startFullRebindPick,
  startTriggerPick,
  updateFullRebind,
  updateSplitTypes
}) => {
  if (!editor) return null;

  return e(
    'div',
    {
      className: `key-editor-popover${editor.pickTarget ? ' key-editor-popover--picking' : ''}`,
      style: {
        left: `${editor.x}px`,
        top: `${editor.y}px`
      }
    },
    e(
      'div',
      { className: 'key-editor-header', onPointerDown: startEditorDrag },
      e(
        'div',
        null,
        e(
          'span',
          { className: 'key-editor-title' },
          e('span', { className: 'key-editor-name' }, editor.key.label),
          e('span', { className: 'key-editor-code' }, ` <${editor.key.code}>`)
        ),
        e('span', { className: 'key-editor-layer' }, LAYERS[activeLayer].label)
      ),
      e('button', { type: 'button', className: 'key-editor-close', onClick: () => setEditor(null) }, 'Close')
    ),
    e(
      'div',
      { className: 'rebind-mode-tabs' },
      e(
        'button',
        {
          type: 'button',
          className: `rebind-mode-tab${editor.mode === 'full' ? ' rebind-mode-tab--active' : ''}`,
          onClick: () => setMode('full')
        },
        'Full Rebind'
      ),
      e(
        'button',
        {
          type: 'button',
          className: `rebind-mode-tab${editor.mode === 'split' ? ' rebind-mode-tab--active' : ''}`,
          onClick: () => setMode('split')
        },
        'Split Rebind'
      )
    ),
    editor.mode === 'full'
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
                value: editor.pickTarget === 'full' ? 'pick a key on layout' : getFullRebindValue(editor.key),
                placeholder: getWaywallKey(editor.key),
                onChange: event => updateFullRebind(event.target.value),
                autoFocus: true
              }),
              e(
                'button',
                {
                  type: 'button',
                  className: `trigger-picker-button${editor.pickTarget === 'full' ? ' trigger-picker-button--active' : ''}`,
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
              value: getLayerValue(editor.key, activeLayer),
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
                value: editor.pickTarget === 'trigger' ? 'pick a key on layout' : getTriggerValue(editor.key),
                readOnly: true
              }),
              e(
                'button',
                {
                  type: 'button',
                  className: `trigger-picker-button${editor.pickTarget === 'trigger' ? ' trigger-picker-button--active' : ''}`,
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
  );
};

module.exports = KeyEditor;
