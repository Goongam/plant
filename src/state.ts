import { atom } from "recoil";

export type postFilterDate = string;
export interface postFilterUser {
  id: string;
  name: string;
}
export interface IContentTypes {
  postFilterDate?: postFilterDate;
  postFilterUser?: postFilterUser;
}

//recoil state 생성
export const postFilterState = atom<IContentTypes>({
  key: "postFilter",
  default: {
    postFilterDate: undefined,
    postFilterUser: undefined,
  },
});

export interface GroupFilter {
  end_time?: string;
  cost?: string;
  region?: string;
  isOffline?: string;
}

export const groupFIlterDeFaultValue = {
  end_time: "",
  cost: "전체",
  region: "전체",
  isOffline: "전체",
};

export const groupFilterState = atom<GroupFilter>({
  key: "groupFilter",
  default: groupFIlterDeFaultValue,
});
