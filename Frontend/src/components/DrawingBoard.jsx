import React, { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';

// Assuming you're getting the boardId from URL or some other method
const boardId = '8989';  // Replace with actual board ID logic
const socket = io('http://localhost:3000'); // Change to your server URL

export default function DrawingBoard() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false); 
  const [color, setColor] = useState('#FFFFFF');
  const [lineWidth, setLineWidth] = useState(5);
  const [tool, setTool] = useState('pencil');
  const [shapes, setShapes] = useState([]);
  const [currentShape, setCurrentShape] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.fillStyle = '#1F2937';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }

    // Join the room for the specific board
    socket.emit('join-board', { boardId });

    // Listen for incoming drawing data from server
    socket.on('drawing-data', (data) => {
      if (data.boardId === boardId) {
        const { shape } = data;
        setShapes((prevShapes) => [...prevShapes, shape]);
      }
    });

    // Listen for clear canvas event
    socket.on('clear-canvas', (data) => {
      if (data.boardId === boardId) {
        clearCanvasLocal(); // Clear the canvas when another user clears it in the same board
      }
    });

    return () => {
      socket.off('drawing-data');
      socket.off('clear-canvas');
    };
  }, [boardId]);

  useEffect(() => {
    drawShapes();
  }, [shapes, currentShape]);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (tool === 'pencil' || tool === 'eraser') {
        setIsDrawing(true);
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.beginPath();
          ctx.moveTo(x, y);
        }
      } else {
        setCurrentShape({
          type: tool,
          startX: x,
          startY: y,
          endX: x,
          endY: y,
          color: color,
          lineWidth: lineWidth
        });
      }
    }
  };

  const draw = (e) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (tool === 'pencil' || tool === 'eraser') {
        if (!isDrawing) return;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.strokeStyle = tool === 'eraser' ? '#1F2937' : color;
          ctx.lineWidth = lineWidth;
          ctx.lineTo(x, y);
          ctx.stroke();

          // Emit drawing data to server
          socket.emit('drawing-data', {
            boardId,
            shape: {
              type: tool,
              startX: x,
              startY: y,
              color: tool === 'eraser' ? '#1F2937' : color,
              lineWidth: lineWidth
            }
          });
        }
      } else if (currentShape) {
        setCurrentShape({
          ...currentShape,
          endX: x,
          endY: y
        });
      }
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    if (currentShape) {
      setShapes((prevShapes) => [...prevShapes, currentShape]);

      // Emit shape data to server
      socket.emit('drawing-data', { boardId, shape: currentShape });
      setCurrentShape(null);
    }
  };

  const drawShapes = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#1F2937';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const allShapes = [...shapes, currentShape].filter(Boolean);

        allShapes.forEach((shape) => {
          ctx.strokeStyle = shape.color;
          ctx.fillStyle = shape.color;
          ctx.lineWidth = shape.lineWidth;
          ctx.beginPath();

          // Handle shapes (rectangle, circle, triangle, etc.)
          switch (shape.type) {
            case 'rectangle':
              ctx.rect(shape.startX, shape.startY, shape.endX - shape.startX, shape.endY - shape.startY);
              break;
            case 'circle':
              const radius = Math.sqrt(
                Math.pow(shape.endX - shape.startX, 2) + Math.pow(shape.endY - shape.startY, 2)
              );
              ctx.arc(shape.startX, shape.startY, radius, 0, 2 * Math.PI);
              break;
            case 'triangle':
              ctx.moveTo(shape.startX, shape.endY);
              ctx.lineTo(shape.endX, shape.endY);
              ctx.lineTo((shape.startX + shape.endX) / 2, shape.startY);
              ctx.closePath();
              break;
            case 'arrow':
              const angle = Math.atan2(shape.endY - shape.startY, shape.endX - shape.startX);
              ctx.moveTo(shape.startX, shape.startY);
              ctx.lineTo(shape.endX, shape.endY);
              ctx.lineTo(
                shape.endX - 15 * Math.cos(angle - Math.PI / 6),
                shape.endY - 15 * Math.sin(angle - Math.PI / 6)
              );
              ctx.moveTo(shape.endX, shape.endY);
              ctx.lineTo(
                shape.endX - 15 * Math.cos(angle + Math.PI / 6),
                shape.endY - 15 * Math.sin(angle + Math.PI / 6)
              );
              break;
            case 'line':
              ctx.moveTo(shape.startX, shape.startY);
              ctx.lineTo(shape.endX, shape.endY);
              break;
            default:
              break;
          }

          ctx.stroke();
        });
      }
    }
  };

  const clearCanvasLocal = () => {
    setShapes([]);
    setCurrentShape(null);
    const canvas = canvasRef.current;

    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#1F2937';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  const clearCanvas = () => {
    clearCanvasLocal(); // Clear canvas locally
    socket.emit('clear-canvas', { boardId }); // Emit clear event to the server
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-4 bg-gray-900 min-h-screen">
      <div className="flex space-x-4 flex-wrap justify-center">
        {/* Tool selection UI (Select Box) */}
        <select
          value={tool}
          onChange={(e) => setTool(e.target.value)}
          className="p-2 border rounded bg-gray-800 text-white"
        >
          <option value="pencil">Pencil</option>
          <option value="eraser">Eraser</option>
          <option value="rectangle">Rectangle</option>
          <option value="circle">Circle</option>
          <option value="triangle">Triangle</option>
          <option value="arrow">Arrow</option>
          <option value="line">Line</option>
        </select>

        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="h-10 w-10 bg-gray-800 border-none"
        />

        <div className="flex items-center space-x-2">
          <span className="text-white">Line Width:</span>
          <input
            type="range"
            min="1"
            max="20"
            value={lineWidth}
            onChange={(e) => setLineWidth(parseInt(e.target.value))}
            className="w-[100px]"
          />
        </div>

        <button
          onClick={clearCanvas}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          Clear Canvas
        </button>
      </div>
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
       onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        className="border border-gray-600 rounded"
      />
    </div>
  );
}
