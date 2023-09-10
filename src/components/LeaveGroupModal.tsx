import { useState } from "react";
import Button from "./ui/Button";
import StyleInput from "./ui/StyleInput";
import { Group } from "@/service/group";
import { useRouter } from "next/navigation";
import Loading from "./ui/Loading";
import useMe from "@/hooks/me";

export default function LeaveGroupModel({ group }: { group: Group }) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const isInput = input === group.name;

  const router = useRouter();
  const onClick = () => {
    if (!isInput) return;

    setLoading(true);
    fetch("/api/group/leave", {
      method: "post",
      body: JSON.stringify({
        groupId: group._id,
      }),
    })
      .then((res) => {
        if (res.ok) {
          alert("탈퇴 되었습니다");
          router.push("/");
        } else {
          alert("탈퇴에 실패하였습니다.");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <section className="flex flex-col w-full max-w-sm md:max-w-xl h-[500px] md:h-[700px] bg-white rounded-md p-3">
      <p className="font-bold">그룹 탈퇴</p>
      <div className="flex flex-col h-full w-full gap-2 overflow-x-auto scrollbar-hide">
        <p>주의사항</p>
        <p>그룹장은 탈퇴할 수 없습니다.</p>
        <p>작성한 포스트는 삭제되지 않습니다</p>
        <p className="mt-12">현재 그룹명을 입력해주세요</p>
        <p className="font-bold text-2xl">그룹명: {group.name}</p>
        <input
          type="text"
          placeholder="그룹명을 입력"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          className="border-b border-black outline-none"
        />
        <button
          onClick={onClick}
          className={`w-full mt-auto rounded-md p-3 font-extrabold ${
            isInput
              ? "bg-red-300"
              : "bg-red-200/50 text-black/30 cursor-default"
          }`}
        >
          {loading ? <Loading type="Beat" size={13} /> : "탈퇴하기"}
        </button>
      </div>
    </section>
  );
}
