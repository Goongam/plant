import GroupDetail from "@/components/GroupDetail";
import { getGroup } from "@/service/group";

export async function generateMetadata({ params }: Props) {
  const group = await getGroup(params.slug);
  return {
    title: `${group?.name}`,
  };
}
interface Props {
  params: { slug: string };
}

export default function GroupPage({ params }: Props) {
  const { slug: groupId } = params;

  return <GroupDetail groupId={groupId} />;
}
