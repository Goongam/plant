import { useRecoilValue, useSetRecoilState } from "recoil";
import PostContainer from "./PostContainer";
import { postFilterState } from "@/state";
import { useState } from "react";
import UserPostsContainer from "./UserPosts";
import PostAndScheduleBTN from "./PostAndScheduleBTN";
import { useScheduleByUser } from "@/hooks/schedule";
import ScheduleContainer from "./ScheduleContainer";
import { useInfinityUserPosts } from "@/hooks/post";

interface Props {
  userId: string;
}
export default function PostAndScheduleByUser({ userId }: Props) {
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
  } = useInfinityUserPosts(userId);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isError,
    isFetching,
    isLoading,
    refetch,
  } = useScheduleByUser(userId);

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
          showGroupName={true}
        />
      ) : (
        <ScheduleContainer
          data={data}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetching={isFetching}
          refetch={refetch}
          showAllSchedule={showAllPost}
          filterDate={filterDate}
          showGroupName={true}
        />
      )}
    </div>
  );
}
