import React from 'react';
import { QuizProvider, useQuiz } from './context/QuizContext';
import TopicSelectionScreen from './screens/TopicSelectionScreen';
import QuizScreen from './screens/QuizScreen';
import ResultScreen from './screens/ResultScreen';

const QuizApp = () => {
    const { state } = useQuiz();
    const { quizStatus } = state;

    switch (quizStatus) {
        case 'loading':
        case 'idle':
            return <TopicSelectionScreen />;
        case 'active':
            return <QuizScreen />;
        case 'completed':
            return <ResultScreen />;
        default:
            return <TopicSelectionScreen />;
    }
};

function App() {
    return (
        <QuizProvider>
            <QuizApp />
        </QuizProvider>
    );
}

export default App;
