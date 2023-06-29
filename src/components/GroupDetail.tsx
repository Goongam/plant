"use client";

import { Group } from "@/service/group";
import { useQuery } from "react-query";
import Calander from "./Calander";
import GroupPosts from "./GroupPosts";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

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

  const router = useRouter();

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
  if (isError) {
    console.log("에러");
    //TODO: 로그인페이지 따로 생성
    //TODO: 로그인X -> 로그인 페이지
    //TODO: 로그인O, joinX -> alert후 메인으로 이동
    // router.push("/login");

    // signIn();
  }
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
        <Avatar image={user.image} key={user.id} size="s" />
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
