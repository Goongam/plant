import GroupDetail from "@/components/GroupDetail";
import { useQuery } from "react-query";

interface Props {
  params: { slug: string };
}

export default function GroupPage({ params }: Props) {
  const { slug: groupId } = params;

  return <GroupDetail groupId={groupId} />;
}
