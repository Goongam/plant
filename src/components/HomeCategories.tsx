"use client";

import { Category } from "@/types/Category";

// import { Category } from "@/app/Category";

const CATEGORIES: Category[] = ["전체", "여행", "운동", "자기계발", "취미"];
interface Props {
  select: string;
  handleSelect: (select: string) => void;
}
export default function HomeCategories({ select, handleSelect }: Props) {
  return (
    <section
      className="w-full h-20 bg-neutral-200 sticky top-16 flex justify-center items-center gap-5"
      style={{ scrollbarGutter: "stable" }}
    >
      {CATEGORIES.map((cateogry) => (
        <button
          key={cateogry}
          onClick={(e) => {
            handleSelect(e.currentTarget.value);
          }}
          className={`w-24 h-full text-xl md:text-2xl border-black ${
            cateogry === select && "border-b"
          }`}
          value={cateogry}
        >
          {cateogry}
        </button>
      ))}
    </section>
  );
}
