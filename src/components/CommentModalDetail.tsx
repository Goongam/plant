import { useComment } from "@/hooks/comment";
import { Comment, Post } from "@/service/post";
import Avatar from "./Avatar";
import { getTimeAgo } from "@/util/timeago";
import { useMoreText } from "@/hooks/moreText";
import { useRef } from "react";
import useMe from "@/hooks/me";
import AddCommentInput from "./AddCommentInput";
import CommentLine from "./CommentLine";
import Loading from "./ui/Loading";
import InfiniteScroll from "react-infinite-scroller";

export default function CommentModalDetail({ post }: { post: Post }) {
  const errorHandler = () => {};
  const {
    comments,
    isError,
    isLoading,
    updateComment,
    updateError,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useComment(post._id, errorHandler);

  return (
    <section className="flex flex-col w-full max-w-sm md:max-w-xl h-[500px] md:h-[700px] bg-white rounded-md p-3">
      <h2 className="h-10 w-full border-b border-black/20 mb-2 text-xl font-bold p-2">
        {/* 개시물 댓글 {comments && comments.length} */}
      </h2>
      <div className="overflow-y-scroll scrollbar-hide">
        {isLoading ? (
          <Loading type={"Moon"} size={20} />
        ) : (
          <div>
            <AddCommentInput post={post} updateComment={updateComment} />
            {updateError && (
              <div className="w-full h-10 flex justify-center items-center bg-red-400 rounded-md text-white font-bold my-2 ">
                코멘트 추가 중 에러가 발생하였습니다. 잠시후 다시 시도해주세요
              </div>
            )}
            {/* TODO: 한번에 다 받아오는거 수정 */}
            <InfiniteScroll
              loadMore={() => {
                if (!isFetching) fetchNextPage();
              }}
              hasMore={hasNextPage}
              className="flex flex-col flex-1 gap-2"
            >
              {comments?.pages.map((page) =>
                page.comments.map((comment: Comment) => (
                  <CommentLine key={comment._id} comment={comment} />
                ))
              )}
            </InfiniteScroll>
          </div>
        )}
      </div>
    </section>
  );
}
