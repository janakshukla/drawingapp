// src/App.js
import React, { useState } from 'react';
import Canvas from './components/Canvas';
import Menu from './components/Menu';

function App() {
  const [tool, setTool] = useState('pen');
  const [lineColor, setLineColor] = useState('#FFFFFF');
  const [lineWidth, setLineWidth] = useState(5);
  const [shouldClearCanvas, setShouldClearCanvas] = useState(false);

  const clearCanvas = () => {
    setShouldClearCanvas(true);
  };

  const handleClearCanvas = () => {
    setShouldClearCanvas(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-4xl font-bold text-gray-200 mb-8">Drawing App</h1>
      <Menu
        setTool={setTool}
        setLineColor={setLineColor}
        setLineWidth={setLineWidth}
        clearCanvas={clearCanvas}
      />
      <Canvas
        tool={tool}
        lineColor={lineColor}
        lineWidth={lineWidth}
        shouldClearCanvas={shouldClearCanvas}
        onClearCanvas={handleClearCanvas}
      />
    </div>
  );
}

export default App;
