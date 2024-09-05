import Contacts from '../../components/Contacts/Contacts';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectContacts,
  selectDeleteContactLoading,
  selectFetchContactsLoading,
} from '../../store/contactsSlice';
import { useEffect, useState } from 'react';
import { Contact } from '../../types';
import { deleteContact, fetchContacts } from '../../store/contactsThunks';
import { toast } from 'react-toastify';
import Modal from '../../components/Modal/Modal';
import { Link } from 'react-router-dom';
import ButtonSpinner from '../../components/Spinner/ButtonSpinner';
import Spinner from '../../components/Spinner/Spinner';

const Home = () => {
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
    <div>
      {contactsLoading ? (
        <Spinner />
      ) : (
        <Contacts contacts={contacts} handleCardClick={handleCardClick} />
      )}
      {selectedContact && (
        <Modal
          show={showModal}
          title="Contact Details"
          onClose={handleCloseModal}
        >
          <div className="modal-body d-flex align-items-center gap-4 p-4">
            <img
              style={{ width: '160px', height: '160px' }}
              src={selectedContact.photo}
              className="rounded-4"
              alt={selectedContact.name}
            />
            <div className="">
              <p>
                <strong>Name:</strong> {selectedContact.name}
              </p>
              <p>
                <strong>Phone:</strong> {selectedContact.phone}
              </p>
              <p>
                <strong>Email:</strong> {selectedContact.email}
              </p>
            </div>
          </div>
          <div className="modal-footer">
            <Link
              className="btn btn-primary rounded-3 me-3"
              to={`/contact-edit/${selectedContact.id}`}
            >
              Edit
            </Link>
            <button
              className="btn btn-danger rounded-3"
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

export default Home;
