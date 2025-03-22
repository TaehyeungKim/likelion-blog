import { Input } from "@/shared/components";
import { UserContext } from "@/shared/context";
import { useContext, useState, useRef } from "react";
import { editComment, getCommentById } from "../api";

export const CommentLine = ({ comment, onDelete }) => {
  const { user } = useContext(UserContext);

  const [innerComment, setInnerComment] = useState(comment);

  const [isEditMode, setIsEditMode] = useState(false);
  const inputRef = useRef(null);

  const handleEdit = async () => {
    if (!inputRef.current.value) return;
    const { commentId } = await editComment(comment.id, inputRef.current.value);
    const newComment = await getCommentById(commentId);
    setInnerComment(newComment);
    setIsEditMode(false);
  };

  return (
    <div className="flex flex-row w-full py-3 px-3 items-center hover:bg-amber-200 rounded-sm cursor-pointer">
      <div className="flex flex-row gap-2 grow items-center">
        <span className="text-lg font-bold shrink-0">{comment.authorName}</span>
        {isEditMode ? (
          <Input ref={inputRef} type="text" defaultValue={comment.content} />
        ) : (
          <span>{innerComment.content}</span>
        )}
      </div>
      {user && user.id === comment.author && (
        <CommentEditSection
          isEditMode={isEditMode}
          onEdit={() => {
            setIsEditMode(true);
            setTimeout(() => {
              inputRef.current.focus();
            }, 0);
          }}
          onDelete={onDelete}
          onConfirm={handleEdit}
        />
      )}
    </div>
  );
};

const CommentEditSection = ({ isEditMode, onEdit, onDelete, onConfirm }) => {
  return (
    <div className="flex flex-row gap-1">
      {!isEditMode ? (
        <>
          <button className="text-xs hover:text-blue-500" onClick={onEdit}>
            수정
          </button>
          <button className="text-xs hover:text-blue-500 " onClick={onDelete}>
            삭제
          </button>
        </>
      ) : (
        <button className="text-xs hover:text-blue-500" onClick={onConfirm}>
          확인
        </button>
      )}
    </div>
  );
};
