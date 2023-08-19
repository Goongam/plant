"use client";

import { AdmissionFees, offlineMeetings, regions } from "@/constants";
import { useState, useEffect, useCallback } from "react";
import DropdownIcon from "./ui/icons/DropdownIcon";
import DropUpIcon from "./ui/icons/DropUpIcon";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { groupFIlterDeFaultValue, groupFilterState } from "@/state";

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
export default function Filter() {
  const [openFilter, setOpenFilter] = useState(false);
  const [render, setRender] = useState(false);
  const regionList = ["전체", ...regions];
  const filterValue = useRecoilValue(groupFilterState);
  const setFilter = useSetRecoilState(groupFilterState);

  const initFilter = useCallback(() => {
    setFilter(groupFIlterDeFaultValue);
  }, [setFilter]);

  useEffect(() => {
    console.log("초기화");
    setRender(true);
  }, []);

  const changeEndDate = (value: string) => {
    setFilter({ ...filterValue, end_time: value });
  };

  const changeCost = (value: string) => {
    setFilter({ ...filterValue, cost: value });
  };

  const changeRegion = (value: string) => {
    setFilter({ ...filterValue, region: value });
  };

  const changeOffline = (value: string) => {
    setFilter({ ...filterValue, isOffline: value });
  };

  return (
    <section
      className={`bg-[#fcf8ff32] border-b border-t border-[#8364B4] md:mt-1 w-full md:w-52 md:ml-5 flex flex-col gap-3 p-2 ${
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
          <button onClick={initFilter} className="ml-auto">
            필터초기화
          </button>
        </div>

        <h2 className={titleStyle}>일시</h2>
        <div className="w-full flex gap-2">
          <input
            className="flex-1"
            type="date"
            onChange={(e) => {
              console.log(typeof e.target.value);

              changeEndDate(e.target.value);
            }}
            value={filterValue.end_time}
          />
          까지
        </div>

        <h2 className={titleStyle}>참가비용</h2>
        <div>
          <ul>
            {AdmissionFees.map((fee) => {
              return (
                <li key={fee}>
                  <label htmlFor={fee} key={fee}>
                    <input
                      id={fee}
                      type="radio"
                      name="fee"
                      key={fee}
                      value={fee}
                      // defaultChecked={fee === "전체"}
                      checked={filterValue.cost === fee}
                      onChange={(e) => {
                        changeCost(e.target.value);
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
              changeRegion(e.target.value);
            }}
            value={filterValue.region}
          >
            {regionList.map((r) => (
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
                    checked={off === filterValue.isOffline}
                    onChange={(e) => {
                      changeOffline(e.target.value);
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
