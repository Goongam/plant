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
  posts?: Post[];
}

export function createGroup(name: string) {
  connect();
  const newGroup = new GroupSchema({
    name,
    description: "설명",
    end_date: "2023-09-01",
    users: [],
    posts: [],
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
