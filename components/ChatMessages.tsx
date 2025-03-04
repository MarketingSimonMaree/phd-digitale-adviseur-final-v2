import React, { useEffect, useRef } from 'react';

interface Message {
  text: string;
  sender: 'avatar' | 'user';
}

interface Props {
  messages: Array<{ text: string; sender: 'avatar' | 'user' }>;
  onClear: () => void;
}

export default function ChatMessages({ messages, onClear }: Props) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  return (
    <div className="mb-4 h-[30vh] flex flex-col w-[68%] ml-auto mr-4">
      {/* Header met transparante achtergrond */}
      <div className="sticky top-0 z-10 p-3 flex justify-between items-center">
        <span className="text-lg text-white/90 font-medium"></span>
        <button 
          className="w-6 h-6 rounded-full flex items-center justify-center bg-white/20 hover:bg-[#ce861b] text-white transition-colors"
          onClick={onClear}
        >
          ✕
        </button>
      </div>
      
      {/* Berichten container met fade effect aan bovenkant */}
      <div className="overflow-y-auto flex-1 p-4 relative">
        {/* Fade effect at the top */}
        <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-black/20 to-transparent z-10 pointer-events-none" />
        
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            } mb-2 animate-[fadeInUp_0.3s_ease-out]`}
          >
            <div
              className={`max-w-[70%] rounded-2xl px-3 py-1.5 ${
                message.sender === 'user'
                  ? 'bg-[#ce861b] text-white'
                  : 'bg-white/90 backdrop-blur-sm text-black shadow-sm'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
