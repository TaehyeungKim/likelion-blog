import dateFormat from "dateformat";

export const formatDate = (date) => {
  return dateFormat(date, "yyyy-mm-dd");
};
