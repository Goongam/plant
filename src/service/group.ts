import { connect } from "@/lib/mongoose";
import { Post } from "./post";
import { User, getUserIdbyOauthId } from "./user";
import GroupSchema from "@/schema/group";
import mongoose from "mongoose";
import { day_now } from "@/util/dayjs";

export interface Group {
  id: string;
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
}

export async function createGroup(name: string) {
  await connect();
  const newGroup = new GroupSchema({
    name,
    description: "설명",
    end_date: "2023-09-01",
    users: [],
    posts: [],
    createAt: day_now(),
    category: "여행",
  });

  return newGroup.save();
}

export async function getGroups() {
  await connect();
  return GroupSchema.find({}, "", {
    sort: "createAt",
  })
    .populate("users")
    .lean()
    .then((results) =>
      results.map((result) => {
        return { ...result, id: result._id };
      })
    );
}

export async function getGroup(groupId: string) {
  await connect();
  return await GroupSchema.findOne({ _id: groupId }, "")
    .populate("users")
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

  //방안에 유저 체크
  const isJoin = await getIsJoinGroup(groupId, id._id);

  if (isJoin) throw new Error("Already join this group");

  return GroupSchema.findByIdAndUpdate(groupId, {
    $push: { users: id },
  });
}
