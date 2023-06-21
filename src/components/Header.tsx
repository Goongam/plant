"use client";

import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { AuthOption } from "@/app/api/auth/[...nextauth]/route";
import Button from "./ui/Button";

export default function Header() {
  const { data: session } = useSession();

  console.log(session?.user);

  return (
    <header className="flex items-center justify-center w-full h-16 border-b-[1px] border-neutral-400 bg-white sticky top-0">
      <div className="flex justify-between items-center w-full max-w-screen-xl">
        <Image src="/vercel.svg" alt="logo" width={150} height={100} />
        {session?.user ? (
          <Button onClickHandler={signOut} text="로그아웃" />
        ) : (
          <Button onClickHandler={signIn} text="로그인" />
        )}
      </div>
    </header>
  );
}
