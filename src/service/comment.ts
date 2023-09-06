import { connect } from "@/lib/mongoose";
import { getUserIdbyOauthId } from "./user";
import CommentSchema from "@/schema/comment";
import PostSchema from "@/schema/post";
import { day_now } from "@/util/dayjs";
import mongoose from "mongoose";

export async function AddComment(
  oauthId: string,
  comment: string,
  postId: string
) {
  await connect();
  const id = await getUserIdbyOauthId(oauthId);
  if (!id) throw new Error();

  //TODO: return 에러 처리
  let returnValue: any = null;

  const session = await mongoose.startSession();
  return session
    .withTransaction(async () => {
      new CommentSchema({
        author: id._id,
        content: comment,
        postId,
        createAt: day_now(),
      })
        .save()
        .then((res) =>
          PostSchema.findByIdAndUpdate(postId, {
            $push: { comments: res._id },
          })
        )
        .then((result) => {
          returnValue = result;
        });
    })
    .then(() => {
      return returnValue;
    });
  // console.log(dta);

  // return data;

  // return new CommentSchema({
  //   author: id._id,
  //   content: comment,
  //   postId,
  //   createAt: day_now(),
  // })
  //   .save()
  //   .then((res) =>
  //     PostSchema.findByIdAndUpdate(postId, {
  //       $push: { comments: res._id },
  //     })
  //   );
}

export async function getComments(postId: string) {
  return CommentSchema.find({ postId }, "")
    .sort({ createAt: "desc" })
    .populate("author");
}
