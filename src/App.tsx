import Layout from './components/Layout/Layout';
import { Route, Routes } from 'react-router-dom';
import NewContact from './containers/NewContact/NewContact';
import Home from './containers/Home/Home';
import EditContact from './containers/EditContact/EditContact';
import './App.css';

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new-contact" element={<NewContact />} />
        <Route path="/contact-edit/:id" element={<EditContact />} />
        <Route path="*" element={<h1 className="text-center">Not found!</h1>} />
      </Routes>
    </Layout>
  );
};

export default App;
