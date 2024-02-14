import { data } from 'components/CalendarGrid/CalendarGrid';
import {
  Button,
  IconImportStyled,
} from 'components/CalendarHeader/components/Import/Import.styled';
import { useSelector } from 'react-redux';
import { filterColor, filterValue } from 'store/filter/selectors';
import { selectAllTasks } from 'store/tasks/selectors';
import { checkColor, downloadJSON } from 'utils';

export const Import = () => {
  // const tasks = useSelector(selectAllTasks);
  const tasks = data;
  const filterByText = useSelector(filterValue);
  const filterByColor = useSelector(filterColor);

  const weekOrMonth =
    Number(localStorage.getItem('savedWeekOrMonth')?.split(' ')[0]) || new Date().getMonth() + 1;
  const year =
    Number(localStorage.getItem('savedWeekOrMonth')?.split(' ')[1]) || new Date().getFullYear();
  const weekOrMonthType = localStorage.getItem('weekOrMonth') || 'month';
  console.log('import');
  console.log(tasks);
  const objectToDownload = tasks
    .filter((task) => {
      const taskYear = Number(task?.date?.split('.')[0]);
      const taskMonth = Number(task?.date?.split('.')[1]);

      if (weekOrMonthType === 'month') {
        return Number(taskYear) === year && Number(taskMonth) === weekOrMonth;
      } else {
        console.log('week');
        const weekDates: string[] = [];
        const firstDayOfWeek = new Date(year, 0, 1); // Assuming the first day of the year is the starting point

        // Find the first Sunday on or after January 1st
        const firstSunday =
          firstDayOfWeek.getDate() -
          firstDayOfWeek.getDay() +
          (firstDayOfWeek.getDay() === 0 ? 0 : 7);

        firstDayOfWeek.setDate(firstSunday + (weekOrMonth - 1) * 7); // Move to the starting day of the specified week
        for (let i = 0; i < 7; i++) {
          const day = new Date(firstDayOfWeek);

          day.setDate(firstDayOfWeek.getDate() + i);
          weekDates.push(
            day
              .toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' })
              .replace(/-/g, '.')
          );
        }

        // Include dates from the previous year if the week starts before January 1st
        if (firstDayOfWeek.getFullYear() !== year) {
          const lastYearFirstDay = new Date(year - 1, 0, 1); // First day of the previous year
          for (let i = 0; i < 7; i++) {
            const day = new Date(lastYearFirstDay);
            day.setDate(lastYearFirstDay.getDate() + i);
            weekDates.push(
              day
                .toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' })
                .replace(/-/g, '.')
            );
          }
        }
        console.log(weekDates);
        return weekDates.some((weekDate) => weekDate === task?.date);
      }
    })
    .filter(
      (task) =>
        task.title.toLowerCase().includes(filterByText.toLowerCase().trim()) &&
        checkColor(task.label, filterByColor)
    );

  return (
    <Button
      type="button"
      onClick={() => downloadJSON(objectToDownload)}
      title="Save Calendar as JSON"
    >
      <IconImportStyled />
    </Button>
  );
};
