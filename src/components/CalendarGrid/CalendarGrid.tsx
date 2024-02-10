import React, { useEffect, useState } from 'react';
import { checkDate, getCurrentDate } from 'utils';
import { days } from 'enums';
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

export const CalendarGrid = (): JSX.Element => {
  const [calendarData, setCalendarData] = useState<string[][]>([]);
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
    const currentDate = new Date(year, 0, 1 + (week - 1) * 7);
    const weekArray: string[] = [];

    for (let i = 0; i < 7; i++) {
      weekArray.push(currentDate.getDate().toString());
      currentDate.setDate(currentDate.getDate() + 1);
    }

    setCalendarData([weekArray]);
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
              ? new Date(year, month - 1, -firstDayOfMonth + 1 + j).getDate()
              : '';

          weekArray.push(prevMonthDays.toString());
        } else if (dayCounter > daysInMonth) {
          const nextMonthDays = new Date(year, month, dayCounter - daysInMonth).getDate();

          weekArray.push(nextMonthDays.toString());
          dayCounter++;
        } else {
          weekArray.push(`${dayCounter}`);
          dayCounter++;
        }
      }

      calendarArray.push(weekArray);
    }

    setCalendarData(calendarArray);
  };

  const data: Task[] = [
    {
      id: '1',
      date: '2024.02.11',
      title: 'first',
      content: 'first first',
      label: [
        {
          id: '11',
          color: 'red',
          text: 'first label text',
          order: 0,
        },
      ],
      order: 0,
    },
    {
      id: '2',
      date: '2024.02.12',
      title: 'second',
      content: 'second second',
      label: [
        {
          id: '11',
          color: 'green',
          text: 'first label text',
          order: 0,
        },
      ],
      order: 0,
    },
  ];

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
              {week.map((day) => (
                <Cell
                  key={nanoid()}
                  className={
                    checkDate(index, calendarData.length - 1, day) || weekOrMonthType === 'week'
                      ? ''
                      : 'empty-day'
                  }
                >
                  <DateCell
                    day={day}
                    tasks={
                      data?.filter(
                        (item) =>
                          item.date ===
                          getCurrentDate(
                            Number(savedWeekOrMonth.split(' ')[1]),
                            Number(savedWeekOrMonth.split(' ')[0]),
                            day,
                            weekOrMonthType
                          )
                      ) || ''
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
