import NewPost from "@/components/NewPost";
import { Group } from "@/service/group";
import { useQuery } from "react-query";

interface Props {
  params: { slug: string };
}

export default function NewPostPage({ params }: Props) {
  const groupId = params.slug;

  return <NewPost groupId={groupId} />;
}
