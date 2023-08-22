import { changeLeader } from "@/service/group";
import { NextResponse } from "next/server";
import { withSession } from "@/util/session";

export async function POST(req: Request) {
  return withSession(async (user) => {
    const { groupId, changeUserOauthId } = await req.json();

    return changeLeader(user.id, groupId, changeUserOauthId)
      .then((result) => NextResponse.json(result))
      .catch((err) => new Response(err, { status: 400 }));
  });
}
