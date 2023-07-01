import { User, getUserIdbyOauthId } from "./user";
import PostSchema from "@/schema/post";
import { connect } from "@/lib/mongoose";
import { Group } from "./group";
import mongoose from "mongoose";

export interface Comment {
  author: User;
  content: string;
}
export interface Post {
  _id: string;
  author: User;
  title: string;
  content: string;
  createAt: Date;
  image: string;
  comments: Comment[];
  group: Group;
}

export async function AddPost(
  author: User,
  groupId: string,
  comment: mongoose.Types.ObjectId,
  images?: string[]
) {
  connect();

  const id = await getUserIdbyOauthId(author.id);

  const newPost = new PostSchema({
    author: id,
    group: groupId,
    image: images,
    comments: [comment],
  });

  return newPost.save();
}

export async function getPosts(groupId: string) {
  return PostSchema.find({ group: groupId }, "", { sort: "createAt" }).populate(
    "author"
  );
}

export async function uploadImage(image: Blob) {
  let form = new FormData();
  form.append("image", image);

  return fetch("https://api.imgur.com/3/image", {
    method: "POST",
    headers: {
      Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
    },
    body: form,
  }).then((res) => res.json());
}
