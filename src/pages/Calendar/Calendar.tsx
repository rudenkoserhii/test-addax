import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { ContactList } from 'components/ContactList/ContactList';
import { ContactEditor } from 'components/ContactEditor/ContactEditor';
import { getTasks } from 'redux/tasks/operations';
import { selectLoading } from 'redux/tasks/selectors';
import { AppDispatch } from 'redux/store';
import { TasksFilter } from 'components/TasksFilter/TasksFilter';
import Notiflix from 'notiflix';

export default function Calendar() {
  const dispatch: AppDispatch = useDispatch();
  const isLoading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  if (isLoading) {
    return Notiflix.Loading.circle();
  }
  return (
    <HelmetProvider>
      <Helmet>
        <title>Your Calendar</title>
      </Helmet>
      <ContactEditor />
      <Wrapper>
        <UpDown />
        <CalendarHeader />

        <TasksFilter />
        <Switcher />
      </Wrapper>
      <CalendarGrid />
    </HelmetProvider>
  );
}
