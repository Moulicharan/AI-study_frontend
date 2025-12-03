import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const generateQuestions = async (topic) => {
    const response = await axios.post(`${API_URL}/generate-questions`, { topic });
    return response.data;
};

export const generateFeedback = async (topic, score, total, questions, userAnswers) => {
    const response = await axios.post(`${API_URL}/generate-feedback`, { topic, score, total, questions, userAnswers });
    return response.data;
};
