import React, { useState, useRef, useEffect } from 'react';
import { Header } from '../components/Header';
import { ChatMessage } from '../components/ChatMessage';
import { ChatInput } from '../components/ChatInput';
import { ExampleQueries } from '../components/ExampleQueries';
import { Message } from '../types';

export const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [data, setData] = useState([]); // Assume data is an array of user objects
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Number of items to display per page
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const callPythonAPI = async (input: string) => {
    console.log("CALLING PYTHON API", input);
    setIsTyping(true);
    try {
      const response = await fetch('http://localhost:5000/api/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: input }),
      });
      const data = await response.json();
      console.log("PYTHON API RESPONSE", data);
      if (data.message && data.data) {
        setData(data.data); // Assume data.data is the array of users
      }
      setMessages(prev => [...prev, { content: data.message, type: 'assistant', timestamp: new Date() }]);
      setIsTyping(false);
    } catch (error) {
      setIsTyping(false);
      console.error("Error calling Python API:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages(prev => [...prev, { content: input, type: 'user', timestamp: new Date() }]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      setMessages(prev => [...prev, {
        content: "I'm analyzing data across our integrated platforms to provide you with the most accurate response.",
        type: 'assistant',
        timestamp: new Date()
      }]);
      setIsTyping(false);
    }, 1000);
    await callPythonAPI(input);
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <Header />

      <main className="max-w-4xl mx-auto pt-20 px-4 pb-8">
        {messages.length > 0 ? (
          <>
            <div className="space-y-6 mb-8">
              {messages.map((message, index) => (
                <ChatMessage key={index} message={message} />
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-4 py-2">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce [animation-delay:-.3s]"></div>
                      <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce [animation-delay:-.5s]"></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Data table shown only once after all messages */}
            {data.length > 0 && (
              <div className='max-w-[80%] bg-white text-gray-900 border border-gray-200 p-6 my-6 rounded-2xl shadow-sm'>
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2">Email</th>
                      <th className="border border-gray-300 px-4 py-2">Name</th>
                      <th className='border border-gray-300 px-4 py-2'>Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((user: any) => (
                      <tr key={user.email}>
                        <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                        <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                        <td className='border border-gray-300 px-4 py-2'>{user.type}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {/* Pagination Controls */}
                <div className="flex justify-between mt-4">
                  <button 
                    className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50" 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  <span>Page {currentPage} of {totalPages}</span>
                  <button 
                    className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50" 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 text-transparent bg-clip-text mb-6">
              AI THAT KNOWS IT ALL
            </h1>
            <p className="text-gray-600 max-w-md mb-12">
              Ask anything about your organization's data across all integrated platforms
            </p>
            <ExampleQueries />
          </div>
        )}

        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4">
          <ChatInput input={input} setInput={setInput} handleSubmit={handleSubmit} />
        </div>
      </main>
    </div>
  );
};