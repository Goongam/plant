import { Post } from "@/service/post";
import Avatar from "./Avatar";
import { dateFormat } from "@/util/dayjs";
import Carousel from "better-react-carousel";
import PostImages from "./PostImages";
import { getTimeAgo } from "@/util/timeago";

interface Props {
  post: Post;
}
export default function PostCard({ post }: Props) {
  const { author, comments, createAt, content, title, images } = post;

  //TODO: 탈퇴한 사용자 처리
  if (!author) {
    return;
  }
  return (
    <div className="w-full max-w-[552px] h-fit flex flex-col rounded-md shadow-md gap-1">
      <div className="flex flex-row items-center gap-4 border-b border-gray-100 p-2">
        <Avatar image={author?.image} size="s" />
        {author?.name} · {getTimeAgo(createAt)}
      </div>
      <div>{content}</div>

      {images && <PostImages images={post.images} />}

      <div>코멘트...</div>
    </div>
  );
}
