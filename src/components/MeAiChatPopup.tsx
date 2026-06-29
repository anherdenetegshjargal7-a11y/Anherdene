import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Message } from "../types";
import { MessageSquare, X, Send, Minus, Sparkles } from "lucide-react";

export default function MeAiChatPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init-me",
      sender: "bot",
      text: "Сайн байна уу! 🙋‍♂️ Намайг Анх-Эрдэнэ (Anherdene)-ийн хиймэл оюунт туслах (Me-AI) гэдэг. Та надаас миний ур чадвар, хийсэн төслүүд, ажлын туршлага, дуртай тоглоом, үзэх дуртай анимэ эсвэл хамтран ажиллах боломжуудын талаар юу ч хамаагүй асууж болно! 🎮🍿✨",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(scrollToBottom, 100);
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userText = inputValue;
    setInputValue("");

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: userText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Format chat history
      const messageHistory = messages
        .filter((m) => !m.id.startsWith("init-"))
        .map((m) => ({
          role: m.sender === "user" ? "user" : "assistant",
          text: m.text,
        }));

      const response = await fetch("/api/chat/me", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userText,
          history: messageHistory,
        }),
      });

      if (!response.ok) {
        throw new Error("Сүлжээний алдаа гарлаа");
      }

      const data = await response.json();

      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: data.text || "Уучлаарай, хариу ирүүлж чадсангүй.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error(error);
      const errorMessage: Message = {
        id: `err-${Date.now()}`,
        sender: "bot",
        text: "Холболт амжилтгүй боллоо. Та дахин оролдоно уу.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Floating Messenger-style Icon */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-14 h-14 rounded-full bg-gradient-to-r from-pink-600 to-indigo-600 text-white flex items-center justify-center shadow-xl hover:shadow-indigo-500/20 cursor-pointer relative group border border-white/20"
      >
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border border-slate-900"></span>
        </span>
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center"
            >
              <MessageSquare className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Tooltip */}
        {!isOpen && (
          <div className="absolute right-16 bg-slate-900/95 text-slate-100 text-xs py-1.5 px-3 rounded-lg border border-slate-800 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-lg">
            Анх-Эрдэнийн AI туслахтай чатлах 💬
          </div>
        )}
      </motion.button>

      {/* Chat Popup Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="absolute bottom-20 right-0 w-[360px] sm:w-[400px] h-[520px] bg-slate-950/95 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-indigo-600/20 border border-indigo-500 flex items-center justify-center text-white font-bold text-sm">
                    АЭ
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-slate-950"></span>
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">Me-AI Туслах</h3>
                  <p className="text-[10px] text-emerald-400">Анх-Эрдэнийн AI хувилбар</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg) => {
                const isMe = msg.sender === "user";
                return (
                  <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`p-3 rounded-xl text-xs max-w-[85%] leading-relaxed whitespace-pre-wrap ${
                        isMe
                          ? "bg-indigo-600 text-white rounded-tr-none"
                          : "bg-slate-900 text-slate-200 rounded-tl-none border border-slate-800"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                );
              })}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="p-3 rounded-xl bg-slate-900 text-slate-400 rounded-tl-none border border-slate-800 text-xs flex items-center gap-1.5">
                    <span>Me-AI бодож байна</span>
                    <span className="flex gap-0.5">
                      <span className="w-1 h-1 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                      <span className="w-1 h-1 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                      <span className="w-1 h-1 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                    </span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-800 bg-slate-900/40">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  disabled={isLoading}
                  placeholder="Асуух асуултаа энд бичнэ үү..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-3 pr-10 text-slate-200 text-xs focus:outline-none focus:border-indigo-500 transition-colors disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  className="absolute right-1.5 p-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="flex items-center justify-center gap-1 mt-1.5 text-[9px] text-slate-500">
                <Sparkles className="w-2.5 h-2.5 text-indigo-500" />
                <span>Gemini API-аар ажилладаг</span>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
