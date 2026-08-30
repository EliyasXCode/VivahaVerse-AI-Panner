import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, Bot, User, MessageCircle, ChevronRight } from 'lucide-react';
import API from '../../services/api';
import toast from 'react-hot-toast';

const SUGGESTED_CHIPS = [
  "Where can I plan a royal wedding for ₹40 lakh?",
  "Udaipur vs Jaipur for 150 guests?",
  "Best beach wedding locations in December?",
  "Plan a 3-day Goa wedding under ₹30 lakh"
];

const AIChatConcierge = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: "Namaste! I am **Vivaha AI**, your luxury destination wedding concierge. Ask me anything about Indian wedding destinations, venue comparisons, or estimated celebration budgets.",
      chips: SUGGESTED_CHIPS
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const userMsg = { sender: 'user', text: query };
    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const res = await API.post('/ai/chat', {
        message: query,
        conversationHistory: messages
      });

      if (res.data.success) {
        const aiMsg = {
          sender: 'ai',
          text: res.data.chat.reply,
          chips: res.data.chat.suggestedChips || []
        };
        setMessages(prev => [...prev, aiMsg]);
      }
    } catch (error) {
      setMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: "I apologize, I am temporarily having trouble accessing the destination database. Please try again shortly.",
          chips: SUGGESTED_CHIPS
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Concierge Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 bg-wine text-gold p-4 rounded-full shadow-2xl border-2 border-gold hover:scale-105 hover:bg-wine-dark transition-all duration-300 flex items-center space-x-2 group"
      >
        <Sparkles className="w-6 h-6 animate-pulse" />
        <span className="font-serif font-bold text-sm text-white pr-1">Ask Vivaha AI</span>
      </button>

      {/* Concierge Slide Drawer */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 sm:right-6 w-[92vw] sm:w-[420px] h-[550px] bg-background-cream border border-gold/40 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden animate-fadeIn">
          
          {/* Header */}
          <div className="bg-wine text-white p-4 flex items-center justify-between border-b border-gold/20">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gold/20 border border-gold flex items-center justify-center text-gold">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-base tracking-wide leading-tight">Vivaha AI Concierge</h4>
                <p className="text-[10px] text-rose-blush">Database Grounded Wedding Intelligence</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-rose-blush hover:text-white p-1 rounded-full hover:bg-wine-dark transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-background/50 text-xs">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl ${
                    msg.sender === 'user'
                      ? 'bg-wine text-white rounded-br-none shadow-md'
                      : 'bg-white border border-gold/30 text-charcoal rounded-bl-none shadow-sm'
                  }`}
                >
                  <p className="whitespace-pre-line leading-relaxed">{msg.text}</p>
                </div>

                {/* Suggested Prompt Chips */}
                {msg.sender === 'ai' && msg.chips && msg.chips.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2 max-w-[90%]">
                    {msg.chips.map((chip, cIdx) => (
                      <button
                        key={cIdx}
                        onClick={() => handleSendMessage(chip)}
                        className="text-[10px] text-wine bg-rose-blush/30 hover:bg-gold hover:text-white border border-gold/30 px-2.5 py-1 rounded-full text-left transition-colors flex items-center space-x-1"
                      >
                        <span>{chip}</span>
                        <ChevronRight className="w-2.5 h-2.5 opacity-60" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-center space-x-2 text-charcoal-muted bg-white p-3 rounded-2xl border border-gold/20 w-max">
                <Bot className="w-4 h-4 text-wine animate-spin" />
                <span className="text-[11px] italic">Vivaha AI is consulting destination database...</span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-gold/20 flex items-center space-x-2"
          >
            <input
              type="text"
              placeholder="Ask about destinations, budget, or venues..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-background-cream text-charcoal text-xs px-3 py-2.5 rounded-full border border-gold/30 focus:outline-none focus:border-wine"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="bg-wine text-gold p-2.5 rounded-full hover:bg-wine-dark disabled:opacity-50 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
};

export default AIChatConcierge;
