// FeaturedCollectionConfig.jsx
import React from "react";

export default function FeaturedCollectionConfig({ widget, onUpdate, onDelete }) {
  if (!widget) {
    return <div></div>;
  }

  return (
    <div className="bg-white w-full md:w-96 p-4 border-l h-screen sticky top-0 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4">Featured collection</h2>

      <label className="block mb-2 text-sm font-medium">Heading</label>
      <input
        type="text"
        value={widget.title}
        onChange={(e) => onUpdate("title", e.target.value)}
        className="w-full mb-4 p-2 border rounded"
      />

      <label className="block mb-2 text-sm font-medium">Description</label>
      <textarea
        value={widget.content}
        onChange={(e) => onUpdate("content", e.target.value)}
        className="w-full mb-4 p-2 border rounded"
        rows={3}
      />

      <label className="block mb-2 text-sm font-medium">Color Scheme</label>
      <select
        value={widget.colorScheme || "Background 1"}
        onChange={(e) => onUpdate("colorScheme", e.target.value)}
        className="w-full mb-4 p-2 border rounded"
      >
        <option>Background 1</option>
        <option>Background 2</option>
        <option>Background 3</option>
      </select>

      <button
        onClick={() => onDelete(widget.id)}
        className="w-full text-red-600 text-sm font-medium hover:underline mt-6"
      >
        Remove section
      </button>
    </div>
  );
}
