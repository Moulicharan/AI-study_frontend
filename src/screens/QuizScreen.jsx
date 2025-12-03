import React from 'react';
import { useQuiz } from '../context/QuizContext';
import Question from '../components/Question';

const QuizScreen = () => {
    const { state, dispatch } = useQuiz();
    const { questions, currentQuestionIndex, answers } = state;
    const currentQuestion = questions[currentQuestionIndex];
    const totalQuestions = questions.length;
    const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

    const handleAnswer = (optionIndex) => {
        dispatch({
            type: 'ANSWER_QUESTION',
            payload: { questionId: currentQuestion.id, answerIndex: optionIndex }
        });
    };

    const handleNext = () => {
        if (currentQuestionIndex < totalQuestions - 1) {
            dispatch({ type: 'NEXT_QUESTION' });
        } else {
            // Calculate score
            let score = 0;
            questions.forEach((q) => {
                if (answers[q.id] === q.correctIndex) {
                    score++;
                }
            });
            dispatch({ type: 'FINISH_QUIZ', payload: score });
        }
    };

    const handlePrev = () => {
        if (currentQuestionIndex > 0) {
            dispatch({ type: 'PREV_QUESTION' });
        }
    };

    const isAnswered = answers[currentQuestion.id] !== undefined;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <div className="w-full max-w-2xl mb-8">
                <div className="flex justify-between text-slate-400 mb-2">
                    <span>Question {currentQuestionIndex + 1} of {totalQuestions}</span>
                    <span>{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2.5">
                    <div
                        className="bg-blue-500 h-2.5 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>

            <Question
                question={currentQuestion}
                selectedOption={answers[currentQuestion.id]}
                onAnswer={handleAnswer}
            />

            <div className="flex justify-between w-full max-w-2xl mt-8">
                <button
                    onClick={handlePrev}
                    disabled={currentQuestionIndex === 0}
                    className={`px-6 py-2 rounded-lg font-medium transition-colors ${currentQuestionIndex === 0
                            ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
                            : 'bg-slate-700 text-white hover:bg-slate-600'
                        }`}
                >
                    Previous
                </button>

                <button
                    onClick={handleNext}
                    disabled={!isAnswered}
                    className={`px-6 py-2 rounded-lg font-medium transition-colors ${!isAnswered
                            ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
                            : 'bg-blue-600 text-white hover:bg-blue-500'
                        }`}
                >
                    {currentQuestionIndex === totalQuestions - 1 ? 'Finish Quiz' : 'Next'}
                </button>
            </div>
        </div>
    );
};

export default QuizScreen;
