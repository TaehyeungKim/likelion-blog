import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input, Label, Textarea, Button, TagBadge } from "@/shared/components";
import { useState, useRef, useEffect } from "react";

const PostDialogInputLabelContainer = ({ label, input }) => {
  return (
    <div className="flex flex-col gap-2 grow">
      <div className="text-sm font-medium">{label}</div>
      {input}
    </div>
  );
};

export const PostDialog = ({ triggerButton, onSubmit, post = null }) => {
  const [tags, setTags] = useState([]);
  const [open, setOpen] = useState(false);

  const tagInputRef = useRef(null);

  useEffect(() => {
    if (post) {
      setTags(post.tags);
    }
  }, [post]);

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

  const handleDialogSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      title: e.target.title.value,
      content: e.target.content.value,
      tags: tags.map((tag) => tag.content),
    });
    setOpen(false);
  };

  useEffect(() => {
    if (!open && !post) {
      setTags([]);
    }
  }, [open, post]);

  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>{post ? "게시글 수정" : "게시글 작성"}</DialogTitle>
          <DialogDescription id="dialog-description">
            {post
              ? "게시글을 수정해보세요!"
              : "게시글을 자유롭게 작성해보세요!"}
          </DialogDescription>
        </DialogHeader>
        <form className="flex flex-col gap-4" onSubmit={handleDialogSubmit}>
          <PostDialogInputLabelContainer
            label={<Label htmlFor="title">제목</Label>}
            input={
              <Input
                id="title"
                type="text"
                placeholder="제목을 입력해주세요"
                required
                defaultValue={post?.title}
              />
            }
          />
          <PostDialogInputLabelContainer
            label={<Label htmlFor="content">내용</Label>}
            input={
              <Textarea
                id="content"
                placeholder="내용을 입력해주세요"
                required
                defaultValue={post?.content}
              />
            }
          />
          <div>
            <PostDialogInputLabelContainer
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
              <TagBadge
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
