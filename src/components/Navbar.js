import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li><a href="/">Home</a></li>
        <li><a href="/add-questions">Add Questions</a></li>
        <li><a href="/create-quiz">Create a Quiz</a></li>
        <li><a href="/take-quiz">Take a Quiz</a></li>
        <li><a href="/about">About</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
