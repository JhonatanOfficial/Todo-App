import { cn } from '@/lib/classMerge';
import React, { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    symbolRequired?: boolean;
}

export const Input = ({ label, symbolRequired = false, ...props }: InputProps) => {
    return (
        <div className="flex flex-col flex-1 gap-2">
            <label htmlFor={props.id}>{label} {symbolRequired && <span className="text-red-500 font-bold">*</span>}</label>
            <input
                {...props}
                className={cn("flex-1 border-2 border-[#007FFF] outline-none rounded-default-rounded p-1 placeholder:text-sm text-[16px]", props.className)}
            />
        </div>
    )
}
