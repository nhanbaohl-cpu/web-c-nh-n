import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, Bot, User, Sparkles, Loader2 } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  text: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, isLoading]);

  // Initial welcome message
  useEffect(() => {
    if (history.length === 0) {
      setHistory([
        {
          role: "assistant",
          text: "Xin chào! Tôi là Trợ lý AI của anh Trần Đình Bảo Nhân. Tôi có thể giúp bạn tìm hiểu về kinh nghiệm, các thành tích nổi bật của anh Nhân hoặc thông tin liên hệ. Bạn muốn tìm hiểu gì hôm nay?",
        },
      ]);
    }
  }, []);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    const userText = message;
    setMessage("");
    setHistory((prev) => [...prev, { role: "user", text: userText }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userText,
          history: history.map((h) => ({ role: h.role, text: h.text })),
        }),
      });

      const data = await response.json();
      if (response.ok && data.reply) {
        setHistory((prev) => [...prev, { role: "assistant", text: data.reply }]);
      } else {
        setHistory((prev) => [
          ...prev,
          {
            role: "assistant",
            text: data.error || "Rất tiếc, đã xảy ra lỗi khi kết nối với máy chủ AI. Xin bạn vui lòng thử lại.",
          },
        ]);
      }
    } catch (err) {
      console.error("Chat error:", err);
      setHistory((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Không thể kết nối đến máy chủ AI. Bạn hãy chắc chắn rằng máy chủ đang chạy và khóa API được định cấu hình chính xác.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestions = [
    "Thành tích Chân Gà Turkey?",
    "Kinh nghiệm E-commerce?",
    "Kỹ năng nổi bật?",
    "Thông tin liên hệ?",
  ];

  const handleSuggestionClick = (sug: string) => {
    setMessage(sug);
  };

  return (
    <>
      {/* Floating Chat Trigger Button */}
      <div className="fixed bottom-6 right-20 z-45">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 dark:border-slate-800 bg-slate-900/90 dark:bg-slate-900/90 text-white shadow-xl hover:shadow-blue-500/10 hover:border-blue-500/30 transition-all duration-300 cursor-pointer"
          title="Trò chuyện với Trợ lý AI"
        >
          {isOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <div className="relative">
              <MessageSquare className="h-5 w-5 text-blue-400" />
              <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-blue-500 animate-ping" />
              <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-blue-500" />
            </div>
          )}
        </motion.button>
      </div>

      {/* Expanded Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="fixed bottom-22 right-6 sm:right-20 z-45 w-[92vw] sm:w-[380px] h-[500px] flex flex-col rounded-2xl border border-white/10 bg-slate-900/90 backdrop-blur-xl shadow-2xl overflow-hidden transition-colors"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/5 bg-gradient-to-r from-blue-950/40 to-slate-900/40 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                  <Bot className="h-4.5 w-4.5 text-blue-400 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-sans text-xs font-bold text-white flex items-center gap-1.5">
                    Trợ lý AI Bảo Nhân
                    <Sparkles className="h-3 w-3 text-yellow-400" />
                  </h3>
                  <span className="text-[9px] text-slate-400 font-mono tracking-wider">ONLINE // GEMINI 3.5</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-all cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10">
              {history.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  <div
                    className={`h-7 w-7 rounded-full flex items-center justify-center text-[10px] shrink-0 border ${
                      msg.role === "user"
                        ? "bg-blue-600 border-blue-500 text-white"
                        : "bg-slate-800 border-white/5 text-slate-300"
                    }`}
                  >
                    {msg.role === "user" ? <User className="h-3.5 w-3.5" /> : <Bot className="h-3.5 w-3.5" />}
                  </div>

                  <div
                    className={`p-3 max-w-[80%] rounded-2xl text-xs leading-relaxed font-normal ${
                      msg.role === "user"
                        ? "bg-blue-600 text-white rounded-tr-none"
                        : "bg-slate-800/80 text-slate-200 rounded-tl-none border border-white/5"
                    }`}
                  >
                    {msg.text.split("\n").map((line, lidx) => (
                      <span key={lidx} className="block mb-1 last:mb-0">
                        {line}
                      </span>
                    ))}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-2.5">
                  <div className="h-7 w-7 rounded-full bg-slate-800 border border-white/5 text-slate-300 flex items-center justify-center shrink-0">
                    <Bot className="h-3.5 w-3.5" />
                  </div>
                  <div className="p-3 bg-slate-800/80 text-slate-300 rounded-2xl rounded-tl-none border border-white/5 flex items-center gap-2">
                    <Loader2 className="h-3.5 w-3.5 text-blue-400 animate-spin" />
                    <span className="text-[10px] font-mono tracking-widest text-slate-400">THINKING...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions */}
            {history.length < 3 && !isLoading && (
              <div className="px-4 pb-2 pt-1 flex flex-wrap gap-1.5 overflow-x-auto select-none">
                {suggestions.map((sug, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSuggestionClick(sug)}
                    className="px-2.5 py-1 text-[9px] font-semibold text-slate-300 border border-white/5 bg-slate-800/40 rounded-full hover:border-blue-500/40 hover:text-white hover:bg-slate-800/80 transition-all duration-300 cursor-pointer"
                  >
                    {sug}
                  </button>
                ))}
              </div>
            )}

            {/* Input Form */}
            <form onSubmit={handleSend} className="p-3 border-t border-white/5 bg-slate-900/60 flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Hỏi về kinh nghiệm, kỹ năng của anh Nhân..."
                className="flex-1 bg-slate-950/80 border border-white/5 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!message.trim() || isLoading}
                className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-600 text-white disabled:opacity-40 disabled:hover:bg-blue-600 hover:bg-blue-700 transition-colors cursor-pointer shrink-0 shadow-md"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
