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
import { AES, enc, format } from "crypto-js";
import { NextResponse } from "next/server";
import InviteError from "@/components/InviteError";
// 1. 그룹id, 만료일 암호화 -> invite url 생성
// 2. 페이지 접속시 복호화
// 3. 만료일 체크 -> 만족시 invite

interface Props {
  params: { slug: string };
}

const iv = randomBytes(16);
let key = "8dG9fR2pTqLW7XyEzHJ6aM4uKcV1sD0N";

const encode = (data: string): string => {
  var ciphertext = AES.encrypt(data, key).toString();

  const toHex = enc.Base64.parse(ciphertext).toString(enc.Hex);

  return toHex;
};

const decode = (encodeData: string): string => {
  const toBase = enc.Hex.parse(encodeData).toString(enc.Base64);

  const a = AES.decrypt(toBase, key);
  const originalText = a.toString(enc.Utf8);
  return originalText;
};

export default async function InvitePage({ params }: Props) {
  const session = await getServerSession(AuthOption);

  const data = params.slug;

  // TODO: url생성
  const encodeData = encode("64dcc148e97e61ca2b162cd2@2023-10-21");
  console.log(encodeData);

  if (!session) {
    redirect("/login");
  }

  try {
    const decodeData = decode(data);

    console.log(decodeData);

    const [groupId, expireDate] = decodeData.split("@");

    if (new Date(expireDate).getDate() < new Date().getDate()) {
      return <InviteError msg="만료된 초대코드 입니다" url="/" />;
    }
    const user = await getUserIdbyOauthId(session.user.id);
    console.log(user?.name);

    if (!user) {
      return <InviteError msg="찾을 수 없는 유저입니다" url="/" />;
    }
    const isjoin = await getIsJoinGroup(groupId, user._id);

    if (isjoin) {
      return <InviteError url={`/group/${groupId}`} />;
    }

    joinGroup(user.id, groupId).then(() => redirect(`/group/${groupId}`));
  } catch (error) {
    console.log(error);

    return <InviteError msg="잘못된 초대 코드입니다" url="/" />;
  }

  return <section></section>;
}
