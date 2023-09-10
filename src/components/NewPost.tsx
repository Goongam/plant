"use client";

import { useMutation } from "react-query";
import PostForm from "./PostForm";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewPost({ groupId }: { groupId: string }) {
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const {
    isLoading: mutating,
    isIdle,
    isPaused,
    mutate,
    isError: mutateError,
  } = useMutation(
    (formdata: FormData) =>
      fetch(`/api/post/new`, {
        method: "post",
        body: formdata,
      }).then((res) => res.json()),
    {
      onSuccess() {
        setIsSuccess(true);
        router.push(`/group/${groupId}`);
      },
      // onError() {
      //   console.log("에러처리");
      // },
    }
  );

  const submit = (comment?: string, images?: Array<File | string>) => {
    const formdata = new FormData();

    //이미지
    if (images) {
      images.forEach((file) => {
        formdata.append("files", file);
      });
    }

    if (!comment) return;
    formdata.append("comment", comment);

    if (!groupId) return;
    formdata.append("groupId", groupId);

    mutate(formdata);
  };

  return (
    <PostForm
      groupId={groupId}
      onSubmit={submit}
      type="new"
      isSuccess={isSuccess}
      mutateError={mutateError}
      mutating={mutating}
    />
  );
}
