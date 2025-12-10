import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { createChatSession } from '../services/geminiService';
import { Message } from '../types';
import { Chat } from '@google/genai';
import ReactMarkdown from 'react-markdown';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 'welcome', 
      role: 'model', 
      text: "Hello! I'm your Bright Road Assistant. I can help you find the best places in Oman, book hotels, or rent a car. Where would you like to go?" 
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatSessionRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize chat session once on mount with error handling
    try {
      chatSessionRef.current = createChatSession();
    } catch (error) {
      console.error("Failed to initialize chat session:", error);
      setMessages(prev => [...prev, {
        id: 'error-init',
        role: 'model',
        text: "⚠️ **System Notice:** The AI service is currently unavailable because the API Key is missing or invalid. Please configure the `VITE_API_KEY` in your Vercel environment settings to enable the chat."
      }]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // Prevent sending if chat session is not initialized
    if (!chatSessionRef.current) {
        setMessages(prev => [...prev, {
            id: Date.now().toString(),
            role: 'model',
            text: "I cannot reply right now because the connection to the AI service was not established."
        }]);
        setInputValue('');
        return;
    }

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: inputValue
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await chatSessionRef.current.sendMessage({ message: userMsg.text });
      const text = response.text || "I'm having trouble connecting right now. Please try again.";
      
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: text
      };
      
      // Check for grounding (maps)
      const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      if (groundingChunks && groundingChunks.length > 0) {
          let sourcesText = "\n\n**Sources & Map Links:**\n";
          let hasSources = false;
          groundingChunks.forEach((chunk: any) => {
              if (chunk.web?.uri && chunk.web?.title) {
                  sourcesText += `- [${chunk.web.title}](${chunk.web.uri})\n`;
                  hasSources = true;
              }
              if (chunk.maps?.uri && chunk.maps?.title) {
                  sourcesText += `- [${chunk.maps.title}](${chunk.maps.uri})\n`;
                  hasSources = true;
              }
          });
          if (hasSources) {
             botMsg.text += sourcesText;
          }
      }

      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'model',
        text: "I apologize, but I encountered an error communicating with the server. Please try asking again."
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] md:h-[calc(100vh-100px)] bg-gray-50 max-w-4xl mx-auto md:my-4 md:rounded-2xl md:shadow-xl md:border md:border-gray-200 overflow-hidden">
      
      {/* Header */}
      <div className="bg-emerald-600 p-4 flex items-center justify-between text-white shadow-md z-10">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-full">
            <Bot size={24} />
          </div>
          <div>
            <h2 className="font-bold text-lg">Travel Assistant</h2>
            <p className="text-emerald-100 text-xs">Powered by Gemini AI</p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 scrollbar-hide">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex max-w-[85%] md:max-w-[75%] gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center shadow-sm mt-1 ${
                msg.role === 'user' ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'
              }`}>
                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              
              <div className={`p-4 rounded-2xl shadow-sm text-sm md:text-base ${
                msg.role === 'user' 
                  ? 'bg-red-600 text-white rounded-tr-none' 
                  : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
              }`}>
                <div className={
                    msg.role === 'user'
                    ? "prose-sm max-w-none"
                    : "prose prose-sm max-w-none prose-p:mb-2 last:prose-p:mb-0 prose-a:text-blue-500 hover:prose-a:underline prose-ul:list-disc prose-ul:ml-4"
                }>
                    <ReactMarkdown 
                        components={{
                            a: ({node, ...props}) => <a {...props} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-bold underline decoration-emerald-300 decoration-2 underline-offset-2" />
                        }}
                    >
                        {msg.text}
                    </ReactMarkdown>
                </div>
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start w-full">
             <div className="flex gap-2 bg-white border border-gray-100 p-4 rounded-2xl rounded-tl-none shadow-sm items-center">
                <Loader2 size={16} className="animate-spin text-emerald-600" />
                <span className="text-xs text-gray-400 font-medium">Assistant is thinking...</span>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-200">
        <div className="relative flex items-center gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about places, hotels, or car rentals..."
            className="w-full bg-gray-100 text-gray-800 rounded-full py-3 pl-5 pr-12 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all border border-transparent focus:border-emerald-200"
          />
          <button 
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
            className="absolute right-2 p-2 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
          >
            <Send size={18} />
          </button>
        </div>
        <p className="text-center text-[10px] text-gray-400 mt-2">
           AI can make mistakes. Please double-check booking details.
        </p>
      </div>
    </div>
  );
};

export default ChatInterface;