import { useGroup } from "@/hooks/group";
import NewGroupModal from "../NewGroupModal";
import GroupForm from "../GroupForm";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Group } from "@/service/group";
import { useRouter } from "next/navigation";
import Loading from "../ui/Loading";

interface Props {
  groupId: string;
}
export default function GroupCommonSetting({ groupId }: Props) {
  const { group, isError, isLoading } = useGroup(groupId);

  const [loading, setLoading] = useState(false);

  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const categoryRef = useRef<HTMLSelectElement>(null);
  const endTimeRef = useRef<HTMLInputElement>(null);
  const maxUserRef = useRef<HTMLInputElement>(null);
  const offLineRef = useRef<HTMLInputElement>(null);
  const regionRef = useRef<HTMLSelectElement>(null);
  const openRef = useRef<HTMLSelectElement>(null);
  const costRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (loading) return;
    const formdata = new FormData();

    titleRef.current && formdata.append("name", titleRef.current.value);
    descriptionRef.current &&
      formdata.append("description", descriptionRef.current.value);
    categoryRef.current &&
      formdata.append("category", categoryRef.current.value);
    endTimeRef.current && formdata.append("end_date", endTimeRef.current.value);
    maxUserRef.current && formdata.append("max_user", maxUserRef.current.value);
    offLineRef.current &&
      formdata.append("isOffline", offLineRef.current.value);
    regionRef.current && formdata.append("region", regionRef.current.value);
    openRef.current && formdata.append("isSecret", openRef.current.value);
    costRef.current && formdata.append("cost", costRef.current.value);

    formdata.append("groupId", groupId);
    setLoading(true);

    // fetch("/api/group/new", {
    //   method: "post",
    //   body: formdata,
    // })
    //   .then((res) => res.json())
    //   .then((json: Group) => {
    //     setLoading(false);
    //     router.push(`group/${json._id}`);
    //   })
    //   .catch(() => {
    //     setLoading(false);
    //   });

    fetch("/api/group/setting/common", {
      method: "PATCH",
      body: formdata,
    })
      .then((res) => res.json())
      .then((json: Group) => {
        setLoading(false);
        alert("수정되었습니다.");
        // router.push(`group/${json._id}`);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (!group) return;

    if (titleRef.current) titleRef.current.value = group.name;
    if (descriptionRef.current)
      descriptionRef.current.value = group.description;
    if (categoryRef.current) categoryRef.current.value = group.category;
    if (endTimeRef.current) endTimeRef.current.value = group.end_date;
    if (maxUserRef.current) maxUserRef.current.value = group.max_user + "";
    if (offLineRef.current) offLineRef.current.checked = group.isOffline;
    if (regionRef.current) regionRef.current.value = group.region + "";
    if (openRef.current)
      openRef.current.value = group.isSecret ? "비공개" : "공개";
    if (costRef.current) costRef.current.value = group.cost + "";
  }, [group]);

  if (!group) return <Loading size={20} />;
  return (
    <>
      <GroupForm
        categoryRef={categoryRef}
        costRef={costRef}
        descriptionRef={descriptionRef}
        endTimeRef={endTimeRef}
        maxUserRef={maxUserRef}
        offLineRef={offLineRef}
        onSubmit={submit}
        openRef={openRef}
        regionRef={regionRef}
        titleRef={titleRef}
        loading={loading}
        title="그룹 수정"
        btn="수정"
      />
    </>
  );
}
