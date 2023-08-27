import { useInfinityPosts, usePostsByGroup } from "@/hooks/post";

interface Props {
  groupId: string;
}

export default function GroupPostSetting({ groupId }: Props) {
  const { data } = useInfinityPosts(groupId);

  return <>포스트 설정 창</>;
}
