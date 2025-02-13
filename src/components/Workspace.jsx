import { useRef } from 'react';
import { useDrop } from 'react-dnd';
import CalculatorButton from './CalculatorButton';
import CalculatorDisplay from './CalculatorDisplay';
import useCalculatorStore from '../stores/calculatorStore';
import useThemeStore from '../stores/themeStore';
import CalculatorControls from './CalculatorControls';

const Workspace = () => {
  const { components, addComponent, updateComponentPosition, displayExists, setDisplayExists } = useCalculatorStore();
  const { isDarkMode } = useThemeStore();
  const workspaceRef = useRef(null);

  const buttonSize = 60;
  const rowSpacing = 15;
  const colSpacing = 15;
  const buttonsPerRow = 4;

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'calculator-component',
    drop: (item, monitor) => {
      const workspaceRect = workspaceRef.current.getBoundingClientRect();
      const clientOffset = monitor.getClientOffset();

      if (!clientOffset) return;

      let position = {
        x: clientOffset.x - workspaceRect.left,
        y: clientOffset.y - workspaceRect.top,
      };

      position.x = Math.max(0, Math.min(position.x, workspaceRect.width - buttonSize));
      position.y = Math.max(0, Math.min(position.y, workspaceRect.height - buttonSize));

      if (item.id === "display") {
        if (!displayExists) {
          setDisplayExists(true);
          addComponent({
            id: "display",
            value: "Display",
            position,
            width: buttonSize * 4 + colSpacing * 3,
            height: 80,
          });
        }
        return;
      }

      const buttonIndex = components.length;
      const row = Math.floor(buttonIndex / buttonsPerRow);
      const col = buttonIndex % buttonsPerRow;

      position.x = 20 + col * (buttonSize + colSpacing);
      position.y = 100 + row * (buttonSize + rowSpacing);

      addComponent({
        id: `component-${Date.now()}`,
        value: item.value,
        position,
        width: buttonSize,
        height: buttonSize,
      });
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }), [addComponent, updateComponentPosition, components, displayExists, setDisplayExists]);

  const combinedRef = (el) => {
    workspaceRef.current = el;
    drop(el);
  };

  return (
    <div className="space-y-4">
      <CalculatorControls />
      <div
        ref={combinedRef}
        className={`
          relative w-full h-[600px] rounded-lg p-4
          ${isDarkMode ? 'bg-gray-900' : 'bg-gray-200'}
          ${isOver ? 'border-2 border-blue-500' : 'border-2 border-transparent'}
          transition-colors duration-200
        `}
        style={{ position: 'relative', overflow: 'hidden' }}
      >
        {/* Render display only if added */}
        {displayExists && <CalculatorDisplay />}

        {/* Render draggable buttons */}
        {components.map((component) => (
          component.id !== "display" && (
            <CalculatorButton
              key={component.id}
              id={component.id}
              value={component.value}
              position={component.position}
              width={component.width}
              height={component.height}
            />
          )
        ))}
      </div>
    </div>
  );
};

export default Workspace;
