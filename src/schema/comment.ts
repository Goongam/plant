import { Comment } from "@/service/post";
import mongoose, { Model } from "mongoose";

interface CommentModel extends Model<Comment> {}

const CommentSchema = new mongoose.Schema<Comment, CommentModel>({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  content: { type: String, required: true, maxlength: 200 },
});

export default (mongoose.models.Comment as CommentModel) ||
  mongoose.model<Comment, CommentModel>("Comment", CommentSchema);
