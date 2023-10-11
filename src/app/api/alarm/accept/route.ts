import { NextResponse } from "next/server";
import { withSession } from "@/util/session";
import { AddComment } from "@/service/comment";
import { acceptJoin, newJoinAlarm } from "@/service/alarm";

export async function POST(req: Request) {
  return withSession(async (user) => {
    const { alarmId } = await req.json();

    if (!alarmId) return new Response("Bad Request", { status: 401 });

    return acceptJoin(alarmId)
      .then((result) => NextResponse.json({}))
      .catch((err) => new Response(err, { status: 500 }));
  });
}
