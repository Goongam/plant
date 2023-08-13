import { CATEGORIES } from "@/constants";
import StyleInput from "./ui/StyleInput";
import UnitInput from "./ui/UnitInput";

const FOCUS = "focus:border focus:border-sky-300 outline-none";

export default function NewGroupModal() {
  const submit = () => {};
  return (
    <section className="flex flex-col w-full max-w-sm md:max-w-xl h-[500px] md:h-[700px] overflow-y-scroll bg-white rounded-md p-3">
      <h2 className="font-bold text-2xl p-2">그룹생성</h2>
      <form onSubmit={submit} className="flex flex-col h-full justify-between">
        <div className="flex flex-col [&>*:first-child]:rounded-t-md [&>*]:border-x [&>*]:border-t [&>*:last-child]:rounded-b-md [&>*:last-child]:border-b">
          <StyleInput placeholder="그룹 이름" />
          <textarea
            placeholder="그룹 설명"
            className={`w-full h-52 pl-1 resize-none ${FOCUS}`}
          ></textarea>
          <select className={`p-1 ${FOCUS}`}>
            {CATEGORIES.map((cate) => (
              <option key={cate}>{cate}</option>
            ))}
          </select>
          <div className="pl-1 flex gpa-3">
            <p className="text-gray-400 w-20">종료일</p>
            <input type={`datetime-local`} className={`w-full ${FOCUS}`} />
          </div>
          <UnitInput type="number" placeholder="최대인원" unit="명" />
          <div className="flex gap-3 p-1">
            <p className="text-gray-400">오프라인 미팅</p>
            <input type="checkbox" />
          </div>
          <div className="flex gap-3 p-1 items-center">
            <p className="text-gray-400">그룹 공개</p>
            <select className={`p-1 ${FOCUS}`}>
              <option>공개</option>
              <option>비공개</option>
            </select>
          </div>
        </div>
        <input
          type="submit"
          value="생성"
          className="w-full h-10 bg-green-300 rounded-md mt-auto"
        />
      </form>
    </section>
  );
}
