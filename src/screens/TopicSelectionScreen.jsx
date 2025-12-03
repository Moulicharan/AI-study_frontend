import React, { useState } from 'react';
import { useQuiz } from '../context/QuizContext';
import { generateQuestions } from '../api/api';

const TOPICS = [
    'Wellness',
    'Tech Trends',
    'History',
    'Science',
    'Pop Culture'
];

const TopicSelectionScreen = () => {
    const { dispatch } = useQuiz();
    const [selectedTopic, setSelectedTopic] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleStartQuiz = async () => {
        if (!selectedTopic) return;

        dispatch({ type: 'SET_TOPIC', payload: selectedTopic });
        dispatch({ type: 'START_LOADING' });
        setIsLoading(true);
        setError(null);

        try {
            const data = await generateQuestions(selectedTopic);
            if (data.questions && Array.isArray(data.questions)) {
                dispatch({ type: 'SET_QUESTIONS', payload: data.questions });
            } else {
                throw new Error('Invalid question format received');
            }
        } catch (err) {
            console.error(err);
            setError('Failed to generate questions. Please try again.');
            dispatch({ type: 'SET_ERROR', payload: err.message });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                AI Knowledge Quiz
            </h1>

            <div className="bg-slate-800 p-8 rounded-xl shadow-2xl w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-6 text-center">Enter a Topic</h2>

                <div className="mb-8">
                    <input
                        type="text"
                        value={selectedTopic}
                        onChange={(e) => setSelectedTopic(e.target.value)}
                        placeholder="Enter any topic (e.g., Quantum Physics)"
                        className="w-full p-4 rounded-lg bg-slate-700 text-white placeholder-slate-400 border border-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 mb-4"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && selectedTopic && !isLoading) {
                                handleStartQuiz();
                            }
                        }}
                    />

                    <p className="text-sm text-slate-400 mb-3">Or choose a suggestion:</p>
                    <div className="flex flex-wrap gap-2">
                        {TOPICS.map((topic) => (
                            <button
                                key={topic}
                                onClick={() => setSelectedTopic(topic)}
                                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border ${selectedTopic === topic
                                    ? 'bg-blue-600 border-blue-500 text-white'
                                    : 'bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600 hover:border-slate-500'
                                    }`}
                            >
                                {topic}
                            </button>
                        ))}
                    </div>
                </div>

                {error && (
                    <div className="mb-4 text-red-400 text-center text-sm">
                        {error}
                    </div>
                )}

                <button
                    onClick={handleStartQuiz}
                    disabled={!selectedTopic || isLoading}
                    className={`w-full py-3 rounded-lg font-bold text-lg transition-all duration-200 ${!selectedTopic || isLoading
                        ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl'
                        }`}
                >
                    {isLoading ? (
                        <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Generating Quiz...
                        </span>
                    ) : (
                        'Start Quiz'
                    )}
                </button>
            </div>
        </div>
    );
};

export default TopicSelectionScreen;
