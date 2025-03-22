import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input, Label, Textarea, Button, SearchTag } from "@/shared/components";
import { useState, useRef } from "react";

const CreateDialogInputLabelContainer = ({ label, input }) => {
  return (
    <div className="flex flex-col gap-2 grow">
      <div className="text-sm font-medium">{label}</div>
      {input}
    </div>
  );
};

export const CreateDialog = ({ triggerButton, onSubmit }) => {
  const [tags, setTags] = useState([]);
  const [open, setOpen] = useState(false);

  const tagInputRef = useRef(null);

  const handleTagAddButtonClick = () => {
    const tagValue = tagInputRef.current.value;
    const highestTagId =
      tags.length === 0 ? 0 : Math.max(...tags.map((tag) => tag.id));

    if (tagValue) {
      setTags((tags) => [
        ...tags,
        {
          id: highestTagId + 1,
          content: tagValue,
        },
      ]);
      tagInputRef.current.value = "";
    }
  };

  const handleTagDeleteButtonClick = (tagId) => {
    setTags((tags) => tags.filter((tag) => tag.id !== tagId));
  };

  const handleDialogOpenChange = (open) => {
    setOpen(open);
    if (!open) {
      setTags([]);
    }
  };

  const handleDialogSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      title: e.target.title.value,
      content: e.target.content.value,
      tags: tags.map((tag) => tag.content),
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogOpenChange}>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>

      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>게시글 작성</DialogTitle>
          <DialogDescription id="dialog-description">
            게시글을 자유롭게 작성해보세요!
          </DialogDescription>
        </DialogHeader>
        <form className="flex flex-col gap-4" onSubmit={handleDialogSubmit}>
          <CreateDialogInputLabelContainer
            label={<Label htmlFor="title">제목</Label>}
            input={
              <Input
                id="title"
                type="text"
                placeholder="제목을 입력해주세요"
                required
              />
            }
          />
          <CreateDialogInputLabelContainer
            label={<Label htmlFor="content">내용</Label>}
            input={
              <Textarea
                id="content"
                placeholder="내용을 입력해주세요"
                required
              />
            }
          />
          <div>
            <CreateDialogInputLabelContainer
              label={<Label htmlFor="tags">태그</Label>}
              input={
                <div className="flex flex-row gap-2">
                  <Input
                    id="tags"
                    type="text"
                    placeholder="태그를 입력해주세요"
                    ref={tagInputRef}
                  />
                  <Button type="button" onClick={handleTagAddButtonClick}>
                    태그 추가
                  </Button>
                </div>
              }
            />
            {tags.map((tag) => (
              <SearchTag
                className="!bg-amber-200 shadow-2xs shadow-black/20 text-black"
                key={tag.id}
                tag={tag}
                rightSlot={
                  <button
                    className="text-center aspect-square !bg-transparent hover:!shadow-2xl rounded-full  hover:!bg-amber-300"
                    onClick={() => handleTagDeleteButtonClick(tag.id)}
                  >
                    X
                  </button>
                }
              />
            ))}
          </div>
          <DialogFooter className="!justify-center">
            <Button type="submit">등록</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
