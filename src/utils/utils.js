export const persianDigits = (num) => {
  const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  if (num === undefined) {
    return "";
  }
  return num.toString().replace(/[0-9]/g, (d) => persianNumbers[d]);
};

export const persianMonth = (num) => {
  switch (num) {
    case 1:
      return "فروردین";
    case 2:
      return "اردیبهشت";
    case 3:
      return "خرداد";
    case 4:
      return "تیر";
    case 5:
      return "مرداد";
    case 6:
      return "شهریور";
    case 7:
      return "مهر";
    case 8:
      return "آبان";
    case 9:
      return "آذر";
    case 10:
      return "دی";
    case 11:
      return "بهمن";
    case 12:
      return "اسفند";
    default:
      return "";
  }
};

export const isStringOnlyNumbers = (str) => {
  var pattern = /^[0-9]+$/;
  return pattern.test(str);
};
