import NewPost from "@/components/NewPost";
import { getPost } from "@/service/post";

interface Props {
  params: { slug: string };
}

export default async function EditPostPage({ params }: Props) {
  const { slug: postId } = params;

  const post = await getPost(postId);
  console.log(post);

  return <NewPost type="edit" content={post?.content} imgs={post?.images} />;
}
