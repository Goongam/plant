import { deletePost, getPosts } from "@/service/post";
import { withSession } from "@/util/session";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { postId } = await req.json();
  return withSession(async (user) => {
    return deletePost(postId, user.id)
      .then((res) => NextResponse.json(res))
      .catch((err) => new Response(err, { status: 500 }));
  });
}
