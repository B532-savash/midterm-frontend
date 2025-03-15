import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TakeQuiz.css';

const TakeQuiz = ({ setIsNavbarHidden }) => {
    const [quizzes, setQuizzes] = useState([]);
    const [selectedQuiz, setSelectedQuiz] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});
    const [showScore, setShowScore] = useState(false);

    useEffect(() => {
        axios.get('https://midterm-backend-latest-32ao.onrender.com/quizzes')
            .then(response => setQuizzes(response.data))
            .catch(error => console.error('Error fetching quizzes:', error));
    }, []);

    const startQuiz = (quiz) => {
        setSelectedQuiz(quiz);
        setCurrentQuestionIndex(0);
        setScore(0);
        setUserAnswers({});
        setShowScore(false);
        setIsNavbarHidden(true); // Hide navbar when quiz starts
    };

    const handleAnswerSelection = (selectedAnswer, questionId) => {
        const correctAnswer = selectedQuiz.questions.find(q => q.id === questionId).answer;

        if (userAnswers[questionId] === correctAnswer && selectedAnswer !== correctAnswer) {
            setScore(score - 1);
        } else if (userAnswers[questionId] !== correctAnswer && selectedAnswer === correctAnswer) {
            setScore(score + 1);
        }

        setUserAnswers({
            ...userAnswers,
            [questionId]: selectedAnswer,
        });
    };

    const nextQuestion = () => {
        if (currentQuestionIndex < selectedQuiz.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            finishQuiz(); // Call finishQuiz function
        }
    };

    const finishQuiz = () => {
        setShowScore(true);
        setIsNavbarHidden(false); // Show navbar when quiz ends
    };

    const previousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const resetQuiz = () => {
        setSelectedQuiz(null);
        setCurrentQuestionIndex(0);
        setShowScore(false);
        setScore(0);
        setUserAnswers({});
        setIsNavbarHidden(false);
    };

    if (!selectedQuiz) {
        return (
            <div className="take-quiz-grid-container">
                <h1>Select a Quiz</h1>
                <div className="take-quiz-grid">
                    {quizzes.map((quiz) => (
                        <div key={quiz.id} className="take-quiz-card" onClick={() => startQuiz(quiz)}>
                            <h3>{quiz.title}</h3>
                            <p>{quiz.questions.length} Questions</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (showScore) {
        return (
            <div className="take-quiz-score-container">
                <h2>You completed the quiz "{selectedQuiz.title}"</h2>
                <p><strong>You scored {score} out of {selectedQuiz.questions.length}.</strong></p>

            </div>
        );
    }

    const currentQuestion = selectedQuiz.questions[currentQuestionIndex];

    return (
        <div className="take-quiz-navigation-container">
            <h2>Question {currentQuestionIndex + 1} of {selectedQuiz.questions.length}</h2>
            <div className="take-question-card">
                <img src={`https://midterm-backend-latest-32ao.onrender.com/questions/${currentQuestion.id}/image`} alt={currentQuestion.description} />
                <p>{currentQuestion.description}</p>
                {currentQuestion.choices.map((choice, index) => (
                    <label key={index} className="take-radio-option">
                        <input
                            type="radio"
                            name={`question-${currentQuestion.id}`}
                            value={choice}
                            checked={userAnswers[currentQuestion.id] === choice}
                            onChange={() => handleAnswerSelection(choice, currentQuestion.id)}
                        />
                        {choice}
                    </label>
                ))}
            </div>
            <div className="navigation-buttons">
                {currentQuestionIndex > 0 && (
                    <button onClick={previousQuestion}>Previous</button>
                )}
                <button
                    onClick={currentQuestionIndex < selectedQuiz.questions.length - 1 ? nextQuestion : finishQuiz}
                    className={currentQuestionIndex === 0 ? "align-right" : ""}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default TakeQuiz;
