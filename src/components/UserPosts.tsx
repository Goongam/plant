import { Post } from "@/service/post";
import PostCard from "./PostCard";
import InfiniteScroll from "react-infinite-scroller";
import Loading from "./ui/Loading";
import { useInfinityUserPosts } from "@/hooks/post";
import { useSetRecoilState } from "recoil";
import { postFilterState } from "@/state";
import { useEffect } from "react";

interface Props {
  userId: string;
}

export default function UserPosts({ userId }: Props) {
  const { data, fetchNextPage, hasNextPage, isFetching } =
    useInfinityUserPosts(userId);

  //페이지 접속시 필터링 초기화
  const setFilter = useSetRecoilState(postFilterState);
  useEffect(() => {
    setFilter({ postFilterUser: undefined, postFilterDate: undefined });
  }, [setFilter]);
  return (
    <>
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
              <PostCard key={post._id} post={post} />
            ))
          )}
        </InfiniteScroll>
      )}
      {isFetching && <Loading type="Moon" />}
    </>
  );
}
