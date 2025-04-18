import { cn } from "@/lib/classMerge";

interface ContainerProps {
  children?: React.ReactNode;
  className?: string;
}

export const Container = ({ children, className }: ContainerProps) => {
  return (
    <div className={cn("mx-auto w-full max-w-[1280px] px-5 flex-1 flex flex-col", className)}>
      {children}
    </div>
  );
};
