import { useQuery } from "react-query";
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
  } = useQuery<Schedule[]>(
    ["schedule", groupId, me?.id],
    () => fetcher(groupId, me?.id),
    {}
  );

  return { schedules, isLoading, isError };
}
