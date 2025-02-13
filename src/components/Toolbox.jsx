import CalculatorButton from './CalculatorButton';
import { useDrag } from 'react-dnd';
import useThemeStore from '../stores/themeStore';

const Toolbox = () => {
  const { isDarkMode } = useThemeStore();

  const buttons = [
    ...[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => ({ value: String(num) })),
    { value: '+' }, { value: '-' }, { value: '*' }, { value: '/' }, { value: '=' }, { value: 'C' },
  ];

  // Draggable display item
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'calculator-component',
    item: { id: 'display', value: 'Display' },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), []);

  return (
    <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
      <h2 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
        Components
      </h2>

      {/* Draggable Display with Increased Height */}
      <div
        ref={drag}
        className={`p-4 mb-4 rounded-lg shadow-md cursor-move flex items-center justify-center
          ${isDragging ? 'opacity-50' : 'opacity-100'} 
          ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}`}
        style={{ height: '100px' }} // ⬆️ Increased height for better visibility
      >
        Display
      </div>

      {/* Draggable Buttons */}
      <div className="grid grid-cols-4 gap-2">
        {buttons.map((button, index) => (
          <CalculatorButton key={index} value={button.value} isToolbox={true} />
        ))}
      </div>
    </div>
  );
};

export default Toolbox;
