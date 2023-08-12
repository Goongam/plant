import { User } from "@/service/user";
import Avatar from "./Avatar";
import { useSetRecoilState } from "recoil";
import { postFilterState } from "@/state";

interface Props {
  users: User[];
}
export default function Participant({ users }: Props) {
  const setFilter = useSetRecoilState(postFilterState);

  const onClick = (user: User) => {
    setFilter({ postFilterUser: { id: user.id, name: user.name } });
  };
  return (
    <div className="flex flex-col gap-1 max-h-64 overflow-y-scroll">
      {users.map((user) => (
        <div
          key={user.id}
          className="flex items-center gap-1 cursor-pointer"
          onClick={() => {
            onClick(user);
          }}
        >
          <Avatar image={user.image} size="xs" />
          <span>{user.name}</span>
        </div>
      ))}
    </div>
  );
}
