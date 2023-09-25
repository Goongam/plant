import { useRecoilValue, useSetRecoilState } from "recoil";
import PostContainer from "./PostContainer";
import { postFilterState } from "@/state";
import { useState } from "react";
import ScheduleContainer from "./ScheduleContainer";
import PostAndScheduleBTN from "./PostAndScheduleBTN";

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
          groupId={groupId}
          showAllPost={showAllPost}
          filterDate={filterDate}
          filterUser={filterUser}
        />
      ) : (
        <ScheduleContainer
          groupId={groupId}
          filterDate={filterDate}
          showAllSchedule={showAllPost}
        />
      )}
    </div>
  );
}
