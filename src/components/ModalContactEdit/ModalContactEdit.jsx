import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useDispatch } from 'react-redux';
import { editContact } from 'redux/contacts/operations';
import { Wrapper, Overlay, FormStyled, InputStyled, ButtonStyled } from './ModalContactEdit.styled';
import PropTypes from 'prop-types';
import { toast } from "react-hot-toast";

const modalRoot = document.querySelector('#modal-root');

export const ModalContactEdit = ({ onClose, id, name, number }) => {
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    const objContact = { 'name': name, 'number': number };

    if (name !== form.elements.name.value && form.elements.name.value !== '') { objContact.name = form.elements.name.value }
        else if (number !== form.elements.number.value && form.elements.number.value !== '') { objContact.number = form.elements.number.value }
    dispatch(editContact({id, objContact}));
    form.reset();
    toast.success(`Contact changed to ${objContact.name} with phone number ${objContact.number}`)
    onClose()
  };

    useEffect(() => {
    if (window){
        window.addEventListener('keydown', onClickEscape);
    }
    return () => {
        window.removeEventListener('keydown', onClickEscape);
    }}, )

    const onClickEscape = (e) => {
        if(e.code === 'Escape') {
        onClose();
        }
    }

    const onClickBackdrop = (e) => {
        if(e.currentTarget === e.target) {
            onClose();
        }
    }

    return createPortal(
            <Overlay onClick={onClickBackdrop}>
            <Wrapper>
                <FormStyled onSubmit={handleSubmit}>
                <InputStyled type="text" name="name" pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                            title="Name may contain only letters, apostrophe, dash and spaces. 
                            For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan" defaultValue={name}
                            />
                <InputStyled type="tel" name="number" pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +" defaultValue={number}
                            />
                <ButtonStyled type="submit">
                    Change
                </ButtonStyled>
                </FormStyled>
            </Wrapper>
            </Overlay>, modalRoot,
)}

ModalContactEdit.propTypes = {
    onClose: PropTypes.func,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
};