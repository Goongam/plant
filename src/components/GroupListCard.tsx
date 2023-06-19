"use client";
import { Group } from "@/service/group";
import { dateFormat } from "@/util/dayjs";
import { useState } from "react";
import ModalPortal from "./ModalPortal";
import ModalBackground from "./ModalBackground";
import GroupDetail from "./GroupDetail";
interface Props {
  group: Group;
}
export default function GroupListCard({ group }: Props) {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <div
        className="flex flex-col w-full h-[200px] rounded-md bg-slate-200 p-5"
        onClick={() => {
          setOpenModal(true);
        }}
      >
        <h2 className="font-semibold text-2xl">{group.name}</h2>
        <p className="text-neutral-600">{group.description}</p>
        <p className="text-2xl mt-2">{`${group.users.length} / ${group.max_user}`}</p>
        <div className="mt-auto">
          <span className="rounded-xl bg-white p-1 mr-2">{group.category}</span>
          <span>{`${dateFormat(group.end_date)}까지`}</span>
        </div>
      </div>
      {openModal && (
        <ModalPortal>
          <ModalBackground
            onClose={() => {
              setOpenModal(false);
              console.log("close");
            }}
          >
            <GroupDetail group={group} />
          </ModalBackground>
        </ModalPortal>
      )}
    </>
  );
}