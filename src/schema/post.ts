import { Post } from "@/service/post";
import { day_now } from "@/util/dayjs";
import mongoose, { Model } from "mongoose";

interface PostModel extends Model<Post> {}

const PostSchema = new mongoose.Schema<Post, PostModel>({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  content: { type: String, maxlength: 500, required: true },
  images: [{ type: String }],
  // title: { type: String, required: true },
  createAt: { type: String, default: day_now() },
  group: { type: mongoose.Schema.Types.ObjectId, ref: "Group", required: true },
});

export default (mongoose.models.Post as PostModel) ||
  mongoose.model<Post, PostModel>("Post", PostSchema);
