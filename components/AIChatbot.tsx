import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, Loader2, Minimize2, Mic, MicOff } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

// Extend window interface for SpeechRecognition
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

const AIChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hi! I'm Raphael's AI Assistant. Ask me anything about his skills, projects, or experience!" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize Speech Recognition
  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(prev => prev ? `${prev} ${transcript}` : transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    setIsLoading(true);

    // Add user message
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);

    // Temporary placeholder for streaming
    setMessages(prev => [...prev, { role: 'model', text: '', isThinking: true }]);

    let fullResponse = "";
    
    try {
      const stream = sendMessageToGemini(userMessage);
      
      // We need to update the last message iteratively
      for await (const chunk of stream) {
        fullResponse += chunk;
        setMessages(prev => {
           const newHistory = [...prev];
           // Replace the 'thinking' message or append to the current model message
           const lastMsg = newHistory[newHistory.length - 1];
           if (lastMsg.role === 'model') {
             lastMsg.text = fullResponse;
             lastMsg.isThinking = false;
           }
           return newHistory;
        });
      }
    } catch (error) {
       console.error(error);
       setMessages(prev => [...prev, { role: 'model', text: "Sorry, I had trouble connecting to the AI brain. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 ${isOpen ? 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rotate-90 border border-slate-300 dark:border-slate-600' : 'bg-gradient-to-r from-gold-500 to-amber-600 text-white animate-bounce-subtle shadow-gold-500/30 shadow-xl border-2 border-gold-400'}`}
        aria-label="Toggle Chat"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-7 h-7" />}
        {!isOpen && (
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-gold-500"></span>
            </span>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[90vw] md:w-[400px] h-[500px] bg-white dark:bg-slate-900 border-2 border-gold-400/30 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-300 backdrop-blur-xl bg-opacity-95 dark:bg-opacity-95">
          {/* Header */}
          <div className="p-4 bg-slate-50 dark:bg-slate-950/50 border-b border-gold-400/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gold-500/10 dark:bg-gold-500/20 rounded-xl">
                <Sparkles className="w-5 h-5 text-gold-600 dark:text-gold-400" />
              </div>
              <div>
                <h3 className="text-slate-900 dark:text-white font-semibold text-sm">Raphael's Assistant</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                  Powered by Gemini Flash-Lite
                </p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors">
                <Minimize2 className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth bg-white dark:bg-transparent">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[85%] px-4 py-3 text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-gold-500 text-white rounded-3xl rounded-br-none' 
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-3xl rounded-bl-none border border-gold-400/10'
                  }`}
                >
                  {msg.isThinking && !msg.text ? (
                      <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                          <Loader2 className="w-3 h-3 animate-spin" />
                          <span className="text-xs">Thinking...</span>
                      </div>
                  ) : (
                    msg.text
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-slate-50 dark:bg-slate-950/30 border-t border-gold-400/20">
            <div className="relative flex items-center gap-2">
              <div className="relative flex-1">
                 <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Ask about my projects..."
                    className="w-full bg-white dark:bg-slate-800/50 border border-gold-400/20 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 rounded-2xl pl-4 pr-10 py-3 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500/50 transition-all text-sm"
                  />
                  {/* Speech Button inside input */}
                  <button
                    onClick={toggleListening}
                    className={`absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full transition-all duration-300 ${isListening ? 'bg-red-500 text-white animate-pulse' : 'text-slate-400 hover:text-gold-500'}`}
                    title="Speak to Agent"
                  >
                    {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </button>
              </div>
              
              <button 
                onClick={handleSendMessage}
                disabled={isLoading || !inputValue.trim()}
                className="p-3 bg-gold-500 hover:bg-gold-400 text-white rounded-xl transition-colors disabled:opacity-50 disabled:hover:bg-gold-500 shadow-md"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <div className="mt-2 text-center">
                <p className="text-[10px] text-slate-500 dark:text-slate-600">AI responses may vary. Check the resume for official info.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatbot;