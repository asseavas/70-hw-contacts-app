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
  const initialState: ApiContact = existingContact || emptyState;
  const [contactMutation, setContactMutation] =
    useState<ApiContact>(initialState);

  const defaultPhoto =
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';

  const [photoPreview, setPhotoPreview] = useState(
    initialState.photo || defaultPhoto,
  );
  const [error, setError] = useState('');

  const imageStyle = {
    background: `url(${photoPreview}) no-repeat center / cover`,
    borderRadius: '15px',
    width: '250px',
    height: '250px',
  };

  const changeContact = (event: React.ChangeEvent<HTMLInputElement>) => {
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
    });
  };

  return (
    <div className="row g-4">
      <form onSubmit={onFormSubmit} className="col-7 d-flex flex-column gap-3">
        <h4>{existingContact ? 'Edit contact' : 'Add new contact'}</h4>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="form-group mt-3">
          <label htmlFor="name" className="text-muted">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            required
            style={{ borderColor: '#a9c8e3' }}
            className="form-control border-3 rounded-4 mt-2 p-2"
            onChange={changeContact}
            value={contactMutation.name}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone" className="text-muted">
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            id="phone"
            pattern="^\+[0-9]*$"
            style={{ borderColor: '#a9c8e3' }}
            className="form-control border-3 rounded-4 mt-2 p-2"
            onChange={changeContact}
            value={contactMutation.phone}
          />
          <small className="form-text text-muted">
            Phone number must start with a + and contain only numbers.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="email" className="text-muted">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            required
            style={{ borderColor: '#a9c8e3' }}
            className="form-control border-3 rounded-4 mt-2 p-2"
            onChange={changeContact}
            value={contactMutation.email}
          />
        </div>
        <div className="form-group">
          <label htmlFor="photo" className="text-muted">
            Photo
          </label>
          <input
            type="url"
            name="photo"
            id="photo"
            required
            style={{ borderColor: '#a9c8e3' }}
            className="form-control border-3 rounded-4 mt-2 p-2"
            onChange={changeContact}
            value={contactMutation.photo}
          />
        </div>
        <div className="d-flex gap-3 mt-3">
          <button
            type="submit"
            className="btn btn-primary mt-3 rounded-3"
            disabled={isLoading}
          >
            {isLoading && <ButtonSpinner />}
            {existingContact ? 'Update' : 'Create'}
          </button>
          <NavLink to="/" className="btn btn-danger mt-3 rounded-3">
            Back to contacts
          </NavLink>
        </div>
      </form>
      <div className="col-5 d-flex flex-column align-items-center justify-content-center">
        <p>Photo preview</p>
        <div style={imageStyle} />
      </div>
    </div>
  );
};

export default DishForm;
