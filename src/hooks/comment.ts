import { Comment } from "@/service/post";
import { useMutation, useQuery, useQueryClient } from "react-query";
import useMe from "./me";
import { day_now } from "@/util/dayjs";

type ErrorCallback = () => void;

const fetcher = (postid: string) =>
  fetch("/api/comment/" + postid).then((res) => res.json());

const AddComment = ({ comment, postId }: { comment: string; postId: string }) =>
  fetch(`/api/comment/new`, {
    method: "post",
    body: JSON.stringify({
      postId,
      comment,
    }),
  }).then((res) => res.json());

export function useComment(
  postId: string,
  commentErrorHandler?: ErrorCallback
) {
  const quertClient = useQueryClient();
  const me = useMe();

  const {
    data: comments,
    isLoading,
    isError,
    refetch,
  } = useQuery<Comment[]>(["comment", postId], () => fetcher(postId));

  // refetch()

  const { mutate: updateComment, isError: updateError } = useMutation(
    ["comment", postId],
    AddComment,
    {
      onMutate(variables) {
        if (!me) return;
        quertClient.cancelQueries(["comment", postId]);

        const prevCommentData = quertClient.getQueriesData(["comment", postId]);

        quertClient.setQueryData(["comment", postId], (old) => {
          const oldData = old as Comment[];
          return [
            {
              _id: new Date(),
              author: me,
              content: variables.comment,
              createAt: day_now(),
              postId: variables.postId,
            },
            ...oldData,
          ];
        });

        return { prevCommentData };
      },
      onError(error, variables, context) {
        if (context?.prevCommentData) {
          quertClient.setQueryData(["comment"], [...context.prevCommentData]);
        }
      },

      onSettled: () => {
        quertClient.invalidateQueries({ queryKey: ["comment", postId] });
      },
    }
  );

  return { comments, isLoading, isError, updateComment, updateError };
}
