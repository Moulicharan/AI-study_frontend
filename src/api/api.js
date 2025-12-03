import axios from 'axios';

const API_URL = 'https://ai-study-backend-izd8.onrender.com/api';

export const generateQuestions = async (topic) => {
    const response = await axios.post(`${API_URL}/generate-questions`, { topic });
    return response.data;
};

export const generateFeedback = async (topic, score, total, questions, userAnswers) => {
    const response = await axios.post(`${API_URL}/generate-feedback`, { topic, score, total, questions, userAnswers });
    return response.data;
};

