"use client";

import { CATEGORIES } from "@/constants";
import { Category } from "@/types/Category";

// import { Category } from "@/app/Category";

interface Props {
  select: string;
  handleSelect: (select: string) => void;
}
export default function HomeCategories({ select, handleSelect }: Props) {
  return (
    <section
      className="w-full h-20 bg-[#BA97EC] sticky top-16 flex justify-center items-center gap-5"
      style={{ scrollbarGutter: "stable" }}
    >
      {["전체", ...CATEGORIES].map((cateogry) => (
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
