import { Post } from "@/service/post";
import PostCard from "./PostCard";
import InfiniteScroll from "react-infinite-scroller";
import Loading from "./ui/Loading";
import { useInfinityUserPosts } from "@/hooks/post";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { postFilterState } from "@/state";
import { useEffect } from "react";
import useMe from "@/hooks/me";
import { POST_HEADER } from "./PostContainer";

interface Props {
  userId: string;
  showAllPost: () => void;
}

export default function UserPostsContainer({ userId, showAllPost }: Props) {
  const { data, fetchNextPage, hasNextPage, isFetching, refetch } =
    useInfinityUserPosts(userId);

  const me = useMe();
  //페이지 접속시 필터링 초기화
  const setFilter = useSetRecoilState(postFilterState);
  const { postFilterDate: filterDate, postFilterUser: filterUser } =
    useRecoilValue(postFilterState);
  useEffect(() => {
    setFilter({ postFilterUser: undefined, postFilterDate: undefined });
  }, [setFilter]);

  return (
    <>
      {filterDate ? (
        <div className={`${POST_HEADER} mx-4 mb-4`}>
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
        <div className={`${POST_HEADER} mx-4 mb-4`}>
          <div className="flex font-bold text-2xl ">전체 포스트</div>
          <p onClick={() => refetch()}>새로고침</p>
        </div>
      )}
      {data && (
        <InfiniteScroll
          loadMore={() => {
            if (!isFetching) fetchNextPage();
          }}
          hasMore={hasNextPage}
          className="flex flex-col w-full items-center gap-6"
        >
          {data?.pages?.map((page) =>
            page.posts.map((post: Post) => (
              <PostCard key={post._id} post={post} me={me} refresh={refetch} />
            ))
          )}
        </InfiniteScroll>
      )}
      {isFetching && <Loading type="Moon" />}
    </>
  );
}
