import { Input, Button } from "@/shared/components";
import { SubmitIcon } from "@/assets/icons";

export const CommentInput = ({ disabled, onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const content = e.target.content.value;
    onSubmit(content);
    e.target.content.value = "";
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-row">
        <div className="flex flex-row gap-2 grow">
          <Input
            name="content"
            placeholder="댓글을 달아보세요"
            disabled={disabled}
          />
        </div>
        <Button
          variant="outline"
          className="!bg-transparent hover:!text-blue-300 hover:!bg-transparent !shadow-none"
          disabled={disabled}
        >
          <SubmitIcon />
        </Button>
      </div>
    </form>
  );
};
