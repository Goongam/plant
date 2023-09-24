import { useRecoilValue, useSetRecoilState } from "recoil";
import PostContainer from "./PostContainer";
import { postFilterState } from "@/state";
import { useState } from "react";
import ScheduleContainer from "./ScheduleContainer";

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
    <>
      <div className="flex mt-2">
        <button
          className={`flex-1 border-t border-gray m-2 p-3 ${
            showContainer === "post" && "border-black"
          }`}
          onClick={() => setShowContainer("post")}
        >
          포스트
        </button>
        <button
          className={`flex-1 border-t border-gray m-2 p-3 ${
            showContainer === "schedule" && "border-black"
          }`}
          onClick={() => setShowContainer("schedule")}
        >
          일정
        </button>
      </div>
      {showContainer === "post" ? (
        <PostContainer
          groupId={groupId}
          showAllPost={showAllPost}
          filterDate={filterDate}
          filterUser={filterUser}
        />
      ) : (
        <ScheduleContainer groupId={groupId} filterDate={filterDate} />
      )}
    </>
  );
}
