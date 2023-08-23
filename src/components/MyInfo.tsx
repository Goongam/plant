"use client";

import { User } from "@/service/user";
import Avatar from "./Avatar";
import CalanderUser from "./CalanderByUser";
import UserPosts from "./UserPosts";

interface Props {
  user: User;
}
export default function MyInfo({ user }: Props) {
  return (
    <>
      <div className="bg-[#F8F0E5] rounded-sm flex-1 m-4 flex p-2 gap-2">
        <div className="flex flex-col items-center gap-2">
          <Avatar image={user.image} size="l" />
          <p>{user.name}</p>
          <p>{user.email}</p>
        </div>
        <div className="bg-white w-full">
          <CalanderUser userId={user.id} />
        </div>
      </div>
      <div>
        {/* <h2>목록</h2> */}
        <UserPosts userId={user.id} />
      </div>
    </>
  );
}
