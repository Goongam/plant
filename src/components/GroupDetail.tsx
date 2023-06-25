"use client";

import { Group } from "@/service/group";
import Image from "next/image";
import { useQuery } from "react-query";
import Avatar from "./Avatar";

interface Props {
  groupId: string;
}

const fetcher = (groupId: string) =>
  fetch(`/api/group/${groupId}`).then((res) => res.json());

export default function GroupDetail({ groupId }: Props) {
  const {
    data: group,
    isLoading,
    isError,
  } = useQuery<Group>(["group-data", groupId], () => fetcher(groupId));

  if (isLoading) return <>loading...</>;

  return (
    <section>
      {group?.users.map((user) => (
        <Avatar image={user.image} key={user.email} size="s" />
      ))}
    </section>
  );
}
