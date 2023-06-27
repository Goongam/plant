"use client";

import { Group } from "@/service/group";
import { useQuery } from "react-query";
import Calander from "./Calander";
import GroupPosts from "./GroupPosts";

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

  const testPost = () => {
    fetch("/api/post/new", {
      method: "post",
      body: JSON.stringify({
        title: "testPost",
        content: "testPostcontent",
        groupId,
      }),
    });
  };
  if (isLoading || !group) return <>loading...</>;

  const { name } = group;
  return (
    <section className="p-5">
      <h2 className="text-2xl font-bold border-b-4 border-gray-200 pb-2">
        {name}
      </h2>

      <div className="flex flex-row mt-3 gap-4">
        <div className="flex flex-col flex-1">
          {/* {group?.users.map((user) => (
        <Avatar image={user.image} key={user.email} size="s" />
      ))} */}

          <div>
            <Calander groupId={groupId} />
          </div>
          <div>
            new Post Test:
            <button onClick={testPost}>테스트</button>
          </div>
          <div>00월 00일</div>
          <GroupPosts groupId={groupId} />
        </div>
        <div className="w-36 h-fit hidden md:block">
          <div>참여자</div>
          <div>채팅</div>
        </div>
      </div>
    </section>
  );
}
