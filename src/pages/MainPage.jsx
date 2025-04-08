import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useLocation } from "react-router-dom";

const widgetMap = {
  dashboard: {
    id: "dashboard",
    title: "📊 Dashboard",
    content: "This is dashboard content...",
    color: "bg-blue-100 border-blue-400",
  },
  users: {
    id: "users",
    title: "👥 Users",
    content: "This is users content...",
    color: "bg-green-100 border-green-400",
  },
};

const LOCAL_STORAGE_KEY = "widget_layout";

export default function MainPage() {
  const location = useLocation();
  const [widgets, setWidgets] = useState([]);

  // Load saved widgets from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        setWidgets(JSON.parse(saved));
      } catch (err) {
        console.error("Error parsing saved layout:", err);
      }
    }
  }, []);

  // Add new widget from location.state (if not already added)
  useEffect(() => {
    const newWidgetKey = location.state?.widget;
    if (newWidgetKey && widgetMap[newWidgetKey]) {
      setWidgets((prev) => {
        if (prev.find((w) => w.id === newWidgetKey)) return prev;
        const updated = [
          ...prev,
          { ...widgetMap[newWidgetKey], isEditing: false },
        ];
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
        return updated;
      });
    }
  }, [location.state]);

  // Keep localStorage in sync on every widget update
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(widgets));
  }, [widgets]);

  // Drag and drop rearrangement handler
  const onDragEnd = (result) => {
    if (!result.destination) return;
    const updated = Array.from(widgets);
    const [moved] = updated.splice(result.source.index, 1);
    updated.splice(result.destination.index, 0, moved);
    setWidgets(updated);
  };

  // Toggle widget edit mode
  const toggleEdit = (id) => {
    const updated = widgets.map((w) =>
      w.id === id ? { ...w, isEditing: !w.isEditing } : w
    );
    setWidgets(updated);
  };

  // Update title or content field
  const handleChange = (id, field, value) => {
    const updated = widgets.map((w) =>
      w.id === id ? { ...w, [field]: value } : w
    );
    setWidgets(updated);
  };

  // Save widget after editing
  const handleSave = (id) => {
    const updated = widgets.map((w) =>
      w.id === id ? { ...w, isEditing: false } : w
    );
    setWidgets(updated);
  };

  // Delete widget
  const handleDelete = (id) => {
    const updated = widgets.filter((w) => w.id !== id);
    setWidgets(updated);
  };

  return (
    <div className="p-1">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="widgetArea">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="space-y-4"
            >
              {widgets.map((w, index) => (
                <Draggable key={w.id} draggableId={w.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`w-full p-4 border rounded shadow transition ${w.color} ${
                        snapshot.isDragging ? "scale-105" : ""
                      }`}
                    >
                      {w.isEditing ? (
                        <>
                          <input
                            type="text"
                            value={w.title}
                            onChange={(e) =>
                              handleChange(w.id, "title", e.target.value)
                            }
                            className="w-full font-semibold text-lg p-1 mb-2 border rounded"
                          />
                          <textarea
                            value={w.content}
                            onChange={(e) =>
                              handleChange(w.id, "content", e.target.value)
                            }
                            className="w-full p-2 border rounded mb-2"
                            rows={3}
                          />
                          <button
                            onClick={() => handleSave(w.id)}
                            className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                          >
                            Save
                          </button>
                        </>
                      ) : (
                        <>
                          <div className="flex justify-between items-start mb-2">
                            <h2 className="text-lg font-semibold text-gray-800">
                              {w.title}
                            </h2>
                            <div className="space-x-2">
                              {/* <button
                                onClick={() => toggleEdit(w.id)}
                                className="text-sm text-blue-600 hover:underline"
                              >
                                ✏️ Edit
                              </button> */}
                              <div
                                onClick={() => handleDelete(w.id)}
                                className="text-sm text-red-600 hover:underline"
                              >
                                🗑️
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-600">{w.content}</p>
                        </>
                      )}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
