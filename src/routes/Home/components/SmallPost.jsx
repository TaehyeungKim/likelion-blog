import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TagBadge } from "@/shared/components";

export const SmallPost = ({ post, onClick }) => {
  return (
    <Card
      onClick={onClick}
      className="h-full w-64 relative block group ring-3 ring-transparent border-2 border-box hover:bg-stone-100  hover:border-transparent hover:ring-stone-300 rounded-xl font-medium hover:shadow-2xl hover:shadow-gray-300 hover:-translate-y-2 transition-transform duration-500 cursor-pointer"
    >
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-start">
          {post.title}
        </CardTitle>
        <CardDescription className="text-sm text-start">
          {post.authorName}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap mt-5">
          {post.tags.map((tag) => (
            <TagBadge key={tag.id} tag={tag} />
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <div>
          {post.like_users.length > 0 && `❤️ ${post.like_users.length}`}
        </div>
      </CardFooter>
    </Card>
  );
};
