import { getPosts, getPostsByUser } from "@/service/post";
import { withSession } from "@/util/session";
import { NextRequest, NextResponse } from "next/server";

interface Context {
  params: { groupId: string; page: string };
}

export async function GET(req: NextRequest, context: Context) {
  const { page } = context.params;

  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date") ?? undefined;

  return withSession(async (user) => {
    if (!+page) return new Response("Bad Request", { status: 400 });

    return getPostsByUser(user.id, +page, date)
      .then((res) => NextResponse.json(res))
      .catch((err) => new Response(err, { status: 500 }));
  });
}
