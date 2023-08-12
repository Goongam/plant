import { User } from "@/service/user";
import Avatar from "./Avatar";
import { MouseEvent, useState } from "react";

interface Props {
  uniqueUser: User;
  handleClickUser: (id: string, name: string) => void;
}
export default function CalanderAvatar({ uniqueUser, handleClickUser }: Props) {
  const [hoverName, setHoverName] = useState("");

  const hoverHandle = (e: MouseEvent<HTMLDivElement>, name: string) => {
    if (e.type === "mousemove") setHoverName(name);
    else setHoverName("");
  };

  return (
    <div
      key={uniqueUser.id}
      className="inline-block m-[2px] cursor-pointer"
      onMouseOut={(e) => hoverHandle(e, uniqueUser.name)}
      onMouseMove={(e) => hoverHandle(e, uniqueUser.name)}
      onClick={() => {
        handleClickUser(uniqueUser.id, uniqueUser.name);
      }}
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gray-800 px-1 text-sm text-gray-100 rounded-md">
        {hoverName}
      </div>
      <div className="group flex relative">
        <Avatar image={uniqueUser.image} size="xs" />
      </div>
    </div>
  );
}
