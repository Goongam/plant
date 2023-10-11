import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { getIsJoinGroup, joinGroup } from "@/service/group";
import {
  createCipheriv,
  createDecipheriv,
  randomBytes,
  createHash,
} from "crypto";
import { getUserIdbyOauthId } from "@/service/user";
import { AuthOption } from "@/app/api/auth/[...nextauth]/route";
import { decode, encode } from "@/util/crypto";
import { NextResponse } from "next/server";
import InviteError from "@/components/InviteError";
import InviteRedirect from "@/components/InviteRedirect";
// 1. 그룹id, 만료일 암호화 -> invite url 생성
// 2. 페이지 접속시 복호화
// 3. 만료일 체크 -> 만족시 invite

interface Props {
  params: { slug: string };
}

const iv = randomBytes(16);
// let key = "8dG9fR2pTqLW7XyEzHJ6aM4uKcV1sD0N";

export default async function InvitePage({ params }: Props) {
  const session = await getServerSession(AuthOption);

  const data = params.slug;

  if (!session) {
    redirect("/login");
  }

  try {
    const decodeData = decode(data);

    const [groupId, expireDate] = decodeData.split("@");

    if (new Date(expireDate).getDate() < new Date().getDate()) {
      console.log("만료");

      return <InviteError msg="만료된 초대코드 입니다" url="/" />;
    }
    const user = await getUserIdbyOauthId(session.user.id);

    if (!user) {
      console.log("유저");

      return <InviteError msg="찾을 수 없는 유저입니다" url="/" />;
    }
    const isjoin = await getIsJoinGroup(groupId, user._id);

    if (isjoin) {
      console.log("가입");

      return <InviteError url={`/group/${groupId}`} />;
    }

    return joinGroup(session.user.id, groupId).then(() => (
      <InviteRedirect url={`/group/${groupId}`} />
    ));
  } catch (error) {
    console.log(error);

    return <InviteError msg="잘못된 초대 코드입니다" url="/" />;
  }

  return <section></section>;
}
