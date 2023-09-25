import { FormEvent, useRef, useState } from "react";
import StyleInput from "./ui/StyleInput";
import Loading from "./ui/Loading";
import { useScheduleMutate } from "@/hooks/schedule";

/*
    groupId,
    title: "일정 제목",
    content: "일정 세부내용",
    // createBy: id,
    startDate: dayjs("2023-09-13").format("YYYY-MM-DD"),
    endDate: dayjs("2023-09-15").format("YYYY-MM-DD"),
    isAllMember: true,
    members: [id],


 */

const FOCUS = "focus:border focus:border-sky-300 outline-none";
const CENTER = "flex gap-3 p-1 items-center";

export default function ScheduleModal({ groupId }: { groupId: string }) {
  const { isError, isLoading: loading, mutate } = useScheduleMutate(groupId);

  const [isEndDateError, setIsEndDateError] = useState(false);

  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);

  //리더 전용
  const isAllMemberRef = useRef<HTMLInputElement>(null);
  //   const membersRef = useRef<HTMLInputElement>(null);

  const clickSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsEndDateError(false);
    if (loading) return;

    if (
      startDateRef.current &&
      endDateRef.current &&
      endDateRef.current.value < startDateRef.current.value
    ) {
      setIsEndDateError(true);
      return;
    }

    const formdata = new FormData();

    formdata.append("groupId", groupId);
    titleRef.current && formdata.append("title", titleRef.current.value);
    descriptionRef.current &&
      formdata.append("description", descriptionRef.current.value);
    startDateRef.current &&
      formdata.append("startData", startDateRef.current.value);
    endDateRef.current && formdata.append("endDate", endDateRef.current.value);

    mutate(formdata);
  };

  return (
    <section className="flex flex-col w-full max-w-sm md:max-w-xl h-[500px] md:h-[700px] bg-white rounded-md p-3">
      <p className="font-bold">일정 추가</p>
      <form
        onSubmit={clickSubmit}
        className="flex flex-col h-full justify-between"
      >
        <div className="flex flex-col [&>*:first-child]:rounded-t-md [&>*]:border-x [&>*]:border-t [&>*:last-child]:rounded-b-md [&>*:last-child]:border-b">
          <StyleInput placeholder="일정 제목" required ref={titleRef} />
          <textarea
            placeholder="일정 설명"
            className={`w-full h-52 pl-1 resize-none ${FOCUS}`}
            required
            ref={descriptionRef}
          ></textarea>

          <div className="flex">
            <p className="text-gray-400 w-28">시작일</p>
            <input
              type={`datetime-local`}
              className={`w-full ${FOCUS}`}
              required
              ref={startDateRef}
            />
          </div>

          <div className={`flex ${isEndDateError && "border-red-300"}`}>
            <p className="text-gray-400 w-28">종료일</p>
            <input
              type={`datetime-local`}
              className={`w-full ${FOCUS}`}
              required
              ref={endDateRef}
            />
          </div>

          <div className={`${CENTER}`}>
            <p className="text-gray-400 w-28">전체 일정 여부</p>
            <input type="checkbox" ref={isAllMemberRef} />
          </div>
        </div>

        <button className="w-full h-10 bg-green-300 rounded-md cursor-pointer p-1 mt-2">
          {loading ? (
            <Loading type="Pulse" size={10} color="white" customStyle="h-10" />
          ) : (
            "추가"
          )}
        </button>
      </form>
    </section>
  );
}