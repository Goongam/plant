import { joinGroup } from "@/service/group";
import { NextResponse } from "next/server";
import { withSession } from "@/util/session";
import { AddPost, Post, uploadImage } from "@/service/post";
import { AddComment } from "@/service/comment";

export async function POST(req: Request) {
  return withSession(async (user) => {
    const { comment, postId } = await req.json();

    if (!comment || !postId)
      return new Response("Bad Request", { status: 401 });

    return AddComment(user.id, comment, postId)
      .then((result) => NextResponse.json(result))
      .catch((err) => new Response(err, { status: 500 }));
  });
}
