import React, { createContext, useContext, useReducer } from 'react';

const QuizContext = createContext();

const initialState = {
    topic: null,
    questions: [],
    currentQuestionIndex: 0,
    answers: {},
    score: 0,
    feedback: null,
    loading: false,
    error: null,
    quizStatus: 'idle', // idle, loading, active, completed
};

const quizReducer = (state, action) => {
    switch (action.type) {
        case 'SET_TOPIC':
            return { ...state, topic: action.payload };
        case 'START_LOADING':
            return { ...state, loading: true, error: null, quizStatus: 'loading' };
        case 'SET_QUESTIONS':
            return {
                ...state,
                questions: action.payload,
                loading: false,
                quizStatus: 'active',
                currentQuestionIndex: 0,
                answers: {},
                score: 0
            };
        case 'SET_ERROR':
            return { ...state, loading: false, error: action.payload, quizStatus: 'idle' };
        case 'ANSWER_QUESTION':
            return {
                ...state,
                answers: { ...state.answers, [action.payload.questionId]: action.payload.answerIndex }
            };
        case 'NEXT_QUESTION':
            return { ...state, currentQuestionIndex: state.currentQuestionIndex + 1 };
        case 'PREV_QUESTION':
            return { ...state, currentQuestionIndex: state.currentQuestionIndex - 1 };
        case 'FINISH_QUIZ':
            return { ...state, quizStatus: 'completed', score: action.payload };
        case 'SET_FEEDBACK':
            return { ...state, feedback: action.payload };
        case 'RESET_QUIZ':
            return initialState;
        default:
            return state;
    }
};

export const QuizProvider = ({ children }) => {
    const [state, dispatch] = useReducer(quizReducer, initialState);

    return (
        <QuizContext.Provider value={{ state, dispatch }}>
            {children}
        </QuizContext.Provider>
    );
};

export const useQuiz = () => {
    const context = useContext(QuizContext);
    if (!context) {
        throw new Error('useQuiz must be used within a QuizProvider');
    }
    return context;
};
