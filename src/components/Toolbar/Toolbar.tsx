import React from 'react';
import { NavLink } from 'react-router-dom';

const Toolbar: React.FC = () => {
  return (
    <nav className="navbar" style={{ background: '#e3f2fd' }}>
      <div className="container">
        <NavLink to="/" className="navbar-brand fs-3">
          Contacts
        </NavLink>
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink className="nav-link" to="/new-contact">
              Create new contact
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Toolbar;
