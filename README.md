# React Calculator Builder

A drag-and-drop calculator builder application built with React, allowing users to create custom calculator layouts with dynamic components.

## Features

- 🎨 Drag & Drop Interface
- 🎯 Customizable Calculator Display
- 🌓 Dark/Light Mode Toggle
- 💾 Local Storage Persistence
- 📱 Responsive Design
- 🎛️ Dynamic Component Positioning

## Prerequisites

Before you begin, ensure you have installed:
- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd calculator-builder
```

2. Install the required dependencies:
```bash
npm install
```

Required dependencies include:
- react
- react-dom
- zustand (for state management)
- react-dnd (for drag and drop)
- react-dnd-html5-backend
- prop-types
- tailwindcss
- @tailwindcss/forms

## Project Structure

```
/src
  /components
    CalculatorButton.jsx    # Individual calculator buttons
    CalculatorDisplay.jsx   # Calculator display component
    Toolbox.jsx            # Component toolbox
    Workspace.jsx          # Main workspace area
  /stores
    calculatorStore.js     # Zustand store for calculator state
    themeStore.js         # Theme management store
  /hooks
    usePersistedStore.js  # Local storage persistence hook
  App.jsx                 # Main application component
  main.jsx               # Application entry point
  index.css              # Global styles
```

## Running the Application

1. Start the development server:
```bash
npm run dev
```

2. Open your browser and navigate to:
```
http://localhost:5173
```

## Usage Instructions

1. **Adding Components**
   - Drag buttons from the toolbox on the left to the workspace
   - Components can be placed anywhere within the workspace

2. **Customizing Display**
   - Double-click the display to open customization options
   - Adjust width, height, colors, and font size
   - Click 'Done' to save changes

3. **Using the Calculator**
   - Click buttons to input numbers and operations
   - Use 'C' to clear
   - Use '=' to calculate results

4. **Theme Toggle**
   - Click the theme toggle button in the top-right corner to switch between dark and light modes

## Development

### Building for Production

1. Create a production build:
```bash
npm run build
```

2. Preview the production build:
```bash
npm run preview
```

### Testing

Run the test suite:
```bash
npm test
```

## Troubleshooting

Common issues and solutions:

1. **Components not dragging:**
   - Ensure react-dnd is properly installed
   - Check if HTML5Backend is properly configured

2. **State not persisting:**
   - Clear browser cache
   - Check localStorage permissions

3. **Styling issues:**
   - Run `npm run build:css` to rebuild Tailwind styles
   - Check for proper Tailwind configuration



