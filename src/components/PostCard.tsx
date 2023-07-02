import { Post } from "@/service/post";
import Avatar from "./Avatar";
import { dateFormat } from "@/util/dayjs";

interface Props {
  post: Post;
}
export default function PostCard({ post }: Props) {
  const { author, comments, createAt, content, title, image } = post;

  //TODO: 탈퇴한 사용자 처리
  if (!author) {
    return;
  }
  return (
    <div className="w-full max-w-[452px] h-52 flex flex-col rounded-md shadow-md">
      <div className="flex flex-row items-center gap-4">
        <Avatar image={author?.image} size="s" />
        {author?.name}
      </div>
      <h2>{title}</h2>
      <div>{content}</div>
      <div>{dateFormat(createAt)}</div>
      <div>코멘트...</div>
    </div>
  );
}
