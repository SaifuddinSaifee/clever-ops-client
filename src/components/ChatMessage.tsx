import { Message } from '../types';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage = ({ message }: ChatMessageProps) => (
  <div className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
    <div
      className={`max-w-[80%] ${
        message.type === 'user'
          ? 'bg-teal-50 text-gray-900 border border-teal-200'
          : 'bg-white text-gray-900 border border-gray-200'
      } px-6 py-4 rounded-2xl shadow-sm`}
    >
      <p className="text-sm md:text-base">{message.content}</p>
      <span className="text-xs text-gray-500 mt-2 block">
        {message.timestamp.toLocaleTimeString()}
      </span>
    </div>
  </div>
);