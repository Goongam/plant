import { Comment } from "@/service/post";
import { useQuery } from "react-query";

const fetcher = (postid: string) =>
  fetch("/api/comment/" + postid).then((res) => res.json());
export function useComment(postId: string) {
  const {
    data: comments,
    isLoading,
    isError,
  } = useQuery<Comment[]>(["comment", postId], () => fetcher(postId));

  return { comments, isLoading, isError };
}
