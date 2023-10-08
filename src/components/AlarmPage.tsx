"use client";

import useMe from "@/hooks/me";
import { Alarm, ResponseAlarms } from "@/service/alarm";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Loading from "./ui/Loading";
import { getTimeAgo } from "@/util/timeago";
import JoinRequest from "./alarms/JoinRequest";

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
  // const maxPage = 24;

  const pageArray = [];
  for (
    let i = Math.max(page - 5, 1);
    i <= Math.min(Math.ceil(maxPage), page + 5);
    i++
  ) {
    pageArray.push(i);
  }

  return (
    <section className="flex flex-col gap-2 p-2 max-w-2xl m-auto">
      {alarms.map((alarm) => (
        // TODO: 쪽지 기능 컴포넌트
        <JoinRequest key={alarm._id} alarm={alarm} refetch={refetch} />
      ))}

      {/* 페이지버튼 */}
      <div className="flex gap-1 justify-center">
        <button onClick={() => setPage(1)} className="mr-2">
          {"<<"}
        </button>
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
        <button onClick={() => setPage(maxPage)} className="ml-2">
          {">>"}
        </button>
      </div>
    </section>
  );
}
