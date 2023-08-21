"use client";
import { Group, SimpleGroup } from "@/service/group";
import { dateFormat } from "@/util/dayjs";
import { useState } from "react";
import ModalPortal from "./ModalPortal";
import ModalBackground from "./ModalBackground";
import GroupModalDetail from "./GroupModalDetail";
interface Props {
  group: SimpleGroup;
}
export default function GroupListCard({ group }: Props) {
  const [openModal, setOpenModal] = useState(false);
  const { category, end_date, max_user, name, users, description } = group;

  return (
    <>
      <div
        className="flex flex-col w-full h-[200px] rounded-md bg-[#F8F0E5] p-5"
        onClick={() => {
          setOpenModal(true);
        }}
      >
        <h2 className="font-semibold text-2xl line-clamp-1">{name}</h2>

        <p className="w-full h-15 text-neutral-600 break-words line-clamp-2">
          {description}
        </p>
        <p className="text-2xl mt-2">{`${users.length} / ${max_user ?? 0}`}</p>
        <div className="flex items-end mt-auto">
          {category && (
            <span className="rounded-xl bg-white py-1 px-2 mr-2">
              {category}
            </span>
          )}
          <span className="ml-auto">{`${dateFormat(end_date)}까지`}</span>
        </div>
      </div>
      {openModal && (
        <ModalPortal>
          <ModalBackground
            onClose={() => {
              setOpenModal(false);
            }}
          >
            <GroupModalDetail group={group} />
          </ModalBackground>
        </ModalPortal>
      )}
    </>
  );
}
