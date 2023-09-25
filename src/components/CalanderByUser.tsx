import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addMonths,
  subMonths,
} from "date-fns";
import { isSameMonth, isSameDay, addDays, parse, format } from "date-fns";
import CalanderCell from "./CalanderCell";
import { useState } from "react";
import PreviousIcon from "./ui/icons/PreviousIcon";
import NextIcon from "./ui/icons/NextIcon";
import { useQueryClient } from "react-query";
import { Post } from "@/service/post";
import { usePostsByUser } from "@/hooks/post";
import { useAllScheduleByUser } from "@/hooks/schedule";
import useMe from "@/hooks/me";

interface Props {
  userId: string;
}
export default function CalanderUser({ userId }: Props) {
  const [selectDate, setSelectDate] = useState(new Date());

  const { isError, isLoading, posts } = usePostsByUser(userId);

  const me = useMe();
  const { schedules } = useAllScheduleByUser(me?.id);

  const monthStart = startOfMonth(selectDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const rows = [];
  let days = [];
  let day = startDate;

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      days.push(day);
      day = addDays(day, 1);
    }
    rows.push(days);
    days = [];
  }

  const handleNextMonth = () => {
    setSelectDate(addMonths(selectDate, 1));
  };

  const handlePreMonth = () => {
    setSelectDate(subMonths(selectDate, 1));
  };

  return (
    <>
      <div className="flex flex-row">
        <h2 className="text-2xl w-full">
          <span className=" border-b-2 border-[#4D8295]">
            {`${selectDate.getMonth() + 1}월`}
          </span>

          <span className="text-gray-400 font-thin text-sm ml-4">
            {selectDate.getFullYear()}
          </span>
        </h2>
        <button onClick={handlePreMonth} className="w-fit">
          <PreviousIcon />
        </button>
        <button onClick={handleNextMonth}>
          <NextIcon />
        </button>
      </div>

      <div className="w-full h-fit grid grid-cols-7">
        {rows.map((row) =>
          row.map((date, i) => (
            <CalanderCell
              // groupId={groupId}
              key={i}
              date={date}
              isSameMonth={isSameMonth(date, monthStart)}
              posts={posts}
              schedules={schedules}
            />
          ))
        )}
      </div>
    </>
  );
}
