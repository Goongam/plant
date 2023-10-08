import { useMutation, useQueryClient } from "react-query";
import useMe from "./me";

export function useAlarmMutation(page: number) {
  //   const queryClient = useQueryClient();
  //   const me = useMe();
  //   const { mutate } = useMutation(() => fetch("/api"), {
  //     onMutate(variables) {
  //       queryClient.cancelQueries(["alarm", me?.id, page]);
  //       const prevCommentData = queryClient.getQueriesData(["comment", postId]);
  //       queryClient.setQueryData(["comment", postId], (old) => {
  //         const oldData = old as Comment[];
  //         return [
  //           {
  //             _id: new Date(),
  //             author: me,
  //             content: variables.comment,
  //             createAt: day_now(),
  //             postId: variables.postId,
  //           },
  //           ...oldData,
  //         ];
  //       });
  //       return { prevCommentData };
  //     },
  //     onError(error, variables, context) {
  //       if (context?.prevCommentData) {
  //         queryClient.setQueryData(["comment"], [...context.prevCommentData]);
  //       }
  //     },
  //     onSettled: () => {
  //       queryClient.invalidateQueries({ queryKey: ["comment", postId] });
  //     },
  //   });
  //   return { mutate };
}
