// components/FormEditTask.tsx
import { Input } from './input'
import { Container } from './Container'
import { TextArea } from './text-area';
import { SelectDropDown } from './selectDropDown';
import { ITask } from '@/types/task.interface';
import { TaskService } from '@/services/Task-service';
import { FormEvent } from 'react';

interface FormEditTaskProps {
  openEditTaskComponent?: boolean;
  closeFormEditTask?: VoidFunction;
  task: ITask;
  onTaskUpdated?: (task: ITask) => void;
}

export const FormEditTask = ({ openEditTaskComponent = false, closeFormEditTask, task, onTaskUpdated }: FormEditTaskProps) => {

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    const updatedTask: ITask = {
      id: task.id,
      title: (form.elements.namedItem("title") as HTMLInputElement).value,
      description: (form.elements.namedItem("description") as HTMLInputElement).value,
      createdAt: (form.elements.namedItem("createdAt") as HTMLInputElement).value,
      donedAt: (form.elements.namedItem("donedAt") as HTMLInputElement).value,
      status: +(form.elements.namedItem("status") as HTMLSelectElement).value,
    };

    const response = await TaskService.updateTask(task.id!, updatedTask);
    console.log(response.message);

    if (onTaskUpdated && response.task) {
      onTaskUpdated(response.task);
    }

    closeFormEditTask?.();
  };

  if (!openEditTaskComponent) return null;

  return (
    <section className='fixed inset-0 flex items-center z-[999] overflow-y-auto bg-[#0007] p-5'>
      <Container className='bg-white p-5 rounded-default-rounded'>
        <h1 className='text-2xl font-semibold mb-10'>Editar <span className='font-normal'>"{task.title}"</span></h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
          <Input name='title' label='Title' defaultValue={task.title} />
          <div className='flex gap-4 items-end flex-wrap'>
            <TextArea name='description' label='Description' defaultValue={task.description} />
            <Input name='createdAt' label="Created At" type="date" defaultValue={task.createdAt?.split('T')[0]} />
            <Input name='donedAt' label="Done At" type="date" defaultValue={task.donedAt?.split('T')[0]} />
            <div className='flex flex-col gap-3'>
              <span>Status</span>
              <SelectDropDown name="status" defaultValue={task.status} />
            </div>
          </div>
          <div className='flex justify-end gap-3 mt-5'>
            <button className='bg-low-blue p-2 rounded-default-rounded cursor-pointer'>
              Save
            </button>
            <button type='button' onClick={closeFormEditTask} className='bg-low-red p-2 rounded-default-rounded cursor-pointer'>
              Cancel
            </button>
          </div>
        </form>
      </Container>
    </section>
  )
}
