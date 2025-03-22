import { SmallPost } from "./components/SmallPost";
import { Button, Input, TagBadge, PostDialog } from "@/shared/components";
import { useState, useEffect, useContext } from "react";
import { getPosts, getTags, getPostById } from "@/shared/api";
import { createPost } from "./api";
import { UserContext } from "@/shared/context";
import { useNavigate } from "react-router";

export default function Home() {
  const { user } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [searchTags, setSearchTags] = useState([]);
  const navigate = useNavigate();

  const [storedTags, setStoredTags] = useState([]);

  const fetchPosts = async () => {
    const posts = await getPosts();
    setPosts(posts);
  };

  const fetchTags = async () => {
    const tags = await getTags();
    setSearchTags(tags);
    setStoredTags(tags);
  };

  useEffect(() => {
    fetchPosts();
    fetchTags();
  }, []);
  const handleSearchTagInputChange = (e) => {
    const { value } = e.target;
    const newTags = storedTags.filter((tag) => tag.content.includes(value));
    setSearchTags(newTags);
  };

  const handleCreatePost = async (post) => {
    const createResponse = await createPost({
      ...post,
      author: user.username,
    });
    const newPost = await getPostById(createResponse.postId);
    setPosts([...posts, newPost]);
    fetchTags();
  };

  return (
    <div className="pb-20 pt-14">
      <div className="flex flex-col justify-center items-center mb-5">
        <div className="w-full mb-16 flex justify-center">
          <h1 className="uppercase text-6xl text-black">my blog</h1>
        </div>
        <div className="w-[90vw] max-w-md flex justify-center">
          <Input
            type="text"
            placeholder="태그를 검색하세요"
            onChange={handleSearchTagInputChange}
          />
        </div>
        <div className="flex mt-5 justify-center flex-wrap">
          {searchTags.map((tag) => {
            return <TagBadge key={tag.id} tag={tag} />;
          })}
        </div>
      </div>

      <div className="mx-auto grid grid-cols-1 gap-y-4 md:grid-cols-2 lg:grid-cols-3 px-10 mt-10 lg:w-[950px] md:w-[640px] w-[320px]">
        {posts.map((post) => (
          <div
            key={post.id}
            className="w-full flex justify-center items-center"
          >
            <SmallPost
              post={post}
              onClick={() => {
                console.log(post.id);
                navigate(`/post/${post.id}`);
              }}
            />
          </div>
        ))}
      </div>
      {user && (
        <div className="flex justify-center m-20">
          <PostDialog
            triggerButton={
              <Button className="!bg-amber-500 text-white">작성</Button>
            }
            onSubmit={handleCreatePost}
          />
        </div>
      )}
    </div>
  );
}
