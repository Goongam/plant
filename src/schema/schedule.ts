import { Schedule } from "@/service/schedule";
import mongoose, { Model } from "mongoose";

interface ScheduleModel extends Model<Schedule> {}

const ScheduleSchema = new mongoose.Schema<Schedule, ScheduleModel>({
  createBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  title: { type: String, required: true, maxlength: 50 },
  content: { type: String, required: true, maxlength: 200 },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group",
    require: true,
  },
  isAllMember: {
    type: Boolean,
    required: true,
  },
  members: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true }],
  },
});

export default (mongoose.models.Schedule as ScheduleModel) ||
  mongoose.model<Schedule, ScheduleModel>("Schedule", ScheduleSchema);
