"use client";

import { CATEGORIES } from "@/app/page";

interface Props {
  select: string;
  handleSelect: (select: string) => void;
}
export default function HomeCategories({ select, handleSelect }: Props) {
  console.log(select);

  return (
    <section className="w-full h-20 bg-neutral-200 sticky top-0 flex justify-center items-center gap-5">
      {CATEGORIES.map((cateogry) => (
        <button
          key={cateogry}
          onClick={(e) => {
            handleSelect(e.currentTarget.value);
          }}
          className={`w-24 h-full text-2xl border-black ${
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
