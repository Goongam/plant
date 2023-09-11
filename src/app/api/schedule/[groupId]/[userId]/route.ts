import { getPosts } from "@/service/post";
import { getSchedule } from "@/service/schedule";
import { withSession } from "@/util/session";
import { NextResponse } from "next/server";

interface Context {
  params: { groupId: string; userId: string };
}
export async function GET(req: Request, context: Context) {
  const { groupId, userId } = context.params;

  return withSession(async (user) => {
    if (!groupId || !userId)
      return new Response("Bad Request", { status: 400 });

    return getSchedule(groupId, userId)
      .then((res) => NextResponse.json(res))
      .catch((err) => new Response(err, { status: 500 }));
  });
}
