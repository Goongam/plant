import { useState } from "react";
import Button from "./ui/Button";
import StyleInput from "./ui/StyleInput";
import { Group } from "@/service/group";
import { useRouter } from "next/navigation";
import Loading from "./ui/Loading";
import Avatar from "./Avatar";
import useMe from "@/hooks/me";

export default function LeaderGroupModel({ group }: { group: Group }) {
  const [loading, setLoading] = useState(false);
  const me = useMe();

  const userWithoutMe = group.users.filter((user) => user.id !== me?.id);

  const router = useRouter();
  const onClick = (userid: string) => {
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
  return (
    <section className="flex flex-col w-full max-w-sm md:max-w-xl h-[500px] md:h-[700px] bg-white rounded-md p-3">
      <p className="font-bold">그룹장 위임</p>
      <div className="flex flex-col h-full w-full gap-2 overflow-x-auto scrollbar-hide">
        <div className="flex flex-col gap-1 max-h-64 overflow-y-scroll p-2">
          {userWithoutMe.map((user) => (
            <div
              key={user.id}
              className="flex justify-between items-center gap-1"
            >
              <div className="flex items-center gap-2">
                <Avatar image={user.image} size="xs" />
                <span>{user.name}</span>
              </div>
              <button
                className="bg-red-200 rounded-md p-2"
                onClick={() => {
                  onClick(user.id);
                }}
              >
                위임
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
