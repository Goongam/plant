import { CATEGORIES, regions } from "@/constants";
import StyleInput from "./ui/StyleInput";
import UnitInput from "./ui/UnitInput";
import { useRef, FormEvent, useState } from "react";
import { Group } from "@/service/group";
import { useRouter } from "next/navigation";
import Loading from "./ui/Loading";
import { timeFormat } from "@/util/dayjs";
import GroupForm from "./GroupForm";
interface Props {
  setOpenModal: (b: boolean) => void;
}
const FOCUS = "focus:border focus:border-sky-300 outline-none";
const CENTER = "flex gap-3 p-1 items-center";
export default function NewGroupModal({ setOpenModal }: Props) {
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

    setLoading(true);

    fetch("/api/group/new", {
      method: "post",
      body: formdata,
    })
      .then((res) => res.json())
      .then((json: Group) => {
        setLoading(false);
        setOpenModal(false);
        router.push(`group/${json._id}`);
      })
      .catch(() => {
        setLoading(false);
      });
  };
  return (
    <section className="w-full max-w-sm md:max-w-xl h-[500px] md:h-[700px]">
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
      />
    </section>
  );
}
