import { Post } from "@/service/post";
import { dateFormat } from "@/util/dayjs";
import Avatar from "./Avatar";
import { User } from "@/service/user";
import PersonIcon from "./ui/icons/PersonIcon";
import ArticleIcon from "./ui/icons/ArticleIcon";
import { useState, MouseEvent } from "react";

interface Props {
  date: Date;

  isSameMonth: boolean;
  posts: Post[] | undefined;
}

function getUniqueUser(todayPosts: Post[] | undefined): User[] {
  const map = new Map();
  todayPosts?.map((post) => {
    if (!map.has(post.author.id)) map.set(post.author.id, post.author);
  });
  return [...map.values()];
}
export default function CalanderCell({ date, isSameMonth, posts }: Props) {
  const [hoverName, setHoverName] = useState("");

  const day = date.getDate();
  const today = dateFormat(date);

  const todayPosts = posts?.filter((post) => {
    return dateFormat(post.createAt) === today;
  });

  // const handleHover = (e: MouseEvent<HTMLDivElement, MouseEvent>) => {};
  const hoverHandle = (e: MouseEvent<HTMLDivElement>, name: string) => {
    if (e.type === "mousemove") setHoverName(name);
    else setHoverName("");
  };
  // const aa = todayPosts?.map((todayPost) => [todayPost._id, todayPost]);
  const uniqueUsers = getUniqueUser(todayPosts);

  return (
    <div
      className={`flex flex-col w-full h-20 border border-gray-200 ${
        !isSameMonth && "text-gray-200"
      }`}
    >
      <div className="flex flex-col items-start md:items-center md:flex-row relative overflow-visible">
        {day}
        <div className="text-xs text-gray-300 overflow-hidden">
          {todayPosts && (
            <div className="flex flex-col md:flex-row justify-center items-center md:ml-1">
              <div className="flex justify-center items-center">
                <span>{uniqueUsers.length}</span>
                <PersonIcon />
              </div>
              <div className="flex justify-center items-center">
                <span className="">{todayPosts.length}</span>
                <ArticleIcon />
              </div>
            </div>
          )}
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap bg-gray-800 px-1 text-sm text-gray-100 rounded-md">
          {hoverName}
        </div>
      </div>
      <div className="block gap-1 w-full h-full overflow-y-auto scrollbar-hide px-1">
        {uniqueUsers?.map((uniqueUser) => (
          <div
            key={uniqueUser.id}
            className="inline-block m-[2px]"
            onMouseOut={(e) => hoverHandle(e, uniqueUser.name)}
            onMouseMove={(e) => hoverHandle(e, uniqueUser.name)}
          >
            <div className="group flex relative">
              <Avatar image={uniqueUser.image} size="xs" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
