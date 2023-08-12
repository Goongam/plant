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
