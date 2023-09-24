import dayjs from "dayjs";
import { Group } from "./group";
import { User, getUserIdbyOauthId } from "./user";
import ScheduleSchema from "@/schema/schedule";
import { connect } from "@/lib/mongoose";
import { timeFormat } from "@/util/dayjs";

export interface Schedule {
  groupId: Group;
  startDate: string;
  endDate: string;
  title: string;
  content: string;
  isAllMember: boolean;
  members?: User[];
  createBy: User;
  _id: string;
}

export async function AddSchedule(
  groupId: string,
  oauthId: string,
  title: string,
  description: string,
  startDate: string,
  endDate: string,
  isAllMember?: string
) {
  await connect();
  const id = await getUserIdbyOauthId(oauthId);

  const newSchedule = new ScheduleSchema({
    groupId,
    title,
    content: description,
    createBy: id,
    startDate: timeFormat(startDate),
    endDate: timeFormat(endDate),
    isAllMember: true,
    members: [id],
  });
  return newSchedule.save();
}

export async function getSchedule(groupId: string, oauthId: string) {
  await connect();

  const id = await getUserIdbyOauthId(oauthId);

  return (
    ScheduleSchema.find({ groupId }, "")
      .where("members")
      .in([id])
      .populate("groupId createBy members")
      // .populate({
      //   path: "members",
      //   populate: { path: "leader" },
      // })
      .lean()
  );
}
