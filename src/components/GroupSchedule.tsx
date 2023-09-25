import { useSchedule } from "@/hooks/schedule";
import { Schedule } from "@/service/schedule";
import Loading from "./ui/Loading";
import InfiniteScroll from "react-infinite-scroller";

interface Props {
  groupId: string;
}
export default function GroupSchedule({ groupId }: Props) {
  const { data, fetchNextPage, isFetching, hasNextPage } = useSchedule(groupId);

  return (
    <InfiniteScroll
      loadMore={() => {
        if (!isFetching) fetchNextPage();
      }}
      hasMore={hasNextPage}
      className="flex flex-col w-full items-center gap-6"
    >
      <div>
        {data?.pages[0].schedules.length ? (
          data.pages.map((page: { schedules: Schedule[]; next: number }) =>
            page.schedules.map((schedule) => (
              <div key={schedule._id} className="mb-24">
                {schedule.startDate}
              </div>
            ))
          )
        ) : (
          <div>일정이 없어요</div>
        )}
        {isFetching && <Loading size={20} type="Moon" />}
      </div>
    </InfiniteScroll>
  );
}
