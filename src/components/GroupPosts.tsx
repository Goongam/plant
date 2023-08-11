import { Post } from "@/service/post";
import { useQuery } from "react-query";
import PostCard from "./PostCard";
import { usePosts } from "@/hooks/post";
import { useInfiniteQuery } from "react-query";
import InfiniteScroll from "react-infinite-scroller";
import Loading from "./ui/Loading";
import { queryKey } from "@/constants";
import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { postFilterState } from "@/state";

interface Props {
  groupId: string;
}

const postFetcher = (url: string) => {
  return fetch(url).then((res) => res.json());
};

export default function GroupPosts({ groupId }: Props) {
  const setFilter = useSetRecoilState(postFilterState);
  const { postFilterDate: filterDate, postFilterUser: filterUser } =
    useRecoilValue(postFilterState);

  const {
    data, //데이터
    fetchNextPage, //pageParam에 저장된 다음url을 불러옴
    hasNextPage, //pageParam에 url이 저장되 있는지 확인
    isLoading,
    isError,
    error,
    isFetching,
  } = useInfiniteQuery(
    [
      "posts-infinity",
      groupId,
      filterDate ? filterDate : "",
      filterUser ? filterUser.id : "",
    ], //쿼리키
    ({
      pageParam = `/api/post/${groupId}/1?${
        filterDate ? `date=${filterDate}&` : ""
      }${filterUser ? `id=${filterUser.id}&` : ""}`,
    }) => postFetcher(pageParam), //실제 데이터 불러옴
    {
      getNextPageParam: (lastPage) =>
        lastPage.next
          ? `/api/post/${groupId}/${lastPage.next}?${
              filterDate ? `date=${filterDate}&` : ""
            }${filterUser ? `id=${filterUser.id}&` : ""}`
          : undefined, //pageParam 관리함수
    }
  );

  return (
    <>
      {data && (
        <InfiniteScroll
          loadMore={() => {
            fetchNextPage();
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
