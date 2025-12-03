import React from 'react';

const Question = ({ question, selectedOption, onAnswer }) => {
    return (
        <div className="bg-slate-800 p-6 rounded-lg shadow-lg max-w-2xl w-full">
            <h2 className="text-xl font-bold mb-6 text-white">{question.question}</h2>
            <div className="space-y-3">
                {question.options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => onAnswer(index)}
                        className={`w-full text-left p-4 rounded-md transition-colors duration-200 border-2 ${selectedOption === index
                                ? 'bg-blue-600 border-blue-400 text-white'
                                : 'bg-slate-700 border-transparent text-slate-200 hover:bg-slate-600'
                            }`}
                    >
                        <span className="font-semibold mr-2">{String.fromCharCode(65 + index)}.</span>
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Question;
