import dayjs from "dayjs";

export function formatDate(iso: string | null | undefined) {
  if (!iso) return "-";
  return dayjs(iso).format("YYYY.MM.DD");
}
