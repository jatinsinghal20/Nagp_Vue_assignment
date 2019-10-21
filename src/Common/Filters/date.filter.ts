import { default as format } from "date-fns/format";

export default (date: string | number | Date) => {
  return format(new Date(date), "MMMM D, YYYY");
};
