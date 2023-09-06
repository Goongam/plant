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
import Link from "next/link";

export default function Header() {
  const user = useMe();
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();
  return (
    <header className="flex items-center justify-center w-full h-16 border-b-[1px] border-[#CAED9E] bg-[#FFFFFF] sticky top-0 z-30">
      <div className="flex justify-between items-center w-full mx-4">
        <Link href={"/"}>
          <Image
            src="/Logo.png"
            alt="logo"
            width={150}
            height={100}
            className="cursor-pointer"
          />
        </Link>

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
