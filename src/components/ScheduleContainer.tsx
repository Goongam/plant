import { useSchedule } from "@/hooks/schedule";
import { postFilterDate, postFilterUser } from "@/state";
import { POST_HEADER } from "./PostContainer";
import { Schedule } from "@/service/schedule";
import Loading from "./ui/Loading";
import GroupSchedule from "./GroupSchedule";

interface Props {
  // filterUser?: postFilterUser;
  filterDate?: postFilterDate;
  showAllSchedule: () => void;
  groupId: string;
}

export default function ScheduleContainer({
  groupId,
  filterDate,
  showAllSchedule,
}: Props) {
  const { refetch } = useSchedule(groupId);
  return (
    <section>
      {
        <div className={`${POST_HEADER}`}>
          {filterDate ? (
            <>
              <h2 className="flex font-bold text-2xl">{filterDate}일 일정</h2>
              <button
                onClick={() => {
                  showAllSchedule();
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
                  refetch();
                }}
              >
                새로고침
              </button>
            </>
          )}
        </div>
      }
      <GroupSchedule groupId={groupId} />
    </section>
  );
}
