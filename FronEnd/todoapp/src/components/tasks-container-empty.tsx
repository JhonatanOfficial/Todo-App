import Image from 'next/image';

export const NoTaskContent = () => {
    return (
        <section className='flex flex-col flex-1 items-center justify-center gap-3'>
            <Image src={"/no-tasks.svg"} alt='No tasks' width={100} height={100}/>
            <span>You have no tasks listed.</span>
        </section>
    )
}
