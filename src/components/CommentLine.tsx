import { Comment } from "@/service/post";
import Avatar from "./Avatar";
import { getTimeAgo } from "@/util/timeago";
import { useMoreText } from "@/hooks/moreText";
import { useRef } from "react";
import MoreText from "./ui/MoreText";

export default function CommentLine({ comment }: { comment: Comment }) {
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
        <MoreText>{comment.content}</MoreText>
      </div>
    </div>
  );
}
