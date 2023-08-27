import { leaveGroup, withdrawalGroup } from "@/service/group";
import { NextResponse } from "next/server";
import { withSession } from "@/util/session";

export async function POST(req: Request) {
  return withSession(async (user) => {
    const { groupId, leaveUserOauthId } = await req.json();

    return withdrawalGroup(user.id, leaveUserOauthId, groupId)
      .then((result) => NextResponse.json(result))
      .catch((err) => new Response(err, { status: 400 }));
  });
}
