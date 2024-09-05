import React from 'react';
import { NavLink } from 'react-router-dom';

const Toolbar: React.FC = () => {
  return (
    <nav className="navbar" style={{ background: '#115a94' }}>
      <div className="container">
        <NavLink to="/" className="navbar-brand fs-3 text-uppercase text-light">
          Contacts
        </NavLink>
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink className="nav-link text-light" to="/new-contact">
              Create new contact
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Toolbar;
