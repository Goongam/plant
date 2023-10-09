"use client";

import { useState } from "react";
import { GrCopy } from "react-icons/gr";
//@ts-ignore
import { doCopy } from "@/util/doCopy";

const FOCUS = "focus:border focus:border-sky-300 outline-none";

export default function InviteModal({ groupId }: { groupId: string }) {
  const [expireDate, setExpireDate] = useState("");

  const [inviteCode, setInviteCode] = useState("");

  console.log();
  // const router = useRouter();
  // console.log(router.);

  return (
    <section className="flex flex-col w-full max-w-sm md:max-w-xl bg-white rounded-md p-3 overflow-y-scroll">
      <p className="font-bold">초대코드 생성</p>
      <div className="flex gap-1 p-2">
        <div className="text-black/50 mr-2">만료일</div>
        <input
          type={`datetime-local`}
          className={`flex-auto ${FOCUS}`}
          required
          onChange={(e) => {
            setExpireDate(e.currentTarget.value);
          }}
        />
      </div>
      <button
        className={`w-full bg-blue-600 rounded-sm disabled:bg-blue-200/20`}
        disabled={!expireDate}
        onClick={() => {
          fetch("/api/group/invite/new", {
            method: "post",
            body: JSON.stringify({
              groupId,
              expireDate,
            }),
          })
            .then((res) => res.json())
            .then((data) => setInviteCode(data.url));
        }}
      >
        생성
      </button>
      {inviteCode && (
        <div className="flex items-center gap-1">
          <GrCopy
            size={60}
            className="cursor-pointer"
            onClick={() => {
              doCopy(inviteCode);
            }}
          />
          <div className="border-black overflow-x-auto">{inviteCode}</div>
        </div>
      )}
    </section>
  );
}
