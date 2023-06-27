import { Post } from "@/service/post";
import { dateFormat } from "@/util/dayjs";
import Avatar from "./Avatar";

interface Props {
  date: Date;

  isSameMonth: boolean;
  posts: Post[] | undefined;
}

export default function CalanderCell({ date, isSameMonth, posts }: Props) {
  const day = date.getDate();
  const today = dateFormat(date);

  const todayPosts = posts?.filter((post) => {
    return dateFormat(post.createAt) === today;
  });

  return (
    <div
      className={`w-full h-20 border border-gray-200 ${
        !isSameMonth && "text-gray-200"
      }`}
    >
      {day}
      {todayPosts?.map((todayPost) => (
        <div key={todayPost._id}>
          <Avatar image={todayPost.author?.image} size="s" />
        </div>
      ))}
    </div>
  );
}
