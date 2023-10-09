import { Group } from "@/service/group";
import { useRouter } from "next/navigation";
import { useQuery } from "react-query";

export function useGroup(groupId: string) {
  const router = useRouter();

  const {
    data: group,
    isError,
    isLoading,
  } = useQuery<Group>(
    ["group-data", groupId],
    () =>
      fetch(`/api/group/${groupId}`).then((res) => {
        if (res.status === 200) return res.json();
        else if (res.status === 400) throw new Error("해당 그룹이 없습니다");
        else if (res.status === 401)
          throw new Error(
            "로그인하지 않았거나 해당 그룹에 가입되지 않았습니다"
          );
      }),
    {
      onError(err) {
        alert(err);
        router.push("/");
      },
      retry: 0,
      retryDelay: 1000,
    }
  );

  return { group, isError, isLoading };
}
