import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <div className="container">
        <Link to="/" className="navbar-brand">
          Todo App
        </Link>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to="/add" className="nav-link">
              Add Todo
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
