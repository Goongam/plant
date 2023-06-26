interface Props {
  date: Date;

  isSameMonth: boolean;
}

export default function CalanderCell({ date, isSameMonth }: Props) {
  const day = date.getDate();
  return (
    <div
      className={`w-full h-20 border border-gray-200 ${
        !isSameMonth && "text-gray-200"
      }`}
    >
      {day}
    </div>
  );
}
