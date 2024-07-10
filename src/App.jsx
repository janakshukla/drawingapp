import { useEffect, useRef, useState } from "react";

import Menu from "./components/Menu";



function App() {
  const canvasRef = useRef(null);

  const ctxRef = useRef(null);

  const [isDrawing, setIsDrawing] = useState(false);

  const [lineWidth, setLineWidth] = useState(5);

  const [lineColor, setLineColor] = useState("black");

  const [lineOpacity, setLineOpacity] = useState(0.1);

  // Initialization when the component

  // mounts for the first time

  useEffect(() => {
    const canvas = canvasRef.current;

    const ctx = canvas.getContext("2d");

    ctx.lineCap = "round";

    ctx.lineJoin = "round";

    ctx.globalAlpha = lineOpacity;

    ctx.strokeStyle = lineColor;

    ctx.lineWidth = lineWidth;

    ctxRef.current = ctx;
  }, [lineColor, lineOpacity, lineWidth]);
  

  

  const startDrawing = (e) => {
    ctxRef.current.beginPath();

    ctxRef.current.moveTo(
      e.nativeEvent.offsetX,

      e.nativeEvent.offsetY
    );

    setIsDrawing(true);
  };

  // Function for ending the drawing

  const endDrawing = () => {
    ctxRef.current.closePath();

    setIsDrawing(false);
  };
  const clearcanvas = ()=>{
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.save();
    ctx.clearRect(0,0,canvas.width,canvas.height)
  }
  
 const save = () => {  
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const data = canvas.toDataURL();
    const a = document.createElement
    ('a');
    a.href
    = data;
    a.download = 'image.png';
    a.click();
  }
  const eraserfunc = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.globalCompositeOperation = 'destination-out';
  }

  const draw = (e) => {
    if (!isDrawing) {
      return;
    }

    ctxRef.current.lineTo(
      e.nativeEvent.offsetX,

      e.nativeEvent.offsetY
    );

    ctxRef.current.stroke();
  };
 const switchTopen = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.globalCompositeOperation = 'source-over';
  }

  return (
   <>
    <div className="bg-gray-900 h-screen w-screen ">
      <h1 className="text-center text-5xl font-bold text-blue-800 mb-6">Drawing app </h1>

      <div className=" flex flex-col gap-14  justify-center items-center">
        <Menu
          setLineColor={setLineColor}
          setLineWidth={setLineWidth}
          setLineOpacity={setLineOpacity}
          clearcanvas={clearcanvas}
         switchTopen={switchTopen}
          save={save}
          eraserfunc={eraserfunc}

        />

        <canvas
          onMouseDown={startDrawing}
          onMouseUp={endDrawing}
          onMouseMove={draw}
          ref={canvasRef}
          width={`1200px`}
          height={`500px`}
          className="bg-gray-300 rounded-full"
        />
      </div>
    </div>
   </>
  );
}

export default App;
