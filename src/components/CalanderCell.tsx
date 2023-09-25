import { Post } from "@/service/post";
import { dateFormat } from "@/util/dayjs";
import { User } from "@/service/user";
import PersonIcon from "./ui/icons/PersonIcon";
import ArticleIcon from "./ui/icons/ArticleIcon";
import { useSetRecoilState } from "recoil";
import { postFilterState } from "@/state";
import CalanderAvatar from "./CalanderAvatar";
import { useAllSchedule, useSchedule } from "@/hooks/schedule";
import { Schedule } from "@/service/schedule";

interface Props {
  date: Date;
  groupId?: string;
  isSameMonth: boolean;
  posts: Post[] | undefined;
  schedules?: Schedule[];
}

function getUniqueUser(todayPosts: Post[] | undefined): User[] {
  const map = new Map();
  todayPosts?.map((post) => {
    if (!map.has(post.author.id)) map.set(post.author.id, post.author);
  });
  return [...map.values()];
}
export default function CalanderCell({
  date,
  isSameMonth,
  posts,
  groupId,
  schedules,
}: Props) {
  const setFilter = useSetRecoilState(postFilterState);

  const day = date.getDate();
  const today = dateFormat(date);

  const hasSchedule = schedules?.find(
    (schedule) =>
      dateFormat(schedule.startDate) <= today &&
      today <= dateFormat(schedule.endDate)
  );

  const todayPosts = posts?.filter((post) => {
    return dateFormat(post.createAt) === today;
  });

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
      } ${hasSchedule && "bg-yellow-200"}
      ${today === dateFormat(new Date()) && "border-green-600"}`}
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
