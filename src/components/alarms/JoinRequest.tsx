import { Alarm } from "@/service/alarm";
import { getTimeAgo } from "@/util/timeago";
import { useMutation } from "react-query";

interface Props {
  alarm: Alarm;
  refetch: () => void;
}
export default function JoinRequest({ alarm, refetch }: Props) {
  const onclick = (type: "accept" | "decline") => {
    fetch(`/api/alarm/${type}`, {
      method: "post",
      body: JSON.stringify({ alarmId: alarm._id }),
    }).then(async (res) => {
      if (res.ok) {
        refetch();
      } else {
        // alert(res)
        alert(await res.text());
        refetch();
      }
    });
  };
  return (
    <div className="flex border-black h-28">
      <div className="w-full h-full flex flex-col border p-1 shadow-md rounded-md">
        <div className="font-bold text-xl">{alarm.groupId?.name}</div>
        <div className="flex">{alarm.from?.name}님의 그룹 초대 요청</div>
        <div className="mr-auto mt-auto mb-1">{getTimeAgo(alarm.createAt)}</div>
      </div>
      <div className="w-24 h-full flex flex-col ml-1 ">
        <button
          className="flex-1 bg-green-300 shadow-md rounded-md"
          onClick={() => onclick("accept")}
        >
          수락
        </button>
        <button
          className="flex-1 bg-red-400 mt-1 shadow-md rounded-md"
          onClick={() => onclick("decline")}
        >
          거절
        </button>
      </div>
    </div>
  );
}
