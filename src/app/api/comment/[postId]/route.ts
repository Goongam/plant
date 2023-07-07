import { getComments } from "@/service/comment";
import { withSession } from "@/util/session";
import { NextResponse } from "next/server";

interface Context {
  params: { postId: string };
}
export async function GET(req: Request, context: Context) {
  const { postId } = context.params;
  //TODO: 해당 그룹 유저만 볼 수 있도록
  return withSession(async (user) => {
    if (!postId) return new Response("Bad Request", { status: 400 });

    return getComments(postId)
      .then((res) => NextResponse.json(res))
      .catch((err) => new Response(err, { status: 500 }));
  });
}
