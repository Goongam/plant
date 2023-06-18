"use client";

import { AdmissionFees, offlineMeetings, regions } from "@/app/page";
import { useState, useEffect, useCallback } from "react";

const titleStyle = "font-bold text-xl mt-5";

interface Props {
  date: string;
  setDate: (data: string) => void;
  selectFee: string;
  setSelectFee: (data: string) => void;
  selectRegion: string;
  setSelectRegion: (data: string) => void;
  selectOff: string;
  setSelectOff: (data: string) => void;
}
export default function Filter({
  date,
  selectFee,
  selectOff,
  selectRegion,
  setDate,
  setSelectFee,
  setSelectOff,
  setSelectRegion,
}: Props) {
  const clearFilter = useCallback(() => {
    setSelectFee(AdmissionFees[0]);
    setSelectOff(offlineMeetings[0]);
    setSelectRegion(regions[0]);
    setDate("");
  }, [setDate, setSelectFee, setSelectOff, setSelectRegion]);

  useEffect(() => {
    clearFilter();
  }, [clearFilter]);

  return (
    <section className="border-r border-b border-black w-52 flex flex-col gap-3 p-2">
      <div className="flex justify-between">
        <span>필터</span>
        <button onClick={clearFilter}>필터초기화</button>
      </div>

      <h2 className={titleStyle}>일시</h2>
      <div>
        <input
          type="date"
          onChange={(e) => {
            setDate(e.target.value);
          }}
          value={date}
        />
        까지
      </div>

      <h2 className={titleStyle}>참가비용</h2>
      <div>
        <ul>
          {AdmissionFees.map((fee) => {
            return (
              <li key={fee}>
                <label>
                  <input
                    type="radio"
                    name="fee"
                    key={fee}
                    value={fee}
                    checked={fee === selectFee}
                    onChange={(e) => {
                      setSelectFee(e.target.value);
                    }}
                  />
                  <span className="ml-2">{fee}</span>
                </label>
              </li>
            );
          })}
        </ul>
      </div>

      <h2 className={titleStyle}>지역</h2>
      <div>
        <select
          onChange={(e) => {
            setSelectRegion(e.target.value);
          }}
          value={selectRegion}
        >
          {regions.map((r) => (
            <option key={r}>{r}</option>
          ))}
        </select>
      </div>

      <h2 className={titleStyle}>오프라인 미팅 유무</h2>
      <div>
        <ul>
          {offlineMeetings.map((off) => (
            <li key={off}>
              <label>
                <input
                  type="radio"
                  name="offline"
                  key={off}
                  value={off}
                  checked={off === selectOff}
                  onChange={(e) => {
                    setSelectOff(e.target.value);
                  }}
                />
                <span className="ml-2">{off}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
