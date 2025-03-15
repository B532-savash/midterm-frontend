import React, { useState } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import QuizCreator from './components/QuizCreator';
import TakeQuiz from './components/TakeQuiz';
import Home from './components/Home';
import About from './components/About';
import AddQuestions from './components/AddQuestions';

function App() {
  const [isNavbarHidden, setIsNavbarHidden] = useState(false);

  return (
    <Router>
      <>
        <Navbar isHidden={isNavbarHidden} />
        <Routes>
          <Route path="/create-quiz" element={<QuizCreator />} />
          <Route path="/" element={<Home />} />
          <Route path="/add-questions" element={<AddQuestions />} />
          <Route path="/about" element={<About />} />
          <Route path="/take-quiz" element={<TakeQuiz setIsNavbarHidden={setIsNavbarHidden} />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
