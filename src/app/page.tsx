"use client";

import Filter from "@/components/Filter";
import GroupList from "@/components/GroupList";
import HomeCategories from "@/components/HomeCategories";
import { useState } from "react";
import { Category } from "../types/Category";

export default function Home() {
  const [select, setSelect] = useState<Category | "전체">("전체");

  const handleSelect = (select: string) => {
    setSelect(select as Category);
  };
  return (
    <>
      <HomeCategories select={select} handleSelect={handleSelect} />

      <div className="flex flex-col md:flex-row w-full h-full">
        <Filter />

        <GroupList selectCategory={select} />
      </div>
    </>
  );
}
