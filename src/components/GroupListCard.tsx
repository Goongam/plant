"use client";

import { Group } from "@/service/group";

interface Props {
  group: Group;
}
export default function GroupListCard({ group }: Props) {
  return (
    <div className="w-full h-[200px] rounded-md bg-slate-200 mr-10">
      {group.name}
      <div>{group.end_date?.toString()}</div>
    </div>
  );
}
