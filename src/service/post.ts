import { User, getUserIdbyEmail } from "./user";
import PostSchema from "@/schema/post";
import { connect } from "@/lib/mongoose";
import { Group } from "./group";

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
  title: string,
  content: string,
  author: User,
  groupId: string,
  image?: string
) {
  connect();

  const id = await getUserIdbyEmail(author.email);

  const newPost = new PostSchema({
    author: id,
    content,
    title,
    image,
    group: groupId,
  });

  return newPost.save();
}

export async function getPosts(groupId: string) {
  return PostSchema.find({ group: groupId }, "", { sort: "createAt" }).populate(
    "author"
  );
}
