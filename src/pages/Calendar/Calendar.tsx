import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { ContactList } from 'components/ContactList/ContactList';
import { ContactEditor } from 'components/ContactEditor/ContactEditor';
import { getTasks } from 'store/tasks/operations';
import { selectLoading } from 'store/tasks/selectors';
import { AppDispatch } from 'store/store';
import { TasksFilter } from 'components/TasksFilter/TasksFilter';
import { CalendarHeader } from 'components/CalendarHeader/CalendarHeader';
import { Loading } from 'components/Loading/Loading';

export default function Calendar(): JSX.Element {
  const dispatch: AppDispatch = useDispatch();
  const isLoading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  return (
    <HelmetProvider>
      <Helmet>
        <title>Your Calendar</title>
      </Helmet>
      {/* <ContactEditor /> */}
      <CalendarHeader
        setPrevItem={function (): void {
          throw new Error('Function not implemented.');
        }}
        setNextItem={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
      {/* <CalendarGrid />
      <CalendarFooter /> */}
      <Loading isVisible={isLoading} />
    </HelmetProvider>
  );
}
