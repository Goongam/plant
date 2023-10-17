"use client";

import { useGroup } from "@/hooks/group";
import { Group } from "@/service/group";
import { useState } from "react";
import GroupCommonSetting from "./groupSettings/GroupCommonSetting";
import GroupPostSetting from "./groupSettings/GroupPostSetting";
import GroupUserSetting from "./groupSettings/GroupUserSetting";
import GroupDeleteSetting from "./groupSettings/GroupDeleteSetting";

export default function GroupSetting({ groupId }: { groupId: string }) {
  const [settingType, setSettingType] = useState<number>(0);

  const settings = [
    {
      name: "그룹 설정",
      component: <GroupCommonSetting groupId={groupId} />,
    },
    {
      name: "유저 설정",
      component: <GroupUserSetting groupId={groupId} />,
    },
    {
      name: "그룹 폐쇄",
      component: <GroupDeleteSetting groupId={groupId} />,
    },
  ];

  return (
    <section className="w-full h-full flex mt-4 gap-3">
      <div className="h-full w-40 border-r border-black flex flex-col justify-center items-center gap-2">
        {settings.map((setting, index) => (
          <button
            className={`${
              setting.name === "그룹 폐쇄" && "text-red-500 mt-10 font-bold"
            }`}
            key={setting.name}
            onClick={(e) => {
              setSettingType(index);
            }}
          >
            {setting.name}
          </button>
        ))}
      </div>
      <>{settings[settingType].component}</>
    </section>
  );
}
