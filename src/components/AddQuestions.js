import React, { useState } from 'react';
import axios from 'axios';
import './AddQuestions.css';

const AddQuestions = () => {
  const [description, setDescription] = useState('');
  const [choices, setChoices] = useState(['', '', '']);
  const [answer, setAnswer] = useState('');
  const [image, setImage] = useState(null);
  const [questionId, setQuestionId] = useState(null);
  const [message, setMessage] = useState('');


  const handleAddQuestion = async (e) => {
    e.preventDefault();

    const questionData = {
      description,
      choices,
      answer,
    };

    try {
      const response = await axios.post('https://midterm-backend-latest-32ao.onrender.com/questions', questionData);
      setQuestionId(response.data); // Save question ID for image upload
      setMessage('Question added successfully! Now upload an image.');
    } catch (error) {
      console.error('Error adding question:', error);
      setMessage('Failed to add question.');
    }
  };


  const handleUploadImage = async (e) => {
    e.preventDefault();

    if (!questionId) {
      setMessage('Please add a question first before uploading an image.');
      return;
    }

    const formData = new FormData();
    formData.append('image', image);

    try {
      await axios.post(`https://midterm-backend-latest-32ao.onrender.com/questions/${questionId}/image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('Image uploaded successfully!');
      resetForm();
    } catch (error) {
      console.error('Error uploading image:', error);
      setMessage('Failed to upload image.');
    }
  };

  // Handle choice input changes
  const handleChoiceChange = (index, value) => {
    const updatedChoices = [...choices];
    updatedChoices[index] = value;
    setChoices(updatedChoices);
  };

  // Reset form after submission
  const resetForm = () => {
    setDescription('');
    setChoices(['', '', '']);
    setAnswer('');
    setImage(null);
    setQuestionId(null);
  };

  return (
    <div className="add-questions-container">
      <h1>Add a Question</h1>

      {/* Step 1: Add Question */}
      <form onSubmit={handleAddQuestion} className="add-questions-form">
        <label>
          Question Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>

        <label>
          Choices:
          {choices.map((choice, index) => (
            <input
              key={index}
              type="text"
              value={choice}
              onChange={(e) => handleChoiceChange(index, e.target.value)}
              placeholder={`Choice ${index + 1}`}
              required
            />
          ))}
        </label>

        <label>
          Correct Answer:
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Correct Answer"
            required
          />
        </label>

        <button type="submit">Add Question</button>
      </form>

      {/* Step 2: Upload Image */}
      {questionId && (
        <form onSubmit={handleUploadImage} className="upload-image-form">
          <label>
            Upload Image:
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              required
            />
          </label>
          <button type="submit">Upload Image</button>
        </form>
      )}

      {message && <p className="add-questions-message">{message}</p>}
    </div>
  );
};

export default AddQuestions;
