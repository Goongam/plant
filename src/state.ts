import { atom } from "recoil";

export interface IContentTypes {
  postFilterDate?: string;
  postFilterUser?: string;
}

//recoil state 생성
export const postFilterState = atom<IContentTypes>({
  key: "postFilter",
  default: {
    postFilterDate: "",
    postFilterUser: "",
  },
});
