import { getUserIdbyOauthId } from "./user";
import CommentSchema from "@/schema/comment";
import PostSchema from "@/schema/post";

export async function AddComment(
  oauthId: string,
  comment: string,
  postId: string
) {
  const id = await getUserIdbyOauthId(oauthId);
  if (!id) throw new Error();

  return new CommentSchema({
    author: id._id,
    content: comment,
    postId,
  })
    .save()
    .then((res) =>
      PostSchema.findByIdAndUpdate(postId, {
        $push: { comments: res._id },
      })
    );
}

export async function getComments(postId: string) {
  return CommentSchema.find({ postId }, "")
    .sort({ createAt: "desc" })
    .populate("author");
}
