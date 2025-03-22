import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { formatDate } from "@/shared/utils";
import { TagBadge, PostDialog, ConfirmDialog } from "@/shared/components";
import { CommentLine, CommentInput } from "./";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { UserContext } from "@/shared/context";
import { useContext, useEffect, useState, useCallback } from "react";
import {
  getComments,
  createComment,
  editPost,
  deleteComment,
  likePost,
} from "../api";
import { getPostById } from "@/shared/api";
import { deletePost } from "../api";
import { useNavigate } from "react-router";
import { LikeIcon } from "@/assets/icons";
import { cn } from "@/lib/utils";
export const PostDetailCard = ({ post }) => {
  const { user } = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [isCommentSectionOpen, setIsCommentSectionOpen] = useState(true);
  const [innerPost, setInnerPost] = useState(post);
  const [isPostLiked, setIsPostLiked] = useState(
    () => user && post.like_users.includes(user.id)
  );
  const fetchComments = useCallback(async () => {
    const comments = await getComments(post.id);
    setComments(comments);
  }, [post]);

  useEffect(() => {
    fetchComments();
  }, [post, fetchComments]);

  const handleSubmitComment = async (content) => {
    const author = user.id;
    const postId = post.id;
    await createComment(postId, content, author);
    fetchComments();
  };

  const handleDeleteComment = async (commentId) => {
    await deleteComment(commentId);
    fetchComments();
  };

  const handleLikePost = async () => {
    if (!user) return;
    await likePost(user.id, innerPost.id);
    setIsPostLiked((like) => !like);
  };

  return (
    <Collapsible className="w-[80%] max-w-[800px]" open={isCommentSectionOpen}>
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-3">
            <div className="flex flex-row justify-between">
              <CardTitle className="text-4xl font-bold text-start">
                {innerPost.title}
              </CardTitle>
              {user && user.id === post.author && (
                <PostEditButtonSection
                  post={innerPost}
                  onPostChange={(editedPost) => {
                    setInnerPost(editedPost);
                  }}
                />
              )}
            </div>
            <CardDescription className="text-lg text-gray-500 text-start flex justify-between">
              <span>{innerPost.authorName}</span>
              <span>{formatDate(innerPost.created_at)}</span>
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 pb-0">
          <div className="text-lg text-gray-500 text-start">
            {innerPost.content}
          </div>
          <div className="flex justify-between">
            <div className="flex flex-wrap grow">
              {innerPost.tags.map((tag) => (
                <TagBadge key={tag.id} tag={tag} />
              ))}
            </div>
            <button
              onClick={handleLikePost}
              className={cn(
                "text-xs",
                user && isPostLiked ? "text-red-500" : "text-gray-300"
              )}
            >
              <LikeIcon />
            </button>
          </div>
          <CommentInput disabled={!user} onSubmit={handleSubmitComment} />
        </CardContent>
        <CardFooter className="flex justify-end pb-3">
          {comments.length > 0 && (
            <button
              className="text-xs hover:text-blue-500"
              onClick={() => setIsCommentSectionOpen(!isCommentSectionOpen)}
            >
              {isCommentSectionOpen ? "댓글 닫기" : "댓글 더보기"}
            </button>
          )}
        </CardFooter>
      </Card>
      <CollapsibleContent>
        <CommentSection
          comments={comments}
          onDeleteComment={handleDeleteComment}
        />
      </CollapsibleContent>
    </Collapsible>
  );
};

const CommentSection = ({ comments, onDeleteComment }) => {
  return (
    <div className="mt-2.5 overflow-hidden flex flex-col gap-2 w-full  bg-stone-50 rounded-sm">
      {comments.map((comment) => (
        <CommentLine
          key={comment.id}
          comment={comment}
          onDelete={() => onDeleteComment(comment.id)}
        />
      ))}
    </div>
  );
};

const PostEditButtonSection = ({ post, onPostChange }) => {
  const navigate = useNavigate();
  const handlePostEdit = async (editedPost) => {
    const { postId } = await editPost(post.id, editedPost);
    const newPost = await getPostById(postId);
    onPostChange(newPost);
  };

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  return (
    <div className="flex flex-row justify-end gap-2 items-start">
      <PostDialog
        triggerButton={
          <button className="text-xs hover:text-blue-500 !px-1 !py-1">
            수정
          </button>
        }
        post={post}
        onSubmit={handlePostEdit}
      />
      <ConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={(open) => setIsDeleteDialogOpen(open)}
        title="게시물 삭제"
        message="게시물을 삭제하시겠습니까?"
        onConfirm={() => {
          deletePost(post.id);
          setIsDeleteDialogOpen(false);
          navigate("/");
        }}
        onCancel={() => setIsDeleteDialogOpen(false)}
        triggerButton={
          <button className="text-xs hover:text-blue-500 !px-1 !py-1">
            삭제
          </button>
        }
      />
    </div>
  );
};
