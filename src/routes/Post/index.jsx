import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getPostById } from "@/shared/api";
import { PostDetailCard } from "./components";

export default function PostPage() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const fetchPostDetail = async () => {
    try {
      const post = await getPostById(postId);
      setPost(post);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPostDetail();
  }, []);

  if (!post) return;

  return (
    <div className="flex flex-col items-center justify-center py-14">
      <PostDetailCard post={post} />
    </div>
  );
}
