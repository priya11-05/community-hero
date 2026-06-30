import React, { useState, useRef, useEffect } from "react";
import { 
  Send, 
  Cpu, 
  HelpCircle, 
  Sparkles, 
  ChevronRight, 
  Wrench, 
  Clock, 
  X,
  MessageSquare,
  Bot
} from "lucide-react";

interface Message {
  role: "user" | "model";
  text: string;
  time: string;
}

export default function CivicAIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: "model", 
      text: "Hello! I am your AI Civic Assistant. You can ask me how to report issues, check local regulations, or inquire about repairs. How can I help you today?", 
      time: "Just now" 
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Quick Starters
  const starters = [
    "How do nearby votes help prioritize issues?",
    "Check status of road repair order #PR-102",
    "What is the average SLA for critical hazards?",
    "Can I earn badges for verifying sewage leakages?"
  ];

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMessage: Message = {
      role: "user",
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: textToSend })
      });

      if (!res.ok) {
        throw new Error("Chat failure");
      }

      const data = await res.json();
      const modelMessage: Message = {
        role: "model",
        text: data.reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, modelMessage]);

    } catch (err) {
      console.error(err);
      // Fallback
      setMessages(prev => [
        ...prev,
        {
          role: "model",
          text: "I am having trouble connecting to the civic servers right now. Please try again shortly or contact support.",
          time: "Just now"
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-2xl hover:scale-105 transition duration-300 z-50 flex items-center justify-center border border-white/20"
        id="ai-floating-trigger"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </button>

      {/* Main Chat Overlay drawer */}
      {isOpen && (
        <div 
          className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-2rem)] h-[500px] bg-white rounded-3xl border border-gray-100 shadow-2xl z-50 overflow-hidden flex flex-col justify-between animate-fadeIn text-left"
          id="civic-chatbot-drawer"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-900 to-indigo-950 p-4 text-white flex justify-between items-center border-b border-white/10">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 bg-white/10 rounded-xl border border-white/15">
                <Bot className="h-5 w-5 text-[#F6B93B]" />
              </div>
              <div>
                <h3 className="font-display font-extrabold text-sm text-white">Civic AI Assistant</h3>
                <p className="text-[10px] text-blue-200 font-medium">Ask any local concern or check SLAs</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-blue-200 hover:text-white transition">
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages box */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
            
            {messages.map((m, idx) => (
              <div 
                key={idx} 
                className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div className={`max-w-[85%] p-3.5 rounded-2xl text-xs font-semibold leading-relaxed shadow-sm ${
                  m.role === 'user' 
                    ? "bg-[#0A74DA] text-white rounded-tr-none" 
                    : "bg-white text-gray-800 rounded-tl-none border border-gray-100"
                }`}>
                  {m.text}
                </div>
                <span className="text-[8px] text-gray-400 mt-1 pl-1.5 font-bold uppercase tracking-wider">{m.time}</span>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center space-x-2 bg-white p-3.5 border border-gray-100 rounded-2xl text-xs font-semibold text-gray-600 max-w-[70%]">
                <Cpu className="h-4 w-4 animate-spin text-blue-600" />
                <span>AI is searching city registers...</span>
              </div>
            )}

            <div ref={scrollRef}></div>
          </div>

          {/* Quick starters slider */}
          {messages.length === 1 && (
            <div className="px-4 py-3 bg-white border-t border-gray-50">
              <p className="text-[9px] font-bold text-gray-400 uppercase mb-2">Recommended Prompts</p>
              <div className="grid grid-cols-1 gap-1.5">
                {starters.map((st, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(st)}
                    className="text-left text-[10px] p-2 bg-gray-50 hover:bg-blue-50 hover:text-blue-700 font-bold text-gray-700 rounded-xl transition border border-gray-100 truncate"
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input field */}
          <div className="p-3 bg-white border-t border-gray-100 flex items-center space-x-2">
            <input
              type="text"
              placeholder="Ask about potholes, water leaks, SLAs..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSendMessage(input);
              }}
              className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={() => handleSendMessage(input)}
              className="p-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition flex items-center justify-center cursor-pointer"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>

        </div>
      )}
    </>
  );
}
