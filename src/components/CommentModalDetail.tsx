import { useComment } from "@/hooks/comment";
import { Comment, Post } from "@/service/post";
import Avatar from "./Avatar";
import { getTimeAgo } from "@/util/timeago";
import { useMoreText } from "@/hooks/moreText";
import { useRef } from "react";
import useMe from "@/hooks/me";
import AddCommentInput from "./AddCommentInput";
import CommentLine from "./CommentLine";

export default function CommentModalDetail({ post }: { post: Post }) {
  const { comments, isError, isLoading, updateComment } = useComment(post._id);

  return (
    <section className="flex flex-col w-full max-w-sm md:max-w-xl h-[500px] md:h-[700px] bg-white rounded-md p-3">
      <h2 className="h-10 w-full border-b border-black/20 mb-2 text-xl font-bold p-2">
        개시물 댓글 {comments && comments.length}
      </h2>
      <div className="overflow-y-scroll scrollbar-hide">
        {isLoading ? (
          "loading..."
        ) : (
          <div>
            <AddCommentInput post={post} updateComment={updateComment} />
            <div className="flex flex-col flex-1 gap-2">
              {comments?.map((comment) => (
                <CommentLine key={comment._id} comment={comment} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
