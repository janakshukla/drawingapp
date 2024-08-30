// src/components/Canvas.js
import React, { useRef, useState, useEffect } from 'react';

const Canvas = ({ tool, lineColor, lineWidth, shouldClearCanvas, onClearCanvas }) => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [rectangles, setRectangles] = useState([]);
  const [lines, setLines] = useState([]); // Store drawn lines

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = lineWidth;
    ctxRef.current = ctx;

    if (shouldClearCanvas) {
      clearCanvas();
      onClearCanvas();
    }
  }, [lineColor, lineWidth, shouldClearCanvas, onClearCanvas]);

  const startDrawing = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    setStartPos({ x: offsetX, y: offsetY });
    setIsDrawing(true);

    if (tool === 'pen') {
      ctxRef.current.beginPath();
      ctxRef.current.moveTo(offsetX, offsetY);
    }
  };

  const draw = (e) => {
    if (!isDrawing) return;

    const { offsetX, offsetY } = e.nativeEvent;

    if (tool === 'pen') {
      ctxRef.current.lineTo(offsetX, offsetY);
      ctxRef.current.stroke();
      setLines((prevLines) => [
        ...prevLines,
        { x1: startPos.x, y1: startPos.y, x2: offsetX, y2: offsetY },
      ]);
      setStartPos({ x: offsetX, y: offsetY });
    } else if (tool === 'rectangle') {
      const width = offsetX - startPos.x;
      const height = offsetY - startPos.y;

      // Clear canvas and redraw all rectangles and lines
      clearCanvas(false);
      rectangles.forEach(rect => {
        ctxRef.current.strokeRect(rect.x, rect.y, rect.width, rect.height);
      });
      lines.forEach(line => {
        ctxRef.current.beginPath();
        ctxRef.current.moveTo(line.x1, line.y1);
        ctxRef.current.lineTo(line.x2, line.y2);
        ctxRef.current.stroke();
      });

      // Draw the current rectangle
      ctxRef.current.strokeRect(startPos.x, startPos.y, width, height);
    }
  };

  const endDrawing = (e) => {
    if (isDrawing && tool === 'rectangle') {
      const { offsetX, offsetY } = e.nativeEvent;
      const newRect = {
        x: startPos.x,
        y: startPos.y,
        width: offsetX - startPos.x,
        height: offsetY - startPos.y,
      };
      setRectangles([...rectangles, newRect]);
    }
    setIsDrawing(false);
  };

  const clearCanvas = (clearState = true) => {
    const canvas = canvasRef.current;
    ctxRef.current.clearRect(0, 0, canvas.width, canvas.height);
    if (clearState) {
      setRectangles([]); // Clear rectangles
      setLines([]); // Clear lines
    }
  };

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={600}
      className="border border-gray-600 rounded-lg shadow-md bg-gray-800"
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={endDrawing}
      onMouseLeave={endDrawing}
    />
  );
};

export default Canvas;
