import { cn } from "@/lib/classMerge";
import { TextareaHTMLAttributes } from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
}

export const TextArea = ({ label, ...props }: TextAreaProps) => {
    return (
        <div className="flex flex-col w-full gap-2">
            <label htmlFor={props.id}>{label}</label>
            <textarea
                {...props}
                maxLength={150}
                className={cn("border-2 border-[#007FFF] outline-none rounded-default-rounded p-1 resize-none placeholder:text-sm text-[16px]", props.className)}
            />
        </div>
    )
}
