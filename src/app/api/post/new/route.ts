import { joinGroup } from "@/service/group";
import { NextResponse } from "next/server";
import { withSession } from "@/util/session";
import { AddPost } from "@/service/post";

export async function POST(req: Request) {
  return withSession(async (user) => {
    const { title, content, image, groupId } = await req.json();

    return AddPost(title, content, user, groupId, image)
      .then((result) => NextResponse.json(result))
      .catch((err) => new Response(err, { status: 400 }));
  });
}
