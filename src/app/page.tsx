"use client";

import Filter from "@/components/Filter";
import GroupList from "@/components/GroupList";
import HomeCategories from "@/components/HomeCategories";
import { useState } from "react";

export type Category = "전체" | "운동" | "자기계발" | "취미" | "여행";
export const CATEGORIES: Category[] = [
  "전체",
  "운동",
  "자기계발",
  "취미",
  "여행",
];
export const AdmissionFees = ["전체", "무료", "유료"];
export const regions = [
  "전체",
  "서울",
  "경기/인천",
  "부산",
  "울산",
  "경남",
  "대구",
  "경북",
  "충청",
  "대전",
  "세종",
  "전라",
  "광주",
  "강원도",
  "제주도",
  "기타",
];
export const offlineMeetings = ["전체", "유", "무"];

export default function Home() {
  const [select, setSelect] = useState(CATEGORIES[0]);

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
