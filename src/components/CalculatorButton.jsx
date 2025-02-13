import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';
import useCalculatorStore from '../stores/calculatorStore';
import useThemeStore from '../stores/themeStore';

const CalculatorButton = ({ value, position, id, width = 60, height = 60, isToolbox = false }) => {
  const { setExpression, expression, calculateResult, clearCalculator } = useCalculatorStore();
  const { isDarkMode } = useThemeStore();

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'calculator-component',
    item: () => ({
      id,
      value,
      position,
      width,
      height,
      type: 'calculator-component'
    }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [id, value, position, width, height]);

  const handleClick = () => {
    if (!isToolbox && !isDragging) {
      if (value === '=') {
        calculateResult();
      } else if (value === 'C') {
        clearCalculator();
      } else {
        setExpression(expression + value);
      }
    }
  };

  const buttonStyles = {
    width: `${width}px`,
    height: `${height}px`,
    position: isToolbox ? 'relative' : 'absolute',
    left: isToolbox ? 'auto' : `${position?.x}px`,
    top: isToolbox ? 'auto' : `${position?.y}px`,
    cursor: isToolbox ? 'move' : 'pointer',
    opacity: isDragging ? 0.5 : 1,
    backgroundColor: isDarkMode ? '#4a5568' : '#ffffff',
    color: isDarkMode ? '#ffffff' : '#000000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    userSelect: 'none',
    transition: 'transform 0.2s ease, opacity 0.2s ease',
    border: isDarkMode ? '1px solid #718096' : '1px solid #cbd5e0',
    borderRadius: '8px',
    boxShadow: isDragging ? '0 4px 6px rgba(0, 0, 0, 0.2)' : '0 2px 4px rgba(0, 0, 0, 0.1)',
  };

  return (
    <div
      ref={drag}
      className="rounded-lg hover:scale-105 font-bold text-lg"
      style={buttonStyles}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick();
        }
      }}
    >
      {value}
    </div>
  );
};

CalculatorButton.propTypes = {
  value: PropTypes.string.isRequired,
  position: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
  id: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  isToolbox: PropTypes.bool,
};

CalculatorButton.defaultProps = {
  width: 60,
  height: 60,
  isToolbox: false,
  position: null,
  id: null,
};

export default CalculatorButton;