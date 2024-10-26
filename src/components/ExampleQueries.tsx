import React from 'react';

const queries = [
  "How many users on free trial converted to paid users in last 3 months?",
  "What's our MRR growth trend compared to last quarter?",
  "Show me top 5 features requested in customer support this month",
  "Which marketing campaigns had the highest ROI?",
];

export const ExampleQueries = () => (
  <div className="flex flex-wrap justify-center gap-3 mt-8 px-4">
    {queries.map((query, index) => (
      <button
        key={index}
        className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-4 py-2 text-sm text-gray-400 hover:text-teal-600 transition-all shadow-sm"
      >
        {query}
      </button>
    ))}
  </div>
);