
export const Container = (
  {children}: {children: React.ReactNode}
) => {
  return (
    <div className="mx-auto w-full">
      {children}
    </div>
  )
}
