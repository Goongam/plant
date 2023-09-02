import { Post } from "@/service/post";
import Avatar from "./Avatar";
import { dateFormat } from "@/util/dayjs";
import Carousel from "better-react-carousel";
import PostImages from "./PostImages";
import { getTimeAgo } from "@/util/timeago";
import { useRef, useEffect, useState } from "react";
import CommentIcon from "./ui/icons/CommentIcon";
import ModalPortal from "./ModalPortal";
import ModalBackground from "./ModalBackground";
import CommentModalDetail from "./CommentModalDetail";
import { useComment } from "@/hooks/comment";
import useMe from "@/hooks/me";
import { User } from "@/service/user";
import { useGroup } from "@/hooks/group";
import { useRouter } from "next/navigation";

interface Props {
  post: Post;
  me?: User;
}
export default function PostCard({ post, me }: Props) {
  const { author, createAt, content, title, images, comments } = post;
  const contentRef = useRef<HTMLDivElement>(null);
  const [isMore, setIsMore] = useState(false);
  const [isClickMore, setIsClickMore] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const router = useRouter();
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
    setOpenModal(true);
  };

  const modify = () => {
    router.push(`/edit/${post._id}`);
  };
  //TODO: 탈퇴한 사용자 처리
  if (!author) {
    return;
  }

  console.log(post.author.id, me?.id);

  return (
    <div className="w-full max-w-[552px] h-fit flex flex-row gap-1 rounded-md shadow-md">
      <Avatar image={author?.image} size="s" customClass="m-2" />

      <div className="w-full h-full">
        <div className="flex flex-row justify-between items-center gap-4 p-2">
          <p>
            {author?.name} · {getTimeAgo(createAt)}
          </p>
          <div className="flex gap-1">
            <button
              onClick={modify}
              className={`${post.author.id === me?.id ? "block" : "hidden"}`}
            >
              수정
            </button>
            <button
              //TODO: optimistic update
              onClick={() => {
                fetch("/api/post/delete", {
                  method: "post",
                  body: JSON.stringify({ postId: post._id }),
                });
              }}
              className={`${
                post.author.id === me?.id || post.group.leader.id === me?.id
                  ? "block"
                  : "hidden"
              }`}
            >
              삭제
            </button>
          </div>
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
          {comments?.length ?? 0}
          <CommentIcon />
        </div>
      </div>

      {openModal && (
        <ModalPortal>
          <ModalBackground
            onClose={() => {
              setOpenModal(false);
            }}
          >
            <CommentModalDetail post={post} />
          </ModalBackground>
        </ModalPortal>
      )}
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
        {/* {comments.length} */}
        <CommentIcon />
      </div>
    </div>
  );
}
