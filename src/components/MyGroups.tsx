"use client";

import { SimpleGroup } from "@/service/group";
import { useQuery } from "react-query";
import GroupListCard from "./GroupListCard";
import Loading from "./ui/Loading";

const fetcher = () => fetch("");
export default function MyGroups() {
  const {
    data: groups,
    isLoading,
    isError,
  } = useQuery<SimpleGroup[]>(["mygroup"], () =>
    fetch("/api/group/me").then((res) => res.json())
  );

  if (!groups) return <Loading type="Moon" customStyle="mt-4" />;

  return (
    <div
      className={`flex-1 w-full grid grid-cols-1 ${
        groups?.length && "md:grid-cols-2"
      } ${groups?.length && "lg:grid-cols-3"} gap-5 p-3`}
    >
      {groups
        .sort((A, B) => {
          if (new Date(B.end_date) >= new Date()) return 1;
          else return -1;
        })
        .map((group) => (
          <GroupListCard
            key={group._id}
            group={group}
            active={new Date(group.end_date) >= new Date()}
          />
        ))}
    </div>
  );
}
