import { getUserIdbyOauthId } from "./user";
import CommentSchema from "@/schema/comment";

export async function AddComment(oauthId: string, comment: string) {
  const id = await getUserIdbyOauthId(oauthId);
  if (!id) throw new Error();

  return new CommentSchema({
    author: id._id,
    content: comment,
  }).save();
}
