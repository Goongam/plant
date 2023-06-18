"use client";

import { Group, getGroup } from "@/service/group";
import { useQuery } from "react-query";
import GroupListCard from "./GroupListCard";

export default function GroupList() {
  const { data: groupList, isLoading } = useQuery<Group[]>(["groups"], () =>
    fetch("/api/group").then((res) => res.json())
  );
  console.log(groupList);

  return (
    <section className="flex-1 h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 m-3">
      {groupList?.map((group) => (
        <GroupListCard key={group.id} group={group} />
      ))}
    </section>
  );
}
