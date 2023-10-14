import dayjs from "dayjs";
import { Group } from "./group";
import { User, getUserIdbyOauthId } from "./user";
import ScheduleSchema from "@/schema/schedule";
import { connect } from "@/lib/mongoose";
import { dateFormat, timeFormat } from "@/util/dayjs";

export interface Schedule {
  groupId: Group;
  // startDate: string;
  // endDate: string;
  dates: string[];
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
  // startDate: string,
  // endDate: string,
  dates: string[],
  isAllMember: boolean
) {
  await connect();
  const id = await getUserIdbyOauthId(oauthId);

  const newSchedule = new ScheduleSchema({
    groupId,
    title,
    content: description,
    createBy: id,
    // startDate: timeFormat(startDate),
    // endDate: timeFormat(endDate),
    dates,
    isAllMember,
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
    dates?: any;
  } = {
    groupId,
    dates: { $gte: dateFormat(new Date()) },
  };

  if (date) {
    filter.dates = date;
  }

  if (page) {
    return ScheduleSchema.find(
      {
        $or: [
          { ...filter, isAllMember: true },
          { ...filter, members: id },
        ],
      },
      "",
      {
        sort: { startDate: -1 },
        limit: showScheduleCount,
        skip: (page - 1) * showScheduleCount,
      }
    )
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

export async function getSchedulesByUser(
  userId: string,
  page?: number,
  date?: string
) {
  await connect();
  const id = await getUserIdbyOauthId(userId);

  let filter: {
    dates?: any;
  } = {};
  if (date) {
    filter.dates = date;
  }

  if (page) {
    return (
      ScheduleSchema.find(filter, "", {
        sort: { startDate: -1 },
        limit: showScheduleCount,
        skip: (page - 1) * showScheduleCount,
      })
        .where("members")
        .in([id])
        .populate("groupId createBy members")
        // .populate({
        //   path: "members",
        //   populate: { path: "leader" },
        // })
        .lean()
        .then((sc) => {
          return {
            next: sc.length < 5 ? null : page + 1,
            schedules: [...sc],
          };
        })
    );
  } else {
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
}

export async function deleteSchedule(scheduleId: string, userId: string) {
  await connect();

  const user = await getUserIdbyOauthId(userId);

  return ScheduleSchema.findOneAndDelete({
    createBy: user,
    _id: scheduleId,
  }).catch((err) => {
    throw new Error("삭제에 실패했습니다.");
  });
}
