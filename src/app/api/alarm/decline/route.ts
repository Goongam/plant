import { NextResponse } from "next/server";
import { withSession } from "@/util/session";
import { AddComment } from "@/service/comment";
import { acceptJoin, declineJoin, newJoinAlarm } from "@/service/alarm";

export async function POST(req: Request) {
  return withSession(async (user) => {
    const { alarmId } = await req.json();

    if (!alarmId) return new Response("Bad Request", { status: 401 });

    return declineJoin(alarmId)
      .then((result) => NextResponse.json(result))
      .catch((err) => new Response(err, { status: 500 }));
  });
}
