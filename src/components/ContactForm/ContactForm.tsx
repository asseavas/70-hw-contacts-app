import React, { useState } from 'react';
import { ApiContact, ContactMutation } from '../../types';
import ButtonSpinner from '../Spinner/ButtonSpinner';
import { NavLink } from 'react-router-dom';

interface Props {
  onSubmit: (contact: ApiContact) => void;
  existingContact?: ApiContact;
  isLoading?: boolean;
}

const emptyState: ContactMutation = {
  name: '',
  phone: '',
  email: '',
  photo: '',
};

const DishForm: React.FC<Props> = ({
  onSubmit,
  existingContact,
  isLoading = false,
}) => {
  const initialState: ContactMutation = existingContact
    ? { ...existingContact, phone: existingContact.phone.toString() }
    : emptyState;
  const [contactMutation, setContactMutation] =
    useState<ContactMutation>(initialState);

  const defaultPhoto =
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';

  const [photoPreview, setPhotoPreview] = useState(
    initialState.photo || defaultPhoto,
  );
  const [error, setError] = useState('');

  const imageStyle = {
    background: `url(${photoPreview}) no-repeat center / cover`,
    width: '150px',
    height: '150px',
  };

  const changeContact = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    if (value.includes(' ')) {
      setError(`The ${name} field cannot contain spaces.`);
    } else {
      setError('');
      setContactMutation((prev) => ({
        ...prev,
        [name]: value,
      }));

      if (name === 'photo') {
        setPhotoPreview(
          value ||
            'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
        );
      }
    }
  };

  const onFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const hasSpaces = Object.values(contactMutation).some((value) =>
      value.includes(' '),
    );
    if (hasSpaces) {
      setError('Fields cannot contain spaces.');
      return;
    }

    onSubmit({
      ...contactMutation,
      phone: parseFloat(contactMutation.phone),
    });
  };

  return (
    <form onSubmit={onFormSubmit}>
      <h4>{existingContact ? 'Edit contact' : 'Add new contact'}</h4>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          required
          className="form-control"
          onChange={changeContact}
          value={contactMutation.name}
        />
      </div>
      <div className="form-group">
        <label htmlFor="phone">Phone</label>
        <input
          type="tel"
          name="phone"
          id="phone"
          pattern="^\+[0-9]*$"
          className="form-control"
          onChange={changeContact}
          value={contactMutation.phone}
        />
        <small className="form-text text-muted">
          Phone number must start with a + and contain only numbers.
        </small>
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          required
          className="form-control"
          onChange={changeContact}
          value={contactMutation.email}
        />
      </div>
      <div className="form-group">
        <label htmlFor="photo">Photo</label>
        <input
          type="url"
          name="photo"
          id="photo"
          required
          className="form-control"
          onChange={changeContact}
          value={contactMutation.photo}
        />
      </div>
      <div className="form-group">
        <p>Photo preview</p>
        <div style={imageStyle} />
      </div>
      <div className="d-flex gap-3">
        <button
          type="submit"
          className="btn btn-primary mt-3"
          disabled={isLoading}
        >
          {isLoading && <ButtonSpinner />}
          {existingContact ? 'Update' : 'Create'}
        </button>
        <NavLink to="/" className="btn btn-danger mt-3">
          Back to contacts
        </NavLink>
      </div>
    </form>
  );
};

export default DishForm;
