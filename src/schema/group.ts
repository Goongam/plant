import { Group } from "@/service/group";
import { day_now } from "@/util/dayjs";
import mongoose, { Model } from "mongoose";

interface GroupModel extends Model<Group> {}

const GroupSchema = new mongoose.Schema<Group, GroupModel>({
  name: { type: String, required: true, maxlength: 50, trim: true },
  description: { type: String, required: true, maxlength: 1000, trim: true },
  end_date: { type: String, required: true },
  createAt: { type: String, default: day_now() },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true }],
  leader: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
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
