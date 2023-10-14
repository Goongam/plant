import { useSchedule } from "@/hooks/schedule";
import { postFilterDate } from "@/state";
import { POST_HEADER } from "./PostContainer";
import { Schedule } from "@/service/schedule";
import Loading from "./ui/Loading";
import InfiniteScroll from "react-infinite-scroller";
import ScheduleCard from "./ScheduleCard";
import { InfiniteData } from "react-query";

interface Props {
  // filterUser?: postFilterUser;
  filterDate?: postFilterDate;
  showAllSchedule: () => void;
  data:
    | InfiniteData<any>
    | undefined
    | { pages: [{ schedules: Schedule[]; next: number }] };
  refetch: () => void;
  isFetching: boolean;
  hasNextPage: boolean | undefined;
  fetchNextPage: () => void;
}

export default function ScheduleContainer({
  data,
  fetchNextPage,
  hasNextPage,
  isFetching,
  refetch,
  filterDate,
  showAllSchedule,
}: Props) {
  // const { data, fetchNextPage, isFetching, hasNextPage, refetch } =
  //   useSchedule(groupId);

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
      <InfiniteScroll
        loadMore={() => {
          if (!isFetching) fetchNextPage();
        }}
        hasMore={hasNextPage}
        className="flex flex-col w-full justify-center items-center gap-6"
      >
        {data?.pages[0].schedules.length
          ? data.pages.map((page: { schedules: Schedule[]; next: number }) =>
              page.schedules.map((schedule) => (
                <ScheduleCard
                  key={schedule._id}
                  schedule={schedule}
                  refetch={refetch}
                />
              ))
            )
          : !isFetching && <div>일정이 없어요</div>}
        {isFetching && <Loading size={20} type="Moon" />}
      </InfiniteScroll>
    </section>
  );
}
