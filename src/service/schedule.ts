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

const showScheduleCount = 5;

export async function getSchedules(
  groupId: string,
  userId: string,
  page: number,
  date?: string
) {
  await connect();
  const id = await getUserIdbyOauthId(userId);

  let filter: {
    groupId: string;
    members?: any;
    endDate?: any;
    startDate?: any;
  } = {
    groupId,
  };

  if (date) {
    filter.startDate = {
      $lt: dayjs(date).add(1, "day").format("YYYY-MM-DD"),
    };
    filter.endDate = {
      $gte: dayjs(date).format("YYYY-MM-DD"),
    };
  }

  if (page) {
    return ScheduleSchema.find(filter, "", {
      sort: { startDate: -1 },
      limit: showScheduleCount,
      skip: (page - 1) * showScheduleCount,
    })
      .where("members")
      .in([id])
      .populate("groupId createBy members")
      .then((sc) => {
        return {
          next: sc.length < 5 ? null : page + 1,
          schedules: [...sc],
        };
      });
  } else {
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
}

export async function getSchedulesByUser(userId: string) {
  await connect();
  const id = await getUserIdbyOauthId(userId);

  return (
    ScheduleSchema.find({}, "")
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
