import dayjs from "dayjs";

export function dateFormat(date: string | Date) {
  return dayjs(date).format("YYYY-MM-DD");
}

//dayjs(date).format("YYYY-MM-DD hh:mm");
