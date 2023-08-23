import { Post } from "@/service/post";
import { postFilterState } from "@/state";
import { useInfiniteQuery, useQuery } from "react-query";
import { useRecoilValue } from "recoil";

const postFetcher = (groupId: string) =>
  fetch("/api/post/" + groupId).then((res) => res.json());

const postUserFetcher = (userId: string) =>
  fetch("/api/post/user/" + userId).then((res) => res.json());

export function usePostsByGroup(groupId: string) {
  const {
    data: posts,
    isLoading,
    isError,
  } = useQuery<Post[]>(["posts", groupId], () => postFetcher(groupId));
  return { posts, isLoading, isError };
}

export function usePostsByUser(userId: string) {
  const {
    data: posts,
    isLoading,
    isError,
  } = useQuery<Post[]>(["posts-user", userId], () => postUserFetcher(userId));
  return { posts, isLoading, isError };
}

const Fetcher = (url: string) => {
  return fetch(url).then((res) => res.json());
};

export function useInfinityPosts(groupId: string) {
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
    refetch,
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
    }) => Fetcher(pageParam), //실제 데이터 불러옴
    {
      getNextPageParam: (lastPage) =>
        lastPage.next
          ? `/api/post/${groupId}/${lastPage.next}?${
              filterDate ? `date=${filterDate}&` : ""
            }${filterUser ? `id=${filterUser.id}&` : ""}`
          : undefined, //pageParam 관리함수
    }
  );

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
  };
}

export function useInfinityUserPosts(userId: string) {
  const { postFilterDate: filterDate } = useRecoilValue(postFilterState);

  const {
    data, //데이터
    fetchNextPage, //pageParam에 저장된 다음url을 불러옴
    hasNextPage, //pageParam에 url이 저장되 있는지 확인
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
  } = useInfiniteQuery(
    ["posts-infinity-user", userId, filterDate ? filterDate : ""], //쿼리키
    ({
      pageParam = `/api/post/user/${userId}/1?${
        filterDate ? `date=${filterDate}&` : ""
      }`,
    }) => Fetcher(pageParam), //실제 데이터 불러옴
    {
      getNextPageParam: (lastPage) =>
        lastPage.next
          ? `/api/post/user/${userId}/${lastPage.next}?${
              filterDate ? `date=${filterDate}&` : ""
            }`
          : undefined, //pageParam 관리함수
    }
  );

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
  };
}
