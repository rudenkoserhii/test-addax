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
import { getHolidays } from 'store/holidays/operations';
import { useAuth } from 'hooks';
import axios from 'axios';
import Notiflix from 'notiflix';

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
  const { user } = useAuth();
  const { country } = user;

  useEffect(() => {
    if (!localStorage.getItem('weekOrMonth')) {
      localStorage.setItem('weekOrMonth', 'month');
    }
    if (!localStorage.getItem('savedWeekOrMonth')) {
      localStorage.setItem(
        'savedWeekOrMonth',
        `${new Date().getMonth() + 1} ${new Date().getFullYear()}`
      );
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        axios.defaults.baseURL = process.env.REACT_APP_BACKEND_HOST;
        const response = await dispatch(getTasks());

        if (response.meta.requestStatus === 'rejected') {
          Notiflix.Notify.failure(`Something went wrong - ${response.payload}!`);

          return;
        }

        if (country) {
          const responseHolidays = await dispatch(
            getHolidays({
              year:
                localStorage.getItem('savedWeekOrMonth')?.split(' ')[1] ||
                String(new Date().getFullYear()),
              countryCode: country,
            })
          );

          if (responseHolidays.meta.requestStatus === 'rejected') {
            Notiflix.Notify.failure(`Something went wrong - ${response.payload}!`);

            return;
          }
        }
      } catch (error) {
        Notiflix.Notify.failure(`Something went wrong - ${error.message}`);
      }
    })();

    axios.defaults.baseURL = process.env.REACT_APP_BACKEND_HOST;
    dispatch(getTasks());
    axios.defaults.baseURL = process.env.REACT_APP_NAGER_URL;
    if (country)
      dispatch(
        getHolidays({
          year:
            localStorage.getItem('savedWeekOrMonth')?.split(' ')[1] ||
            String(new Date().getFullYear()),
          countryCode: country,
        })
      );
  }, [dispatch]);

  function setPrevItem() {
    if (localStorage.getItem('weekOrMonth') === 'month') {
      if (currentWeekOrMonth.weekOrMonth === 1) {
        setCurrentWeekOrMonth((prev) => ({ year: prev.year - 1, weekOrMonth: 12 }));
        localStorage.setItem('savedWeekOrMonth', `12 ${currentWeekOrMonth.year - 1}`);
        if (country) {
          dispatch(
            getHolidays({
              year: String(currentWeekOrMonth.year - 1),
              countryCode: country,
            })
          );
        }

        return;
      } else {
        setCurrentWeekOrMonth((prev) => ({ year: prev.year, weekOrMonth: prev.weekOrMonth - 1 }));
        localStorage.setItem(
          'savedWeekOrMonth',
          `${currentWeekOrMonth.weekOrMonth - 1} ${currentWeekOrMonth.year}`
        );
      }
    } else if (localStorage.getItem('weekOrMonth') === 'week') {
      if (currentWeekOrMonth.weekOrMonth === 1) {
        setCurrentWeekOrMonth((prev) => ({ year: prev.year - 1, weekOrMonth: 53 }));
        localStorage.setItem('savedWeekOrMonth', `53 ${currentWeekOrMonth.year - 1}`);
        if (country) {
          dispatch(
            getHolidays({
              year: String(currentWeekOrMonth.year - 1),
              countryCode: country,
            })
          );
        }

        return;
      } else {
        setCurrentWeekOrMonth((prev) => ({ year: prev.year, weekOrMonth: prev.weekOrMonth - 1 }));
        localStorage.setItem(
          'savedWeekOrMonth',
          `${currentWeekOrMonth.weekOrMonth - 1} ${currentWeekOrMonth.year}`
        );
      }
    }
  }

  function setNextItem() {
    if (localStorage.getItem('weekOrMonth') === 'month') {
      if (currentWeekOrMonth.weekOrMonth === 12) {
        setCurrentWeekOrMonth((prev) => ({ year: prev.year + 1, weekOrMonth: 1 }));
        localStorage.setItem('savedWeekOrMonth', `1 ${currentWeekOrMonth.year + 1}`);
        if (country) {
          dispatch(
            getHolidays({
              year: String(currentWeekOrMonth.year + 1),
              countryCode: country,
            })
          );
        }

        return;
      } else {
        setCurrentWeekOrMonth((prev) => ({ year: prev.year, weekOrMonth: prev.weekOrMonth + 1 }));
        localStorage.setItem(
          'savedWeekOrMonth',
          `${currentWeekOrMonth.weekOrMonth + 1} ${currentWeekOrMonth.year}`
        );
      }
    } else if (localStorage.getItem('weekOrMonth') === 'week') {
      if (currentWeekOrMonth.weekOrMonth === 53) {
        setCurrentWeekOrMonth((prev) => ({ year: prev.year + 1, weekOrMonth: 1 }));
        localStorage.setItem('savedWeekOrMonth', `1 ${currentWeekOrMonth.year + 1}`);
        if (country) {
          dispatch(
            getHolidays({
              year: String(currentWeekOrMonth.year + 1),
              countryCode: country,
            })
          );
        }

        return;
      } else {
        setCurrentWeekOrMonth((prev) => ({ year: prev.year, weekOrMonth: prev.weekOrMonth + 1 }));
        localStorage.setItem(
          'savedWeekOrMonth',
          `${currentWeekOrMonth.weekOrMonth + 1} ${currentWeekOrMonth.year}`
        );
      }
    }
  }

  function changeCurrentWeekOrMonth(value: string): void {
    if (value === 'month') {
      const monthForWeek = calculateMonthForWeek(
        currentWeekOrMonth.year,
        currentWeekOrMonth.weekOrMonth
      );

      setCurrentWeekOrMonth((prev) => ({ year: prev.year, weekOrMonth: monthForWeek }));
      localStorage.setItem('savedWeekOrMonth', `${monthForWeek} ${currentWeekOrMonth.year}`);
    } else {
      const firstWeekOfMonth = calculateWeekOfYear(
        currentWeekOrMonth.year,
        currentWeekOrMonth.weekOrMonth
      );

      setCurrentWeekOrMonth((prev) => ({ year: prev.year, weekOrMonth: firstWeekOfMonth }));
      localStorage.setItem('savedWeekOrMonth', `${firstWeekOfMonth} ${currentWeekOrMonth.year}`);
    }
  }

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
    const weeksWithDecimals =
      (firstDayOfMonth.getTime() -
        firstDayOfYear.getTime() +
        firstDayOfYear.getDay() * 24 * 60 * 60 * 1000) /
      msInWeek;

    return weeksWithDecimals - Math.floor(weeksWithDecimals) === 0
      ? weeksWithDecimals + 1
      : Math.ceil(weeksWithDecimals);
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
        changeCurrentWeekOrMonth={changeCurrentWeekOrMonth}
      />
      <CalendarGrid />
      <Loading isVisible={isLoading} />
    </HelmetProvider>
  );
}
