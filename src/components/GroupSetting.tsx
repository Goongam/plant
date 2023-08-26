"use client";

import { useGroup } from "@/hooks/group";
import { Group } from "@/service/group";
import { useState } from "react";
import GroupCommonSetting from "./groupSettings/GroupCommonSetting";
import GroupPostSetting from "./groupSettings/GroupPostSetting";
import GroupUserSetting from "./groupSettings/GroupUserSetting";

export default function GroupSetting({ groupId }: { groupId: string }) {
  const [settingType, setSettingType] = useState<number>(0);

  const settings = [
    {
      name: "그룹 설정",
      component: <GroupCommonSetting groupId={groupId} />,
    },
    {
      name: "유저 설정",
      component: <GroupUserSetting />,
    },
    {
      name: "포스트 설정",
      component: <GroupPostSetting />,
    },
  ];

  return (
    <section className="w-full h-full flex mt-4 gap-3">
      <div className="h-full w-40 border-r border-black flex flex-col justify-center items-center gap-2">
        {settings.map((setting, index) => (
          <button
            key={setting.name}
            onClick={(e) => {
              setSettingType(index);
            }}
          >
            {setting.name}
          </button>
        ))}
      </div>
      <div>{settings[settingType].component}</div>
    </section>
  );
}
