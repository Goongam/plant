import { useRecoilValue, useSetRecoilState } from "recoil";
import PostContainer from "./PostContainer";
import { postFilterState } from "@/state";
import { useState } from "react";
import ScheduleContainer from "./ScheduleContainer";
import UserPosts from "./UserPosts";
import PostAndScheduleBTN from "./PostAndScheduleBTN";

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

  return (
    <div className="w-full max-w-[700px] mx-auto">
      <div className="flex mt-2">
        <PostAndScheduleBTN
          setShowContainer={setShowContainer}
          showContainer={showContainer}
        />
      </div>
      {showContainer === "post" ? (
        <UserPosts userId={userId} showAllPost={showAllPost} />
      ) : (
        // TODO: 유저 스케쥴
        <div>유저 스케쥴</div>
        // <ScheduleContainer
        //   groupId={groupId}
        //   filterDate={filterDate}
        //   showAllSchedule={showAllPost}
        // />
      )}
    </div>
  );
}
