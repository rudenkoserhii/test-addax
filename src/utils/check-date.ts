export const checkDate = (weekIndex: number, lastWeekIndex: number, day: string) => {
  if (weekIndex === 0 && Number(day) > 7) {
    return false;
  }

  if (weekIndex === lastWeekIndex && Number(day) < 7) {
    return false;
  }

  return true;
};
