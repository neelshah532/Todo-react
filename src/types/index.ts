export interface Todo {
  id: string;
  text?: string;
  completed?: boolean;
  createdAt?: Date;
  priority?: "low" | "medium" | "high";
  category?: string;
}
export interface TaskInputProps {
  onAddTask: (task: {
    text: string;
    priority: "low" | "medium" | "high";
    category: string;
  }) => void;
}

export interface TaskItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, updates: Partial<Todo>) => void;
}

export interface counter {
  total: number;
  completed: number;
}
