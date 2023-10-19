import { useGroup } from "@/hooks/group";
import Loading from "../ui/Loading";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  groupId: string;
}
export default function GroupDeleteSetting({ groupId }: Props) {
  const { group } = useGroup(groupId);
  const [inputGroup, setInputGroup] = useState("");

  const router = useRouter();
  const deleteGroup = () => {
    fetch("/api/group/delete", {
      method: "post",
      body: JSON.stringify({
        groupId,
      }),
    }).then((res) => {
      if (res.ok) {
        alert("그룹이 삭제되었습니다.");
        router.replace("/");
      } else {
        alert("그룹삭제에 실패하였습니다.");
      }
    });
  };
  return (
    <section className="flex flex-col w-full bg-white rounded-md p-3">
      {!group ? (
        <Loading type="Moon" />
      ) : (
        <>
          <h2 className="font-bold text-2xl text-red-500">그룹폐쇄</h2>
          <div className="text-xl border-y border-black my-3 py-3">
            <p className="font-bold">주의사항</p>
            <p>
              1. 그룹장을 제외한 멤버가 한명이라도 있으면 폐쇄가 불가능합니다.
            </p>
            <p>
              2. 작성한 포스트는 삭제되지 않으며 개인정보에서 확인 가능합니다.
            </p>
            <p>3. 작성한 일정은 모두 삭제됩니다.</p>
            <p>4. 그룹명을 입력하여 삭제합니다.</p>
          </div>

          {group.users.length >= 2 && (
            <div className="text-red-500 my-2 font-bold border-b border-red-500">
              현재 그룹삭제 불가: [그룹에 가입된 멤버가 2명이상]
            </div>
          )}
          <p className="mt-3 font-bold text-2xl">그룹명: {group?.name}</p>
          <input
            type="text"
            placeholder={`그룹명 입력...`}
            className="flex-1 h-12 border-b border-black font-bold text-xl"
            value={inputGroup}
            onChange={(e) => setInputGroup(e.target.value)}
          ></input>

          <button
            className={`bg-red-600 rounded-sm p-1 mt-3 text-white font-bold disabled:bg-red-400/30`}
            disabled={group.name !== inputGroup && group.users.length <= 1}
            onClick={deleteGroup}
          >
            확인
          </button>
          {/* <button
            onClick={() => {
              fetch("/api/group/delete", {
                method: "post",
                body: JSON.stringify({
                  groupId,
                }),
              });
            }}
          >
            테스트삭제
          </button> */}
        </>
      )}
    </section>
  );
}
