import NewPost from "@/components/NewPost";
import PostForm from "@/components/PostForm";
import { getGroup } from "@/service/group";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props) {
  const group = await getGroup(params.slug);
  return {
    title: `${group?.name} 새 글 작성`,
  };
}

export default function NewPostPage({ params }: Props) {
  const groupId = params.slug;

  return <NewPost groupId={groupId} />;
}
