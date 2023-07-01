"use client";

import { useGroup } from "@/hooks/group";
import { Group } from "@/service/group";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useQuery } from "react-query";

interface Props {
  groupId: string;
}
export default function NewPost({ groupId }: Props) {
  const { group, isError, isLoading } = useGroup(groupId);
  const [images, setImages] = useState<FileList | null>(null);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const formdata = new FormData();

    if (!images) return;
    const files = Array.from(images);

    files.forEach((file) => {
      formdata.append("files", file);
    });

    formdata.append("comment", "asd");

    fetch(`/api/post/new`, {
      method: "post",
      body: formdata,
    });
  };
  return (
    <section>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          multiple
          onChange={(e) => {
            setImages(e.target.files);
          }}
        />
        <textarea></textarea>
        <button>작성</button>
      </form>
      <div>{group?.name}</div>
    </section>
  );
}
