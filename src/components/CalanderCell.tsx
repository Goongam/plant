import { Post } from "@/service/post";
import { dateFormat } from "@/util/dayjs";
import Avatar from "./Avatar";
import { User } from "@/service/user";
import PersonIcon from "./ui/icons/PersonIcon";
import ArticleIcon from "./ui/icons/ArticleIcon";
import { useState, MouseEvent } from "react";
import { useSetRecoilState } from "recoil";
import { postFilterState } from "@/state";
import CalanderAvatar from "./CalanderAvatar";

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
  const setFilter = useSetRecoilState(postFilterState);

  const day = date.getDate();
  const today = dateFormat(date);

  const todayPosts = posts?.filter((post) => {
    return dateFormat(post.createAt) === today;
  });

  // console.log();
  posts?.forEach((post) => {
    if (post._id === "64a5a0dc29192b5c5288cfe9") {
      console.log(post);
      console.log(post.createAt);
    }
  });

  // const handleHover = (e: MouseEvent<HTMLDivElement, MouseEvent>) => {};

  const handleClickDate = () => {
    setFilter({
      postFilterDate: today,
    });
  };

  const handleClickUser = (userId: string, name: string) => {
    setFilter({
      postFilterUser: {
        id: userId,
        name,
      },
      postFilterDate: today,
    });
  };

  const uniqueUsers = getUniqueUser(todayPosts);

  return (
    <div
      className={`flex flex-col relative w-full h-20 border border-gray-200 ${
        !isSameMonth && "text-gray-200"
      }`}
    >
      <div className="flex flex-col items-start md:items-center md:flex-row relative overflow-visible">
        <span className="cursor-pointer" onClick={handleClickDate}>
          {day}
        </span>
        <div className="text-xs text-gray-300 overflow-hidden">
          {todayPosts && (
            <div className="flex flex-col md:flex-row justify-center items-center md:ml-1">
              <div className="flex justify-center items-center">
                <span>{uniqueUsers.length}</span>
                <PersonIcon />
              </div>
              {/* TODO: 실제 글 개수와 표시되는 글 개수가 맞지 않음 */}
              <div className="flex justify-center items-center">
                <span className="">{todayPosts.length}</span>
                <ArticleIcon />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="block gap-1 w-full h-full overflow-y-auto scrollbar-hide px-1">
        {uniqueUsers?.map((uniqueUser) => (
          <CalanderAvatar
            key={uniqueUser.id}
            handleClickUser={handleClickUser}
            uniqueUser={uniqueUser}
          />
        ))}
      </div>
    </div>
  );
}
