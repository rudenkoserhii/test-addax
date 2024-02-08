import { ModalContactEdit } from 'components/ModalContactEdit/ModalContactEdit';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { deleteContact } from 'redux/contacts/operations';
import { ContactStyled, NumberStyled, NameStyled, ButtonStyledDelete, ButtonStyledEdit } from './Contact.styled';
import PropTypes from 'prop-types';
import { toast } from 'react-hot-toast';

export const Contact = ({ id, name, number }) => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteContact(id));
    toast.success(`${name} was deleted!`)
  };
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  return (
    <ContactStyled>
      <NameStyled>{name}</NameStyled>
      <NumberStyled>{number}</NumberStyled>
      <ButtonStyledDelete type="button" onClick={handleDelete}>
        Delete
      </ButtonStyledDelete>
      <ButtonStyledEdit type="button" onClick={toggleModal}>
        Edit
      </ButtonStyledEdit>
    {(showModal) && <ModalContactEdit id={id} name={name} number={number} onClose={toggleModal}/>}
    </ContactStyled>
  );
};

Contact.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
};