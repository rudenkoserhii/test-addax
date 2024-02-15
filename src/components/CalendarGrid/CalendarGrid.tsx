import React, { useEffect, useState } from 'react';
import { checkColor, checkDate, getCurrentDate } from 'utils';
import { colors, days, monthNames } from 'enums';
import {
  Cell,
  CellTitle,
  Table,
  TableHead,
  Wrapper,
} from 'components/CalendarGrid/CalendarGrid.styled';
import { DateCell } from 'components/DateCell/DateCell';
import { nanoid } from 'nanoid';
import { Task } from 'types';
import { useSelector } from 'react-redux';
import { selectAllTasks } from 'store/tasks/selectors';
import { selectAllHolidays } from 'store/holidays/selectors';
import { filterColor, filterValue } from 'store/filter/selectors';

export const CalendarGrid = (): JSX.Element => {
  const allTasks = useSelector(selectAllTasks);

  const [calendarData, setCalendarData] = useState<string[][]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentMonth, setCurrentMonth] = useState<string>(
    monthNames[new Date().getMonth()].slice(0, 3)
  );
  const filterByText = useSelector(filterValue);
  const filterByColor = useSelector(filterColor);

  const holidays = useSelector(selectAllHolidays);

  useEffect(() => {
    setTasks(allTasks);
  }, [allTasks]);

  const handleTaskUpdate = (updatedTasks: Task[]) => {
    if (updatedTasks.length === 1 && !tasks.some(({ id }) => id === updatedTasks[0].id)) {
      setTasks((prevTasks) => [...prevTasks, updatedTasks[0]]);
    } else {
      setTasks((prevTasks) =>
        prevTasks.map((prevTask) => {
          const updatedTask = updatedTasks.find((task) => task.id === prevTask.id);

          return updatedTask || prevTask;
        })
      );
    }
  };

  const savedWeekOrMonth =
    localStorage.getItem('savedWeekOrMonth') ||
    `${new Date().getMonth() + 1} ${new Date().getFullYear()}`;
  const weekOrMonthType = localStorage.getItem('weekOrMonth') || 'month';

  useEffect(() => {
    const [weekOrMonth, year] = savedWeekOrMonth.split(' ');

    renderCalendarGrid(weekOrMonthType, parseInt(weekOrMonth), parseInt(year));
  }, [weekOrMonthType, savedWeekOrMonth]);

  const renderCalendarGrid = (type: string, value: number, year: number) => {
    if (type === 'week') {
      renderWeekView(value, year);
    } else {
      renderMonthView(value, year);
    }
  };

  const renderWeekView = (week: number, year: number) => {
    const firstDayOfYear = new Date(year, 0, 0).getDay();
    const firstDayOfPrevYear = new Date(year - 1, 0, 0).getDay();

    const currentDate =
      week === 1
        ? new Date(year - 1, 0, 7 - firstDayOfPrevYear + 52 * 7)
        : new Date(year, 0, 7 - firstDayOfYear + (week - 2) * 7);

    const weekArray: string[] = [];

    const monthName = currentDate.toLocaleString('default', {
      month: 'short',
    });

    for (let i = 0; i < 7; i++) {
      const formattedDate = currentDate.toLocaleString('default', {
        month: 'short',
        day: 'numeric',
      });

      weekArray.push(formattedDate);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    setCalendarData([weekArray]);
    setCurrentMonth(monthName.slice(0, 3));
  };

  const renderMonthView = (month: number, year: number) => {
    const daysInMonth = new Date(year, month, 0).getDate();
    const firstDayOfMonth = new Date(year, month - 1, 1).getDay();

    const calendarArray: string[][] = [];
    let dayCounter = 1;

    const weeksInMonth = Math.ceil((daysInMonth + firstDayOfMonth) / 7);

    for (let i = 0; i < weeksInMonth; i++) {
      const weekArray: string[] = [];

      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDayOfMonth) {
          const prevMonthDays =
            firstDayOfMonth > 0
              ? new Date(year, month - 1, -firstDayOfMonth + 1 + j).toLocaleString('default', {
                  month: 'short',
                  day: 'numeric',
                })
              : '';

          weekArray.push(prevMonthDays);
        } else if (dayCounter > daysInMonth) {
          const nextMonthDays = new Date(year, month, dayCounter - daysInMonth).toLocaleString(
            'default',
            {
              month: 'short',
              day: 'numeric',
            }
          );

          weekArray.push(nextMonthDays);
          dayCounter++;
        } else {
          const currentMonthDays = new Date(year, month - 1, dayCounter).toLocaleString('default', {
            month: 'short',
            day: 'numeric',
          });

          weekArray.push(currentMonthDays);
          dayCounter++;
        }
      }

      calendarArray.push(weekArray);
    }
    setCalendarData(calendarArray);
    setCurrentMonth(monthNames[month - 1].slice(0, 3));
  };

  return (
    <Wrapper className="calendar-container" id="screenshot">
      <Table>
        <TableHead>
          <tr>
            {days.map((day) => (
              <CellTitle key={nanoid()}>{day}</CellTitle>
            ))}
          </tr>
        </TableHead>
        <tbody>
          {calendarData.map((week, index) => (
            <tr key={index}>
              {week.map((dayAndMonth) => (
                <Cell
                  key={nanoid()}
                  className={
                    checkDate(index, calendarData.length - 1, dayAndMonth.split(' ')[1]) ||
                    weekOrMonthType === 'week'
                      ? ''
                      : 'empty-day'
                  }
                >
                  <DateCell
                    day={dayAndMonth.split(' ')[1]}
                    month={dayAndMonth.split(' ')[0]}
                    currentMonth={currentMonth}
                    tasks={
                      tasks?.filter(
                        (item) =>
                          item.date ===
                            getCurrentDate(
                              Number(savedWeekOrMonth.split(' ')[1]),
                              Number(savedWeekOrMonth.split(' ')[0]),
                              dayAndMonth.split(' ')[1],
                              weekOrMonthType
                            ) &&
                          item.title.toLowerCase().includes(filterByText.toLowerCase().trim()) &&
                          checkColor(item.labels, filterByColor)
                      ) || []
                    }
                    onTaskUpdate={handleTaskUpdate}
                    savedWeekOrMonth={savedWeekOrMonth}
                    weekOrMonthType={weekOrMonthType}
                    holidays={
                      holidays?.filter(
                        (holiday) =>
                          holiday.date.replaceAll('-', '.') ===
                          getCurrentDate(
                            Number(savedWeekOrMonth.split(' ')[1]),
                            Number(savedWeekOrMonth.split(' ')[0]),
                            dayAndMonth.split(' ')[1],
                            weekOrMonthType
                          )
                      ) || []
                    }
                  />
                </Cell>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </Wrapper>
  );
};

export default CalendarGrid;
