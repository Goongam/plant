"use client";

import { useRouter } from "next/navigation";

import { useState, useEffect } from "react";

interface Props {
  msg?: string;
  url: string;
}
export default function InviteError({ msg, url }: Props) {
  const [t, st] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (msg) {
      alert(msg);
    }

    router.push(url);
  }, [t, router, msg, url]);

  return <></>;
}
