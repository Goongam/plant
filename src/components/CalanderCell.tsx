import { Post } from "@/service/post";
import { dateFormat } from "@/util/dayjs";
import Avatar from "./Avatar";
import { User } from "@/service/user";

interface Props {
  date: Date;

  isSameMonth: boolean;
  posts: Post[] | undefined;
}

function getUniqueUser(todayPosts: Post[] | undefined): User[] {
  const map = new Map();
  todayPosts?.map((post) => {
    if (!map.has(post.author.id)) map.set(post.author.id, post.author);
  });
  return [...map.values()];
}
export default function CalanderCell({ date, isSameMonth, posts }: Props) {
  const day = date.getDate();
  const today = dateFormat(date);

  const todayPosts = posts?.filter((post) => {
    return dateFormat(post.createAt) === today;
  });

  // const aa = todayPosts?.map((todayPost) => [todayPost._id, todayPost]);
  const uniqueUsers = getUniqueUser(todayPosts);
  console.log(uniqueUsers);

  return (
    <div
      className={`flex flex-col w-full h-20 border border-gray-200 ${
        !isSameMonth && "text-gray-200"
      }`}
    >
      <div>
        {day}
        <span className="text-xs text-gray-300">
          {todayPosts && `(${todayPosts?.length}명)`}
        </span>
      </div>
      <div className="block gap-1 w-full h-full overflow-y-auto scrollbar-hide px-1">
        {uniqueUsers?.map((uniqueUser) => (
          <div key={uniqueUser.id} className="inline-block">
            <Avatar image={uniqueUser.image} size="xs" />
          </div>
        ))}
      </div>
    </div>
  );
}
