"use client";

import { CATEGORIES, Category } from "@/app/page";

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
