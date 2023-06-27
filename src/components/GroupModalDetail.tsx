"use client";

import { Group } from "@/service/group";
import { dateFormat } from "@/util/dayjs";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Props {
  group: Group;
}
export default function GroupModalDetail({ group }: Props) {
  const {
    id,
    category,
    createAt,
    description,
    end_date,
    max_user,
    name,
    users,
  } = group;

  const u = useSession();
  const router = useRouter();
  const isAlreadyJoin = users.filter(
    (user) => user.email === u.data?.user.email
  );

  // TODO: 입장시 방으로 이동
  const joinHandler = () => {
    fetch("/api/group/join", {
      method: "post",
      body: JSON.stringify({
        groupId: id,
      }),
    })
      .then(() => {
        router.push(`/group/${id}`);
      })
      .catch(() => {}); //TODO:에러처리
  };
  return (
    <section className="flex flex-col w-full max-w-sm md:max-w-xl h-[500px] md:h-[700px] bg-white rounded-md p-3">
      <p className="text-neutral-500 ml-auto">{dateFormat(createAt)}생성</p>
      <div className="flex flex-col h-full w-full gap-2 overflow-x-auto scrollbar-hide">
        <h2 className="font-semibold text-2xl">{name}</h2>
        <p className="w-full break-words flex-1">{description}</p>

        <div>
          <div>여기에 방장 표시</div>
          <div>
            {users.length}/{max_user ?? 0} 참여
          </div>
          <div>여기에 참여인원 표시</div>
        </div>

        <p>{dateFormat(end_date)}까지</p>

        {!!isAlreadyJoin.length ? (
          <Link
            className={`mt-auto bg-green-200 rounded-lg w-full h-10 disabled:bg-slate-600 flex justify-center items-center`}
            href={`/group/${id}`}
          >
            그룹으로 이동하기
          </Link>
        ) : (
          <button
            className={`mt-auto bg-blue-300 rounded-lg w-full h-10 disabled:bg-slate-600`}
            onClick={joinHandler}
          >
            참가하기
          </button>
        )}
      </div>
    </section>
  );
}
