import { Post } from "@/service/post";
import mongoose, { Model } from "mongoose";

interface PostModel extends Model<Post> {}

const PostSchema = new mongoose.Schema<Post, PostModel>({});

export default (mongoose.models.Post as PostModel) ||
  mongoose.model<Post, PostModel>("Post", PostSchema);
