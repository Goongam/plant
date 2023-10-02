import { useRecoilValue, useSetRecoilState } from "recoil";
import PostContainer from "./PostContainer";
import { postFilterState } from "@/state";
import { useState } from "react";
import ScheduleContainer from "./ScheduleContainer";
import PostAndScheduleBTN from "./PostAndScheduleBTN";
import { useSchedule } from "@/hooks/schedule";
import { useInfinityPosts } from "@/hooks/post";

interface Props {
  groupId: string;
}
export default function PostAndSchedule({ groupId }: Props) {
  const { postFilterDate: filterDate, postFilterUser: filterUser } =
    useRecoilValue(postFilterState);
  const setFilter = useSetRecoilState(postFilterState);
  const showAllPost = () => {
    setFilter({ postFilterDate: undefined, postFilterUser: undefined });
  };

  const [showContainer, setShowContainer] = useState<"post" | "schedule">(
    "post"
  );

  const {
    data: PostData,
    fetchNextPage: PostFetchNextPage,
    hasNextPage: PostHasNextPage,
    isFetching: PostIsFetching,
    refetch: PostRefetch,
  } = useInfinityPosts(groupId);

  const { data, fetchNextPage, isFetching, hasNextPage, refetch } =
    useSchedule(groupId);
  return (
    <div className="w-full max-w-[700px] mx-auto">
      <div className="flex mt-2">
        <PostAndScheduleBTN
          setShowContainer={setShowContainer}
          showContainer={showContainer}
        />
      </div>
      {showContainer === "post" ? (
        <PostContainer
          showAllPost={showAllPost}
          filterDate={filterDate}
          filterUser={filterUser}
          data={PostData}
          fetchNextPage={PostFetchNextPage}
          hasNextPage={PostHasNextPage}
          isFetching={PostIsFetching}
          refetch={PostRefetch}
        />
      ) : (
        <ScheduleContainer
          data={data}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          refetch={refetch}
          isFetching={isFetching}
          filterDate={filterDate}
          showAllSchedule={showAllPost}
        />
      )}
    </div>
  );
}
