import { useInfiniteQuery, useMutation, useQuery } from "react-query";
import useMe from "./me";
import { Schedule } from "@/service/schedule";
import { useRecoilValue } from "recoil";
import { postFilterState } from "@/state";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useAllSchedule(groupId: string) {
  const me = useMe();
  const {
    data: schedules,
    isLoading,
    isError,
    refetch,
  } = useQuery<Schedule[]>(
    ["schedule", groupId, me?.id],
    () => fetch(`/api/schedule/${groupId}/${me?.id}`).then((res) => res.json()),
    {}
  );

  return { schedules };
}

export function useSchedule(groupId: string) {
  const me = useMe();
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
    ["posts-infinity", groupId, filterDate ? filterDate : ""], //쿼리키
    ({
      pageParam = `/api/schedule/${groupId}/${me?.id}/1?${
        filterDate ? `date=${filterDate}&` : ""
      }`,
    }) => fetcher(pageParam), //실제 데이터 불러옴
    {
      getNextPageParam: (lastPage) =>
        lastPage.next
          ? `/api/schedule/${groupId}/${me?.id}/${lastPage.next}?${
              filterDate ? `date=${filterDate}&` : ""
            }`
          : undefined, //pageParam 관리함수
    }
  );

  return {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetching,
  };
}

export function useAllScheduleByUser(userId?: string) {
  const {
    data: schedules,
    isLoading,
    isError,
    refetch,
  } = useQuery<Schedule[]>(
    ["schedule-user", userId],
    () => fetch(`/api/schedule/user/${userId}/`).then((res) => res.json()),
    {}
  );

  return { schedules };
}

export function useScheduleByUser(userId?: string) {
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
    ["schedule-infinity-user", userId, filterDate ? filterDate : ""], //쿼리키
    ({
      pageParam = `/api/schedule/user/${userId}/1?${
        filterDate ? `date=${filterDate}&` : ""
      }`,
    }) => fetcher(pageParam), //실제 데이터 불러옴
    {
      getNextPageParam: (lastPage) =>
        lastPage.next
          ? `/api/schedule/user/${userId}/${lastPage.next}?${
              filterDate ? `date=${filterDate}&` : ""
            }`
          : undefined, //pageParam 관리함수
    }
  );

  return {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetching,
  };
}

export function useScheduleMutate(groupId: string) {
  const { refetch } = useSchedule(groupId);
  const { mutate, isLoading, isError } = useMutation(
    ["schedule"],
    (data: FormData) =>
      fetch("/api/schedule/new", {
        method: "post",
        body: data,
      }).then((res) => res.json()),
    {
      onSuccess: () => {
        refetch();
      },
    }
  );

  return { mutate, isLoading, isError };
}
