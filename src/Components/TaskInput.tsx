import React, { useState } from "react";
import { TaskInputProps } from "../types";

export const TaskInput: React.FC<TaskInputProps> = ({ onAddTask }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [text, setText] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim().length < 3) {
      setError("Task must be at least 3 characters long");
      return;
    }
    if (!category) {
      setError("Please select a category");
      return;
    }
    onAddTask({ text, priority, category });
    setText("");
    setPriority("medium");
    setCategory("");
    setError("");
    setIsExpanded(false);
  };

  const handleCancel = () => {
    setText("");
    setPriority("medium");
    setCategory("");
    setError("");
    setIsExpanded(false);
  };

  return (
    <div className="mb-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-lg overflow-hidden"
      >
        <div className="p-6">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center hover:bg-primary-200 transition-colors"
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
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </button>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onFocus={() => setIsExpanded(true)}
              placeholder="Add a new task..."
              className="w-full text-lg bg-transparent border-none focus:ring-0 placeholder-gray-400"
            />
          </div>

          {isExpanded && (
            <div className="mt-6 space-y-4 animate-slide-down">
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl bg-surface-100 border-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">Select Category</option>
                    <option value="work">Work</option>
                    <option value="personal">Personal</option>
                    <option value="shopping">Shopping</option>
                    <option value="health">Health</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Priority
                  </label>
                  <div className="flex gap-2">
                    {(["low", "medium", "high"] as const).map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setPriority(p)}
                        className={`flex-1 px-4 py-2 rounded-xl capitalize transition-all ${
                          priority === p
                            ? "bg-primary-500 text-white"
                            : "bg-surface-100 text-gray-600 hover:bg-surface-200"
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {error && (
                <p className="text-red-500 text-sm animate-fade">{error}</p>
              )}

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-2 rounded-xl text-gray-600 hover:bg-surface-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-primary-500 text-white hover:bg-primary-600 transition-colors"
                >
                  Add Task
                </button>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};
