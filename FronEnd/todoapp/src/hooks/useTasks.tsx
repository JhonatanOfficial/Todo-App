import { useEffect, useState } from "react";
import { TaskService } from "@/services/Task-service";
import { ITask } from "@/types/task.interface";

export const useTasks = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    TaskService.GetAllTasks().then(setTasks).finally(() => setIsLoading(false));
  }, []);

  const addTask = (task: ITask) => setTasks(prev => [...prev, task]);

  const updateTask = (updated: ITask) => {
    setTasks(prev => prev.map(task => task.id === updated.id ? updated : task));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  return {
    tasks,
    isLoading,
    addTask,
    updateTask,
    deleteTask
  };
};
