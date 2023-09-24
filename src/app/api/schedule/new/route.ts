import { NextResponse } from "next/server";
import { withSession } from "@/util/session";
import { AddPost, uploadImage } from "@/service/post";
import { AddSchedule } from "@/service/schedule";

export async function POST(req: Request) {
  return withSession(async (user) => {
    const form = await req.formData();

    //group
    const group = form.get("groupId") as string;

    //comment
    const title = form.get("title") as string;
    //comment
    const description = form.get("description") as string;
    //comment
    const startDate = form.get("startData") as string;
    //comment
    const endDate = form.get("endDate") as string;

    return AddSchedule(group, user.id, title, description, startDate, endDate)
      .then((res) => NextResponse.json(res))
      .catch((err) => new Response(err, { status: 500 }));
  });
}
