export function formatDateToCustomString(data) {
  const monthsInEnglish = [
    "JANUARY",
    "FEBRUARY",
    "MARCH",
    "APRIL",
    "MAY",
    "JUNE",
    "JULY",
    "AUGUST",
    "SEPTEMBER",
    "OCTOBER",
    "NOVEMBER",
    "DECEMBER",
  ];
  const date = new Date(data || new Date());
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  const monthInEnglish = monthsInEnglish[monthIndex];

  return `${day} ${monthInEnglish} ${year}`;
}

export function calculateDateDifference(givenDate) {
  const currentDate = new Date();
  const givenDateObj = new Date(givenDate || new Date());

  const differenceInMilliseconds = givenDateObj - currentDate;
  const differenceInSeconds = differenceInMilliseconds / 1000;
  const differenceInMinutes = differenceInSeconds / 60;
  const differenceInHours = differenceInMinutes / 60;
  const differenceInDays = differenceInHours / 24;

  return Math.abs(Math.floor(differenceInDays));
}

export function formatDateToDDMMYYYY(str_date) {
  const date = new Date(str_date);
  const day = String(date.getDate()).padStart(2, "0"); // Get day with leading zero
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Get month with leading zero (January is 0)
  const year = date.getFullYear(); // Get full year

  return `${day}/${month}/${year}`;
}

export function formatDateToDDMMYYYYDot(str_date) {
  const date = new Date(str_date);
  const day = String(date.getDate()).padStart(2, "0"); // Get day with leading zero
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Get month with leading zero (January is 0)
  const year = date.getFullYear(); // Get full year

  return `${day}.${month}.${year}`;
}

export const Year = (strdate) => {
  return new Date(strdate).getFullYear();
};

export const CompareDatesInDays = (date1, date2) => {};

export function dateDiffInDays(date1, date2) {
  const oneDay = 24 * 60 * 60 * 1000; // One day in milliseconds
  let real_date1 = new Date(date1);
  let real_date2 = new Date(date2);

  const timeDiff = Math.abs(real_date1 - real_date2);

  const diffDays = Math.round(timeDiff / oneDay);

  return diffDays;
}

export function calculateDateDifferenceInHoures(givenDate) {
  const currentDate = new Date();
  const givenDateObj = new Date(givenDate || new Date());

  const differenceInMilliseconds = currentDate - givenDateObj;
  const differenceInSeconds = differenceInMilliseconds / 1000;
  const differenceInMinutes = differenceInSeconds / 60;
  const differenceInHours = differenceInMinutes / 60;
  const differenceInDays = differenceInHours / 24;

  return Math.floor(differenceInHours);
}

export const IsLessThan24H = (date) => {
  return calculateDateDifferenceInHoures(date) <= 24;
};

export const IsLessThanWeek = (date) => {
  return calculateDateDifferenceInHoures(date) <= 24 * 7;
};

export const IsLessThanMonth = (date) => {
  return calculateDateDifferenceInHoures(date) <= 24 * 30;
};

export const DateCompareByText = (date, text) => {
  switch (text) {
    case "Anytime":
      return true;

    case "Past 24 hours":
      return IsLessThan24H(date);

    case "Past week":
      return IsLessThanWeek(date);

    case "Past month":
      return IsLessThanMonth(date);

    default:
      return true;
  }
};
