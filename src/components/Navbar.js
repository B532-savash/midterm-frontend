import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li>
          <Link to="/">Home</Link> {/* Use Link instead of <a> */}
        </li>
        <li>
          <Link to="/add-questions">Add Questions</Link>
        </li>
        <li>
          <Link to="/create-quiz">Create a Quiz</Link>
        </li>
        <li>
          <Link to="/take-quiz">Take a Quiz</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;