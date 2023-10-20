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
import Link from "next/link";

interface Props {
  post: Post;
  me?: User;
  refresh?: () => void;
  showGroupName?: boolean;
}
export default function PostCard({
  post,
  me,
  refresh,
  showGroupName = false,
}: Props) {
  const { author, createAt, content, title, images, comments, group } = post;

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

  return (
    <div className="w-full max-w-[552px] h-fit flex flex-col">
      {showGroupName && (
        <Link
          className="ml-auto text-sm"
          href={`/group/${group._id}`}
        >{`${group.name} >>`}</Link>
      )}
      <div className="flex flex-row gap-1 rounded-md shadow-md">
        <Avatar
          image={author ? author.image : "/avatar_common.jpg"}
          size="s"
          customClass="m-2"
        />

        <div className="w-full h-full">
          <div className="flex flex-row justify-between items-center gap-4 p-2">
            <p>
              {author ? author.name : "탈퇴한 사용자"} · {getTimeAgo(createAt)}
            </p>
            <div className="flex gap-1">
              <button
                onClick={modify}
                className={`${post.author.id === me?.id ? "block" : "hidden"}`}
              >
                수정
              </button>
              <button
                onClick={() => {
                  fetch("/api/post/delete", {
                    method: "post",
                    body: JSON.stringify({ postId: post._id }),
                  }).then((res) => {
                    if (res.ok) {
                      if (refresh) refresh();
                    } else {
                      alert("삭제에 실패하였습니다.");
                    }
                  });
                }}
                //TODO: 그룹 없을 때 처리
                className={`${
                  post.author.id === me?.id || post.group?.leader?.id === me?.id
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
    </div>
  );
}
