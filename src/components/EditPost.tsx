"use client";

import { useMutation } from "react-query";
import { useState } from "react";
import PostForm from "./PostForm";
import { useRouter } from "next/navigation";

interface Props {
  postId?: string;
  content?: string;
  imgs?: string[];
}

export default function EditPost({ postId, content, imgs }: Props) {
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
      fetch(`/api/post/edit`, {
        method: "post",
        body: formdata,
      }).then((res) => res.json()),
    {
      onSuccess() {
        setIsSuccess(true);
        router.back();
        // else router.push("/");
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

    if (!postId) return;
    formdata.append("postId", postId);

    mutate(formdata);
  };

  return (
    <PostForm
      type="edit"
      content={content}
      imgs={imgs}
      onSubmit={submit}
      isSuccess={isSuccess}
      mutateError={mutateError}
      mutating={mutating}
    />
  );
}
