import AlarmPage from "@/components/AlarmPage";
import { useSession } from "next-auth/react";
import { AuthOption } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Alarm() {
  const session = await getServerSession(AuthOption);
  if (!session?.user) redirect("/");
  return (
    <>
      <AlarmPage />
    </>
  );
}
