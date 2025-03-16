import { Badge } from "@/components/ui/badge";

export const SearchTag = ({ tag, onClick }) => {
  return (
    <Badge
      key={tag.id}
      className="m-1 bg-amber-500 font-bold"
      onClick={() => onClick && onClick()}
    >
      #{tag.content}
    </Badge>
  );
};
