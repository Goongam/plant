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
          PostSchema.findByIdAndUpdate(
            postId,
            {
              $push: { comments: res._id },
            },
            { session: session }
          )
        )
        .then((result) => {
          returnValue = result;
        });
    })
    .then(() => {
      return returnValue;
    });
}

export async function getComments(postId: string) {
  return CommentSchema.find({ postId }, "")
    .sort({ createAt: "desc" })
    .populate("author");
}

const showCommentCount = 5;

export async function getCommentPages(postId: string, page: number) {
  return CommentSchema.find({ postId }, "", {
    sort: { createAt: -1 },
    limit: showCommentCount,
    skip: (page - 1) * showCommentCount,
  })
    .populate("author")
    .then((comments) => {
      return {
        comments,
        next: comments.length < 5 ? null : page + 1,
      };
    });
}
