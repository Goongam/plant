import { deleteGroup, joinGroup } from "@/service/group";
import { NextResponse } from "next/server";
import { withSession } from "@/util/session";

export async function POST(req: Request) {
  return withSession(async (user) => {
    const { groupId } = await req.json();

    return deleteGroup(groupId, user.id)
      .then((result) => NextResponse.json(result))
      .catch((err) => new Response(err, { status: 400 }));
  });
}
