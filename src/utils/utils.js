export const persianDigits = (num) => {
  const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  if (num === undefined) {
    return "";
  }
  return num.toString().replace(/[0-9]/g, (d) => persianNumbers[d]);
};

export const englishDigits = (num) => {
  const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  let englishNumber = "";

  try {
    for (let i = 0; i < num.length; i++) {
      const index = persianNumbers.indexOf(num[i]);

      if (index !== -1) {
        englishNumber += index;
      } else {
        englishNumber += num[i];
      }
    }
  } catch (err) {}

  return englishNumber;
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

export const persianMonthToNumber = (month) => {
  switch (month) {
    case "فروردین":
      return 1;
    case "اردیبهشت":
      return 2;
    case "خرداد":
      return 3;
    case "تیر":
      return 4;
    case "مرداد":
      return 5;
    case "شهریور":
      return 6;
    case "مهر":
      return 7;
    case "آبان":
      return 8;
    case "آذر":
      return 9;
    case "دی":
      return 10;
    case "بهمن":
      return 11;
    case "اسفند":
      return 12;
    default:
      return 0;
  }
};

export const isStringOnlyNumbers = (str) => {
  var pattern = /^[0-9]+$/;
  return pattern.test(str);
};

export const getRandomColor = () => {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  const color = `rgb(${red}, ${green}, ${blue})`;

  return color;
};
