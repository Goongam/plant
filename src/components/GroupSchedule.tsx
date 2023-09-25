import { useSchedule } from "@/hooks/schedule";
import { Schedule } from "@/service/schedule";
import Loading from "./ui/Loading";
import InfiniteScroll from "react-infinite-scroller";
import ScheduleCard from "./ScheduleCard";

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
      className="flex flex-col w-full justify-center items-center gap-6"
    >
      {data?.pages[0].schedules.length
        ? data.pages.map((page: { schedules: Schedule[]; next: number }) =>
            page.schedules.map((schedule) => (
              <ScheduleCard key={schedule._id} schedule={schedule} />
            ))
          )
        : !isFetching && <div>일정이 없어요</div>}
      {isFetching && <Loading size={20} type="Moon" />}
    </InfiniteScroll>
  );
}
