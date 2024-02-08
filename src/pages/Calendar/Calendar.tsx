import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { Helmet, HelmetProvider } from 'react-helmet-async';
// import { ContactList } from 'components/ContactList/ContactList';
// import { ContactEditor } from 'components/ContactEditor/ContactEditor';
// import { ContactsFilter } from 'components/ContactsFilter/ContactsFilter';
// import { fetchContacts } from 'redux/contacts/operations';
// import { selectLoading } from 'redux/contacts/selectors';

export default function Calendar() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <HelmetProvider>
      <Helmet>
        <title>Your Calendar</title>
      </Helmet>
      <ContactEditor />
      <div>{isLoading && 'Request in progress...'}</div>
      <ContactsFilter />
      <ContactList />
    </HelmetProvider>
  );
}
