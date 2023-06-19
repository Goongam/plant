import { Group } from "@/service/group";
import mongoose, { Model } from "mongoose";

interface GroupModel extends Model<Group> {}

const GroupSchema = new mongoose.Schema<Group, GroupModel>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  end_date: { type: Date, required: true },
  createAt: { type: Date, default: Date.now },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  category: { type: String, required: true },
  max_user: { type: Number, required: true },
  createBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  inweek: { type: Number, required: true },
  isOffline: { type: Boolean, required: true },
  isSecret: { type: Boolean, required: true },
});

export default (mongoose.models.Group as GroupModel) ||
  mongoose.model<Group, GroupModel>("Group", GroupSchema);