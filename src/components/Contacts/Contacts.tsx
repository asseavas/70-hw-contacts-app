import Spinner from '../Spinner/Spinner';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectContacts,
  selectDeleteContactLoading,
  selectFetchContactsLoading,
} from '../../store/contactsSlice';
import ContactItem from './ContactItem';
import { useEffect, useState } from 'react';
import { deleteContact, fetchContacts } from '../../store/contactsThunks';
import { Contact } from '../../types';
import Modal from '../Modal/Modal';
import { Link } from 'react-router-dom';
import ButtonSpinner from '../Spinner/ButtonSpinner';
import { toast } from 'react-toastify';

const Contacts = () => {
  const dispatch = useAppDispatch();
  const contacts = useAppSelector(selectContacts);
  const contactsLoading = useAppSelector(selectFetchContactsLoading);
  const deleteLoading = useAppSelector(selectDeleteContactLoading);
  const [showModal, setShowModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const handleCardClick = (contact: Contact) => {
    setSelectedContact(contact);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedContact(null);
  };

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const removeContact = async (id: string) => {
    try {
      await dispatch(deleteContact(id)).unwrap();
      await dispatch(fetchContacts());
      handleCloseModal();
    } catch (error) {
      toast.error('Could not delete contact!');
    }
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-between py-3 gap-3">
      {contactsLoading ? (
        <Spinner />
      ) : (
        contacts.map((contact) => (
          <ContactItem
            key={contact.id}
            contact={contact}
            onClick={() => handleCardClick(contact)}
          />
        ))
      )}
      {selectedContact && (
        <Modal
          show={showModal}
          title="Contact Details"
          onClose={handleCloseModal}
        >
          <div className="modal-body">
            <p>Name: {selectedContact.name}</p>
            <p>Phone: {selectedContact.phone}</p>
            <p>Email: {selectedContact.email}</p>
          </div>
          <div className="modal-footer">
            <Link
              className="btn btn-primary"
              to={`/contact-edit/${selectedContact.id}`}
            >
              Edit
            </Link>
            <button
              className="btn btn-danger"
              onClick={() => removeContact(selectedContact.id)}
              disabled={
                deleteLoading ? deleteLoading === selectedContact.id : false
              }
            >
              {deleteLoading && deleteLoading === selectedContact.id && (
                <ButtonSpinner />
              )}
              Delete
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Contacts;
