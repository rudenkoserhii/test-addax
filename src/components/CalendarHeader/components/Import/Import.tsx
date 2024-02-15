import {
  Button,
  IconImportStyled,
} from 'components/CalendarHeader/components/Import/Import.styled';
import { useSelector } from 'react-redux';
import { filterColor, filterValue } from 'store/filter/selectors';
import { selectAllTasks } from 'store/tasks/selectors';
import { checkColor, downloadJSON } from 'utils';

export const Import = () => {
  const tasks = useSelector(selectAllTasks);
  const filterByText = useSelector(filterValue);
  const filterByColor = useSelector(filterColor);

  const weekOrMonth =
    Number(localStorage.getItem('savedWeekOrMonth')?.split(' ')[0]) || new Date().getMonth() + 1;
  const year =
    Number(localStorage.getItem('savedWeekOrMonth')?.split(' ')[1]) || new Date().getFullYear();
  const weekOrMonthType = localStorage.getItem('weekOrMonth') || 'month';

  const objectToDownload = tasks
    .filter((task) => {
      const taskYear = Number(task?.date?.split('.')[0]);
      const taskMonth = Number(task?.date?.split('.')[1]);

      if (weekOrMonthType === 'month') {
        return Number(taskYear) === year && Number(taskMonth) === weekOrMonth;
      } else {
        const weekDates: string[] = [];
        const firstDayOfWeek = new Date(year, 0, 1);

        const firstSunday =
          firstDayOfWeek.getDate() -
          firstDayOfWeek.getDay() +
          (firstDayOfWeek.getDay() === 0 ? 0 : 7);

        firstDayOfWeek.setDate(firstSunday + (weekOrMonth - 2) * 7);
        for (let i = 0; i < 7; i++) {
          const day = new Date(firstDayOfWeek);

          day.setDate(firstDayOfWeek.getDate() + i);
          weekDates.push(
            day
              .toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' })
              .replace(/-/g, '.')
          );
        }

        for (let yearOffset of [-1, 0, 1]) {
          const yearFirstDay = new Date(year + yearOffset, 0, 1);

          for (let i = 0; i < 7; i++) {
            const day = new Date(yearFirstDay);

            day.setDate(yearFirstDay.getDate() + i);
            weekDates.push(
              day
                .toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' })
                .replace(/-/g, '.')
            );
          }
        }

        return weekDates.some((weekDate) => weekDate === task?.date);
      }
    })
    .filter(
      (task) =>
        task.title.toLowerCase().includes(filterByText.toLowerCase().trim()) &&
        checkColor(task.labels, filterByColor)
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
