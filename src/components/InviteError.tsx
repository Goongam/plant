"use client";

import { useRouter } from "next/navigation";

interface Props {
  msg?: string;
  url: string;
}
export default function InviteError({ msg, url }: Props) {
  if (msg) alert(msg);
  const router = useRouter();
  router.push(url);

  return <></>;
}
