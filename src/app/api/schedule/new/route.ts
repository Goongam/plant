import { NextResponse } from "next/server";
import { withSession } from "@/util/session";
import { AddPost, uploadImage } from "@/service/post";
import { AddSchedule } from "@/service/schedule";

export async function POST(req: Request) {
  return withSession(async (user) => {
    const { groupId } = await req.json();

    return AddSchedule(groupId, user.id)
      .then((res) => NextResponse.json(res))
      .catch((err) => new Response(err, { status: 500 }));
  });
}
