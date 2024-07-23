import Spinner from '../Spinner/Spinner';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectContacts,
  selectFetchContactsLoading,
} from '../../store/contactsSlice';
import ContactItem from './ContactItem';
import { useEffect } from 'react';
import { fetchContacts } from '../../store/contactsThunks';

const Contacts = () => {
  const dispatch = useAppDispatch();
  const contacts = useAppSelector(selectContacts);
  const contactsLoading = useAppSelector(selectFetchContactsLoading);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className="d-flex flex-column align-items-center justify-content-between py-3 gap-3">
      {contactsLoading ? (
        <Spinner />
      ) : (
        contacts.map((contact) => (
          <ContactItem key={contact.id} contact={contact} />
        ))
      )}
    </div>
  );
};

export default Contacts;
