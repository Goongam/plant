import dayjs, { Dayjs } from "dayjs";

export function dateFormat(date: string | Date) {
  return dayjs(date).format("YYYY-MM-DD");
}

export function day_now() {
  return dayjs().format("YYYY-MM-DD HH:mm:ss");
}

export function timeFormat(date: string | Date | Dayjs) {
  return dayjs(date).format("YYYY-MM-DD HH:mm:ss");
}
