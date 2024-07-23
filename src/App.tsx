import Layout from './components/Layout/Layout';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import NewContact from './containers/NewContact/NewContact';

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/new-contact" element={<NewContact />} />
        <Route path="*" element={<h1 className="text-center">Not found!</h1>} />
      </Routes>
    </Layout>
  );
};

export default App;
