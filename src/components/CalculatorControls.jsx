import React, { useState } from 'react';
import useCalculatorStore from '../stores/calculatorStore';

const CalculatorControls = () => {
  const [isShowingSaves, setIsShowingSaves] = useState(false);
  const [newLayoutName, setNewLayoutName] = useState('');
  const {
    undo,
    redo,
    saveLayout,
    loadLayout,
    savedLayouts,
    loadSavedLayouts,
    history,
    currentHistoryIndex
  } = useCalculatorStore();

  // Load saved layouts on mount
  React.useEffect(() => {
    loadSavedLayouts();
  }, [loadSavedLayouts]);

  const handleSave = () => {
    if (newLayoutName.trim()) {
      saveLayout(newLayoutName.trim());
      setNewLayoutName('');
      setIsShowingSaves(false);
    }
  };

  return (
    <div className="mb-4 flex flex-col gap-4">
      {/* Undo/Redo Controls */}
      <div className="flex gap-2">
        <button
          onClick={undo}
          disabled={currentHistoryIndex <= 0}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ↩ Undo
        </button>
        <button
          onClick={redo}
          disabled={currentHistoryIndex >= history.length - 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ↪ Redo
        </button>
        <button
          onClick={() => setIsShowingSaves(!isShowingSaves)}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          💾 Layouts
        </button>
      </div>

      {/* Save/Load Panel */}
      {isShowingSaves && (
        <div className="bg-white rounded-lg shadow-lg p-4">
          {/* Save New Layout */}
          <div className="mb-4 flex gap-2">
            <input
              type="text"
              value={newLayoutName}
              onChange={(e) => setNewLayoutName(e.target.value)}
              placeholder="Layout name"
              className="flex-1 px-3 py-2 border rounded"
            />
            <button
              onClick={handleSave}
              disabled={!newLayoutName.trim()}
              className="px-4 py-2 bg-green-500 text-white rounded disabled:opacity-50"
            >
              Save Current
            </button>
          </div>

          {/* Saved Layouts List */}
          <div className="space-y-2">
            <h3 className="font-bold">Saved Layouts</h3>
            {savedLayouts.length === 0 ? (
              <p className="text-gray-500">No saved layouts yet</p>
            ) : (
              savedLayouts.map((layout) => (
                <div
                  key={layout.id}
                  className="flex items-center justify-between bg-gray-50 p-2 rounded"
                >
                  <span>{layout.name}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => loadLayout(layout.id)}
                      className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
                    >
                      Load
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CalculatorControls;