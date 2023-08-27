"use client";

import Calander from "./CalanderByGroup";
import GroupPosts from "./GroupPosts";
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

interface Props {
  groupId: string;
}

export default function GroupDetail({ groupId }: Props) {
  const [openLeaveModal, setOpenLeaveModal] = useState(false);
  const [openLeaderModal, setOpenLeaderModal] = useState(false);

  const { group, isLoading, isError } = useGroup(groupId);

  const router = useRouter();
  const user = useMe();

  const { postFilterDate: filterDate, postFilterUser: filterUser } =
    useRecoilValue(postFilterState);
  const setFilter = useSetRecoilState(postFilterState);

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
    //TODO: 로그인O, joinX -> 가입 신청 페이지로 이동
    alert("이 그룹에 가입되어 있지 않습니다");
    router.push("/");
  }

  const showAllPost = () => {
    setFilter({ postFilterDate: undefined, postFilterUser: undefined });
  };

  const leaveGroup = () => {
    setOpenLeaveModal(true);
    setOpenLeaderModal(false);
  };

  const changeLeader = () => {
    setOpenLeaderModal(true);
    setOpenLeaveModal(false);
  };

  const { name } = group;
  return (
    <section className="p-5">
      <div className="flex justify-between items-center border-b-4 border-gray-200 pb-2">
        <h2 className="text-2xl font-bold">{name}</h2>
        <div>
          {isLeader && (
            <Link
              href={`/group/setting/${groupId}`}
              className="rounded-lg bg-orange-400 px-3 py-1 font-bold text-white"
            >
              그룹설정
            </Link>
          )}
          <Link
            href={`/new/${groupId}`}
            className="rounded-lg bg-green-500 px-3 py-1 font-bold text-white ml-1"
          >
            새 글 작성
          </Link>
        </div>
      </div>

      <div className="flex flex-row mt-3 gap-4">
        <div className="flex flex-col flex-1 w-full">
          {/* {group?.users.map((user) => (
        <Avatar image={user.image} key={user.id} size="s" />
      ))} */}

          <div>
            <Calander groupId={groupId} />
          </div>
          <PostContainer
            groupId={groupId}
            showAllPost={showAllPost}
            filterDate={filterDate}
            filterUser={filterUser}
          />
        </div>
        <div className="w-36 h-fit hidden md:block">
          <div>참여자</div>
          <Participant users={group.users} />
          <div className="mt-3">채팅</div>
          <div>
            <button
              className="text-red-500 font-bold mt-32"
              onClick={leaveGroup}
            >
              그룹나가기
            </button>
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
    </section>
  );
}
