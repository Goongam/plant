import { connect } from "@/lib/mongoose";
import { Post } from "./post";
import { User, UserId, getUserIdbyOauthId } from "./user";
import GroupSchema from "@/schema/group";
import mongoose from "mongoose";
import { dateFormat, day_now, timeFormat } from "@/util/dayjs";

export interface Group {
  _id: string;
  name: string;
  description: string;
  end_date: string;
  createAt: string;
  users: User[];
  leader: User;
  posts?: Post[];
  category: "운동" | "자기계발" | "취미" | "여행";
  max_user: number;
  createBy: User;
  isOffline: boolean;
  inweek: number;
  isSecret: boolean;
  region: string[] | string;
  cost: number;
  active: boolean;
}

export interface SimpleGroup extends Omit<Group, "users"> {
  users: UserId[];
}

// function t(a: SimpleGroup) {
//   const { users } = a;
//   users[0].
// }
export async function createGroup(
  {
    name,
    description,
    category,
    end_date,
    max_user,
    isOffline,
    region,
    isSecret,
    cost,
  }: Group,
  oauthId: string
) {
  await connect();

  const id = await getUserIdbyOauthId(oauthId);

  const newGroup = new GroupSchema({
    name,
    description,
    end_date: timeFormat(end_date),
    users: [id],
    createBy: id,
    leader: id,
    max_user,
    posts: [],
    createAt: day_now(),
    category,
    isOffline,
    region,
    isSecret,
    cost,
  });

  return newGroup.save();
}

export async function updateGroup(
  {
    name,
    description,
    category,
    end_date,
    max_user,
    isOffline,
    region,
    isSecret,
    cost,
  }: Group,
  groupId: string
) {
  await connect();
  return GroupSchema.findByIdAndUpdate(groupId, {
    $set: {
      name,
      description,
      end_date: timeFormat(end_date),
      max_user,
      category,
      isOffline,
      region,
      isSecret,
      cost,
    },
  });
}

export async function getPublicGroups() {
  await connect();
  return (
    GroupSchema.find(
      { isSecret: false },
      "active category createAt description end_date _id id isOffline isSecret leader max_user name users",
      {
        sort: "createAt",
      }
    )
      .populate("users leader")
      // .populate("g")
      .lean()
      .then((results) =>
        results.map((result) => {
          return { ...result };
        })
      )
  );
}

export async function getMyGroup(oauthId: string) {
  await connect();
  const userId = await getUserIdbyOauthId(oauthId);

  const groups = await GroupSchema.find({}, "")
    .where("users")
    .in([userId])
    .populate("leader users")
    .lean()
    .then((results) =>
      results.map((result) => {
        return {
          ...result,
          _id: result._id.toString(),
          users: result.users.map((user) => {
            return { id: user.id };
          }),
        };
      })
    );
  return groups;
}

export async function getGroup(groupId: string) {
  await connect();
  return await GroupSchema.findOne({ _id: groupId }, "")
    .populate("users leader")
    .lean();
}

export async function getLeader(groupId: string) {
  await connect();
  return await GroupSchema.findOne({ _id: groupId }, "leader")
    .populate("leader")
    .lean();
}

export async function getIsJoinGroup(
  groupId: string,
  userId: mongoose.Types.ObjectId
) {
  await connect();
  const inuser = await GroupSchema.findOne({ _id: groupId }, "")
    .where("users")
    .in([userId]);

  return !!inuser ? true : false;
}

// export async function checkJoinGroupByOauthId(
//   oauthId: string,
//   groupId: string
// ) {
//   const id = await getUserIdbyOauthId(oauthId);
//   if (!id?._id) return;

//   const isJoin = await getIsJoinGroup(groupId, id?._id);

//   return isJoin;
// }

export async function joinGroup(oauthid: string, groupId: string) {
  await connect();
  const id = await getUserIdbyOauthId(oauthid);

  if (!id?._id) throw new Error("User not Found");

  //인원체크
  const group = await getGroup(groupId);
  if (group && group?.max_user <= group?.users.length)
    throw new Error("그룹에 더이상 참여할 수 없습니다");

  //방안에 유저 체크
  const isJoin = await getIsJoinGroup(groupId, id._id);

  if (isJoin) throw new Error("이미 그룹에 참여하고 있습니다.");

  return GroupSchema.findByIdAndUpdate(groupId, {
    $push: { users: id },
  });
}

export async function leaveGroup(oauthId: string, groupId: string) {
  await connect();

  const id = await getUserIdbyOauthId(oauthId);
  if (!id?._id) throw new Error("User not Found");

  //방안에 유저 체크
  const isJoin = await getIsJoinGroup(groupId, id._id);
  if (!isJoin) throw new Error("Not join this group");

  const group = await getGroup(groupId);

  if (group?.leader.id === oauthId)
    throw new Error("leader don't leave group, please change leader");

  return GroupSchema.findByIdAndUpdate(groupId, {
    $pull: { users: id._id },
  });
}

export async function withdrawalGroup(
  userId: string,
  leaveUserOauthId: string,
  groupId: string
) {
  await connect();

  const group = await getLeader(groupId);
  if (group?.leader.id !== userId) throw new Error("Authentication Error");

  return leaveGroup(leaveUserOauthId, groupId);
}
/*
fetch('/api/group/leave',{
    method:'post',
    body:JSON.stringify({
        groupId: '64dcc148e97e61ca2b162cd2',
        changeUserOauthId: '2875712214',
    })
})
 */

export async function changeLeader(
  oauthId: string,
  groupId: string,
  changeUserOauthId: string
) {
  await connect();

  const my_id = await getUserIdbyOauthId(oauthId);
  if (!my_id?._id) throw new Error("User not Found");

  const id = await getUserIdbyOauthId(changeUserOauthId);
  if (!id?._id) throw new Error("User not Found");

  // 방안에 유저 체크
  const isJoin = await getIsJoinGroup(groupId, id._id);
  if (!isJoin) throw new Error("Not join this group");

  //리더 체크
  const group = await getGroup(groupId);
  if (group?.leader.id !== oauthId) throw new Error("you are not leader");

  return GroupSchema.findByIdAndUpdate(groupId, {
    $set: { leader: id },
  });
}

/*
fetch('/api/group/leader',{
    method:'post',
    body:JSON.stringify({
        groupId: '64dcc148e97e61ca2b162cd2',
        changeUserOauthId: '2875712214',
    })
})
 */
