import { connect } from "@/lib/mongoose";
import { Post } from "./post";
import { User } from "./user";
import GroupSchema from "@/schema/group";

export interface Group {
  id: string;
  name: string;
  description: string;
  end_date: Date;
  createAt: Date;
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

export function createGroup(name: string) {
  connect();
  const newGroup = new GroupSchema({
    name,
    description: "설명",
    end_date: "2023-09-01",
    users: [],
    posts: [],
    category: "여행",
  });

  return newGroup
    .save()
    .then((docs: any) => docs)
    .catch((err: Error) => {
      console.error(err);
      return err;
    });
}

export async function getGroup() {
  connect();
  return GroupSchema.find({}, "", {
    sort: "createAt",
  }).lean();
}
