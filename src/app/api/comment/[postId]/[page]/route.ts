import { getCommentPages, getComments } from "@/service/comment";
import { withSession } from "@/util/session";
import { NextResponse } from "next/server";

interface Context {
  params: { postId: string; page: string };
}
export async function GET(req: Request, context: Context) {
  const { postId, page } = context.params;

  return withSession(async (user) => {
    if (!postId) return new Response("Bad Request", { status: 400 });
    if (!page) return new Response("Bad Request", { status: 400 });

    return getCommentPages(postId, +page)
      .then((res) => NextResponse.json(res))
      .catch((err) => new Response(err, { status: 500 }));
  });
}
