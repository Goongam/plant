import { showPostCount } from "@/constants";
import { getPosts } from "@/service/post";
import { withSession } from "@/util/session";
import { NextRequest, NextResponse } from "next/server";

interface Context {
  params: { groupId: string; page: string };
}

export async function GET(req: NextRequest, context: Context) {
  const { groupId, page } = context.params;

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id") ?? undefined;
  const date = searchParams.get("date") ?? undefined;

  return withSession(async (user) => {
    if (!groupId) return new Response("Bad Request", { status: 400 });
    if (!+page) return new Response("Bad Request", { status: 400 });

    return getPosts(groupId, +page, id, date)
      .then((res) => NextResponse.json(res))
      .catch((err) => new Response(err, { status: 500 }));
  });
}
