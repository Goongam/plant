import { Group, getGroup, getIsJoinGroup, getLeader } from "./group";
import { User, getUserIdbyOauthId, getUserInfo } from "./user";
import AlarmSchema from "../schema/alarm";
import { connect } from "@/lib/mongoose";
import { day_now } from "@/util/dayjs";
import { Types, connection } from "mongoose";
import GroupSchema from "@/schema/group";

export interface Alarm {
  _id: string;
  type: "join" | "common";
  content: string;
  createAt: string;
  to: User;
  from?: User;
  groupId?: Group;
}

export interface ResponseAlarms {
  alarms: Alarm[];
  totalAlarms: number;
}

const showAlarmCount = 5;

export async function newJoinAlarm(userId: string, groupId: string) {
  await connect();

  const user = await getUserIdbyOauthId(userId);
  const group = await getLeader(groupId);

  if (!group) throw new Error("그룹을 찾을 수 없음");

  //이미 신청된 request 체크
  const find = await AlarmSchema.find({
    groupId: group._id,
    from: user,
    to: group.leader,
  });

  if (find.length >= 1) throw new Error("이미 신청 대기 중인 그룹입니다");

  return new AlarmSchema({
    content: `그룹초대요청`,
    createAt: day_now(),
    to: group?.leader,
    from: user,
    type: "join",
    groupId: group?._id,
  }).save();
}

export async function getAlarm(userId: string, page: number) {
  await connect();

  const user = await getUserIdbyOauthId(userId);

  const totalAlarms = await AlarmSchema.countDocuments({
    to: user,
  });
  return AlarmSchema.find(
    {
      to: user,
    },
    "",
    {
      sort: { createAt: -1 },
      limit: showAlarmCount,
      skip: (page - 1) * showAlarmCount,
    }
  )
    .populate("to from groupId")
    .lean()
    .then((data) => {
      return { alarms: data, totalAlarms };
    });
}

export async function acceptJoin(alarmId: string) {
  const session = await connection.startSession();

  try {
    await session
      .withTransaction(async () => {
        const alarm = await AlarmSchema.findOneAndDelete(
          { _id: alarmId },
          {
            session: session,
          }
        );

        if (!alarm) throw new Error("찾을 수 없는 요청");

        if (!alarm.groupId) throw new Error("그룹 에러");

        if (!alarm.from) throw new Error("사용자 에러");
        //인원체크
        const group = await getGroup(alarm.groupId._id);

        if (group && group?.max_user <= group?.users.length)
          throw new Error("그룹에 더이상 참여할 수 없습니다");

        // 방안에 유저 체크
        const isJoin = await getIsJoinGroup(alarm.groupId._id, alarm.from);

        if (isJoin) throw new Error("이미 그룹에 참여하고 있습니다.");

        return GroupSchema.findByIdAndUpdate(
          alarm.groupId._id,
          {
            $push: { users: alarm.from },
          },
          { session: session }
        );
      })
      .then(() => session.endSession());
  } catch (e: any) {
    await session.endSession();
    throw new Error(e);
  }
}

export async function declineJoin(alarmId: string) {
  return AlarmSchema.findOneAndDelete({ _id: alarmId });
}
