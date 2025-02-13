
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Toolbox from './components/Toolbox';
import Workspace from './components/Workspace';
import useThemeStore from './stores/themeStore';

const App = () => {
  const { isDarkMode, toggleDarkMode } = useThemeStore();

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={`min-h-screen p-8 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Calculator Builder
            </h1>
            <button
              onClick={toggleDarkMode}
              className={`
                px-4 py-2 rounded-lg shadow-md
                ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'}
              `}
            >
              {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <Toolbox />
            </div>
            <div className="md:col-span-3">
              <Workspace />
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default App;