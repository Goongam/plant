import { getPosts } from "@/service/post";
import { withSession } from "@/util/session";
import { NextResponse } from "next/server";

interface Context {
  params: { groupId: string; page: string };
}

export const showPostCount = 5;

export async function GET(req: Request, context: Context) {
  const { groupId, page } = context.params;

  return withSession(async (user) => {
    if (!groupId) return new Response("Bad Request", { status: 400 });
    if (!+page) return new Response("Bad Request", { status: 400 });

    return getPosts(groupId, +page)
      .then((res) => NextResponse.json(res))
      .catch((err) => new Response(err, { status: 500 }));
  });
}
