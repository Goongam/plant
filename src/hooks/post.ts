import { Post } from "@/service/post";
import { useQuery } from "react-query";

const postFetcher = (groupId: string) =>
  fetch("/api/post/" + groupId).then((res) => res.json());

export function usePosts(groupId: string) {
  const {
    data: posts,
    isLoading,
    isError,
  } = useQuery<Post[]>(["posts", groupId], () => postFetcher(groupId));
  return { posts, isLoading, isError };
}
