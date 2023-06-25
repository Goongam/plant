"use client";

import { AdmissionFees, offlineMeetings, regions } from "@/app/page";
import { useState, useEffect, useCallback } from "react";
import DropdownIcon from "./ui/icons/DropdownIcon";
import DropUpIcon from "./ui/icons/DropUpIcon";

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
  const [openFilter, setOpenFilter] = useState(false);
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
    <section
      className={`border-b border-neutral-200 md:border-0 w-full md:w-52 md:ml-5 flex flex-col gap-3 p-2 ${
        openFilter ? "h-fit" : "h-10 overflow-hidden"
      } md:h-fit`}
    >
      <div className="flex justify-between md:hidden">
        <span className="md:hidden">필터</span>
        <button
          className="ml-auto"
          onClick={() => {
            setOpenFilter(!openFilter);
          }}
        >
          {openFilter ? <DropUpIcon /> : <DropdownIcon />}
        </button>
      </div>
      <div>
        <div className="flex content-between">
          <span className="hidden md:block">필터</span>
          <button onClick={clearFilter} className="ml-auto">
            필터초기화
          </button>
        </div>

        <h2 className={titleStyle}>일시</h2>
        <div className="w-full flex gap-2">
          <input
            className="flex-1"
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
            className="w-full"
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
      </div>
    </section>
  );
}
