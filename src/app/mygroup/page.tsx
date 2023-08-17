import { SimpleGroup, getMyGroup } from "@/service/group";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { AuthOption } from "../api/auth/[...nextauth]/route";
import GroupListCard from "@/components/GroupListCard";
import MyGroups from "@/components/MyGroups";

export default async function MyGroup() {
  const session = await getServerSession(AuthOption);

  if (!session) {
    return <section>로그인 후 이용해주세요</section>;
  }

  return (
    <section className="flex flex-col w-full h-full">
      <h2 className="text-2xl font-bold border-b-2 border-black p-3 mx-2">
        내 그룹
      </h2>
      <MyGroups />
    </section>
  );
}
