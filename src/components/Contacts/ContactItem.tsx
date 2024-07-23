import React from 'react';
import { Contact } from '../../types';
import './contact.css';

interface Props {
  contact: Contact;
  onClick: () => void;
}

const ContactItem: React.FC<Props> = ({ contact, onClick }) => {
  const imageStyle = {
    backgroundImage: `url(${contact.photo}) no-repeat center / cover`,
    width: '140px',
    height: '140px',
  };

  return (
    <div className="card rounded-4 w-50" onClick={onClick}>
      <div className="row g-0">
        <div className="col-4">
          <img
            style={imageStyle}
            src={contact.photo}
            className="rounded-start-4"
            alt={contact.name}
          />
        </div>
        <div className="col-md-8 d-flex align-items-center">
          <h3 className="card-title">{contact.name}</h3>
        </div>
      </div>
    </div>
  );
};

export default ContactItem;
