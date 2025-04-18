interface ModalProps {
    confirmOnClick?: VoidFunction;
    cancelOnClick?: VoidFunction;
    title: string;
    description?: string;
    openModal?: boolean;
}

export const Modal = ({ openModal = false, ...props }: ModalProps) => {
    if (!openModal) return null;

    return (
        <div className='fixed inset-0 flex items-center justify-center  z-[999]'>
            <div className="p-5 rounded-default-rounded bg-white shadow-2xl shadow-black flex flex-col">
                <span className="font-semibold">{props.title}</span>
                <p>{props.description}</p>
                <div className='flex gap-3 mt-5'>
                    <button onClick={props.confirmOnClick} className='bg-low-blue p-2 rounded-default-rounded cursor-pointer'>
                        Confirm
                    </button>
                    <button onClick={props.cancelOnClick} className='bg-low-red p-2 rounded-default-rounded cursor-pointer'>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}
