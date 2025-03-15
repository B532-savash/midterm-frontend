import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './QuizCreator.css';

const QuizCreator = () => {
    const [questions, setQuestions] = useState([]);
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [quizTitle, setQuizTitle] = useState('');
    const [isNewQuiz, setIsNewQuiz] = useState(true);
    const [quizId, setQuizId] = useState(null);

    // Fetch questions from backend
    useEffect(() => {
        axios.get('https://midterm-backend-latest-32ao.onrender.com/questions')
            .then(response => {
                setQuestions(response.data);
            })
            .catch(error => {
                console.error('Error fetching questions:', error);
            });
    }, []);

    // Add question to quiz
    const addQuestionToQuiz = (question) => {
        if (!selectedQuestions.some(q => q.id === question.id)) {
            setSelectedQuestions([...selectedQuestions, question]);
        }
    };

    // Remove question from quiz
    const removeQuestionFromQuiz = (questionId) => {
        setSelectedQuestions(selectedQuestions.filter(q => q.id !== questionId));
    };

    // Save quiz changes
    const saveQuizChanges = () => {
        const quizData = {
            title: quizTitle,
            questionIds: selectedQuestions.map(q => q.id),
        };

        if (isNewQuiz) {
            axios.post('https://midterm-backend-latest-32ao.onrender.com/quizzes', quizData)
                .then(response => {
                    setQuizId(response.data);
                    setIsNewQuiz(false);
                    alert('Quiz saved successfully!');
                })
                .catch(error => {
                    console.error('Error saving quiz:', error);
                });
        } else {
            axios.put(`https://midterm-backend-latest-32ao.onrender.com/quizzes/${quizId}`, quizData)
                .then(() => {
                    alert('Quiz updated successfully!');
                })
                .catch(error => {
                    console.error('Error updating quiz:', error);
                });
        }
    };


    const saveAndStartNewQuiz = () => {
        saveQuizChanges();
        setQuizTitle('');
        setSelectedQuestions([]);
        setIsNewQuiz(true);
        setQuizId(null);
    };

    return (
        <div className="quiz-creator">
            <h1>Create a Quiz</h1>
            <div className="quiz-creator-content">
                {/* Questions Bank */}
                <div className="quiz-creator-questions-bank">
                    <h2>Questions Bank</h2>
                    <p>Click on a question to add it to the quiz.</p>
                    <div className="quiz-creator-questions-grid">
                        {questions.map(question => (
                            <div key={question.id} className="quiz-creator-question-card" onClick={() => addQuestionToQuiz(question)}>
                                <img src={`https://midterm-backend-latest-32ao.onrender.com/questions/${question.id}/image`} alt={question.description} />
                                <p><strong>{question.id}</strong></p>
                                <p>{question.description}</p>
                                {question.choices.map((choice, index) => (
                                    <label key={index}>
                                        <input type="radio" name={`question-${question.id}`} value={choice} disabled />
                                        {choice}
                                    </label>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quiz Panel */}
                <div className="quiz-creator-quiz-panel">
                    <h2>The new quiz ({selectedQuestions.length} questions)</h2>
                    <label>
                        Quiz title:
                        <input
                            type="text"
                            value={quizTitle}
                            onChange={(e) => setQuizTitle(e.target.value)}
                        />
                    </label>
                    <button onClick={saveQuizChanges}>Save your changes</button>
                    <button onClick={saveAndStartNewQuiz}>Save this quiz and start a new one</button>
                    <p>If you want to remove a question from the quiz, click on it here and it will be removed from the quiz.</p>
                    <div className="quiz-creator-selected-questions-grid">
                        {selectedQuestions.map(question => (
                            <div key={question.id} className="quiz-creator-selected-question-card" onClick={() => removeQuestionFromQuiz(question.id)}>
                                <img src={`https://midterm-backend-latest-32ao.onrender.com/questions/${question.id}/image`} alt={question.description} />
                                <p><strong>{question.id}</strong></p>
                                <p>{question.description}</p>
                                {question.choices.map((choice, index) => (
                                    <label key={index}>
                                        <input type="radio" name={`selected-question-${question.id}`} value={choice} disabled />
                                        {choice}
                                    </label>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuizCreator;
