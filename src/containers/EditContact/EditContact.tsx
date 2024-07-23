import { useEffect } from 'react';
import { fetchOneContact, updateContact } from '../../store/contactsThunks';
import Spinner from '../../components/Spinner/Spinner';
import ContactForm from '../../components/ContactForm/ContactForm';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectOneContact,
  selectOneContactLoading,
  selectUpdateContactLoading,
} from '../../store/contactsSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ApiContact } from '../../types';

const EditContact = () => {
  const navigate = useNavigate();
  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const isFetching = useAppSelector(selectOneContactLoading);
  const isUpdating = useAppSelector(selectUpdateContactLoading);
  const contact = useAppSelector(selectOneContact);

  const onSubmit = async (apiContact: ApiContact) => {
    try {
      await dispatch(updateContact({ id, apiContact })).unwrap();
      navigate(`/`);
      toast.success('Contact updated!');
    } catch (error) {
      toast.error('Could not update contact!');
    }
  };

  useEffect(() => {
    dispatch(fetchOneContact(id));
  }, [dispatch, id]);

  return (
    <div className="row mt-2">
      <div className="col">
        {isFetching && <Spinner />}
        {contact && (
          <ContactForm
            onSubmit={onSubmit}
            existingContact={contact}
            isLoading={isUpdating}
          />
        )}
      </div>
    </div>
  );
};

export default EditContact;
