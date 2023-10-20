import { postFilterDate, postFilterState, postFilterUser } from "@/state";
// import GroupPosts from "./GroupPosts";
import { useInfinityPosts } from "@/hooks/post";
import { day_now } from "@/util/dayjs";
import { useSchedule } from "@/hooks/schedule";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import useMe from "@/hooks/me";
import { InfiniteData } from "react-query";
import InfiniteScroll from "react-infinite-scroller";
import PostCard from "./PostCard";
import { Post } from "@/service/post";
import Loading from "./ui/Loading";

interface Props {
  filterUser?: postFilterUser;
  filterDate?: postFilterDate;
  showAllPost: () => void;
  data: InfiniteData<any> | undefined;
  refetch: () => void;
  isFetching: boolean;
  hasNextPage: boolean | undefined;
  fetchNextPage: () => void;
  showGroupName?: boolean;
}
export const POST_HEADER = "my-2 p-2 flex justify-between items-center";

export default function PostContainer({
  filterDate,
  filterUser,
  showAllPost,
  data,
  fetchNextPage,
  hasNextPage,
  isFetching,
  refetch,
  showGroupName = false,
}: Props) {
  const me = useMe();

  //페이지 접속시 필터링 초기화
  const setFilter = useSetRecoilState(postFilterState);
  useEffect(() => {
    setFilter({ postFilterUser: undefined, postFilterDate: undefined });
  }, [setFilter]);

  return (
    <>
      {filterDate || filterUser ? (
        <div className={POST_HEADER}>
          <div className="flex font-bold text-2xl ">
            <p
              className={`${filterDate && filterUser && 'after:content-["·"]'}`}
            >
              {filterDate &&
                `${new Date(filterDate).getMonth() + 1}월 ${new Date(
                  filterDate
                ).getDate()}일`}
            </p>
            <p>{filterUser && `${filterUser.name}`}</p>
          </div>
          <div onClick={showAllPost}>전체보기</div>
        </div>
      ) : (
        <div className={POST_HEADER}>
          <div className="flex font-bold text-2xl ">전체 포스트</div>
          <p onClick={() => refetch()}>새로고침</p>
        </div>
      )}

      <>
        {!!data?.pages[0].posts.length ? (
          <InfiniteScroll
            loadMore={() => {
              if (!isFetching) fetchNextPage();
            }}
            hasMore={hasNextPage}
            className="flex flex-col w-full items-center gap-6"
          >
            {data?.pages?.map((page) =>
              page.posts.map((post: Post) => (
                <PostCard
                  key={post._id}
                  post={post}
                  me={me}
                  refresh={refetch}
                  showGroupName={showGroupName}
                />
              ))
            )}
          </InfiniteScroll>
        ) : isFetching ? (
          <Loading type="Moon" />
        ) : (
          <div className="text-center">포스트가 없어요</div>
        )}
      </>
    </>
  );
}
