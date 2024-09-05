import React from 'react';
import { Contact } from '../../types';
import './contact.css';

interface Props {
  contact: Contact;
  onClick: VoidFunction;
}

const ContactItem: React.FC<Props> = ({ contact, onClick }) => {
  return (
    <div className="col">
      <div className="card rounded-4 p-3 border-0" onClick={onClick}>
        <div className="d-flex align-items-center gap-3">
          <img
            className="contact-image"
            src={contact.photo}
            alt={contact.name}
          />
          <div className="card-body">
            <h3 className="card-title">{contact.name}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactItem;
