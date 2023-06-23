"use client";

import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import Button from "./ui/Button";
import ModalPortal from "./ModalPortal";
import ModalBackground from "./ModalBackground";
import { useState } from "react";
import ModalSideBar from "./ModalSideBar";
import Avatar from "./Avatar";

export default function Header() {
  const { data: session } = useSession();
  const [openModal, setOpenModal] = useState(false);
  console.log(session?.user);

  return (
    <header className="flex items-center justify-center w-full h-16 border-b-[1px] border-neutral-400 bg-white sticky top-0">
      <div className="flex justify-between items-center w-full mx-4">
        <Image src="/vercel.svg" alt="logo" width={150} height={100} />

        {session?.user ? (
          // <button onClick={() => setOpenModal((pre) => !pre)}>dd</button>
          <Avatar
            image={session.user.image}
            size="s"
            onClick={() => setOpenModal((pre) => !pre)}
          />
        ) : (
          <Button onClickHandler={signIn} text="로그인" />
        )}

        {openModal && (
          <ModalPortal>
            <ModalSideBar user={session?.user} />
          </ModalPortal>
        )}
      </div>
    </header>
  );
}
