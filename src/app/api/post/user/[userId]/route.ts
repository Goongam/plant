import { getPosts, getPostsByUser } from "@/service/post";
import { withSession } from "@/util/session";
import { NextResponse } from "next/server";

interface Context {
  params: { userId: string };
}
export async function GET(req: Request, context: Context) {
  const { userId } = context.params;

  return withSession(async (user) => {
    if (!userId) return new Response("Bad Request", { status: 400 });

    return getPostsByUser(userId)
      .then((res) => NextResponse.json(res))
      .catch((err) => new Response(err, { status: 500 }));
  });
}
