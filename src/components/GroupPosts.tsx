import { Post } from "@/service/post";
import { useQuery } from "react-query";
import PostCard from "./PostCard";
import { usePosts } from "@/hooks/post";

interface Props {
  groupId: string;
}

const postFetcher = (groupId: string) =>
  fetch("/api/post/" + groupId).then((res) => res.json());

export default function GroupPosts({ groupId }: Props) {
  const { isError, isLoading, posts } = usePosts(groupId);

  return (
    <div className="flex flex-col w-full items-center gap-6">
      {posts?.map((post) => (
        <PostCard post={post} key={post._id} />
      ))}
    </div>
  );
}
