import AlarmPage from "@/components/AlarmPage";
import { useSession } from "next-auth/react";
import { AuthOption } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "알림",
  description: "알림 보기",
};
export default async function Alarm() {
  const session = await getServerSession(AuthOption);
  if (!session?.user) redirect("/");
  return (
    <>
      <AlarmPage />
    </>
  );
}
