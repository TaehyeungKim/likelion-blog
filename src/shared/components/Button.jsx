import { Button as ButtonComponent } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Button = ({ className, ...props }) => {
  return (
    <ButtonComponent
      className={cn(
        "p-3 uppercase text-lg !bg-stone-100 text-black hover:!bg-amber-400 hover:text-white",
        className
      )}
      {...props}
    />
  );
};
