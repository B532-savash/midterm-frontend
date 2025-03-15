import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to the Quiz Management System</h1>
      <p>Manage your quizzes efficiently and take them with ease!</p>
      <img
        src="/Quiz.png"
        alt="Quiz Management System"
        className="home-image"
      />
    </div>
  );
};

export default Home;
