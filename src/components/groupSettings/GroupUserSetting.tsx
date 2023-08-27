import { useGroup } from "@/hooks/group";
import useMe from "@/hooks/me";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Avatar from "../Avatar";

interface Props {
  groupId: string;
}

export default function GroupUserSetting({ groupId }: Props) {
  const [loading, setLoading] = useState(false);
  const { group } = useGroup(groupId);
  const me = useMe();

  const router = useRouter();

  if (!group) return <>loading...</>;
  const userWithoutMe = group.users.filter((user) => user.id !== me?.id);

  const authorize = (userid: string) => {
    setLoading(true);
    fetch("/api/group/leader", {
      method: "post",
      body: JSON.stringify({
        groupId: group._id,
        changeUserOauthId: userid,
      }),
    })
      .then((res) => {
        if (res.ok) {
          alert("그룹장이 변경되었습니다.");
          router.push("/");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const withdrawal = (userid: string) => {
    setLoading(true);
    fetch("/api/group/setting/withdrawal", {
      method: "post",
      body: JSON.stringify({
        groupId: group._id,
        leaveUserOauthId: userid,
      }),
    })
      .then((res) => {
        if (res.ok) {
          alert("강제 퇴장하였습니다");
          // router.push("/");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <section className="flex flex-col w-full bg-white rounded-md p-3">
      <p className="font-bold">유저 관리</p>
      <div className="flex flex-col h-full w-full gap-2 overflow-x-auto scrollbar-hide">
        <div className="flex flex-col gap-1 max-h-64 overflow-y-scroll p-2">
          {userWithoutMe.map((user) => (
            <div
              key={user.id}
              className="flex justify-between items-center gap-1"
            >
              <div className="flex items-center gap-2">
                <Avatar image={user.image} size="s" />
                <span>{user.name}</span>
              </div>
              <div>
                <button
                  className="bg-green-200 rounded-md p-2"
                  onClick={() => {
                    authorize(user.id);
                  }}
                >
                  위임
                </button>
                <button
                  className="bg-red-300 rounded-md p-2 ml-1"
                  onClick={() => {
                    withdrawal(user.id);
                  }}
                >
                  퇴장
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
