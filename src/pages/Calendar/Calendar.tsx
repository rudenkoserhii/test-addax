import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { CalendarGrid } from 'components/CalendarGrid/CalendarGrid';
import { getTasks } from 'store/tasks/operations';
import { selectLoading } from 'store/tasks/selectors';
import { AppDispatch } from 'store/store';
import { CalendarHeader } from 'components/CalendarHeader/CalendarHeader';
import { Loading } from 'components/Loading/Loading';
import { WeekOrMonth } from 'types';

export default function Calendar(): JSX.Element {
  const INITIAL_WEEK_OR_MONTH: string = localStorage.getItem('weekOrMonth')
    ? (localStorage.getItem('weekOrMonth') as string)
    : 'month';
  const INITIAL_CURRENT_WEEK_OR_MONTH: WeekOrMonth = {
    weekOrMonth: localStorage.getItem('savedWeekOrMonth')
      ? Number(localStorage.getItem('savedWeekOrMonth')?.split(' ')[0])
      : new Date().getMonth() + 1,
    year: localStorage.getItem('savedWeekOrMonth')
      ? Number(localStorage.getItem('savedWeekOrMonth')?.split(' ')[1])
      : new Date().getFullYear(),
  };
  const [currentWeekOrMonth, setCurrentWeekOrMonth] = useState<WeekOrMonth>(
    INITIAL_CURRENT_WEEK_OR_MONTH
  );
  const [weekOrMonth, setWeekOrMonth] = useState<string>(INITIAL_WEEK_OR_MONTH);

  const dispatch: AppDispatch = useDispatch();
  const isLoading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(
      getTasks({
        ...currentWeekOrMonth,
        weekOrMonthName: localStorage.getItem('weekOrMonth') || 'month',
      })
    );
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem(
      'savedWeekOrMonth',
      `${currentWeekOrMonth.weekOrMonth} ${currentWeekOrMonth.year}`
    );
    localStorage.setItem('weekOrMonth', `${weekOrMonth.toLowerCase()}`);
  }, [currentWeekOrMonth, weekOrMonth]);

  function setPrevItem() {
    if (localStorage.getItem('weekOrMonth') === 'month') {
      if (currentWeekOrMonth.weekOrMonth === 1) {
        setCurrentWeekOrMonth((prev) => ({ year: prev.year - 1, weekOrMonth: 12 }));

        return;
      } else {
        setCurrentWeekOrMonth((prev) => ({ year: prev.year, weekOrMonth: prev.weekOrMonth - 1 }));
      }
    } else if (localStorage.getItem('weekOrMonth') === 'week') {
      if (currentWeekOrMonth.weekOrMonth === 1) {
        setCurrentWeekOrMonth((prev) => ({ year: prev.year - 1, weekOrMonth: 53 }));

        return;
      } else {
        setCurrentWeekOrMonth((prev) => ({ year: prev.year, weekOrMonth: prev.weekOrMonth - 1 }));
      }
    }
  }

  function setNextItem() {
    if (localStorage.getItem('weekOrMonth') === 'month') {
      if (currentWeekOrMonth.weekOrMonth === 12) {
        setCurrentWeekOrMonth((prev) => ({ year: prev.year + 1, weekOrMonth: 1 }));

        return;
      } else {
        setCurrentWeekOrMonth((prev) => ({ year: prev.year, weekOrMonth: prev.weekOrMonth + 1 }));
      }
    } else if (localStorage.getItem('weekOrMonth') === 'week') {
      if (currentWeekOrMonth.weekOrMonth === 53) {
        setCurrentWeekOrMonth((prev) => ({ year: prev.year + 1, weekOrMonth: 1 }));

        return;
      } else {
        setCurrentWeekOrMonth((prev) => ({ year: prev.year, weekOrMonth: prev.weekOrMonth + 1 }));
      }
    }
  }

  useEffect(() => {
    if (weekOrMonth.toLowerCase() === 'month') {
      const monthForWeek = calculateMonthForWeek(
        currentWeekOrMonth.year,
        currentWeekOrMonth.weekOrMonth
      );

      setCurrentWeekOrMonth({ ...currentWeekOrMonth, weekOrMonth: monthForWeek });
    } else {
      const firstWeekOfMonth = calculateWeekOfYear(
        currentWeekOrMonth.year,
        currentWeekOrMonth.weekOrMonth
      );

      setCurrentWeekOrMonth({ ...currentWeekOrMonth, weekOrMonth: firstWeekOfMonth });
    }
  }, [weekOrMonth]);

  const calculateMonthForWeek = (year: number, week: number): number => {
    const firstDayOfYear = new Date(year, 0, 1);
    const daysInWeek = 7;
    const daysFromStartOfYear = (week - 1) * daysInWeek;

    const targetDate = new Date(firstDayOfYear);

    targetDate.setDate(firstDayOfYear.getDate() + daysFromStartOfYear);

    const currentMonth = targetDate.getMonth();
    const nextWeekDate = new Date(targetDate);

    nextWeekDate.setDate(targetDate.getDate() + daysInWeek);

    const currentMonthDays = new Date(year, currentMonth + 1, 0).getDate();
    const nextWeekCurrentMonthDays = new Date(year, nextWeekDate.getMonth() + 1, 0).getDate();

    const isMajorityInCurrentMonth =
      nextWeekDate.getDate() - currentMonthDays < nextWeekCurrentMonthDays;

    return isMajorityInCurrentMonth ? currentMonth + 1 : nextWeekDate.getMonth() + 1;
  };

  const calculateWeekOfYear = (year: number, month: number): number => {
    const firstDayOfYear = new Date(year, 0, 1);
    const firstDayOfMonth = new Date(year, month - 1, 1);
    const msInWeek = 7 * 24 * 60 * 60 * 1000;

    const weeks = Math.ceil(
      (firstDayOfMonth.getTime() -
        firstDayOfYear.getTime() +
        firstDayOfYear.getDay() * 24 * 60 * 60 * 1000) /
        msInWeek
    );

    return month !== 1 ? weeks + 1 : weeks === 0 ? weeks + 1 : weeks;
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Your Calendar</title>
      </Helmet>
      <CalendarHeader
        currentWeekOrMonth={currentWeekOrMonth}
        setCurrentWeekOrMonth={setCurrentWeekOrMonth}
        weekOrMonth={weekOrMonth}
        setWeekOrMonth={(value) => setWeekOrMonth(value)}
        setPrevItem={setPrevItem}
        setNextItem={setNextItem}
      />
      <CalendarGrid />
      <Loading isVisible={isLoading} />
    </HelmetProvider>
  );
}
