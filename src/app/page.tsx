"use client";

import Filter from "@/components/Filter";
import GroupList from "@/components/GroupList";
import HomeCategories from "@/components/HomeCategories";
import { useState } from "react";
import { Category } from "../types/Category";

export default function Home() {
  const [select, setSelect] = useState<Category>("전체");

  const [selectFee, setSelectFee] = useState("");
  const [selectOff, setSelectOff] = useState("");
  const [selectRegion, setSelectRegion] = useState("");
  const [date, setDate] = useState("");

  const handleSelect = (select: string) => {
    setSelect(select as Category);
  };
  return (
    <>
      <HomeCategories select={select} handleSelect={handleSelect} />

      <div className="flex flex-col md:flex-row w-full h-full">
        <Filter
          date={date}
          selectFee={selectFee}
          selectOff={selectOff}
          selectRegion={selectRegion}
          setDate={setDate}
          setSelectFee={setSelectFee}
          setSelectOff={setSelectOff}
          setSelectRegion={setSelectRegion}
        />

        <GroupList selectCategory={select} />
      </div>
    </>
  );
}
