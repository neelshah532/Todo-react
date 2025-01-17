import React from "react";
import { TaskItem } from "./TaskItem";
import { Todo } from "../types";

interface TaskListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, updates: Partial<Todo>) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  todos,
  onToggle,
  onDelete,
  onEdit,
}) => {
  const groups = todos.reduce((acc, todo) => {
    const key = todo.completed ? "completed" : "pending";
    if (!acc[key]) acc[key] = [];
    acc[key].push(todo);
    return acc;
  }, {} as Record<string, Todo[]>);

  return (
    <div className="space-y-8">
      {groups.pending && groups.pending.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            In Progress
          </h2>
          <div className="space-y-3">
            {groups.pending.map((todo) => (
              <TaskItem
                key={todo.id}
                todo={todo}
                onToggle={onToggle}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            ))}
          </div>
        </section>
      )}

      {groups.completed && groups.completed.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Completed
          </h2>
          <div className="space-y-3 opacity-75">
            {groups.completed.map((todo) => (
              <TaskItem
                key={todo.id}
                todo={todo}
                onToggle={onToggle}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            ))}
          </div>
        </section>
      )}

      {(!groups.pending || groups.pending.length === 0) &&
        (!groups.completed || groups.completed.length === 0) && (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-600 mb-4">
              <svg
                className="w-8 h-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900">No tasks yet</h3>
            <p className="mt-1 text-gray-500">
              Get started by adding a new task above
            </p>
          </div>
        )}
    </div>
  );
};
