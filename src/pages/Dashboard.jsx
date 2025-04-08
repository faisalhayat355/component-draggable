import React from "react";
import Draggable from "react-draggable";

export default function Dashboard() {
  return (
    <div className="relative h-[calc(100vh-4rem)] p-4 overflow-hidden">
      <h2 className="text-xl font-bold mb-4">📊 Dashboard</h2>

      <Draggable bounds="parent">
        <div className="bg-blue-500 text-white w-60 p-4 rounded shadow cursor-move select-none absolute top-20 left-20">
          🧱 I'm a draggable dashboard widget!
        </div>
      </Draggable>
    </div>
  );
}
