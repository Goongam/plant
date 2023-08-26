import { AuthOption } from "@/app/api/auth/[...nextauth]/route";
import GroupSetting from "@/components/GroupSetting";
import { Group, getGroup, getLeader } from "@/service/group";
import { getServerSession } from "next-auth";

interface Props {
  params: { slug: string };
}

export default async function GroupSettingPage({ params }: Props) {
  const { slug: groupId } = params;

  const group = await getLeader(groupId);
  const session = await getServerSession(AuthOption);

  if (group?.leader.id !== session?.user.id) {
    return <>그룹장만 이용할 수 있습니다.</>;
  }

  return (
    <>
      <GroupSetting groupId={groupId} />
    </>
  );
}
