import { NextResponse } from "next/server";
import { withSession } from "@/util/session";
import { AddComment } from "@/service/comment";
import { newJoinAlarm } from "@/service/alarm";

export async function POST(req: Request) {
  return withSession(async (user) => {
    const { groupId } = await req.json();

    if (!groupId) return new Response("Bad Request", { status: 401 });

    return newJoinAlarm(user.id, groupId)
      .then((result) => NextResponse.json(result))
      .catch((err) => new Response(err, { status: 500 }));
  });
}
