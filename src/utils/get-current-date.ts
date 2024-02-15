export const getCurrentDate = (
  year: number,
  weekOrMonth: number,
  day: string,
  weekOrMonthType: string
): string => {
  const formattedMonth = String(weekOrMonth).padStart(2, '0');
  const formattedDay = String(day).padStart(2, '0');

  if (weekOrMonthType === 'month') {
    return `${year}.${formattedMonth}.${formattedDay}`;
  }

  const firstDayOfYear = new Date(year, 0, 0).getDay();
  const firstDayOfPrevYear = new Date(year - 1, 0, 0).getDay();

  const date =
    weekOrMonth === 1
      ? new Date(year - 1, 1, 7 - firstDayOfPrevYear + 52 * 7)
      : new Date(year, 0, 7 - firstDayOfYear + (weekOrMonth - 2) * 7);

  const month = String(date.getMonth() + 1).padStart(2, '0');

  return `${year}.${month}.${formattedDay}`;
};
