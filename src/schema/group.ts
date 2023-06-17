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
});

export default (mongoose.models.Group as GroupModel) ||
  mongoose.model<Group, GroupModel>("Group", GroupSchema);
