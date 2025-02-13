import { create } from 'zustand';

const useCalculatorStore = create((set, get) => ({
  components: [],
  displayExists: false,

  expression: '',
  result: '0',

  // History tracking for undo/redo
  history: [],
  currentHistoryIndex: -1,

  // Saved layouts
  savedLayouts: [],

  // Set display existence (to prevent multiple displays)
  setDisplayExists: (exists) => set({ displayExists: exists }),

  // Save to history for undo/redo
  saveToHistory: () => {
    const currentState = get();
    const newHistory = [
      ...currentState.history.slice(0, currentState.currentHistoryIndex + 1),
      {
        components: [...currentState.components],
        displayExists: currentState.displayExists,
      },
    ];

    set({
      history: newHistory,
      currentHistoryIndex: newHistory.length - 1,
    });
  },

  // Undo action
  undo: () => {
    const { currentHistoryIndex, history } = get();
    if (currentHistoryIndex > 0) {
      const previousState = history[currentHistoryIndex - 1];
      set({
        components: [...previousState.components],
        displayExists: previousState.displayExists,
        currentHistoryIndex: currentHistoryIndex - 1,
      });
    }
  },

  // Redo action
  redo: () => {
    const { currentHistoryIndex, history } = get();
    if (currentHistoryIndex < history.length - 1) {
      const nextState = history[currentHistoryIndex + 1];
      set({
        components: [...nextState.components],
        displayExists: nextState.displayExists,
        currentHistoryIndex: currentHistoryIndex + 1,
      });
    }
  },

  // Save current layout
  saveLayout: (name) => {
    const { components, displayExists } = get();
    const layout = {
      id: Date.now(),
      name,
      components: [...components],
      displayExists,
      createdAt: new Date().toISOString(),
    };

    set((state) => ({
      savedLayouts: [...state.savedLayouts, layout],
    }));

    // Save to localStorage
    const savedLayouts = JSON.parse(localStorage.getItem('calculatorLayouts') || '[]');
    localStorage.setItem('calculatorLayouts', JSON.stringify([...savedLayouts, layout]));
  },

  // Load saved layout
  loadLayout: (layoutId) => {
    const { savedLayouts } = get();
    const layout = savedLayouts.find((l) => l.id === layoutId);
    if (layout) {
      set({
        components: [...layout.components],
        displayExists: layout.displayExists,
      });
      get().saveToHistory();
    }
  },

  // Load saved layouts from localStorage
  loadSavedLayouts: () => {
    const savedLayouts = JSON.parse(localStorage.getItem('calculatorLayouts') || '[]');
    set({ savedLayouts });
  },

  // Add a component (buttons and display)
  addComponent: (component) => {
    if (component.id === 'display') {
      if (get().displayExists) return; // Prevent multiple displays
      set({
        displayExists: true,
        components: [...get().components, component],
      });
    } else {
      set({
        components: [...get().components, component],
      });
    }
    get().saveToHistory();
  },

  // Remove a component
  removeComponent: (id) => {
    if (id === 'display') {
      set({ displayExists: false });
    }
    set((state) => ({
      components: state.components.filter((comp) => comp.id !== id),
    }));
    get().saveToHistory();
  },

  // Update component position (buttons and display)
  updateComponentPosition: (id, position) => {
    set((state) => ({
      components: state.components.map((comp) =>
        comp.id === id ? { ...comp, position } : comp
      ),
    }));
    get().saveToHistory();
  },

  // Set expression in the calculator
  setExpression: (expression) => set({ expression }),

  // Calculate the result
  calculateResult: () =>
    set((state) => {
      try {
        const result = new Function('return ' + state.expression)();
        const newHistory = [
          ...state.history,
          { expression: state.expression, result: String(result) },
        ];
        return {
          result: String(result),
          expression: '',
          history: newHistory.slice(-10), // Keep last 10 calculations
        };
      } catch (error) {
        return { result: 'Error', expression: '' };
      }
    }),

  // Clear calculator expression
  clearCalculator: () => set({ expression: '', result: '0' }),
}));

export default useCalculatorStore;
