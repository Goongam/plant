import { useMutation, useQuery } from "react-query";
import useMe from "./me";
import { Schedule } from "@/service/schedule";

const fetcher = (groupId: string, userId?: string) =>
  fetch(`/api/schedule/${groupId}/${userId}`).then((res) => res.json());

export function useSchedule(groupId: string) {
  const me = useMe();
  const {
    data: schedules,
    isLoading,
    isError,
    refetch,
  } = useQuery<Schedule[]>(
    ["schedule", groupId, me?.id],
    () => fetcher(groupId, me?.id),
    {}
  );

  return { schedules, isLoading, isError, refetch };
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
