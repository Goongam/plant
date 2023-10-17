import { useGroup } from "@/hooks/group";
import Loading from "../ui/Loading";

interface Props {
  groupId: string;
}
export default function GroupDeleteSetting({ groupId }: Props) {
  const { group } = useGroup(groupId);

  console.log(group?.active);

  return (
    <section className="flex flex-col w-full bg-white rounded-md p-3">
      {!group ? (
        <Loading type="Moon" />
      ) : (
        <>
          <h2 className="font-bold text-xl text-red-500">그룹폐쇄</h2>
          <p>현재 그룹을 폐쇄합니다.</p>
          <p>주의사항</p>
          <p>그룹장을 제외한 회원이 한명이라도 있으면 폐쇄가 불가능합니다.</p>
          <p>작성한 포스트는 삭제되지 않으며 개인정보에서 확인 가능합니다.</p>
          <p>작성한 일정은 모두 삭제됩니다.</p>
          <p>그룹명을 입력하여 삭제합니다.</p>
          <p>그룹명: {group?.name}</p>
          <button
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
          </button>
        </>
      )}
    </section>
  );
}
