import { useGroup } from "@/hooks/group";

interface Props {
  groupId: string;
}
export default function GroupCommonSetting({ groupId }: Props) {
  const { group, isError, isLoading } = useGroup(groupId);

  return <>{group?._id}</>;
}
