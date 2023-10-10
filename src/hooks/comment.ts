import { Comment, Post } from "@/service/post";
import {
  InfiniteData,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import useMe from "./me";
import { day_now } from "@/util/dayjs";

type ErrorCallback = () => void;

const fetcher = (pageParams: string) =>
  fetch(pageParams).then((res) => res.json());

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
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useInfiniteQuery(
    ["comment", postId], //쿼리키
    ({ pageParam = `/api/comment/${postId}/1?` }) => fetcher(pageParam), //실제 데이터 불러옴
    {
      getNextPageParam: (lastPage) =>
        lastPage.next ? `/api/comment/${postId}/${lastPage.next}` : undefined, //pageParam 관리함수
    }
  );

  //mutate
  const { mutate: updateComment, isError: updateError } = useMutation(
    ["comment", postId],
    AddComment,
    {
      onMutate(variables) {
        if (!me) return;
        //쿼리 취소
        quertClient.cancelQueries(["comment", postId]);

        //이전 캐시값 콘텍스트 저장
        const prevCommentData = quertClient.getQueriesData(["comment", postId]);

        //업데이트
        quertClient.setQueryData(["comment", postId], (old) => {
          const oldData = old as InfiniteData<{ comments: Comment[] }>;
          const newPages = [...oldData.pages];

          newPages[0].comments = [
            {
              _id: new Date().toString(),
              author: me,
              content: variables.comment,
              createAt: day_now(),
              postId: variables.postId,
            },
            ...newPages[0].comments,
          ];

          return {
            ...oldData,
            pages: newPages,
          };
        });

        return { prevCommentData };
      },
      onError(error, variables, context) {
        if (context?.prevCommentData) {
          quertClient.setQueryData(["comment"], { ...context.prevCommentData });
        }
      },

      onSettled: () => {
        quertClient.invalidateQueries({ queryKey: ["comment", postId] });
      },
    }
  );

  return {
    comments,
    isLoading,
    isError,
    updateComment,
    updateError,
    fetchNextPage,
    hasNextPage,
    isFetching,
  };
}
