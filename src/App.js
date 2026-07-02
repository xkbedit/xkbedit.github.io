const React = require('react');
const Keyboard = require('./components/Keyboard');
const KeyEditor = require('./components/KeyEditor');
const LayerSwitcher = require('./components/LayerSwitcher');
const { DEFAULT_LAYOUT_ID, getKeyboardRows, KEY_LAYOUTS, LAYERS } = require('./data/keyboard');
const {
  buildInitialLayout,
  clearRemapForKey,
  getDefaultSymbol,
  getRemapValue,
  getWaywallKey,
  getXkbCodeForWaywallKey,
  hasExplicitLevel
} = require('./utils/layout');
const { createRemapsLua, parseRemapsLua } = require('./utils/remapsLua');
const { parseToolscreenLayout } = require('./utils/toolscreen');
const { createXkbSnippet, parseXkbSymbols } = require('./utils/xkbSymbols');

const e = React.createElement;

const App = () => {
  const [layout, setLayout] = React.useState(() => buildInitialLayout());
  const [remaps, setRemaps] = React.useState({});
  const [triggers, setTriggers] = React.useState({});
  const [activeKey, setActiveKey] = React.useState(null);
  const [activeLayer, setActiveLayer] = React.useState(0);
  const [keyboardLayout, setKeyboardLayout] = React.useState(DEFAULT_LAYOUT_ID);
  const [importStatus, setImportStatus] = React.useState('');
  const [keyEditor, setKeyEditor] = React.useState(null);
  const [removeUsedDefaults, setRemoveUsedDefaults] = React.useState(true);
  const [showToolscreenHelp, setShowToolscreenHelp] = React.useState(false);
  const fileInputRef = React.useRef(null);
  const xkbFileInputRef = React.useRef(null);
  const remapsFileInputRef = React.useRef(null);
  const editorDragRef = React.useRef(null);

  const keyRows = React.useMemo(() => getKeyboardRows(keyboardLayout), [keyboardLayout]);
  const xkbSnippet = React.useMemo(
    () => createXkbSnippet(layout, { keyRows, removeUsedDefaults }),
    [keyRows, layout, removeUsedDefaults]
  );
  const remapsLua = React.useMemo(() => createRemapsLua(remaps, triggers), [remaps, triggers]);

  React.useEffect(() => {
    const handleKeyDown = event => {
      if (event.key !== 'Escape') return;
      editorDragRef.current = null;
      setKeyEditor(null);
      setActiveKey(null);
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  React.useEffect(() => {
    const handlePointerMove = event => {
      if (!editorDragRef.current) return;

      const nextX = Math.max(0, Math.round(event.clientX + window.scrollX - editorDragRef.current.offsetX));
      const nextY = Math.max(0, Math.round(event.clientY + window.scrollY - editorDragRef.current.offsetY));
      setKeyEditor(current => current ? { ...current, x: nextX, y: nextY } : current);
    };

    const stopDrag = () => {
      editorDragRef.current = null;
    };

    document.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('pointerup', stopDrag);
    document.addEventListener('pointercancel', stopDrag);

    return () => {
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerup', stopDrag);
      document.removeEventListener('pointercancel', stopDrag);
    };
  }, []);

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

    if (keyEditor && keyEditor.pickTarget) {
      handlePickedKey(key);
      return;
    }

    setActiveKey(key.code);
    setKeyEditor({
      key,
      mode: getRemapValue(remaps, key) ? 'full' : 'split',
      x: Math.round(rect.left + rect.width / 2 + window.scrollX),
      y: Math.round(rect.top + rect.height / 2 + window.scrollY)
    });
  };

  const handlePickedKey = key => {
    const pickedKey = getWaywallKey(key);

    if (keyEditor.pickTarget === 'trigger') {
      setTriggers(prev => ({
        ...prev,
        [keyEditor.pickForCode]: pickedKey
      }));
    }

    if (keyEditor.pickTarget === 'full') {
      const sourceKey = getWaywallKey(keyEditor.key);
      setLayout(prev => {
        const copy = { ...prev };
        delete copy[keyEditor.key.code];
        return copy;
      });
      setRemaps(prev => ({
        ...clearRemapForKey(prev, keyEditor.key),
        [sourceKey]: pickedKey
      }));
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
  };

  const startEditorDrag = event => {
    if (!keyEditor || keyEditor.pickTarget || event.button !== 0) return;
    if (event.target.closest('button, input, textarea')) return;

    event.preventDefault();
    editorDragRef.current = {
      offsetX: event.clientX + window.scrollX - keyEditor.x,
      offsetY: event.clientY + window.scrollY - keyEditor.y
    };
  };

  const setKeyEditorMode = mode => {
    if (keyEditor && mode === 'split') {
      setRemaps(prev => clearRemapForKey(prev, keyEditor.key));
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

    setRemaps(prev => clearRemapForKey(prev, keyEditor.key));

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

  const getFullRebindValue = key => getRemapValue(remaps, key);

  const updateFullRebind = value => {
    if (!keyEditor) return;

    setLayout(prev => {
      const copy = { ...prev };
      delete copy[keyEditor.key.code];
      return copy;
    });

    setRemaps(prev => {
      const sourceKey = getWaywallKey(keyEditor.key);
      const copy = clearRemapForKey(prev, keyEditor.key);

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

  const splitRemapsForLayout = (importedRemaps, typeLayout) => {
    const fullRemaps = {};
    const splitTriggers = {};

    Object.entries(importedRemaps).forEach(([fromKey, toKey]) => {
      const targetCode = getXkbCodeForWaywallKey(toKey);

      if (targetCode && typeLayout[targetCode]) {
        splitTriggers[targetCode] = fromKey;
      } else {
        fullRemaps[fromKey] = toKey;
      }
    });

    return { fullRemaps, splitTriggers };
  };

  const openToolscreenPicker = () => {
    setShowToolscreenHelp(false);
    fileInputRef.current.click();
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

      const converted = splitRemapsForLayout(remaps, result.layout);

      setLayout(result.layout);
      setRemaps(converted.fullRemaps);
      setTriggers(prev => {
        return {
          ...prev,
          ...converted.splitTriggers
        };
      });
      setActiveLayer(0);
      setActiveKey(null);
      setKeyEditor(null);
      setImportStatus(
        `Imported ${result.importedCount} xkb_symbols keys from ${file.name}${
          Object.keys(converted.splitTriggers).length ? ` (${Object.keys(converted.splitTriggers).length} remaps converted to split triggers)` : ''
        }.`
      );
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

      const converted = splitRemapsForLayout(result.remaps, layout);

      setRemaps(converted.fullRemaps);
      setTriggers(prev => ({
        ...prev,
        ...converted.splitTriggers
      }));
      setActiveKey(null);
      setKeyEditor(null);
      setImportStatus(
        `Imported ${result.importedCount} remaps from ${file.name}${
          Object.keys(converted.splitTriggers).length ? ` (${Object.keys(converted.splitTriggers).length} split triggers)` : ''
        }.`
      );
    } catch (error) {
      setImportStatus(`Could not import ${file.name}: ${error.message}`);
    }
  };

  const downloadFile = (filename, contents, type) => {
    const blob = new Blob([contents], { type });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = filename;
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
        e('button', { type: 'button', className: 'text-action text-action--strong', onClick: () => setShowToolscreenHelp(true) }, 'Import Toolscreen'),
        e('button', { type: 'button', className: 'text-action text-action--strong', onClick: () => xkbFileInputRef.current.click() }, 'Import xkb_symbols'),
        e('button', { type: 'button', className: 'text-action text-action--strong', onClick: () => remapsFileInputRef.current.click() }, 'Import remaps.lua'),
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
      e('p', { className: 'intro' }, 'Select a layer, click a key, and assign a symbol.'),
      importStatus && e('p', { className: 'import-status' }, importStatus)
    ),
    showToolscreenHelp && e(
      'div',
      { className: 'modal-backdrop', onClick: () => setShowToolscreenHelp(false) },
      e(
        'div',
        { className: 'import-modal', role: 'dialog', 'aria-modal': 'true', onClick: event => event.stopPropagation() },
        e('h2', null, 'Import Toolscreen'),
        e('p', null, 'In the file picker, open:'),
        e('code', null, '%USERPROFILE%\\.config\\Toolscreen\\config.toml'),
        e(
          'div',
          { className: 'modal-actions' },
          e('button', { type: 'button', className: 'text-action', onClick: () => setShowToolscreenHelp(false) }, 'Cancel'),
          e('button', { type: 'button', className: 'text-action text-action--strong', onClick: openToolscreenPicker }, 'Open picker')
        )
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
      e(
        'div',
        { className: 'layout-tabs' },
        KEY_LAYOUTS.map(item =>
          e(
            'button',
            {
              key: item.id,
              type: 'button',
              className: `layout-tab${keyboardLayout === item.id ? ' layout-tab--active' : ''}`,
              onClick: () => setKeyboardLayout(item.id)
            },
            item.label
          )
        )
      ),
      e(LayerSwitcher, { activeLayer, onChange: setActiveLayer }),
      e(Keyboard, { keyRows, layout, remaps, triggers, activeKey, activeLayer, removeUsedDefaults, onKeyClick: handleKeyClick }),
      e(KeyEditor, {
        activeLayer,
        clearTrigger,
        editor: keyEditor,
        getFullRebindValue,
        getLayerValue,
        getTriggerValue,
        getWaywallKey,
        setEditor: setKeyEditor,
        setMode: setKeyEditorMode,
        startEditorDrag,
        startFullRebindPick,
        startTriggerPick,
        updateFullRebind,
        updateSplitTypes
      })
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
        e(
          'label',
          { className: 'option-toggle' },
          e('input', {
            type: 'checkbox',
            checked: removeUsedDefaults,
            onChange: event => setRemoveUsedDefaults(event.target.checked)
          }),
          e('span', null, 'Remove used defaults')
        ),
        e(
          'button',
          {
            type: 'button',
            className: 'text-action text-action--strong',
            onClick: () => downloadFile('mc', xkbSnippet, 'application/octet-stream')
          },
          'Download mc'
        ),
        e(
          'button',
          {
            type: 'button',
            className: 'text-action text-action--strong',
            onClick: () => downloadFile('remaps.lua', remapsLua, 'text/plain;charset=utf-8')
          },
          'Download remaps.lua'
        )
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

module.exports = App;
