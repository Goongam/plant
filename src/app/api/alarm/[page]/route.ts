import { showPostCount } from "@/constants";
import { getAlarm } from "@/service/alarm";
import { getPosts } from "@/service/post";
import { withSession } from "@/util/session";
import { NextRequest, NextResponse } from "next/server";

interface Context {
  params: { userId: string; page: string };
}

export async function GET(req: NextRequest, context: Context) {
  const { page } = context.params;

  return withSession(async (user) => {
    if (!+page) return new Response("Bad Request", { status: 400 });

    return getAlarm(user.id, +page)
      .then((res) => NextResponse.json(res))
      .catch((err) => new Response(err, { status: 500 }));
  });
}
