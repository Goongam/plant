import { joinGroup } from "@/service/group";
import { NextResponse } from "next/server";
import { withSession } from "@/util/session";
import { AddPost, Post, uploadImage } from "@/service/post";
import { AddComment } from "@/service/comment";
import { day_now } from "@/util/dayjs";

export async function POST(req: Request) {
  return withSession(async (user) => {
    // const { title, content, image, groupId } = await req.json();

    // const datastring = form.get("data")?.valueOf().toString();
    // if (!datastring) {
    //   return new Response("Bad Requset", { status: 400 });
    // }

    const form = await req.formData();

    const files = form.getAll("files") as Array<Blob>;

    //group
    const group = form.get("groupId") as string;

    //comment
    const comment = form.get("comment") as string;

    //image
    //TODO: 이미지 업로드 순서 확인

    try {
      const images = await Promise.all(
        files.map((image) => uploadImage(image))
      );
      const imageLinks: string[] = images.map((image) => image.data.link);
      // const commentDocs = await AddComment(user.id, comment);

      return AddPost(user, group, comment, imageLinks)
        .then((result) => NextResponse.json(result))
        .catch((err) => new Response(err, { status: 400 }));
    } catch (error) {
      return new Response("error", { status: 400 });
    }
    // const files = form.get("files");

    // if (!files) return new Response("n");

    // console.log();

    // const { category, featured, text, title } = JSON.parse(
    //   datastring
    // ) as Post;

    // if (!text || !file || !title || !category) {
    //   return new Response("Bad Requset", { status: 400 });
    // }

    // const imageData = await uploadImage(file);
    // const { data: imageData, success } = await uploadImage(file);

    // if (!success) {
    //   return new Response("image error", { status: 400 });
    // }

    //   return AddPost(title, content, user, groupId, image)
    //     .then((result) => NextResponse.json(result))
    //     .catch((err) => new Response(err, { status: 400 }));
  });
}
