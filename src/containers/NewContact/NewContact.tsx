import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectCreateContactLoading } from '../../store/contactsSlice';
import { ApiContact } from '../../types';
import { createContact } from '../../store/contactsThunks';
import { toast } from 'react-toastify';
import ContactForm from '../../components/ContactForm/ContactForm';

const NewContact = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isCreating = useAppSelector(selectCreateContactLoading);

  const onSubmit = async (contact: ApiContact) => {
    try {
      await dispatch(createContact(contact)).unwrap();
      navigate('/');
      toast.success(`Contact created`);
    } catch (error) {
      toast.error('Could not create contact!');
    }
  };
  return (
    <div className="row mt-2">
      <div className="col">
        <ContactForm onSubmit={onSubmit} isLoading={isCreating} />
      </div>
    </div>
  );
};

export default NewContact;
