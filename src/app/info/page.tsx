import { getServerSession } from "next-auth";
import { AuthOption } from "../api/auth/[...nextauth]/route";
import MyInfo from "@/components/MyInfo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "내 정보",
  description: "내 정보 보기",
};
export default async function Info() {
  const session = await getServerSession(AuthOption);

  if (!session) {
    return <section>로그인 후 이용해주세요</section>;
  }

  return (
    <section className="flex flex-col w-full h-full">
      <h2 className="text-2xl font-bold border-b-2 border-black p-3 mx-2">
        내 정보
      </h2>
      <MyInfo user={session.user} />
    </section>
  );
}
