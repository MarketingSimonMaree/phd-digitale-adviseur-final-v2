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
    // Verkleind met 5% (van 68% naar 63% breedte)
    <div className="mb-4 h-[30vh] flex flex-col w-[63%] ml-auto mr-4">
      {/* Header met transparante achtergrond voor fade effect */}
      <div className="sticky top-0 z-10 p-3 flex justify-between items-center bg-gradient-to-b from-transparent to-transparent">
        <span className="text-lg text-white/90 font-medium"></span>
        <button 
          className="w-6 h-6 rounded-full flex items-center justify-center bg-white/20 hover:bg-[#ce861b] text-white transition-colors"
          onClick={onClear}
        >
          ✕
        </button>
      </div>
      
      {/* Berichten container met maskering voor geleidelijke transparantie aan de bovenkant */}
      <div className="overflow-y-auto flex-1 p-4">
        {/* Hier gebruiken we geen aparte overlay div, maar een mask-image op de container zelf */}
        <div className="space-y-2" style={{
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%)'
        }}>
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
        </div>
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
