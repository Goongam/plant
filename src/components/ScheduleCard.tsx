import { Schedule } from "@/service/schedule";

interface Props {
  schedule: Schedule;
}
export default function ScheduleCard({ schedule }: Props) {
  const { content, endDate, groupId, isAllMember, startDate, title, members } =
    schedule;

  return (
    <div className="w-full max-w-[552px] h-40 rounded-md shadow-md">
      <p>
        {startDate} ~ {endDate}
      </p>
      <p>{title}</p>
      <p>{content}</p>
    </div>
  );
}
