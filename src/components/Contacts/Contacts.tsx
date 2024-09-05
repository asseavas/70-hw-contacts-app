import ContactItem from './ContactItem';
import React from 'react';
import { Contact } from '../../types';

interface Props {
  contacts: Contact[];
  handleCardClick: (contact: Contact) => void;
}

const Contacts: React.FC<Props> = ({ contacts, handleCardClick }) => {
  return (
    <div className="row row-cols-1 row-cols-md-3 g-4 mt-2">
      {contacts.map((contact) => (
        <ContactItem
          key={contact.id}
          contact={contact}
          onClick={() => handleCardClick(contact)}
        />
      ))}
    </div>
  );
};

export default Contacts;
