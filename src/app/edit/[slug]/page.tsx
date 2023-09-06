import EditPost from "@/components/EditPost";
import PostForm from "@/components/PostForm";
import { getPost } from "@/service/post";

interface Props {
  params: { slug: string };
}

export const dynamic = "force-dynamic";
export default async function EditPostPage({ params }: Props) {
  const { slug: postId } = params;

  const post = await getPost(postId);

  return (
    <EditPost postId={post?._id} content={post?.content} imgs={post?.images} />
  );
}
