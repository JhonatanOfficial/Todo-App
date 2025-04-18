interface TaskListProps {
    children: React.ReactNode;
    label: string;
}

export const TaskListLayout = ({ children, label }: TaskListProps) => {
    return (
        <div className="sm:flex-1 max-h-[300px] overflow-y-auto w-full sm:min-w-[500px]">
            <h1 className="text-2xl font-semibold sticky top-0 z-50 bg-white">{label}</h1>
            <div className='p-2 flex flex-col gap-3'>
                {children}
            </div>
        </div>
    )
}
