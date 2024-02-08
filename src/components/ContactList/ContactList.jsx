import { useSelector } from 'react-redux';
import { Contact } from '../Contact/Contact';
import { selectAllContacts } from 'redux/contacts/selectors';
import { ContactListStyled, Li } from './ContactList.styled';
import { filterValue } from 'redux/filter/selectors';

export const ContactList = () => {
    const contacts = useSelector(selectAllContacts);
    const filter = useSelector(filterValue);

  return (
    <ContactListStyled>
      {contacts
            .filter(contact => contact.name.toLowerCase().includes(filter))
            .map(({ id, name, number }) => (
            <Li key={id}>
            <Contact id={id} name={name} number={number} />
            </Li>
      ))}
    </ContactListStyled>
  );
};