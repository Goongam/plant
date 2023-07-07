import { joinGroup } from "@/service/group";
import { NextResponse } from "next/server";
import { withSession } from "@/util/session";
import { AddPost, Post, uploadImage } from "@/service/post";
import { AddComment } from "@/service/comment";

export async function POST(req: Request) {
  return withSession(async (user) => {
    console.log("post!!");
  });
}
