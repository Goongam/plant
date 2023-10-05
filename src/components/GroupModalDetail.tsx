"use client";

import useMe from "@/hooks/me";
import { Group, SimpleGroup } from "@/service/group";
import { dateFormat, timeFormat } from "@/util/dayjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import PulseLoading from "./ui/PulseLoader";
import Loading from "./ui/Loading";
import Avatar from "./Avatar";

interface Props {
  group: SimpleGroup;
  closeModal: () => void;
}
export default function GroupModalDetail({ group, closeModal }: Props) {
  const {
    _id,
    category,
    createAt,
    description,
    end_date,
    max_user,
    name,
    users,
    leader,
  } = group;

  const [joinLoading, setJoinLoading] = useState(false);
  const user = useMe();
  const router = useRouter();
  const isAlreadyJoin = user ? users.find((u) => user.id === u.id) : false;

  const joinHandler = () => {
    if (joinLoading) return;

    setJoinLoading(true);

    fetch("/api/alarm/new", {
      method: "post",
      body: JSON.stringify({
        groupId: _id,
      }),
    }).then((res) => {
      if (res.ok) {
        // setJoinLoading(false);
        closeModal();
        alert("가입 신청 되었습니다.");
      } else {
        setJoinLoading(false);
        alert("이미 신청 대기 중인 그룹입니다");
      }
    });

    //강제가입 api

    // fetch("/api/group/join", {
    //   method: "post",
    //   body: JSON.stringify({
    //     groupId: _id,
    //   }),
    // })
    //   .then((res) => {
    //     if (res.ok) router.push(`/group/${_id}`);
    //     else throw new Error();
    //   })
    //   .catch(() => {
    //     setJoinLoading(false);
    //     alert("그룹에 참가할 수 없습니다.");
    //   });
  };
  return (
    <section className="flex flex-col w-full max-w-sm md:max-w-xl h-[500px] md:h-[700px] bg-white rounded-md p-3">
      <p className="text-neutral-500 ml-auto">{dateFormat(createAt)}생성</p>
      <div className="flex flex-col h-full w-full gap-2 overflow-x-auto scrollbar-hide">
        <h2 className="font-semibold text-2xl">{name}</h2>
        <p className="w-full break-words flex-1">{description}</p>

        <div>
          <div>
            {leader && (
              <div className="flex gap-1 items-center">
                <Avatar image={leader.image} size="xs" />
                <p>{leader.name}</p>
              </div>
            )}
          </div>
          <div>
            {users.length}/{max_user ?? 0} 참여
          </div>
          {/* <div>여기에 참여인원 표시</div> */}
        </div>

        <p>{timeFormat(end_date)}까지</p>

        {!!isAlreadyJoin ? (
          <Link
            className={`${
              user ?? "hidden"
            } mt-auto bg-[#00C9A7] rounded-lg w-full h-10 disabled:bg-slate-600 flex justify-center items-center`}
            href={`/group/${_id}`}
          >
            그룹으로 이동하기
          </Link>
        ) : (
          <button
            className={`${
              user ?? "hidden"
            } mt-auto bg-blue-300 rounded-lg w-full h-10 disabled:bg-slate-600`}
            onClick={joinHandler}
          >
            {joinLoading ? (
              <Loading type="Pulse" size={10} color="#369fb6" />
            ) : (
              "참가신청"
            )}
          </button>
        )}
      </div>
    </section>
  );
}
