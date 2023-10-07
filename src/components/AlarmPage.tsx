"use client";

import useMe from "@/hooks/me";
import { Alarm, ResponseAlarms } from "@/service/alarm";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Loading from "./ui/Loading";
import { getTimeAgo } from "@/util/timeago";

const fetcher = (page: number): Promise<ResponseAlarms> =>
  fetch(`/api/alarm/${page}`).then((res) => res.json());

export default function AlarmPage() {
  const me = useMe();
  const [page, setPage] = useState(1);
  const { data, refetch, isLoading } = useQuery(["alarm", me?.id, page], () =>
    fetcher(page)
  );

  useEffect(() => {
    refetch();
  }, [page, refetch]);

  if (isLoading) return <Loading type="Moon" />;
  if (!data) return <section>알람이 없어요</section>;

  const { alarms, totalAlarms } = data;

  const maxPage = totalAlarms / 5;

  const pageArray = [];
  for (let i = 1; i <= maxPage; i++) {
    pageArray.push(i);
  }

  return (
    <section className="flex flex-col gap-2 p-2 max-w-2xl m-auto">
      {alarms.map((alarm) => (
        // TODO: 알람 타입별 컴포넌트화
        <div key={alarm._id} className="flex border-black h-28">
          <div className="w-full h-full flex flex-col border p-1 shadow-md rounded-md">
            <div>{alarm.groupId?.name}</div>
            <div className="flex">{alarm.from?.name}님의 그룹 초대 요청</div>
            <div className="mr-auto mt-auto mb-1">
              {getTimeAgo(alarm.createAt)}
            </div>
          </div>
          <div className="w-32 h-full flex flex-col ml-1 ">
            <button className="flex-1 bg-green-300 shadow-md rounded-md">
              수락
            </button>
            <button className="flex-1 bg-red-400 mt-1 shadow-md rounded-md">
              거절
            </button>
          </div>
        </div>
      ))}

      {/* 페이지버튼 */}
      <div className="flex gap-1">
        {pageArray.map((i) => (
          <button
            key={i}
            className={`${i === page && "font-bold"}`}
            onClick={() => {
              setPage(i);
            }}
          >
            {i}
          </button>
        ))}
      </div>
    </section>
  );
}
