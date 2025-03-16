import { posts } from "../../data/posts";
import { SmallPost } from "./components/SmallPost";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState, useMemo } from "react";
import { SearchTag } from "@/shared/components";

const getTaglistsFromPosts = (posts) => {
  const tagList = posts.reduce((acc, post) => {
    if (post) {
      for (let tag of post.tags) {
        acc.add(tag);
      }
    }
    return acc;
  }, new Set());

  return [...tagList];
};

export default function Home() {
  const navigate = useNavigate();
  const [homepagePosts, setHomepagePosts] = useState([]);
  const [searchTags, setSearchTags] = useState(() =>
    getTaglistsFromPosts(posts)
  );

  const tags = useMemo(() => {
    const tagList = homepagePosts.reduce((acc, post) => {
      if (post) {
        for (let tag of post.tags) {
          console.log(tag);
          acc.add(tag);
        }
      }
      return acc;
    }, new Set());
    return [...tagList];
  }, [homepagePosts]);

  const handleSearchTagInputChange = (e) => {
    const { value } = e.target;
    const newTags = tags.filter((tag) => tag.includes(value));
    setSearchTags(newTags);
  };

  useEffect(() => {
    setHomepagePosts(posts);
  }, []);

  return (
    <div>
      <div className="flex flex-col justify-center items-center mb-5">
        <div className="w-full mb-16 flex justify-center">
          <h1 className="uppercase text-6xl text-black">my blog</h1>
        </div>
        <div className="w-[90vw] max-w-md flex justify-center">
          <Input
            className="focus-visible:ring-amber-500 focus-visible:ring-2 focus-visible:border-transparent selection:bg-amber-300 selection:text-black"
            type="text"
            placeholder="태그를 검색하세요"
            onChange={handleSearchTagInputChange}
          />
        </div>
        <div className="flex mt-5 justify-center flex-wrap">
          {searchTags.map((tag) => {
            console.log("tag", tag);
            return <SearchTag key={tag.id} tag={tag} />;
          })}
        </div>
      </div>

      <div className="mx-auto grid grid-cols-1 gap-y-4 md:grid-cols-2 lg:grid-cols-3 px-10 mt-10 lg:w-[950px] md:w-[640px] w-[320px]">
        {posts.map((post) => (
          <div
            key={post.id}
            className="w-full flex justify-center items-center"
          >
            <SmallPost post={post} />
          </div>
        ))}
      </div>
      <div className="flex justify-center m-20">
        <Button className="!bg-amber-500" onClick={() => navigate("/create")}>
          작성
        </Button>
      </div>
    </div>
  );
}
