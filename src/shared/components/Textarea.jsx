import { Textarea as TextareaComponent } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export const Textarea = ({ ...props }) => {
  return (
    <TextareaComponent
      className={cn(
        "resize-none focus-visible:ring-amber-500 focus-visible:ring-2 focus-visible:border-transparent selection:bg-amber-300 selection:text-black",
        props.className
      )}
      {...props}
    />
  );
};
