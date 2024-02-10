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
  } else if (weekOrMonthType === 'week') {
    const firstDayOfWeek = 1 + (weekOrMonth - 1) * 7;
    const date = new Date(year, 0, firstDayOfWeek + Number(day) - 1);

    const month = String(date.getMonth() + 1).padStart(2, '0');
    const dayOfMonth = String(date.getDate()).padStart(2, '0');

    return `${year}.${month}.${dayOfMonth}`;
  }

  return `${year}.${formattedMonth}.${formattedDay}`;
};
