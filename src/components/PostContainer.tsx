import { postFilterDate, postFilterUser } from "@/state";
import GroupPosts from "./GroupPosts";
import { useInfinityPosts } from "@/hooks/post";
import { day_now } from "@/util/dayjs";
import { useSchedule } from "@/hooks/schedule";

interface Props {
  filterUser?: postFilterUser;
  filterDate?: postFilterDate;
  showAllPost: () => void;
  groupId: string;
}
export const POST_HEADER =
  "my-2 p-2 border-b border-black flex justify-between items-center";

export default function PostContainer({
  filterDate,
  filterUser,
  showAllPost,
  groupId,
}: Props) {
  const { refetch } = useInfinityPosts(groupId);

  const { schedules } = useSchedule(groupId);

  const today = filterDate && new Date(filterDate).getDate();
  let todaySchedules;
  if (today) {
    todaySchedules = schedules?.filter(
      (schedule) =>
        new Date(schedule.startDate).getDate() <= today &&
        today <= new Date(schedule.endDate).getDate()
    );
  }

  return (
    <>
      {filterDate || filterUser ? (
        <div className={POST_HEADER}>
          <div className="flex font-bold text-2xl ">
            <p
              className={`${filterDate && filterUser && 'after:content-["·"]'}`}
            >
              {filterDate &&
                `${new Date(filterDate).getMonth() + 1}월 ${new Date(
                  filterDate
                ).getDate()}일`}
            </p>
            <p>{filterUser && `${filterUser.name}`}</p>
          </div>
          <div onClick={showAllPost}>전체보기</div>
        </div>
      ) : (
        <div className={POST_HEADER}>
          <div className="flex font-bold text-2xl ">전체 포스트</div>
          <p onClick={() => refetch()}>새로고침</p>
        </div>
      )}
      {today && (
        <div>
          {todaySchedules?.map((sc) => (
            <div key={sc._id}>{sc.startDate}</div>
          ))}
        </div>
      )}
      <GroupPosts groupId={groupId} />
    </>
  );
}
