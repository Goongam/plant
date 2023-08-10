"use client";

import { Group } from "@/service/group";
import { useQuery } from "react-query";
import Calander from "./Calander";
import GroupPosts from "./GroupPosts";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import useMe from "@/hooks/me";
import { useGroup } from "@/hooks/group";
import Link from "next/link";
import Loading from "./ui/Loading";
import { useRecoilValue } from "recoil";
import { postFilterState } from "@/state";

interface Props {
  groupId: string;
}

export default function GroupDetail({ groupId }: Props) {
  const { group, isLoading, isError } = useGroup(groupId);

  const router = useRouter();
  const user = useMe();

  const { postFilterDate: filterDate, postFilterUser: filterUser } =
    useRecoilValue(postFilterState);

  if (isLoading || !group) return <Loading type="Moon" />;

  if (isError) {
    if (!user)
      return (
        <button
          onClick={() => {
            signIn();
          }}
        >
          로그인 하러가기
        </button>
      );
    //TODO: 로그인O, joinX -> 가입 신청 페이지로 이동
    alert("이 그룹에 가입되어 있지 않습니다");
    router.push("/");
  }

  const { name } = group;
  return (
    <section className="p-5">
      <div className="flex justify-between items-center border-b-4 border-gray-200 pb-2">
        <h2 className="text-2xl font-bold">{name}</h2>
        <Link
          href={`/new/${groupId}`}
          className="rounded-lg bg-green-500 px-3 py-1 font-bold text-white"
        >
          새 글 작성
        </Link>
      </div>

      <div className="flex flex-row mt-3 gap-4">
        <div className="flex flex-col flex-1 w-full">
          {/* {group?.users.map((user) => (
        <Avatar image={user.image} key={user.id} size="s" />
      ))} */}

          <div>
            <Calander groupId={groupId} />
          </div>
          {(filterDate || filterUser) && (
            <div className="font-bold text-2xl my-2 p-2 border-b border-black flex">
              <p className={`${filterUser && 'after:content-["·"]'}`}>
                {filterDate &&
                  `${new Date(filterDate).getMonth() + 1}월 ${new Date(
                    filterDate
                  ).getDate()}일`}
              </p>
              <p>{filterUser && `${filterUser.name}`}</p>
            </div>
          )}
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
