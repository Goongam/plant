"use client";

import HomeCategories from "@/components/HomeCategories";
import { useState } from "react";

export const CATEGORIES = ["전체", "운동", "자기계발", "취미", "여행"];

export default function Home() {
  const [select, setSelect] = useState(CATEGORIES[0]);
  console.log(select);

  return (
    <main>
      <HomeCategories select={select} handleSelect={setSelect} />
    </main>
  );
}
