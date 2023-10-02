import { Schedule } from "@/service/schedule";

interface Props {
  schedule: Schedule;
}
export default function ScheduleCard({ schedule }: Props) {
  const { content, groupId, isAllMember, title, members, dates } = schedule;

  return (
    <div className="w-full max-w-[552px] h-40 rounded-md shadow-md">
      <p>dates표시</p>
      <p>{title}</p>
      <p>{content}</p>
    </div>
  );
}
