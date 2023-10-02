import {
  addDays,
  addMonths,
  endOfMonth,
  endOfWeek,
  isSameMonth,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import CalanderCell from "./CalanderCell";
import { dateFormat } from "@/util/dayjs";
import PreviousIcon from "./ui/icons/PreviousIcon";
import NextIcon from "./ui/icons/NextIcon";
import { useState } from "react";

interface Props {
  scheduleDates: string[];
  setScheduleDates: (value: string[]) => void;
}
export default function ScheduleCalander({
  scheduleDates,
  setScheduleDates,
}: Props) {
  const [selectDate, setSelectDate] = useState(new Date());

  const [dragStartDate, setDragStartDate] = useState<Date>();
  const [dragDates, setDragDates] = useState<string[]>([]);

  const [dragging, setDragging] = useState(false);

  //   const [scheduleDates, setScheduleDates] = useState<string[]>([]);

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

  const onDragDate = (date: Date) => {
    if (dragging && dragStartDate) {
      //클릭 시작부분 ~ 현재 마우스 위치 날짜까지
      let calcStartDate = dragStartDate;
      //   setDragDates([]);
      let tmpDragDates: string[] = [];
      while (calcStartDate <= date) {
        const formatDate = dateFormat(calcStartDate);
        if (tmpDragDates.includes(formatDate)) break;
        tmpDragDates = [...tmpDragDates, formatDate];

        calcStartDate = addDays(calcStartDate, 1);
      }

      setDragDates(tmpDragDates);
    }
  };

  const addScheduleDate = (date: Date) => {
    const formatDate = dateFormat(date);
    //취소
    if (scheduleDates.includes(formatDate)) {
      const filter = scheduleDates.filter((sd) => sd !== formatDate);

      setScheduleDates([...filter]);

      //추가
    } else setScheduleDates([...scheduleDates, formatDate].sort());
  };

  const combineDragToSchedule = () => {
    if (dragDates.length <= 1) {
      console.log(dragDates.length);
      return;
    }

    const removeOverLap = dragDates.filter(
      (dragDate) => !scheduleDates.includes(dragDate)
    );
    setScheduleDates([...scheduleDates, ...removeOverLap].sort());
    setDragStartDate(undefined);
    setDragDates([]);
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

      <div
        className="w-full h-fit grid grid-cols-7 select-none"
        onDragStart={() => {
          return;
        }}
        onMouseDown={() => {
          setDragging(true);
        }}
        onMouseUp={() => {
          setDragging(false);
          setDragStartDate(undefined); //마우스가 밖으로 나갈을 때, (제거 가능)
          combineDragToSchedule();
        }}
        onMouseLeave={() => setDragStartDate(undefined)}
      >
        {rows.map((row) =>
          row.map((date, i) => (
            <div
              onMouseMove={() => onDragDate(date)}
              onMouseDown={() => setDragStartDate(date)}
              onClick={() => addScheduleDate(date)}
              key={date.getDate()}
            >
              <CalanderCell
                date={date}
                isSameMonth={isSameMonth(date, monthStart)}
                onSchedule={
                  scheduleDates.includes(dateFormat(date))
                  //   || dragDates.includes(dateFormat(date))
                }
                isNextSchedule={scheduleDates.includes(
                  dateFormat(addDays(date, 1))
                )}
                isPrevSchedule={scheduleDates.includes(
                  dateFormat(addDays(date, -1))
                )}
              />
            </div>
          ))
        )}
      </div>
    </>
  );
}
