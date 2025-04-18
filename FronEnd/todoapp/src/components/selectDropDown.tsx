import { TaskStatus } from '@/types/task.interface';
import { SelectHTMLAttributes } from 'react'

interface selectDropDownProps extends SelectHTMLAttributes<HTMLSelectElement> {}

export const SelectDropDown = ({...props}: selectDropDownProps) => {

    const TaskStatusLabel: Record<TaskStatus, string> = {
        [TaskStatus.pending]: "Pendent",
        [TaskStatus.inProcess]: "In Progress",
        [TaskStatus.done]: "Done"
    };

    return (
        <select
            {...props}
            className="border-2 border-primary-color rounded-default-rounded h-max p-1 outline-none capitalize"
        >
            <option value="">Select status...</option>
            <option className="capitalize" value={TaskStatus.pending}>{TaskStatusLabel[TaskStatus.pending]}</option>
            <option className="capitalize" value={TaskStatus.inProcess}>{TaskStatusLabel[TaskStatus.inProcess]}</option>
            <option className="capitalize" value={TaskStatus.done}>{TaskStatusLabel[TaskStatus.done]}</option>
        </select>
    )
}