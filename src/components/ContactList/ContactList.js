import React from 'react';
import ContactItem from '../ContactItem/ContactItem';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contactsSlice';

const ContactList = () => {
  const dispatch = useDispatch();
  const {
    items: contacts,
    isLoading,
    error,
  } = useSelector(state => state.contacts);
  const filter = useSelector(state => state.filter);

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const visibleContacts = getVisibleContacts();

  if (isLoading) {
    return <p>Loading contacts...</p>;
  }

  if (error) {
    return <p>An error occurred: {error}</p>;
  }

  return (
    <ul>
      {visibleContacts.map(contact => (
        <ContactItem
          key={contact.id}
          name={contact.name}
          phone={contact.phone}
          onDelete={() => dispatch(deleteContact(contact.id))}
        />
      ))}
    </ul>
  );
};

export default ContactList;
