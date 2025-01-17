import { useEffect, useState } from "react";
import { Todo } from "../../types";
import { Layout } from "../Layout/Layout";
import { TaskInput } from "../../Components/TaskInput";
import { TaskList } from "../../Components/TaskList";
import { Header } from "../../Components/Header";

const Dashboard = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTask = ({
    text,
    priority,
    category,
  }: {
    text: string;
    priority: "low" | "medium" | "high";
    category: string;
  }) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: new Date(),
      priority,
      category,
    };
    setTodos([newTodo, ...todos]);
  };

  const toggleTask = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTask = (id: string) => {

    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTask = (id: string, updates: Partial<Todo>) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, ...updates } : todo))
    );
  };

  const stats = {
    total: todos.length,
    completed: todos.filter((todo) => todo.completed).length,
  };

  return (
    <Layout>
      <Header totalTasks={stats.total} completedTasks={stats.completed} />
      <TaskInput onAddTask={addTask} />
      <TaskList
        todos={todos}
        onToggle={toggleTask}
        onDelete={deleteTask}
        onEdit={editTask}
      />
    </Layout>
  );
};

export default Dashboard;
