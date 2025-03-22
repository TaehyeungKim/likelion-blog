import { cn } from "@/lib/utils";
import { Input as InputComponent } from "@/components/ui/input";
export const Input = ({ className, ...props }) => {
  return (
    <InputComponent
      className={cn(
        "focus-visible:ring-amber-500 focus-visible:ring-2 focus-visible:border-transparent selection:bg-amber-300 selection:text-black",
        className
      )}
      {...props}
    />
  );
};
