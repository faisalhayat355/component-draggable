// MainPage.jsx
import { Pencil, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useLocation } from "react-router-dom";
import { nanoid } from "nanoid";
import FeaturedCollectionConfig from "../common/FeaturedCollectionConfig";

const widgetMap = {
  dashboard: {
    title: "📊 Dashboard",
    content: "This is dashboard content...",
    category: "analytics",
  },
  users: {
    title: "👥 Users",
    content: "This is users content...",
    category: "user",
  },
};

const categoryStyleMap = {
  analytics: "bg-blue-50 border-blue-300",
  user: "bg-green-50 border-green-300",
  marketing: "bg-yellow-50 border-yellow-300",
  custom: "bg-gray-50 border-gray-300",
};

const LOCAL_STORAGE_KEY = "widget_layout";

export default function MainPage() {
  const location = useLocation();
  const [widgets, setWidgets] = useState([]);
  const [selectedWidgetId, setSelectedWidgetId] = useState(null);

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

  useEffect(() => {
    const newWidgetKey = location.state?.widget;
    if (newWidgetKey) {
      setWidgets((prev) => {
        const base = widgetMap[newWidgetKey] || {
          title: `🧩 ${newWidgetKey}`,
          content: `This is ${newWidgetKey} content...`,
          category: "custom",
        };

        const newWidget = {
          ...base,
          id: `${newWidgetKey}-${nanoid()}`,
          isEditing: false,
        };

        const updated = [...prev, newWidget];
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
        return updated;
      });
    }
  }, [location.state]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(widgets));
  }, [widgets]);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const updated = Array.from(widgets);
    const [moved] = updated.splice(result.source.index, 1);
    updated.splice(result.destination.index, 0, moved);
    setWidgets(updated);
  };

  const toggleEdit = (id) => {
    setWidgets((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isEditing: !w.isEditing } : w))
    );
    setSelectedWidgetId(id);
  };

  const handleChange = (id, field, value) => {
    setWidgets((prev) =>
      prev.map((w) => (w.id === id ? { ...w, [field]: value } : w))
    );
  };

  const handleDelete = (id) => {
    setWidgets((prev) => prev.filter((w) => w.id !== id));
    if (selectedWidgetId === id) setSelectedWidgetId(null);
  };

  const selectedWidget = widgets.find((w) => w.id === selectedWidgetId);

  return (
    <div className="flex">
      <div className="p-4 flex-1">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="widgetArea">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-4">
                {widgets.map((w, index) => {
                  const styleClass = categoryStyleMap[w.category] || categoryStyleMap["custom"];
                  return (
                    <Draggable key={w.id} draggableId={w.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`group w-full p-4 rounded transition border bg-white ${styleClass} ${snapshot.isDragging ? "scale-105" : ""}`}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h2 className="text-lg font-semibold text-gray-800">{w.title}</h2>
                            <div className="space-x-2 hidden group-hover:inline-flex">
                              <div onClick={() => toggleEdit(w.id)} className="text-blue-600 cursor-pointer">
                                <Pencil size={18} />
                              </div>
                              <div onClick={() => handleDelete(w.id)} className="text-red-600 cursor-pointer">
                                <Trash size={18} />
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-600">{w.content}</p>
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      <FeaturedCollectionConfig
  widget={selectedWidget}
  onUpdate={(field, value) => handleChange(selectedWidgetId, field, value)}
  onDelete={handleDelete}
/>
    </div>
  );
}
