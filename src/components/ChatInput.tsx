import React from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export const ChatInput = ({ input, setInput, handleSubmit }: ChatInputProps) => (
  <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 w-full max-w-2xl mx-auto">
    <div className="relative w-full">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask anything about your organization's data..."
        className="w-full bg-white text-gray-900 border border-gray-200 rounded-2xl px-6 py-4 pr-12 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 placeholder:text-gray-400 shadow-sm"
      />
      <button
        type="submit"
        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-teal-600 transition-colors"
      >
        <Send className="w-5 h-5" />
      </button>
    </div>
  </form>
);