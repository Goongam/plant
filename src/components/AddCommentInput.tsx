import useMe from "@/hooks/me";
import Avatar from "./Avatar";
import { useState, FormEvent } from "react";
import { Post } from "@/service/post";
import { QueryKey, UseMutateFunction } from "react-query";

export default function AddCommentInput({
  post,
  updateComment,
}: {
  post: Post;
  updateComment: UseMutateFunction<
    any,
    unknown,
    {
      comment: string;
      postId: string;
    },
    {
      prevCommentData: [QueryKey, unknown][];
    }
  >;
}) {
  const user = useMe();
  const [comment, setComment] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!comment) return;

    console.log(comment);

    updateComment({ comment, postId: post._id });

    setComment("");
    // fetch(`/api/comment/new`, {
    //   method: "post",
    //   body: JSON.stringify({
    //     postId: post._id,
    //     comment,
    //   }),
    // });
  };

  if (!user) return <></>;

  return (
    <form className="flex mb-4 h-10" onSubmit={handleSubmit}>
      <Avatar image={user?.image} size="s" />
      <input
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        type="text"
        className="flex-1 mx-2 border-b border-black/20 focus:border-black outline-none"
      />
      <button
        type="submit"
        className={`p-2 rounded-md ${
          comment
            ? "text-white border-blue-500 bg-blue-500"
            : "text-black/50 border-black/20 bg-black/5 cursor-default"
        }`}
      >
        확인
      </button>
    </form>
  );
}
