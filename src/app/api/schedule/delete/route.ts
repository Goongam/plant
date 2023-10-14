import { deletePost, getPosts } from "@/service/post";
import { deleteSchedule } from "@/service/schedule";
import { withSession } from "@/util/session";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { scheduleId } = await req.json();
  return withSession(async (user) => {
    return deleteSchedule(scheduleId, user.id)
      .then((res) => NextResponse.json(res))
      .catch((err) => new Response(err, { status: 500 }));
  });
}
