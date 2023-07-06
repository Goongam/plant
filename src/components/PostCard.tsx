import { Post } from "@/service/post";
import Avatar from "./Avatar";
import { dateFormat } from "@/util/dayjs";
import Carousel from "better-react-carousel";
import PostImages from "./PostImages";
import { getTimeAgo } from "@/util/timeago";
import { useRef, useEffect, useState } from "react";
import CommentIcon from "./ui/icons/CommentIcon";

interface Props {
  post: Post;
}
export default function PostCard({ post }: Props) {
  const { author, comments, createAt, content, title, images } = post;
  const contentRef = useRef<HTMLDivElement>(null);
  const [isMore, setIsMore] = useState(false);
  const [isClickMore, setIsClickMore] = useState(false);

  useEffect(() => {
    const current = contentRef.current;
    const clientHeight = current?.clientHeight;
    const scrollHeight = current?.scrollHeight;

    if (!clientHeight || !scrollHeight) return;

    if (clientHeight === scrollHeight) setIsMore(true); //초과x
    else setIsMore(false); //초과됨
  }, [content, contentRef, isMore]);

  const handleMore = () => {
    setIsClickMore(true);
    setIsMore(true);
  };
  const handleSimple = () => {
    setIsClickMore(false);
    setIsMore(false);
  };
  const handleComment = () => {
    //TODO: 코멘트 모달열기
  };
  //TODO: 탈퇴한 사용자 처리
  if (!author) {
    return;
  }
  return (
    <div className="w-full max-w-[552px] h-fit flex flex-row gap-1 rounded-md shadow-md">
      <Avatar image={author?.image} size="s" customClass="m-2" />

      <div className="w-full h-full">
        <div className="flex flex-row items-center gap-4 p-2">
          {author?.name} · {getTimeAgo(createAt)}
        </div>

        <div>
          <div
            ref={contentRef}
            className={`w-full line-clamp-4 mt-1 mb-5 ${
              isMore && "line-clamp-none"
            }`}
          >
            {content}
          </div>

          {!isMore && content && (
            <button onClick={handleMore} className="text-black/30">
              더보기
            </button>
          )}
          {isMore && content && isClickMore && (
            <button onClick={handleSimple} className="text-black/30">
              간략히보기
            </button>
          )}
        </div>

        {images && <PostImages images={post.images} />}

        <div
          className="flex flex-row items-center gap-1 py-1 my-1 cursor-pointer"
          onClick={handleComment}
        >
          {comments.length}
          <CommentIcon />
        </div>
      </div>
    </div>
  );
  return (
    <div className="w-full max-w-[552px] h-fit flex flex-col gap-1 rounded-md shadow-md">
      <div className="flex flex-row items-center gap-4 border-b border-gray-100 p-2">
        <Avatar image={author?.image} size="s" />
        {author?.name} · {getTimeAgo(createAt)}
      </div>
      <div>
        <div
          ref={contentRef}
          className={`w-full line-clamp-4 ${isMore && "line-clamp-none"}`}
        >
          {content}
        </div>

        {!isMore && <button onClick={() => setIsMore(true)}>더보기...</button>}
      </div>

      {images && <PostImages images={post.images} />}

      <div className="flex flex-row items-center gap-1">
        {comments.length}
        <CommentIcon />
      </div>
    </div>
  );
}
