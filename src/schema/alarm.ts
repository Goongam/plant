import { Alarm } from "@/service/alarm";
import { day_now } from "@/util/dayjs";
import mongoose, { Model } from "mongoose";

interface AlarmModel extends Model<Alarm> {}

const AlarmSchema = new mongoose.Schema<Alarm, AlarmModel>({
  type: { type: String, required: true },
  content: { type: String, required: true, maxlength: 200 },
  createAt: { type: String, default: day_now() },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  from: { type: mongoose.Schema.Types.ObjectId, ref: "User", require: false },
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group",
    require: false,
  },
});

export default (mongoose.models.Alarm as AlarmModel) ||
  mongoose.model<Alarm, AlarmModel>("Alarm", AlarmSchema);
