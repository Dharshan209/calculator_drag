import { useState } from 'react';
import { useDrag } from 'react-dnd';
import useCalculatorStore from '../stores/calculatorStore';
import useThemeStore from '../stores/themeStore';

const CalculatorDisplay = () => {
  const { expression, result, displayConfig, displayExists, updateDisplayConfig } = useCalculatorStore();
  const { isDarkMode } = useThemeStore();
  const [isEditing, setIsEditing] = useState(false);

  // Ensure displayConfig always exists
  const safeDisplayConfig = displayConfig || {
    position: { x: 20, y: 20 },
    width: 280,
    height: 80,
    fontSize: 24,
    backgroundColor: '#ffffff',
    textColor: '#000000',
  };

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'calculator-component',
    item: { id: 'display', ...safeDisplayConfig },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  // Hide the display if it hasn't been added yet
  if (!displayExists) return null;

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleConfigChange = (e) => {
    const { name, value } = e.target;
    updateDisplayConfig({ [name]: value });
  };

  const displayStyles = {
    position: 'absolute',
    left: safeDisplayConfig.position.x,
    top: safeDisplayConfig.position.y,
    width: `${safeDisplayConfig.width}px`,
    height: `${safeDisplayConfig.height}px`,
    backgroundColor: isDarkMode ? '#2d3748' : safeDisplayConfig.backgroundColor,
    color: isDarkMode ? '#ffffff' : safeDisplayConfig.textColor,
    fontSize: `${safeDisplayConfig.fontSize}px`,
    transition: 'all 0.2s ease',
    cursor: 'move',
    userSelect: 'none',
    opacity: isDragging ? 0.5 : 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <>
      <div
        ref={drag}
        className="rounded-lg shadow-lg p-4"
        style={displayStyles}
        onDoubleClick={handleDoubleClick}
      >
        <div className="text-sm opacity-70">{expression || '\u00A0'}</div>
        <div className="font-bold">{result}</div>
      </div>

      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} p-6 rounded-lg shadow-xl`}>
            <h3 className="text-lg font-bold mb-4">Customize Display</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Width (px)</label>
                <input
                  type="number"
                  name="width"
                  value={safeDisplayConfig.width}
                  onChange={handleConfigChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Height (px)</label>
                <input
                  type="number"
                  name="height"
                  value={safeDisplayConfig.height}
                  onChange={handleConfigChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Font Size (px)</label>
                <input
                  type="number"
                  name="fontSize"
                  value={safeDisplayConfig.fontSize}
                  onChange={handleConfigChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Background Color</label>
                <input
                  type="color"
                  name="backgroundColor"
                  value={safeDisplayConfig.backgroundColor}
                  onChange={handleConfigChange}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Text Color</label>
                <input
                  type="color"
                  name="textColor"
                  value={safeDisplayConfig.textColor}
                  onChange={handleConfigChange}
                  className="w-full"
                />
              </div>
              <button
                onClick={() => setIsEditing(false)}
                className="w-full mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CalculatorDisplay;
