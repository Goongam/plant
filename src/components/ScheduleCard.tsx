import { Schedule } from "@/service/schedule";
import { dateFormat } from "@/util/dayjs";
import { getTimeAgo } from "@/util/timeago";
import { SlCalender } from "react-icons/sl";
import { useState, useRef } from "react";
import ScheduleCalander from "./ScheduleCalander";
import Modal from "./Modal";
import { useMoreText } from "@/hooks/moreText";
interface Props {
  schedule: Schedule;
}
export default function ScheduleCard({ schedule }: Props) {
  const { content, groupId, isAllMember, title, members, dates } = schedule;
  const [scheduleDates, setScheduleDates] = useState<string[]>(dates);
  const [isModal, setIsModal] = useState(false);

  const contentRef = useRef(null);
  const { handleMore, handleSimple, isClickMore, hasMore } =
    useMoreText(contentRef);

  //TODO: 일정 수정
  return (
    <div className="w-full max-w-[552px] rounded-md shadow-md p-2">
      <div className="flex justify-between border-b border-black py-1 pt-2 mb-1">
        {dates && <p className="">일정시작일: {dates[0]}</p>}
        <SlCalender
          size={20}
          onClick={() => {
            setIsModal(true);
          }}
          className="ml-auto cursor-pointer"
        />
      </div>
      <p className="font-bold text-xl mb-1">{title}</p>
      {/* <div ref={contentRef} className="h-24 overflow-y-scroll">{content}</div> */}
      <div
        ref={contentRef}
        className={`line-clamp-3 ${isClickMore && "line-clamp-none"}`}
      >
        {content}
      </div>
      {hasMore && !isClickMore && (
        <button onClick={handleMore} className="text-start text-black/40">
          더보기
        </button>
      )}
      {hasMore && isClickMore && (
        <button onClick={handleSimple} className="text-start text-black/40">
          간략히보기
        </button>
      )}
      <Modal isOpen={isModal} setClose={setIsModal}>
        <div className="bg-white w-full sm:max-w-[500px] md:max-w-[700px] p-2">
          <ScheduleCalander
            scheduleDates={scheduleDates}
            setScheduleDates={setScheduleDates}
          />
        </div>
      </Modal>
    </div>
  );
}
