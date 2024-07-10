import React from "react";

const Menu = ({
  setLineColor,
  setLineWidth,
  clearcanvas,
  setLineOpacity,
 switchTopen,
  save,
  eraserfunc,
}) => {
  return (
    <div className=" bg-slate-800 text-white px-12 py-5 rounded flex  gap-3 ">
      <label>Brush Color </label>

      <input
        type="color"
        onChange={(e) => {
          setLineColor(e.target.value);
        }}
      />

      <label>Brush Width </label>

      <input
        type="range"
        min="3"
        max="20"
        defaultValue={5}
        onChange={(e) => {
          setLineWidth(e.target.value);
        }}
      />

      <label>Brush Opacity</label>

      <input
        type="range"
        min="1"
        max="100"
        onChange={(e) => {
          setLineOpacity(e.target.value / 100);
        }}
      />
      <button onClick={switchTopen} className="bg-slate-300 shadow-black shadow-md  text-black px-2 rounded-sm">pen</button>
      <button
        className="bg-red-700 text-white px-4 py-2 rounded-md font-semibold"
        onClick={clearcanvas}
      >
        {" "}
        clear
      </button>

      <button
        className="bg-slate-300 shadow-black shadow-md  text-black px-2 rounded-sm"
        onClick={save}
      >
        export as image
      </button>

      <button
        className="bg-slate-300 shadow-black shadow-md  text-black px-2 rounded-sm"
        onClick={eraserfunc}
      >
        eraser
      </button>
    </div>
  );
};

export default Menu;
