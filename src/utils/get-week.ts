export function getWeek(date: Date): number {
  return Math.ceil(
    (Number(new Date(date.getFullYear(), date.getMonth(), date.getDate())) -
      Number(new Date(date.getFullYear(), 0, 1)) +
      1) /
      86400000 /
      7
  );
}
