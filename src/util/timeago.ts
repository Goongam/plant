import { format, register } from "timeago.js";
import koLocale from "timeago.js/lib/lang/ko"; //한국어 선택

register("ko", koLocale);

export function getTimeAgo(time: Date) {
  return format(time, "ko");
}
