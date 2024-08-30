// src/components/Menu.js
import React from 'react';

const Menu = ({ setTool, setLineColor, setLineWidth, clearCanvas }) => {
  return (
    <div className="flex items-center justify-center space-x-4 mb-6">
      <button
        onClick={() => setTool('pen')}
        className="px-4 py-2 bg-blue-700 text-white rounded-md shadow hover:bg-blue-800"
      >
        Pen
      </button>
      <button
        onClick={() => setTool('rectangle')}
        className="px-4 py-2 bg-green-700 text-white rounded-md shadow hover:bg-green-800"
      >
        Rectangle
      </button>
      <input
        type="color"
        onChange={(e) => setLineColor(e.target.value)}
        className="w-10 h-10 p-0 border-0 bg-gray-700"
      />
      <input
        type="range"
        min="1"
        max="10"
        onChange={(e) => setLineWidth(e.target.value)}
        className="w-24"
      />
      <button
        onClick={clearCanvas}
        className="px-4 py-2 bg-red-700 text-white rounded-md shadow hover:bg-red-800"
      >
        Clear
      </button>
    </div>
  );
};

export default Menu;
