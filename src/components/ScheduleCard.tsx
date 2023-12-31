import { Schedule } from "@/service/schedule";
import { SlCalender } from "react-icons/sl";
import { useState, useRef } from "react";
import ScheduleCalander from "./ScheduleCalander";
import Modal from "./Modal";
import useMe from "@/hooks/me";
import Link from "next/link";
import MoreText from "./ui/MoreText";
interface Props {
  schedule: Schedule;
  refetch: () => void;
  showGroupName?: boolean;
}
export default function ScheduleCard({
  schedule,
  refetch,
  showGroupName = false,
}: Props) {
  const { content, groupId, isAllMember, title, members, dates, createBy } =
    schedule;

  const me = useMe();

  const [scheduleDates, setScheduleDates] = useState<string[]>(dates);
  const [isModal, setIsModal] = useState(false);

  const deleteSchedule = () => {
    fetch(`/api/schedule/delete`, {
      method: "post",
      body: JSON.stringify({
        scheduleId: schedule._id,
      }),
    }).then(async (res) => {
      if (res.ok) {
        alert("삭제되었습니다");
        refetch();
      } else {
        // alert(await res.text());
        alert("오류로 인해 삭제에 실패하였습니다.");
      }
    });
  };
  //TODO: 일정 수정
  return (
    <div className="w-full max-w-[552px] flex flex-col">
      {showGroupName && (
        <Link
          className="text-sm ml-auto"
          href={`/group/${groupId._id}`}
        >{`${groupId.name} >>`}</Link>
      )}
      <div className="rounded-md shadow-md p-2">
        <div className="flex justify-between border-b border-black py-1 pt-2 mb-1">
          {dates && <p className="">일정시작일: {dates[0]}</p>}
          <div className="flex gap-1 ml-auto">
            {createBy.id === me?.id && (
              <button onClick={deleteSchedule}>삭제</button>
            )}
            <SlCalender
              size={20}
              onClick={() => {
                setIsModal(true);
              }}
              className="cursor-pointer"
            />
          </div>
        </div>
        <p className="font-bold text-xl mb-1">{title}</p>
        <MoreText>{content}</MoreText>
        <Modal isOpen={isModal} setClose={setIsModal}>
          <div className="bg-white w-full sm:max-w-[500px] md:max-w-[700px] p-2">
            <ScheduleCalander
              scheduleDates={scheduleDates}
              setScheduleDates={setScheduleDates}
            />
          </div>
        </Modal>
      </div>
    </div>
  );
}
