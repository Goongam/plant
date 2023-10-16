"use client";

import Calander from "./CalanderByGroup";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import useMe from "@/hooks/me";
import { useGroup } from "@/hooks/group";
import Link from "next/link";
import Loading from "./ui/Loading";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { postFilterState } from "@/state";
import Participant from "./Participant";
import PostContainer from "./PostContainer";
import ModalPortal from "./ModalPortal";
import ModalBackground from "./ModalBackground";
import { useState } from "react";
import LeaveGroupModel from "./LeaveGroupModal";
import LeaderGroupModel from "./LeaderGroupModal";
import Modal from "./Modal";
import ScheduleModal from "./ScheduleModal";
import PostAndSchedule from "./PostAndSchedule";
import InviteModal from "./InviteModal";

interface Props {
  groupId: string;
}

export default function GroupDetail({ groupId }: Props) {
  const [openLeaveModal, setOpenLeaveModal] = useState(false);
  const [openLeaderModal, setOpenLeaderModal] = useState(false);
  const [openScheduleModal, setOpenScheduleModal] = useState(false);
  const [openInviteModal, setOpenInviteModal] = useState(false);

  const { group, isLoading, isError } = useGroup(groupId);

  const router = useRouter();
  const user = useMe();

  const isLeader = group?.leader?.id === user?.id;

  if (isLoading || !group) return <Loading type="Moon" customStyle="mt-3" />;

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
  }

  const leaveGroup = () => {
    setOpenLeaveModal(true);
    setOpenLeaderModal(false);
  };

  const { name } = group;
  return (
    <section className="p-5">
      <div className="flex justify-between items-center border-b-4 border-gray-200 pb-2">
        <h2 className="text-2xl font-bold">{name}</h2>
        <div>
          {isLeader && (
            <button
              onClick={() => {
                setOpenInviteModal(true);
              }}
              className="rounded-lg bg-blue-300 px-3 py-1 font-bold text-white"
            >
              초대코드 생성
            </button>
          )}
          {isLeader && (
            <Link
              href={`/group/setting/${groupId}`}
              className="rounded-lg bg-red-400 px-3 py-1 font-bold text-white ml-1"
            >
              그룹설정
            </Link>
          )}
          <button
            className="rounded-lg bg-orange-400 px-3 py-1 font-bold text-white ml-1"
            onClick={() => {
              setOpenScheduleModal(true);
            }}
          >
            일정 추가
          </button>

          <Link
            href={`/new/${groupId}`}
            className="rounded-lg bg-green-500 px-3 py-1 font-bold text-white ml-1"
          >
            새 글 작성
          </Link>
        </div>
      </div>

      <div className="flex flex-row mt-3 gap-4">
        <div className="flex flex-col flex-1 w-full ">
          <div>
            <Calander groupId={groupId} />
          </div>
          <PostAndSchedule groupId={groupId} />
        </div>
        <div className="w-36 h-fit hidden md:block">
          <div>참여자</div>
          <Participant users={group.users} />

          <div>
            {user?.id !== group.leader.id && (
              <button
                className="text-red-500 font-bold mt-32"
                onClick={leaveGroup}
              >
                그룹나가기
              </button>
            )}
          </div>
        </div>
      </div>

      {openLeaveModal && (
        <ModalPortal>
          <ModalBackground
            onClose={() => {
              setOpenLeaveModal(false);
            }}
          >
            <LeaveGroupModel group={group} />
          </ModalBackground>
        </ModalPortal>
      )}

      {openLeaderModal && (
        <ModalPortal>
          <ModalBackground
            onClose={() => {
              setOpenLeaderModal(false);
            }}
          >
            <LeaderGroupModel group={group} />
          </ModalBackground>
        </ModalPortal>
      )}

      <Modal isOpen={openScheduleModal} setClose={setOpenScheduleModal}>
        <ScheduleModal
          groupId={groupId}
          closeModal={() => setOpenScheduleModal(false)}
        />
      </Modal>

      <Modal isOpen={openInviteModal} setClose={setOpenInviteModal}>
        <InviteModal groupId={groupId} />
      </Modal>
    </section>
  );
}
