import Notiflix from 'notiflix';
import { FormStyled, InputStyled, ButtonStyled } from './ContactEditor.styled';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/tasks/operations';
import { selectAllContacts } from 'redux/tasks/selectors';

export const ContactEditor = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectAllContacts);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const objContact = { name: form.elements.name.value, number: form.elements.number.value };

    if (form.elements.name.value !== '' || form.elements.number.value !== '') {
      if (contacts.some((contact) => contact.name === form.elements.name.value)) {
        toast.error(`${form.elements.name.value} is already in contacts`);
        return;
      }
      dispatch(addContact(objContact));
      toast.success(`${form.elements.name.value} is added`);
      form.reset();
      return;
    }
    Notiflix.Notify.error('Fields cannot be empty');
  };

  return (
    <FormStyled onSubmit={handleSubmit}>
      <InputStyled
        placeholder="Contact Name"
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />
      <InputStyled
        placeholder="Phone Number"
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />
      <ButtonStyled type="submit">Add contact</ButtonStyled>
    </FormStyled>
  );
};
