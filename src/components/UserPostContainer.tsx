import { postFilterDate, postFilterUser } from "@/state";
import { useInfinityPosts } from "@/hooks/post";

interface Props {
  filterDate?: postFilterDate;
  showAllPost: () => void;
  userId: string;
}
const POST_HEADER =
  "my-2 p-2 border-b border-black flex justify-between items-center";

export default function UserPostContainer({
  filterDate,
  showAllPost,
  userId,
}: Props) {
  const { refetch } = useInfinityPosts(userId);

  return (
    <>
      {filterDate ? (
        <div className={POST_HEADER}>
          <div className="flex font-bold text-2xl ">
            <p>
              {filterDate &&
                `${new Date(filterDate).getMonth() + 1}월 ${new Date(
                  filterDate
                ).getDate()}일`}
            </p>
          </div>
          <div onClick={showAllPost}>전체보기</div>
        </div>
      ) : (
        <div className={POST_HEADER}>
          <div className="flex font-bold text-2xl ">전체 포스트</div>
          <p onClick={() => refetch()}>새로고침</p>
        </div>
      )}
    </>
  );
}
