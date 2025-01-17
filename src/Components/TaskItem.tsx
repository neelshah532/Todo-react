import React, { useState } from "react";
import { TaskItemProps } from "../types";

export const TaskItem: React.FC<TaskItemProps> = ({
  todo,
  onToggle,
  onDelete,
  onEdit,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [editForm, setEditForm] = useState({
    text: todo.text || "",
    priority: todo.priority,
    category: todo.category,
  });

  const priorityColors = {
    low: "bg-blue-100 text-blue-600",
    medium: "bg-yellow-100 text-yellow-600",
    high: "bg-red-100 text-red-600",
  };

  const categoryColors = {
    work: "bg-purple-100 text-purple-600",
    personal: "bg-green-100 text-green-600",
    shopping: "bg-pink-100 text-pink-600",
    health: "bg-indigo-100 text-indigo-600",
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editForm.text.trim().length >= 3) {
      onEdit(todo.id, editForm);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditForm({
      text: todo.text || "",
      priority: todo.priority || "medium",
      category: todo.category || "work",
    });
    setIsEditing(false);
  };

  const DeleteConfirmation = () => (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 shadow-xl max-w-sm w-full mx-4 animate-scale">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Delete Task
        </h3>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this task? This action cannot be
          undone.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={() => setShowDeleteConfirm(false)}
            className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onDelete(todo.id);
              setShowDeleteConfirm(false);
            }}
            className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );

  if (isEditing) {
    return (
      <div className="bg-white rounded-xl shadow-md p-4 animate-scale">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={editForm.text}
              onChange={(e) =>
                setEditForm((prev) => ({ ...prev, text: e.target.value }))
              }
              className="w-full px-4 py-2 rounded-xl bg-gray-50 border-2 border-transparent focus:border-primary-500 focus:ring-0 transition-all"
              placeholder="Task description"
              autoFocus
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <select
                value={editForm.category}
                onChange={(e) =>
                  setEditForm((prev) => ({ ...prev, category: e.target.value }))
                }
                className="w-full px-4 py-2 rounded-xl bg-gray-50 border-2 border-transparent focus:border-primary-500 focus:ring-0"
              >
                <option value="work">Work</option>
                <option value="personal">Personal</option>
                <option value="shopping">Shopping</option>
                <option value="health">Health</option>
              </select>
            </div>

            <div className="flex gap-2">
              {(["low", "medium", "high"] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() =>
                    setEditForm((prev) => ({ ...prev, priority: p }))
                  }
                  className={`px-4 py-2 rounded-xl capitalize transition-all ${
                    editForm.priority === p
                      ? "bg-primary-500 text-white"
                      : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-primary-500 text-white hover:bg-primary-600 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <>
      <div className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
        <div className="p-4 flex items-center gap-4">
          <button
            onClick={() => onToggle(todo.id)}
            className={`flex-shrink-0 w-6 h-6 rounded-full border-2 transition-all duration-200 
              ${
                todo.completed
                  ? "bg-primary-500 border-primary-500"
                  : "border-gray-300 hover:border-primary-500"
              }`}
          >
            {todo.completed && (
              <svg
                className="w-full h-full text-white p-1"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
          </button>

          <div className="flex-grow min-w-0">
            <span
              className={`text-lg truncate ${
                todo.completed ? "line-through text-gray-400" : "text-gray-900"
              }`}
            >
              {todo.text}
            </span>
          </div>

          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <span
              className={`px-2.5 py-1 rounded-full text-sm ${
                priorityColors[todo.priority as keyof typeof priorityColors]
              }`}
            >
              {todo.priority}
            </span>
            <span
              className={`px-2.5 py-1 rounded-full text-sm ${
                categoryColors[todo.category as keyof typeof categoryColors]
              }`}
            >
              {todo.category}
            </span>
            {!todo.completed && (
              <button
                onClick={() => setIsEditing(true)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-primary-500 hover:bg-primary-50 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </button>
            )}
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {showDeleteConfirm && <DeleteConfirmation />}
    </>
  );
};
