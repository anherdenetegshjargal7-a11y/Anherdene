import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Message, Idol } from "../types";
import { Send, Sparkles, User, HelpCircle, RefreshCw } from "lucide-react";

const IDOLS: Idol[] = [
  {
    id: "lisa",
    name: "Lisa (BLACKPINK)",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
    role: "K-Pop Idol Coach",
    greeting: "Annyeong! 💖 Намайг Лиза гэдэг. Өнөөдөр ямар бүжиг, дуу эсвэл тайзны урлаг сурмаар байна? Хамтдаа зүтгэцгээе, Fighting! ✨🎤💃",
    color: "from-pink-500 to-rose-500",
    tagline: "Тайзны одод шиг гялалзаж, өөрийнхөөрөө байхад би тусална! ✨",
  },
  {
    id: "jobs",
    name: "Steve Jobs",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    role: "Visionary Tech Coach",
    greeting: "Welcome. Намайг Стив Жобс гэдэг. Энгийн байдал, төгс төгөлдөр хийц бол миний зарчим. Өнөөдөр ямар гайхалтай бүтээл, агуу санааг хэрэгжүүлж 'ертөнцийг өөрчлөх' үү? 🍏",
    color: "from-slate-700 to-slate-900",
    tagline: "Цоо шинээр сэтгэж, хамгийн агуу зүйлийг бүтээ. 🍏",
  },
  {
    id: "elon",
    name: "Elon Musk",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
    role: "First-Principles Coach",
    greeting: "Hey, Илон байна. Физикийн суурь хууль буюу 'First Principles' сэтгэлгээгээр ямар ч хэцүү асуудлыг шийдэж болно. Сансар огторгуй, Ангараг гараг руу аялах уу эсвэл өөр том технологи бүтээх үү? 🚀",
    color: "from-blue-600 to-indigo-900",
    tagline: "Хэцүү зүйлийг зоригтой эхлүүлж, Ангараг руу тэмүүл! 🚀",
  },
];

export default function IdolCoachChat() {
  const [selectedIdol, setSelectedIdol] = useState<Idol>(IDOLS[0]);
  const [messages, setMessages] = useState<Record<string, Message[]>>({
    lisa: [
      {
        id: "init-lisa",
        sender: "bot",
        text: IDOLS[0].greeting,
        timestamp: new Date(),
      },
    ],
    jobs: [
      {
        id: "init-jobs",
        sender: "bot",
        text: IDOLS[1].greeting,
        timestamp: new Date(),
      },
    ],
    elon: [
      {
        id: "init-elon",
        sender: "bot",
        text: IDOLS[2].greeting,
        timestamp: new Date(),
      },
    ],
  });
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentChat = messages[selectedIdol.id] || [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentChat, isLoading]);

  const handleIdolChange = (idol: Idol) => {
    setSelectedIdol(idol);
    // If no custom messages yet (just default greeting), preserve or reset is fine.
  };

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

    // Add user message locally
    const updatedChat = [...currentChat, userMessage];
    setMessages((prev) => ({
      ...prev,
      [selectedIdol.id]: updatedChat,
    }));
    setIsLoading(true);

    try {
      // Map message history to Gemini API format (removing system prompts)
      const messageHistory = currentChat
        .filter((m) => !m.id.startsWith("init-"))
        .map((m) => ({
          role: m.sender === "user" ? "user" : "assistant",
          text: m.text,
        }));

      const response = await fetch("/api/chat/idol", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userText,
          history: messageHistory,
          idolId: selectedIdol.id,
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

      setMessages((prev) => ({
        ...prev,
        [selectedIdol.id]: [...prev[selectedIdol.id], botMessage],
      }));
    } catch (error) {
      console.error(error);
      const errorMessage: Message = {
        id: `err-${Date.now()}`,
        sender: "bot",
        text: "Холболт амжилтгүй боллоо. Та дахин оролдоно уу.",
        timestamp: new Date(),
      };
      setMessages((prev) => ({
        ...prev,
        [selectedIdol.id]: [...prev[selectedIdol.id], errorMessage],
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    setMessages((prev) => ({
      ...prev,
      [selectedIdol.id]: [
        {
          id: `init-${selectedIdol.id}-${Date.now()}`,
          sender: "bot",
          text: selectedIdol.greeting,
          timestamp: new Date(),
        },
      ],
    }));
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row h-[700px] bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
      {/* Sidebar: Idol Selection */}
      <div className="w-full md:w-80 bg-slate-950/60 p-5 flex flex-col border-b md:border-b-0 md:border-r border-slate-800">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Sparkles className="text-pink-500 w-5 h-5" />
            Idol Coach сонгох
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Өөрийн сонирхолд нийцүүлэн зааварлагч багшаа сонгож, чатлаарай.
          </p>
        </div>

        <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-x-visible pb-3 md:pb-0 scrollbar-none">
          {IDOLS.map((idol) => {
            const isSelected = selectedIdol.id === idol.id;
            return (
              <button
                key={idol.id}
                onClick={() => handleIdolChange(idol)}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 text-left shrink-0 md:shrink border ${
                  isSelected
                    ? "bg-gradient-to-r text-white shadow-lg shadow-pink-500/10 border-pink-500/30"
                    : "bg-slate-900/40 hover:bg-slate-800/40 text-slate-300 border-transparent hover:border-slate-800"
                } ${isSelected ? idol.color : ""}`}
              >
                <img
                  src={idol.avatar}
                  alt={idol.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-white/20"
                />
                <div className="block">
                  <h4 className="font-semibold text-sm leading-tight">{idol.name}</h4>
                  <p className="text-xs text-white/70 mt-0.5">{idol.role}</p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-auto hidden md:block p-4 rounded-xl bg-slate-900/30 border border-slate-800/50">
          <p className="text-xs text-slate-400 italic">
            "{selectedIdol.tagline}"
          </p>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-slate-900/40">
        {/* Chat Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/20">
          <div className="flex items-center gap-3">
            <img
              src={selectedIdol.avatar}
              alt={selectedIdol.name}
              className="w-10 h-10 rounded-full object-cover border border-slate-700"
            />
            <div>
              <h3 className="font-bold text-white text-base">{selectedIdol.name}</h3>
              <p className="text-xs text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Идэвхтэй байна
              </p>
            </div>
          </div>

          <button
            onClick={handleClearHistory}
            className="p-2 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition-colors flex items-center gap-1 text-xs"
            title="Чат шинэчлэх"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="hidden sm:inline">Шинэчлэх</span>
          </button>
        </div>

        {/* Message List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <AnimatePresence initial={false}>
            {currentChat.map((msg) => {
              const isMe = msg.sender === "user";
              return (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                >
                  <div className={`flex gap-2 max-w-[80%] ${isMe ? "flex-row-reverse" : "flex-row"}`}>
                    {!isMe && (
                      <img
                        src={selectedIdol.avatar}
                        alt={selectedIdol.name}
                        className="w-8 h-8 rounded-full object-cover shrink-0 mt-1 border border-slate-700"
                      />
                    )}
                    <div>
                      <div
                        className={`p-3.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                          isMe
                            ? "bg-pink-600 text-white rounded-tr-none"
                            : "bg-slate-800 text-slate-100 rounded-tl-none border border-slate-700/50"
                        }`}
                      >
                        {msg.text}
                      </div>
                      <span className="text-[10px] text-slate-500 mt-1 block px-1 text-right">
                        {new Date(msg.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {isLoading && (
            <div className="flex justify-start">
              <div className="flex gap-2 max-w-[80%] flex-row">
                <img
                  src={selectedIdol.avatar}
                  alt={selectedIdol.name}
                  className="w-8 h-8 rounded-full object-cover shrink-0 mt-1 border border-slate-700"
                />
                <div>
                  <div className="p-4 rounded-2xl bg-slate-800 text-slate-300 rounded-tl-none border border-slate-700/50 flex items-center gap-2">
                    <span className="text-xs">{selectedIdol.name} бичиж байна</span>
                    <span className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                      <span className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                      <span className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-800 bg-slate-950/25">
          <div className="relative flex items-center">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isLoading}
              placeholder={`${selectedIdol.name}-той чатлах...`}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3.5 pl-4 pr-12 text-slate-100 text-sm focus:outline-none focus:border-pink-500 transition-colors placeholder:text-slate-500 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="absolute right-2 p-2 bg-pink-600 hover:bg-pink-500 text-white rounded-lg transition-colors disabled:opacity-50 disabled:hover:bg-pink-600"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <p className="text-[10px] text-slate-500 text-center mt-2 flex items-center justify-center gap-1">
            <Sparkles className="w-3 h-3 text-pink-500" />
            Powered by Gemini 3.5 Flash API
          </p>
        </form>
      </div>
    </div>
  );
}
