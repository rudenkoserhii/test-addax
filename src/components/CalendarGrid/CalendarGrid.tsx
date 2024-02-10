// CalendarGrid.tsx

import React, { useEffect, useState } from 'react';
import './CalendarGrid.css';
import { checkDate } from 'utils';
import { days } from 'enums';

export const CalendarGrid: React.FC = () => {
  const [calendarData, setCalendarData] = useState<string[][]>([]);
  const savedWeekOrMonth = localStorage.getItem('savedWeekOrMonth') || '1 2024'; // Default to January 2024 if not present
  const weekOrMonthType = localStorage.getItem('weekOrMonth') || 'month'; // Default to 'month' if not present

  useEffect(() => {
    // Get saved week or month data from local storage
    const [weekOrMonth, year] = savedWeekOrMonth.split(' ');

    // Get week or month from local storage

    // Render the calendar grid
    renderCalendarGrid(weekOrMonthType, parseInt(weekOrMonth), parseInt(year));

    // Listen for changes in local storage and update the grid accordingly
    window.addEventListener('storage', () => {
      const updatedWeekOrMonth = localStorage.getItem('savedWeekOrMonth');
      const updatedWeekOrMonthType = localStorage.getItem('weekOrMonth');

      if (updatedWeekOrMonth && updatedWeekOrMonthType) {
        const [updatedType, updatedYear] = updatedWeekOrMonth.split(' ');

        renderCalendarGrid(updatedWeekOrMonthType, parseInt(updatedType), parseInt(updatedYear));
      }
    });
  }, [weekOrMonthType, savedWeekOrMonth]); // Empty dependency array ensures that this effect runs only once, similar to componentDidMount

  const renderCalendarGrid = (type: string, value: number, year: number) => {
    if (type === 'week') {
      renderWeekView(value, year);
    } else {
      renderMonthView(value, year);
    }
  };

  const renderWeekView = (week: number, year: number) => {
    // Render only one line with the days of the selected week
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

    // Calculate the number of weeks needed
    const weeksInMonth = Math.ceil((daysInMonth + firstDayOfMonth) / 7);

    for (let i = 0; i < weeksInMonth; i++) {
      const weekArray: string[] = [];

      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDayOfMonth) {
          // Show days with date of the previous month
          const prevMonthDays =
            firstDayOfMonth > 0
              ? new Date(year, month - 1, -firstDayOfMonth + 1 + j).getDate()
              : '';

          weekArray.push(prevMonthDays.toString());
        } else if (dayCounter > daysInMonth) {
          // Show days with date of the next month with reduced opacity
          const nextMonthDays = new Date(year, month, dayCounter - daysInMonth).getDate();

          weekArray.push(nextMonthDays.toString());
          dayCounter++;
        } else {
          // Show days of the current month
          weekArray.push(`${dayCounter}`);
          dayCounter++;
        }
      }

      calendarArray.push(weekArray);
    }

    setCalendarData(calendarArray);
  };

  return (
    <div className="calendar-container">
      <table>
        <thead>
          <tr>
            {days.map((day) => (
              <th>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {calendarData.map((week, index) => (
            <tr key={index}>
              {week.map((day, dayIndex) => (
                <td
                  key={dayIndex}
                  className={
                    checkDate(index, calendarData.length - 1, day) || weekOrMonthType === 'week'
                      ? ''
                      : 'empty-day'
                  }
                >
                  {day}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CalendarGrid;
