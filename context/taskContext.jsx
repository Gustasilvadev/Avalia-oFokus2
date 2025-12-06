import { createContext, useState, useContext } from 'react';

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const addTask = (taskText) => {
    if (!taskText.trim()) return null;
    
    const newTask = {
      id: Date.now().toString(),
      text: taskText.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    };
    
    setTasks(prevTasks => [newTask, ...prevTasks]);
    return newTask;
  };

  const toggleTask = (id) => {
    setTasks(prevTasks =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(prevTasks => prevTasks.filter((task) => task.id !== id));
  };

  const deleteAllTasks = () => {
    setTasks([]);
  };

  const getStats = () => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const pending = total - completed;
    
    return { total, completed, pending };
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        toggleTask,
        deleteTask,
        deleteAllTasks,
        getStats,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};