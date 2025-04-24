"use client"

import { ITask, TaskStatus } from '@/types/task.interface';
import { Pencil, X } from 'lucide-react';

interface TaskCardProps {
    editTask: VoidFunction;
    deleteTask: VoidFunction;
    onSelectedCheckBoxTask?: (task: ITask) => void;
    onUnSelectedCheckBoxTask?: (task: ITask) => void;
    task: ITask
};

const statusColors: Record<TaskStatus, string> = {
    [TaskStatus.pending]: "bg-yellow-400",
    [TaskStatus.inProcess]: "bg-blue-400",
    [TaskStatus.done]: "bg-green-400",
};

export const TaskCard = ({ ...props }: TaskCardProps) => {
    const isDone = props.task.status === TaskStatus.done;

    const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked;

        if (checked) {
            props.onSelectedCheckBoxTask?.(props.task);
        } else {
            props.onUnSelectedCheckBoxTask?.(props.task);
        }
    };

    return (
        <div className='relative w-full'>
            <div className={`bg-[#F5F7F9] flex gap-5 rounded-default-rounded transition-opacity duration-300 ${isDone ? "opacity-40" : "opacity-100"} shadow-shadow-black`}>
                <div className='flex flex-col items-start flex-1 relative p-5'>
                    <div className='w-full flex items-center'>
                        <input
                            onChange={handleCheck}
                            type="checkbox"
                            className="w-4 h-4 cursor-pointer"
                            readOnly
                        />
                        <div className='flex-1 ml-3'>
                            <span className='text-[18px] font-semibold'>{props.task.title}</span>
                        </div>
                        <div className='flex items-center gap-3'>
                            <div className='flex gap-3 items-center'>
                                <div className={`w-3 h-3 rounded-full ${statusColors[props.task.status!]}`}></div>
                                <span className='capitalize text-sm'>{TaskStatus[props.task.status!]}</span>
                            </div>
                            <button onClick={props.editTask} className='bg-low-blue rounded-full p-2 cursor-pointer'>
                                <Pencil width={15} height={15} />
                            </button>
                            <button onClick={props.deleteTask} className='bg-low-red rounded-full p-2 cursor-pointer'>
                                <X width={15} height={15} color='red' />
                            </button>
                        </div>
                    </div>
                    <p className="text-gray-color max-w-[400px] break-words text-sm">
                        {props.task.description}
                    </p>
                </div>
            </div>
            {isDone && <div className='absolute left-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%] w-[95%] h-[2px] bg-green-500 z-10 rounded-default-rounded'></div>}
        </div>
    )
}
