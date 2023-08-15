"use client";

import { Group, getGroups } from "@/service/group";
import { useQuery } from "react-query";
import GroupListCard from "./GroupListCard";
// import Loading from "./ui/Loading";
import { Category } from "@/types/Category";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRecoilState, useRecoilValue } from "recoil";
import { groupFilterState } from "@/state";

interface Props {
  selectCategory: Category | "전체";
}

export default function GroupList({ selectCategory }: Props) {
  const { data, isLoading, error } = useQuery<Group[]>(["groups"], () =>
    fetch("/api/group").then((res) => res.json())
  );

  const Loading = dynamic(() => import("./ui/Loading"), {
    ssr: false,
  });

  const { cost, end_time, isOffline, region } =
    useRecoilValue(groupFilterState);

  if (isLoading) {
    return (
      <Loading type="GridLoader" size={20} customStyle="mt-4" color="#04656c" />
    );
  }
  if (error) {
    return <div>error</div>;
  }

  //필터링
  let groupList = data;
  if (end_time)
    groupList = groupList?.filter(
      (group) =>
        new Date(group.end_date) <
        new Date(new Date(end_time).getTime() + 24 * 60 * 60 * 1000)
    );
  if (cost && cost !== "전체")
    groupList = groupList?.filter((group) => {
      if (cost === "무료") {
        return group.cost === 0;
      } else if (cost === "유료") {
        return group.cost !== 0;
      }
    });
  if (region && region !== "전체")
    groupList = groupList?.filter((group) => group.region === region);

  if (isOffline && isOffline !== "전체")
    groupList = groupList?.filter((group) => {
      if (isOffline === "유") return group.isOffline;
      else if (isOffline === "무") return !group.isOffline;
    });

  return (
    <section
      className={`flex-1  w-full grid grid-cols-1 ${
        groupList?.length && "md:grid-cols-2"
      } ${groupList?.length && "lg:grid-cols-3"} gap-5 m-3`}
    >
      {groupList?.length ? (
        groupList?.map((group, index) => {
          if (group.category === selectCategory || selectCategory === "전체")
            return <GroupListCard key={`${group._id}${index}`} group={group} />;
        })
      ) : (
        <div className="w-full h-full flex flex-col justify-center items-center">
          <p>선택하신 방을 찾을 수 없습니다</p>
          <p>조건을 변경하거나 초기화 해보세요</p>
        </div>
      )}
    </section>
  );
}
