"use client";

import { TaskService } from "@/services/Task-service";
import { ITask } from "@/types/task.interface";
import { Loader2 } from "lucide-react";
import { FormEvent, useRef, useState } from "react";
import { Input } from "./input";
import { TextArea } from "./text-area";
import { SelectDropDown } from "./selectDropDown";

interface FormCreateTaskProps {
  onTaskCreated?: (task: ITask) => void;
}

export const FormCreateTask = ({ onTaskCreated }: FormCreateTaskProps) => {
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<number>();
  const formRef = useRef<HTMLFormElement>(null);

  const handleCreateTask = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const form = event.currentTarget;
    const task: ITask = {
      title: (form.elements.namedItem("task") as HTMLInputElement).value,
      description: (form.elements.namedItem("description") as HTMLInputElement).value,
      status,
    };

    const response = await TaskService.CreateNewTask(task);
    setMessage(response.message);

    if (response.task && onTaskCreated) {
      onTaskCreated(response.task);
    }

    formRef.current?.reset();
    setIsLoading(false);
    setTimeout(() => setMessage(""), 5000);
  };

  return (
    <div className="flex flex-col gap-4">
      <form ref={formRef} onSubmit={handleCreateTask} className="flex flex-col gap-3">
        <div className="flex items-end gap-3">
          <div className="flex flex-col flex-1 gap-2">
            <Input
              symbolRequired
              name="task"
              id="task"
              type="text"
              label="Título"
              placeholder="Informe sua tarefa"
            />
          </div>
          <div className="flex flex-col gap-2">
            <span>Status</span>
            <SelectDropDown
              value={status}
              onChange={(e) => setStatus(Number(e.target.value))}
            />
          </div>
        </div>
        <TextArea
          label="Description"
          name="description"
          id="description"
          placeholder="Que tal adicionar uma descrição?"
        />

        <button
          disabled={isLoading}
          className={`flex items-center justify-center bg-primary-color p-2 text-white uppercase font-bold rounded-default-rounded ${isLoading ? "cursor-not-allowed" : "cursor-pointer"}`}
        >
          {isLoading ? <Loader2 className="animate-spin" /> : "Create task"}
        </button>

        {message && <span className="text-sm font-semibold">{message}</span>}
      </form>
    </div>
  );
};
