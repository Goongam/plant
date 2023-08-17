import { CATEGORIES, regions } from "@/constants";
import StyleInput from "./ui/StyleInput";
import UnitInput from "./ui/UnitInput";
import { useRef, FormEvent, useState } from "react";
import { Group } from "@/service/group";
import { useRouter } from "next/navigation";
import Loading from "./ui/Loading";
import { timeFormat } from "@/util/dayjs";
interface Props {
  setOpenModal: (b: boolean) => void;
}
const FOCUS = "focus:border focus:border-sky-300 outline-none";
const CENTER = "flex gap-3 p-1 items-center";
export default function NewGroupModal({ setOpenModal }: Props) {
  const [loading, setLoading] = useState(false);

  const [endTimeError, setEndTimeError] = useState(false);
  const [maxUserError, setMaxUserError] = useState(false);
  const [costError, setCostError] = useState(false);

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

    setEndTimeError(false);
    setMaxUserError(false);
    setCostError(false);

    //조건
    const after1hour = timeFormat(new Date(Date.now() + 60 * 60 * 1000));
    const endDate = endTimeRef.current && timeFormat(endTimeRef.current.value);
    if (endDate && endDate < after1hour) {
      setEndTimeError(true);
      return console.log("1시간 이후보다 나중이여야 합니다");
    }

    if (maxUserRef.current && +maxUserRef.current?.value <= 0) {
      setMaxUserError(true);
      return console.log("최소 1명 이상이여야 합니다");
    }

    if (maxUserRef.current && 100 < +maxUserRef.current?.value) {
      setMaxUserError(true);
      return console.log("최대 100명까지 가능합니다");
    }

    if (
      costRef.current &&
      (+costRef.current?.value % 500 !== 0 || +costRef.current?.value <= 0)
    ) {
      setCostError(true);
      return console.log("참가비는 500원 단위로 가능합니다");
    }

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
    <section className="flex flex-col w-full max-w-sm md:max-w-xl h-[500px] md:h-[700px] overflow-y-scroll bg-white rounded-md p-3">
      <h2 className="font-bold text-2xl p-2">그룹생성</h2>
      <form onSubmit={submit} className="flex flex-col h-full justify-between">
        <div className="flex flex-col [&>*:first-child]:rounded-t-md [&>*]:border-x [&>*]:border-t [&>*:last-child]:rounded-b-md [&>*:last-child]:border-b">
          <StyleInput placeholder="그룹 이름" required ref={titleRef} />
          <textarea
            placeholder="그룹 설명"
            className={`w-full h-52 pl-1 resize-none ${FOCUS}`}
            required
            ref={descriptionRef}
          ></textarea>
          <select className={`p-1 ${FOCUS}`} required ref={categoryRef}>
            {CATEGORIES.map((cate) => (
              <option key={cate}>{cate}</option>
            ))}
          </select>
          <div
            className={`p-1 flex gap-3 ${
              endTimeError && "border border-red-300"
            }`}
          >
            <p className="text-gray-400 w-28">종료일</p>
            <input
              type={`datetime-local`}
              className={`w-full ${FOCUS}`}
              required
              ref={endTimeRef}
            />
          </div>
          <UnitInput
            type="number"
            unit="명"
            initValue="0"
            text="최대인원"
            required
            ref={maxUserRef}
            style={`${maxUserError && "border border-red-300"}`}
          />
          <div className={`${CENTER}`}>
            <p className="text-gray-400 w-28">오프라인 미팅</p>
            <input type="checkbox" ref={offLineRef} />
          </div>
          <div className={`${CENTER}`}>
            <p className="text-gray-400 w-28">지역</p>
            <select className={`p-1 ${FOCUS}`} ref={regionRef}>
              {regions.map((reg) => (
                <option key={reg}>{reg}</option>
              ))}
            </select>
          </div>

          <div className={`${CENTER}`}>
            <p className="text-gray-400 w-28">그룹 공개</p>
            <select className={`p-1 ${FOCUS}`} ref={openRef}>
              <option>공개</option>
              <option>비공개</option>
            </select>
          </div>
          <UnitInput
            type="number"
            unit="원"
            initValue="0"
            text="참가비"
            required
            ref={costRef}
            style={`${costError && "border border-red-300"}`}
          />
        </div>

        <button className="w-full h-10 bg-green-300 rounded-md cursor-pointer p-1 mt-2">
          {loading ? (
            <Loading type="Pulse" size={10} color="white" customStyle="h-10" />
          ) : (
            "생성"
          )}
        </button>
      </form>
    </section>
  );
}
