'use client';

import { FormCreateTask } from "@/components/form-create-task";
import { FormEditTask } from "@/components/form-edit-task";
import { Modal } from "@/components/modal";
import { TaskCard } from "@/components/task-card";
import { TaskListLayout } from "@/components/task-list-Layout";
import { NoTaskContent } from "@/components/tasks-container-empty";
import { useTasks } from "@/hooks/useTasks";
import { TaskService } from "@/services/Task-service";
import { ITask, TaskStatus } from "@/types/task.interface";
import { Loader } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const { tasks, isLoading, updateTask, deleteTask, addTask } = useTasks();
  const [selectedEditTask, setSelectedEditTask] = useState<ITask | null>(null);
  const [taskIdToDelete, setTaskIdToDelete] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false);

  const handleEditTask = (task: ITask) =>{
    setSelectedEditTask(task)
  };

  const handleDeleteRequest = (id: string) => {
    setTaskIdToDelete(id);
    setOpenModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!taskIdToDelete) return;
    TaskService.DeleteTask(taskIdToDelete);
    deleteTask(taskIdToDelete);
    setOpenModal(false);
    setTaskIdToDelete(null);
  };

  const handleCancelDelete = () => {
    setOpenModal(false);
    setTaskIdToDelete(null);
  };

  const filteredTasks = {
    pending: tasks.filter(t => t.status === TaskStatus.pending),
    inProgress: tasks.filter(t => t.status === TaskStatus.inProcess),
    done: tasks.filter(t => t.status === TaskStatus.done),
  };

  return (
    <main className="flex flex-1 flex-col gap-5">
      <FormCreateTask onTaskCreated={addTask} />
      {isLoading ?
        <div className="flex-1 flex items-center justify-center">
          <Loader className="animate-spin" />
        </div>
        :
        <section className="flex justify-between gap-y-8 gap-x-5 flex-wrap ">
          {filteredTasks.pending.length > 0 && (
            <TaskListLayout label="Pendente">
              {filteredTasks.pending.map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  editTask={() => handleEditTask(task)}
                  deleteTask={() => handleDeleteRequest(task.id!)}
                />
              ))}
            </TaskListLayout>
          )}

          {filteredTasks.inProgress.length > 0 && (
            <TaskListLayout label="Em Progresso">
              {filteredTasks.inProgress.map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  editTask={() => {
                    handleEditTask(task)
                  }}
                  deleteTask={() => handleDeleteRequest(task.id!)}
                />
              ))}
            </TaskListLayout>
          )}

          {filteredTasks.done.length > 0 && (
            <TaskListLayout label="Concluída">
              {filteredTasks.done.map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  editTask={() => handleEditTask(task)}
                  deleteTask={() => handleDeleteRequest(task.id!)}
                />
              ))}
            </TaskListLayout>
          )}
        </section>
      }

      {tasks.length === 0 && !isLoading && <NoTaskContent />}
      <Modal
        openModal={openModal}
        title="Are you sure you want to delete this task?"
        confirmOnClick={handleConfirmDelete}
        cancelOnClick={handleCancelDelete}
      />

      {selectedEditTask && (
        <FormEditTask
          task={selectedEditTask}
          openEditTaskComponent={!!selectedEditTask}
          closeFormEditTask={() => setSelectedEditTask(null)}
          onTaskUpdated={updateTask}
        />
      )}
    </main>
  );
}
