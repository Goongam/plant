import { Comment } from "@/service/post";
import Avatar from "./Avatar";
import { getTimeAgo } from "@/util/timeago";
import { useMoreText } from "@/hooks/moreText";
import { useRef } from "react";

export default function CommentLine({ comment }: { comment: Comment }) {
  const commentRef = useRef<HTMLDivElement>(null);
  const { handleMore, handleSimple, isClickMore, hasMore } =
    useMoreText(commentRef);

  return (
    <div key={comment._id} className="flex flex-row gap-3 items-start">
      <Avatar image={comment.author.image} size="s" />
      <div className="flex flex-col">
        <p className="text-xs">
          <span className="font-bold">{comment.author.name}</span>
          <time className="text-black/40 ml-1">
            {getTimeAgo(comment.createAt)}
          </time>
        </p>
        <div
          ref={commentRef}
          className={`line-clamp-4 ${isClickMore && "line-clamp-none"}`}
        >
          {comment.content}
        </div>
        {hasMore && !isClickMore && (
          <button onClick={handleMore} className="text-start text-black/40">
            더보기
          </button>
        )}
        {hasMore && isClickMore && (
          <button onClick={handleSimple} className="text-start text-black/40">
            간략히보기
          </button>
        )}
      </div>
    </div>
  );
}
