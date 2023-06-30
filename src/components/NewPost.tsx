"use client";

import { useGroup } from "@/hooks/group";
import { Group } from "@/service/group";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useQuery } from "react-query";

interface Props {
  groupId: string;
}
export default function NewPost({ groupId }: Props) {
  const { group, isError, isLoading } = useGroup(groupId);

  return (
    <section>
      <form>
        <input type="file" multiple />
        <textarea></textarea>
        <button>작성</button>
      </form>
      <div>{group?.name}</div>
    </section>
  );
}
