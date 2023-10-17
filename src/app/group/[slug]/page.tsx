import GroupDetail from "@/components/GroupDetail";
import InviteError from "@/components/InviteError";
import { getGroup } from "@/service/group";
import { redirect } from "next/navigation";

export async function generateMetadata({ params }: Props) {
  const group = await getGroup(params.slug);
  return {
    title: `${group?.name}`,
  };
}
interface Props {
  params: { slug: string };
}

export default async function GroupPage({ params }: Props) {
  const { slug: groupId } = params;

  const group = await getGroup(groupId);
  if (group?.active === false) {
    return <InviteError url="/" msg="폐쇄된 그룹입니다." />;
  }

  return <GroupDetail groupId={groupId} />;
}
