import { useComment } from "@/hooks/comment";
import { Comment, Post } from "@/service/post";
import Avatar from "./Avatar";
import { getTimeAgo } from "@/util/timeago";
import { useMoreText } from "@/hooks/moreText";
import { useRef } from "react";

export default function CommentModalDetail({ post }: { post: Post }) {
  const { comments, isError, isLoading } = useComment(post._id);
  const commentRef = useRef<HTMLDivElement>(null);
  const { handleMore, handleSimple, isClickMore, hasMore } =
    useMoreText(commentRef);

  return (
    <section className="flex flex-col w-full max-w-sm md:max-w-xl h-[500px] md:h-[700px] bg-white rounded-md p-3">
      <h2 className="border-b border-black/20 mb-2">
        개시물 댓글 {comments && comments.length}
      </h2>
      <div>
        {isLoading
          ? "loading..."
          : comments?.map((comment) => (
              <div
                key={comment.content}
                className="flex flex-row gap-3 items-start"
              >
                <Avatar image={comment.author.image} size="s" />
                <div className="flex flex-col">
                  <p className="text-xs">
                    <span className="font-bold">{comment.author.name}</span>
                    <time className="text-black/40 ml-1">
                      {/* TODO: 
                        1. 댓글 추가 만들기
                        2. DB에서 날짜 가져오기
                        3. 댓글 여러개 일때 css, infinity scroll 구현 */}
                      {getTimeAgo(new Date())}
                    </time>
                  </p>
                  <div
                    ref={commentRef}
                    className={`line-clamp-4 ${
                      isClickMore && "line-clamp-none"
                    }`}
                  >
                    {comment.content}
                  </div>
                  {hasMore && !isClickMore && (
                    <button onClick={handleMore}>더보기</button>
                  )}
                  {hasMore && isClickMore && (
                    <button onClick={handleSimple}>간략히보기</button>
                  )}
                </div>
              </div>
            ))}
      </div>
    </section>
  );
}
