import NewPost from "@/components/NewPost";

interface Props {
  params: { slug: string };
}

export default function NewPostPage({ params }: Props) {
  const groupId = params.slug;

  return <NewPost groupId={groupId} />;
}
