import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
export const TagBadge = ({ tag, onClick, rightSlot, className }) => {
  return (
    <Badge
      key={tag.id}
      className={cn("m-1 bg-amber-500 font-bold", className)}
      onClick={() => onClick && onClick()}
    >
      #{tag.content}
      {rightSlot && rightSlot}
    </Badge>
  );
};
