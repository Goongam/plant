import { User } from "@/service/user";
import { signOut } from "next-auth/react";

interface Props {
  user: User | undefined;
}
export default function ModalSideBar({ user }: Props) {
  return (
    <section className="absolute top-16 right-3 bg-white w-40 h-fit flex flex-col items-start p-3">
      <p className="w-full border-b border-neutral-200 p-2">{user?.name}</p>

      <div className="w-full flex flex-col gap-2 items-start p-1 pt-3">
        <button>내 그룹 보기</button>
        <button>그룹생성</button>
        <button>내 정보</button>
        <button>문의</button>
        <button
          className="w-full border-t border-neutral-200 text-start mt-1 pt-2"
          onClick={() => signOut()}
        >
          로그아웃
        </button>
      </div>
    </section>
  );
}
