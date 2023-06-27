import { User } from "@/service/user";
import { signOut } from "next-auth/react";
import GroupIcon from "./ui/icons/GroupIcon";
import NewGroupIcon from "./ui/icons/NewGroupIcon";
import InfoIcon from "./ui/icons/InfoIcon";
import ContactIcon from "./ui/icons/ContactIcon";
import LogoutIcon from "./ui/icons/LogoutIcon";

interface Props {
  user: User | undefined;
}

const BUTTON_STYLE = "flex justify-start items-center gap-2";

export default function ModalSideBar({ user }: Props) {
  return (
    <section className="fixed top-16 right-3 bg-white w-40 h-fit flex flex-col items-start p-3">
      <p className="w-full border-b border-neutral-200 p-2">{user?.name}</p>

      <div className="w-full flex flex-col gap-2 items-start p-1 pt-3">
        <button className={BUTTON_STYLE}>
          <GroupIcon /> 내 그룹 보기
        </button>
        <button className={BUTTON_STYLE}>
          <NewGroupIcon /> 그룹생성
        </button>
        <button className={BUTTON_STYLE}>
          <InfoIcon /> 내 정보
        </button>
        <button className={BUTTON_STYLE}>
          <ContactIcon /> 문의
        </button>
        <button
          className={`w-full border-t border-neutral-200 text-start mt-1 pt-2 ${BUTTON_STYLE}`}
          onClick={() => signOut()}
        >
          <LogoutIcon />
          로그아웃
        </button>
      </div>
    </section>
  );
}
