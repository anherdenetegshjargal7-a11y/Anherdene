import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import PortfolioView from "./components/PortfolioView";
import IdolCoachChat from "./components/IdolCoachChat";
import MeAiChatPopup from "./components/MeAiChatPopup";
import AnimeQuizGame from "./components/AnimeQuizGame";
import MyWebsiteView from "./components/MyWebsiteView";
import { Sparkles, Code2, MessageSquare, Terminal, Gamepad2 } from "lucide-react";

type Tab = "quiz" | "portfolio" | "idol" | "website";

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("quiz");

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col relative overflow-hidden font-sansSelection">
      {/* Background Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-900/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-900/10 rounded-full blur-3xl pointer-events-none" />

      {/* Navigation Header */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-900/80 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <button 
            onClick={() => setActiveTab("portfolio")}
            className="flex items-center gap-2.5 font-display font-extrabold text-lg sm:text-xl tracking-tight text-white focus:outline-none group cursor-pointer"
          >
            <span className="p-1.5 bg-gradient-to-tr from-indigo-600 to-pink-600 rounded-lg text-white">
              <Terminal className="w-4 h-4" />
            </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-300 group-hover:text-indigo-400 transition-colors">
              Anherdene
            </span>
          </button>

          {/* Tab Navigation */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setActiveTab("quiz")}
              className={`relative px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                activeTab === "quiz"
                  ? "text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {activeTab === "quiz" && (
                <motion.div
                  layoutId="active-tab"
                  className="absolute inset-0 bg-slate-900 border border-slate-800 rounded-xl"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1">
                🎮 Анимэ Асуулт
              </span>
            </button>

            <button
              onClick={() => setActiveTab("portfolio")}
              className={`relative px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                activeTab === "portfolio"
                  ? "text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {activeTab === "portfolio" && (
                <motion.div
                  layoutId="active-tab"
                  className="absolute inset-0 bg-slate-900 border border-slate-800 rounded-xl"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">Портфолио</span>
            </button>

            <button
              onClick={() => setActiveTab("idol")}
              className={`relative px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                activeTab === "idol"
                  ? "text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {activeTab === "idol" && (
                <motion.div
                  layoutId="active-tab"
                  className="absolute inset-0 bg-gradient-to-r from-pink-600/10 to-rose-600/10 border border-pink-500/30 rounded-xl"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                🤖 My Idol
              </span>
            </button>

            <button
              onClick={() => setActiveTab("website")}
              className={`relative px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                activeTab === "website"
                  ? "text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {activeTab === "website" && (
                <motion.div
                  layoutId="active-tab"
                  className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-pink-600/10 border border-indigo-500/30 rounded-xl"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                🌐 Вэбсайт
              </span>
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content View with Slide/Fade Transition */}
      <main className="flex-1 px-4 py-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            {activeTab === "quiz" ? (
              <motion.div
                key="quiz"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <AnimeQuizGame />
              </motion.div>
            ) : activeTab === "portfolio" ? (
              <motion.div
                key="portfolio"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                transition={{ duration: 0.3 }}
              >
                <PortfolioView onNavigateToIdol={() => setActiveTab("idol")} />
              </motion.div>
            ) : activeTab === "idol" ? (
              <motion.div
                key="idol"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.3 }}
              >
                <IdolCoachChat />
              </motion.div>
            ) : (
              <motion.div
                key="website"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <MyWebsiteView />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-8 px-6 text-center text-slate-500 text-xs">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Анх-Эрдэнэ. Бүх эрх хуулиар хамгаалагдсан.</p>
          <p className="flex items-center gap-1">
            Бүтээлчээр хөгжүүлэв <Sparkles className="w-3.5 h-3.5 text-pink-500" /> & Gemini AI
          </p>
        </div>
      </footer>

      {/* Persistent Floating Me-AI Chat Assistant */}
      <MeAiChatPopup />
    </div>
  );
}
