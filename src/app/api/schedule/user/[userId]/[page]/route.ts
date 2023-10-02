import { showPostCount } from "@/constants";
import { getPosts } from "@/service/post";
import { getSchedules, getSchedulesByUser } from "@/service/schedule";
import { withSession } from "@/util/session";
import { NextRequest, NextResponse } from "next/server";

interface Context {
  params: { groupId: string; userId: string; page: string };
}

export async function GET(req: NextRequest, context: Context) {
  const { userId, page } = context.params;

  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date") ?? undefined;

  return withSession(async (user) => {
    if (!userId) return new Response("Bad Request", { status: 400 });
    if (!page) return new Response("Bad Request", { status: 400 });

    return getSchedulesByUser(userId, +page, date)
      .then((res) => NextResponse.json(res))
      .catch((err) => new Response(err, { status: 500 }));
  });
}
