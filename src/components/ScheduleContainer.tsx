import { useSchedule } from "@/hooks/schedule";
import { postFilterDate, postFilterUser } from "@/state";
import { POST_HEADER } from "./PostContainer";

interface Props {
  // filterUser?: postFilterUser;
  filterDate?: postFilterDate;
  // showAllSchedule: () => void;
  groupId: string;
}

export default function ScheduleContainer({ groupId, filterDate }: Props) {
  const { schedules } = useSchedule(groupId);

  const today = filterDate && new Date(filterDate).getDate();
  let showSchedules;
  if (today) {
    showSchedules = schedules?.filter(
      (schedule) =>
        new Date(schedule.startDate).getDate() <= today &&
        today <= new Date(schedule.endDate).getDate()
    );
  } else {
    showSchedules = schedules;
  }

  console.log(filterDate);

  return (
    <section>
      {
        <div className={`${POST_HEADER}`}>
          {filterDate ? (
            <>
              <h2 className="flex font-bold text-2xl">{filterDate}일 일정</h2>
              <button
                onClick={() => {
                  //TODO: 전체일정보기 (필터없애기)
                }}
              >
                전체보기
              </button>
            </>
          ) : (
            <>
              <h2 className="flex font-bold text-2xl">전체 일정</h2>
              <button
                onClick={() => {
                  //TODO: 새로고침
                }}
              >
                새로고침
              </button>
            </>
          )}
        </div>
      }
      <div>
        {showSchedules?.map((sc) => (
          <div key={sc._id}>
            <p>
              {sc.startDate} ~ {sc.endDate}
            </p>
            <p>{sc.content}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
