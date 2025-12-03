import React, { useEffect, useState } from 'react';
import { useQuiz } from '../context/QuizContext';
import { generateFeedback } from '../api/api';

const ResultScreen = () => {
    const { state, dispatch } = useQuiz();
    const { score, questions, topic, feedback, answers } = state;
    const [isLoadingFeedback, setIsLoadingFeedback] = useState(true);

    useEffect(() => {
        const fetchFeedback = async () => {
            try {
                // Pass questions and answers to the API for detailed feedback
                const data = await generateFeedback(topic, score, questions.length, questions, answers);
                dispatch({ type: 'SET_FEEDBACK', payload: data });
            } catch (error) {
                console.error('Error fetching feedback:', error);
            } finally {
                setIsLoadingFeedback(false);
            }
        };

        fetchFeedback();
    }, [topic, score, questions.length, questions, answers, dispatch]);

    const handleRestart = () => {
        dispatch({ type: 'RESET_QUIZ' });
    };

    const percentage = Math.round((score / questions.length) * 100);
    let gradeColor = 'text-red-500';
    if (percentage >= 80) gradeColor = 'text-green-500';
    else if (percentage >= 60) gradeColor = 'text-yellow-500';

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 animate-fade-in pb-12">
            <div className="bg-slate-800 p-8 rounded-xl shadow-2xl w-full max-w-3xl text-center">
                <h2 className="text-3xl font-bold mb-6">Quiz Completed!</h2>

                <div className="mb-8">
                    <p className="text-slate-400 mb-2">Your Score</p>
                    <div className={`text-6xl font-bold ${gradeColor} mb-2`}>
                        {score} / {questions.length}
                    </div>
                    <p className="text-xl text-slate-300">{percentage}%</p>
                </div>

                <div className="bg-slate-700 p-6 rounded-lg mb-8 text-left">
                    <h3 className="text-lg font-semibold mb-3 text-blue-300">AI Feedback</h3>
                    {isLoadingFeedback ? (
                        <div className="flex items-center space-x-2 text-slate-400">
                            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span>Generating personalized feedback...</span>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <p className="text-slate-200 leading-relaxed mb-4 font-medium">
                                {feedback?.overallFeedback || "Great job!"}
                            </p>

                            <div className="space-y-4">
                                {feedback?.questionFeedback?.map((item, index) => {
                                    const question = questions.find(q => q.id === item.questionId) || questions[index];
                                    return (
                                        <div key={index} className={`p-4 rounded border-l-4 ${item.status === 'correct' ? 'bg-green-900/20 border-green-500' : 'bg-red-900/20 border-red-500'}`}>
                                            <p className="font-semibold text-slate-200 mb-1">
                                                Q{index + 1}: {question?.question}
                                            </p>
                                            <p className="text-sm text-slate-300">{item.explanation}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>

                <button
                    onClick={handleRestart}
                    className="w-full py-3 rounded-lg font-bold text-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200"
                >
                    Take Another Quiz
                </button>
            </div>
        </div>
    );
};

export default ResultScreen;
