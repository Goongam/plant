"use client";

import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import Button from "./ui/Button";
import ModalPortal from "./ModalPortal";
import ModalBackground from "./ModalBackground";
import { useState } from "react";
import ModalSideBar from "./ModalSideBar";
import Avatar from "./Avatar";
import useMe from "@/hooks/me";
import { useRouter } from "next/navigation";

export default function Header() {
  const user = useMe();
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();
  return (
    <header className="flex items-center justify-center w-full h-16 border-b-[1px] border-neutral-400 bg-white sticky top-0 z-30">
      <div className="flex justify-between items-center w-full mx-4">
        <Image
          src="/vercel.svg"
          alt="logo"
          width={150}
          height={100}
          onClick={() => {
            router.push("/");
          }}
        />

        {user ? (
          // <button onClick={() => setOpenModal((pre) => !pre)}>dd</button>
          <Avatar
            image={user.image}
            size="s"
            onClick={() => setOpenModal((pre) => !pre)}
          />
        ) : (
          <Button onClickHandler={signIn} text="로그인" />
        )}

        {openModal && (
          <ModalPortal>
            <ModalSideBar user={user} />
          </ModalPortal>
        )}
      </div>
    </header>
  );
}
