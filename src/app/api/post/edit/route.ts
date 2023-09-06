import { joinGroup } from "@/service/group";
import { NextResponse } from "next/server";
import { withSession } from "@/util/session";
import { AddPost, EditPost, Post, uploadImage } from "@/service/post";
import { AddComment } from "@/service/comment";
import { day_now } from "@/util/dayjs";

export async function POST(req: Request) {
  return withSession(async (user) => {
    const form = await req.formData();

    const values = form.values();

    //group
    const postId = form.get("postId") as string;

    //comment
    const comment = form.get("comment") as string;

    const files = form.getAll("files") as Array<Blob | string>;

    //image
    //TODO: 이미지 업로드 순서 확인

    try {
      const images = await Promise.all(
        files.map((image) => {
          if (typeof image === "string") return { data: { link: image } };
          else return uploadImage(image);
        })
      );
      const imageLinks: string[] = images.map((image) => image.data.link);
      // const commentDocs = await AddComment(user.id, comment);

      return EditPost(postId, comment, imageLinks)
        .then((result) => NextResponse.json(result))
        .catch((err) => new Response(err, { status: 400 }));
    } catch (error) {
      return new Response("error", { status: 400 });
    }
  });
}
