
export const Container = (
  {children}: {children?: React.ReactNode}
) => {
  return (
    <div className="mx-auto w-full max-w-[1100px] px-5">
      {children}
    </div>
  )
}
