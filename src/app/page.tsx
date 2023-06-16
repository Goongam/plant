"use client";

import Filter from "@/components/Filter";
import HomeCategories from "@/components/HomeCategories";
import { useState } from "react";

export const CATEGORIES = ["전체", "운동", "자기계발", "취미", "여행"];
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

  return (
    <main>
      <HomeCategories select={select} handleSelect={setSelect} />
      <div className="flex flex-row w-full h-full">
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

        <section>여기에 방 목록들 나옴</section>
      </div>
    </main>
  );
}
