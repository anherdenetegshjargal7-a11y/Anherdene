import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { AnimeQuestion, GameMode, PlayerStats } from "../types/game";
import { ANIME_QUESTIONS } from "../data/animeQuestions";
import CHARACTER_QUESTIONS from "../data/data.json";
import { sounds } from "../utils/sound";
import { 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Zap, 
  RefreshCw, 
  BrainCircuit, 
  HelpCircle, 
  AlertCircle, 
  Image, 
  Smile, 
  Award, 
  Trophy, 
  Flame, 
  X, 
  UserCheck, 
  ChevronRight, 
  Eye, 
  Lock 
} from "lucide-react";

export default function AnimeQuizGame() {
  const [questions, setQuestions] = useState<AnimeQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [gameMode, setGameMode] = useState<GameMode>("emoji");
  const [eliminatedOptions, setEliminatedOptions] = useState<string[]>([]);
  
  // Stats & States
  const [stats, setStats] = useState<PlayerStats>({
    score: 0,
    highScore: 0,
    streak: 0,
    hintsRemaining: 3,
    timeLeft: 30,
  });
  const [maxStreak, setMaxStreak] = useState<number>(0);
  const [gameState, setGameState] = useState<"start" | "playing" | "gameover">("start");
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [showTextClue, setShowTextClue] = useState<boolean>(false);
  const [aiClueText, setAiClueText] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);
  const [showAiModal, setShowAiModal] = useState<boolean>(false);

  // Refs
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Load High Score from localStorage on mount
  useEffect(() => {
    const savedHighScore = localStorage.getItem("anime_quiz_highscore");
    if (savedHighScore) {
      setStats(prev => ({ ...prev, highScore: parseInt(savedHighScore, 10) }));
    }
  }, []);

  // Initialize and shuffle questions
  const startGame = (mode: GameMode) => {
    // Shuffle appropriate questions
    const pool = mode === "character" ? CHARACTER_QUESTIONS : ANIME_QUESTIONS;
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    setQuestions(shuffled as AnimeQuestion[]);
    setCurrentIdx(0);
    setGameMode(mode);
    setSelectedOption(null);
    setIsAnswered(false);
    setEliminatedOptions([]);
    setShowTextClue(false);
    setAiClueText(null);
    setMaxStreak(0);
    
    // Get highscore
    const savedHighScore = localStorage.getItem("anime_quiz_highscore");
    const hs = savedHighScore ? parseInt(savedHighScore, 10) : 0;

    setStats({
      score: 0,
      highScore: hs,
      streak: 0,
      hintsRemaining: 3,
      timeLeft: 30,
    });
    setGameState("playing");
  };

  // Timer logic
  useEffect(() => {
    if (gameState !== "playing" || isAnswered) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setStats((prev) => {
        if (prev.timeLeft <= 1) {
          // Time Ran Out! Treat as incorrect
          clearInterval(timerRef.current!);
          handleTimeOut();
          return { ...prev, timeLeft: 0 };
        }
        // Play soft ticking sound in final 5 seconds
        if (prev.timeLeft <= 6) {
          sounds.playTick();
        }
        return { ...prev, timeLeft: prev.timeLeft - 1 };
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState, currentIdx, isAnswered]);

  const handleTimeOut = () => {
    sounds.playWrong();
    setIsAnswered(true);
    setSelectedOption(""); // empty represents timeout
    setStats((prev) => ({
      ...prev,
      streak: 0,
    }));
  };

  const handleOptionSelect = (option: string) => {
    if (isAnswered) return;

    const currentQuestion = questions[currentIdx];
    const isCorrect = option === currentQuestion.title;
    setIsAnswered(true);
    setSelectedOption(option);

    if (timerRef.current) clearInterval(timerRef.current);

    if (isCorrect) {
      sounds.playCorrect();
      const newStreak = stats.streak + 1;
      const pointsAwarded = Math.max(10, Math.floor(stats.timeLeft * 3.5)) + (newStreak * 5);
      
      setStats((prev) => {
        const newScore = prev.score + pointsAwarded;
        const newHighScore = Math.max(prev.highScore, newScore);
        
        if (newHighScore > prev.highScore) {
          localStorage.setItem("anime_quiz_highscore", newHighScore.toString());
        }

        return {
          ...prev,
          score: newScore,
          highScore: newHighScore,
          streak: newStreak,
        };
      });

      if (newStreak > maxStreak) {
        setMaxStreak(newStreak);
      }
    } else {
      sounds.playWrong();
      setStats((prev) => ({
        ...prev,
        streak: 0,
      }));
    }
  };

  const handleNextQuestion = () => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setEliminatedOptions([]);
      setShowTextClue(false);
      setAiClueText(null);
      setStats(prev => ({
        ...prev,
        timeLeft: 30,
      }));
    } else {
      // End of all questions
      sounds.playGameOver();
      setGameState("gameover");
    }
  };

  // Sound Mute toggle
  const toggleMute = () => {
    const muted = !isMuted;
    setIsMuted(muted);
    sounds.setMute(muted);
  };

  // Spend Hint: Eliminate 50/50 options
  const handleSpendHintEliminate = () => {
    if (stats.hintsRemaining <= 0 || isAnswered) return;

    sounds.playHint();
    const currentQuestion = questions[currentIdx];
    const wrongOptions = currentQuestion.options.filter(opt => opt !== currentQuestion.title);
    
    // Randomly pick 2 wrong options to eliminate
    const shuffledWrong = [...wrongOptions].sort(() => Math.random() - 0.5);
    const toEliminate = shuffledWrong.slice(0, 2);

    setEliminatedOptions(prev => [...prev, ...toEliminate]);
    setStats(prev => ({
      ...prev,
      hintsRemaining: prev.hintsRemaining - 1
    }));
  };

  // Spend Hint: Reveal Text Clue
  const handleRevealTextClue = () => {
    if (showTextClue) {
      setShowTextClue(false);
      return;
    }
    if (stats.hintsRemaining <= 0 || isAnswered) return;

    sounds.playHint();
    setShowTextClue(true);
    setStats(prev => ({
      ...prev,
      hintsRemaining: prev.hintsRemaining - 1
    }));
  };

  // Ask AI Clue (Gemini powered)
  const handleAskAiSensei = async () => {
    if (stats.hintsRemaining <= 0 || isAnswered || isAiLoading) return;

    sounds.playHint();
    setIsAiLoading(true);
    setShowAiModal(true);

    const currentQuestion = questions[currentIdx];

    try {
      const response = await fetch("/api/quiz/ai-clue", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: currentQuestion.title,
          genre: currentQuestion.hints.genre,
          difficulty: currentQuestion.difficulty,
          isCharacter: gameMode === "character",
        }),
      });

      const data = await response.json();
      setAiClueText(data.clue || "Анимэ Сэнсэй ямар нэг нууцлаг дохио өгсөнгүй.");
      setStats(prev => ({
        ...prev,
        hintsRemaining: prev.hintsRemaining - 1
      }));
    } catch (e) {
      console.error(e);
      setAiClueText("Сүлжээний холболт тасарлаа. Гэхдээ заавар: Энэ анимэгийн анхны үсэг нь " + currentQuestion.hints.firstLetter);
    } finally {
      setIsAiLoading(false);
    }
  };

  const currentQuestion = questions[currentIdx];

  // Simulated leaderboard names for final gameover overlay
  const leaderboardMock = [
    { name: "Monkey D. Luffy 👑", score: 2850, date: "Өнөөдөр" },
    { name: "Uzuzmaki Naruto 🦊", score: 2450, date: "Өнөөдөр" },
    { name: "Tanjiro Kamado 🌊", score: 2100, date: "Өчигдөр" },
    { name: "Таны оноо ⭐", score: stats.score, date: "Одоо", isPlayer: true },
    { name: "Goku ⚡", score: 1800, date: "Саяхан" },
  ].sort((a, b) => b.score - a.score);

  return (
    <div className="w-full max-w-4xl mx-auto min-h-[680px] bg-slate-950/45 backdrop-blur-xl rounded-3xl border border-slate-900 overflow-hidden shadow-2xl flex flex-col relative font-sans text-slate-100">
      
      {/* Absolute Header with Status Controls */}
      <div className="px-6 py-4 border-b border-slate-900 bg-slate-950/80 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-600/10 border border-purple-500/20 rounded-xl">
            <BrainCircuit className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h1 className="font-display font-extrabold text-lg text-white leading-none tracking-tight">
              Anime IQ Quiz
            </h1>
            <p className="text-[10px] font-mono text-purple-400 mt-1 uppercase tracking-wider">
              Gemini 3.5 Flash Powered
            </p>
          </div>
        </div>

        {/* Global Controls */}
        <div className="flex items-center gap-2">
          {/* Sound Controls */}
          <button
            onClick={toggleMute}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
            title={isMuted ? "Аудио нээх" : "Аудио хаах"}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* High Score Badge */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-400 text-xs font-semibold">
            <Trophy className="w-3.5 h-3.5" />
            <span>Дээд оноо: {stats.highScore}</span>
          </div>
        </div>
      </div>

      {/* Dynamic Game States */}
      <AnimatePresence mode="wait">
        
        {/* State 1: Start Screen */}
        {gameState === "start" && (
          <motion.div
            key="start"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-8"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
              <span className="text-7xl block relative animate-bounce">🎌</span>
            </div>

            <div className="space-y-3 max-w-lg">
              <h2 className="font-display text-3xl sm:text-4xl font-black tracking-tight text-white">
                Анимэ сонирхогчдын <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">IQ Сорилт</span>
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed">
                Эможи тайлал болон дүрслэлийн тааварт хэр сайн бэ? Өөрийн танин мэдэхүйг ухаалаг анимэ тааварт сорьж, анимэ сэнсэйгээс тусламж аваарай.
              </p>
            </div>

            {/* Mode Selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl">
              <button
                id="btn-emoji-mode"
                onClick={() => startGame("emoji")}
                className="group relative p-5 bg-gradient-to-b from-purple-900/40 to-slate-900/80 rounded-2xl border border-purple-500/30 hover:border-purple-400 text-left transition-all hover:shadow-lg hover:shadow-purple-500/5 cursor-pointer"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl">🧩</span>
                  <ChevronRight className="w-5 h-5 text-purple-400 group-hover:translate-x-1 transition-transform" />
                </div>
                <h3 className="font-bold text-white text-base">Emoji Guess Mode</h3>
                <p className="text-xs text-slate-400 mt-1">Орчин үеийн эможи багцаар анимэг таах</p>
              </button>

              <button
                id="btn-picture-mode"
                onClick={() => startGame("picture")}
                className="group relative p-5 bg-gradient-to-b from-pink-900/40 to-slate-900/80 rounded-2xl border border-pink-500/30 hover:border-pink-400 text-left transition-all hover:shadow-lg hover:shadow-pink-500/5 cursor-pointer"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl">📷</span>
                  <ChevronRight className="w-5 h-5 text-pink-400 group-hover:translate-x-1 transition-transform" />
                </div>
                <h3 className="font-bold text-white text-base">Picture Guess Mode</h3>
                <p className="text-xs text-slate-400 mt-1">Анимэ дүрслэл, алдартай зургуудаар таах</p>
              </button>

              <button
                id="btn-character-mode"
                onClick={() => startGame("character")}
                className="group relative p-5 bg-gradient-to-b from-amber-900/40 to-slate-900/80 rounded-2xl border border-amber-500/30 hover:border-amber-400 text-left transition-all hover:shadow-lg hover:shadow-amber-500/5 cursor-pointer"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl">⚔️</span>
                  <ChevronRight className="w-5 h-5 text-amber-400 group-hover:translate-x-1 transition-transform" />
                </div>
                <h3 className="font-bold text-white text-base">Hero Guess Mode</h3>
                <p className="text-xs text-slate-400 mt-1">Luffy, Naruto, Goku гэх мэт анимэ баатруудыг таах</p>
              </button>
            </div>

            <p className="text-[10px] text-slate-500 font-mono">
              Нэг асуултад 30 секунд. 3 амь/тусламжтай эхэлнэ.
            </p>
          </motion.div>
        )}

        {/* State 2: Active Playing HUD */}
        {gameState === "playing" && currentQuestion && (
          <motion.div
            key="playing"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col p-6 space-y-6"
          >
            {/* Top HUD bar with stats */}
            <div className="flex items-center justify-between bg-slate-900/30 p-3 rounded-2xl border border-slate-900">
              <div className="flex items-center gap-4">
                {/* Question tracker */}
                <div className="text-xs font-mono text-slate-400">
                  Асуулт: <span className="text-white font-bold">{currentIdx + 1}/{questions.length}</span>
                </div>
                
                {/* Points score */}
                <div className="text-xs font-mono text-purple-400 flex items-center gap-1">
                  <Award className="w-3.5 h-3.5" />
                  Оноо: <span className="text-white font-bold font-sans">{stats.score}</span>
                </div>

                {/* Streak animation */}
                {stats.streak > 0 && (
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex items-center gap-1 px-2.5 py-0.5 bg-orange-500/10 border border-orange-500/20 text-orange-400 rounded-full text-xs font-bold"
                  >
                    <Flame className="w-3.5 h-3.5 fill-orange-500 animate-bounce" />
                    <span>{stats.streak} Дараалсан!</span>
                  </motion.div>
                )}
              </div>

              {/* Hints Remaining */}
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-slate-400 mr-1 hidden sm:inline">Боломжит тусламж:</span>
                <div className="flex gap-1">
                  {Array.from({ length: 3 }).map((_, idx) => (
                    <span 
                      key={idx}
                      className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[10px] ${
                        idx < stats.hintsRemaining 
                          ? "bg-purple-600 text-white shadow-md shadow-purple-600/35" 
                          : "bg-slate-900 text-slate-700 border border-slate-800"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Countdown Progress Bar (30s timer) */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>Хугацаа</span>
                <span className={stats.timeLeft <= 6 ? "text-red-400 animate-pulse font-bold" : ""}>
                  {stats.timeLeft} сек
                </span>
              </div>
              <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-900/50">
                <motion.div
                  className={`h-full ${
                    stats.timeLeft <= 6 ? "bg-red-500" : stats.timeLeft <= 15 ? "bg-amber-500" : "bg-purple-500"
                  }`}
                  animate={{ width: `${(stats.timeLeft / 30) * 100}%` }}
                  transition={{ duration: 1, ease: "linear" }}
                />
              </div>
            </div>

            {/* Main Interactive Quiz Stage */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              
              {/* Left Column: Clue Box */}
              <div className="flex flex-col space-y-4">
                <div className="flex-1 bg-slate-900/40 rounded-2xl border border-slate-800 p-6 flex flex-col items-center justify-center min-h-[220px] relative overflow-hidden">
                  
                  {/* Subtle Background Elements */}
                  <div className="absolute top-2 left-2 text-[10px] font-mono text-slate-600">
                    ТАНИХ ТЭМДЭГ
                  </div>
                  <div className="absolute top-2 right-2">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      currentQuestion.difficulty === "Easy" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" :
                      currentQuestion.difficulty === "Medium" ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" :
                      "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                    }`}>
                      {currentQuestion.difficulty}
                    </span>
                  </div>

                  {/* Guess Mode Display */}
                  {gameMode === "emoji" ? (
                    <motion.div 
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="text-center space-y-4"
                    >
                      <div className="text-4xl sm:text-5xl tracking-widest bg-slate-950/80 px-6 py-4 rounded-2xl border border-slate-800/80 shadow-inner flex justify-center gap-2 select-none">
                        {currentQuestion.emojiClue.split(" ").map((emoji, i) => (
                          <motion.span 
                            key={i}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", delay: i * 0.1 }}
                          >
                            {emoji}
                          </motion.span>
                        ))}
                      </div>
                      <p className="text-xs text-slate-500">Дээрх эможинуудаар аялал болон үйл явдлыг илэрхийлсэн анимэг таана уу.</p>
                    </motion.div>
                  ) : (
                    <div className="w-full h-full min-h-[160px] relative rounded-xl overflow-hidden border border-slate-800 flex flex-col justify-between">
                      <div className="w-full h-full relative flex-1 min-h-[160px]">
                        <img
                          src={currentQuestion.pictureUrl}
                          alt="Anime clue illustration"
                          className={`w-full h-full object-cover transition-all duration-700 ${
                            isAnswered ? "blur-0" : "blur-sm"
                          }`}
                          referrerPolicy="no-referrer"
                        />
                        {!isAnswered && (
                          <div className="absolute inset-0 bg-slate-950/40 flex flex-col items-center justify-center text-center p-4">
                            <Eye className="w-8 h-8 text-pink-400/80 mb-2 animate-pulse" />
                            <p className="text-xs text-slate-100 font-semibold drop-shadow-md">Зураг бүдгэрүүлсэн байна</p>
                            <p className="text-[10px] text-slate-200 mt-1 drop-shadow-md">
                              {gameMode === "character" ? "Баатрыг зөв таавал зураг тодорно!" : "Анимэг зөв таавал зураг тодорно!"}
                            </p>
                          </div>
                        )}
                      </div>
                      <div className="bg-slate-950/90 py-2 px-3 border-t border-slate-850 text-center">
                        <p className="text-xs font-semibold text-slate-300">
                          {gameMode === "character" ? "Энэхүү алдартай анимэ дүрийн нэр хэн бэ?" : "Энэхүү дүрслэлээр анимэг таана уу."}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Fallback Text Clue Revealed button */}
                  {showTextClue && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 p-3 bg-slate-950 border border-slate-800 rounded-xl w-full text-xs space-y-1 text-slate-300"
                    >
                      <p className="font-semibold text-purple-400 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        Нэмэлт зөвлөгөө:
                      </p>
                      <p className="leading-relaxed">{currentQuestion.hints.textClue}</p>
                      <div className="flex gap-4 pt-1 text-[10px] text-slate-500 font-mono">
                        <span>Үсэг: {currentQuestion.hints.firstLetter}...</span>
                        <span>Урт: {currentQuestion.hints.lengthInfo}</span>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Sub Clue Action buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={handleRevealTextClue}
                    disabled={(!showTextClue && stats.hintsRemaining <= 0) || isAnswered}
                    className="flex-1 py-2.5 px-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 disabled:opacity-40 rounded-xl text-xs text-slate-300 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <HelpCircle className="w-3.5 h-3.5 text-indigo-400" />
                    {showTextClue ? "Зөвлөгөө нуух" : "Текст зөвлөгөө (Кост: 1)"}
                  </button>

                  <button
                    id="btn-get-hint"
                    onClick={handleAskAiSensei}
                    disabled={stats.hintsRemaining <= 0 || isAnswered || isAiLoading}
                    className="flex-1 py-2.5 px-3 bg-gradient-to-r from-purple-900/40 to-pink-900/40 hover:from-purple-900/60 hover:to-pink-900/60 border border-purple-500/20 disabled:opacity-40 rounded-xl text-xs text-white flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
                    <span>Get Hint</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Multiple Choice Options */}
              <div className="flex flex-col justify-between space-y-4">
                <div className="space-y-2.5 flex-1 flex flex-col justify-center">
                  {currentQuestion.options.map((option) => {
                    const isCorrectOption = option === currentQuestion.title;
                    const isSelected = option === selectedOption;
                    const isEliminated = eliminatedOptions.includes(option);

                    let btnStyle = "bg-slate-900/40 hover:bg-slate-900 border-slate-800 text-slate-300";
                    if (isAnswered) {
                      if (isCorrectOption) {
                        btnStyle = "bg-emerald-600 border-emerald-500 text-white shadow-lg shadow-emerald-600/20";
                      } else if (isSelected) {
                        btnStyle = "bg-red-600 border-red-500 text-white shadow-lg shadow-red-600/20";
                      } else {
                        btnStyle = "bg-slate-950 border-slate-900 opacity-40 text-slate-500";
                      }
                    } else if (isEliminated) {
                      btnStyle = "bg-slate-950/20 border-slate-950/40 opacity-30 cursor-not-allowed text-slate-600 line-through";
                    }

                    return (
                      <button
                        key={option}
                        disabled={isAnswered || isEliminated}
                        onClick={() => handleOptionSelect(option)}
                        className={`w-full p-4 text-left font-semibold text-sm rounded-2xl border transition-all duration-300 flex items-center justify-between ${btnStyle} ${
                          !isAnswered && !isEliminated ? "hover:-translate-y-0.5 active:scale-98 cursor-pointer" : ""
                        }`}
                      >
                        <span>{option}</span>
                        {isAnswered && isCorrectOption && (
                          <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">✓</span>
                        )}
                        {isAnswered && isSelected && !isCorrectOption && (
                          <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">✗</span>
                        )}
                        {isEliminated && (
                          <span className="text-[10px] font-mono text-slate-600 uppercase">Хассан</span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Bottom navigation or trigger for next question */}
                <div className="h-14 flex items-center">
                  {isAnswered ? (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      onClick={handleNextQuestion}
                      className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-indigo-600/15 flex items-center justify-center gap-2"
                    >
                      <span>Дараагийн асуулт</span>
                      <ChevronRight className="w-4 h-4" />
                    </motion.button>
                  ) : (
                    <div className="w-full text-center text-xs text-slate-500 font-mono flex items-center justify-center gap-2">
                      <Lock className="w-3.5 h-3.5 text-slate-600" />
                      <span>Хариулт сонгосны дараа дараагийн шат руу шилжинэ</span>
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* Bottom Actions Row (e.g. Help Assist) */}
            <div className="p-4 bg-slate-900/20 rounded-2xl border border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-400 flex items-center gap-1.5">
                <BrainCircuit className="w-4 h-4 text-purple-400" />
                <span>Энэ шатанд танд туслах ухаалаг механизмуудыг ашиглаарай.</span>
              </div>
              
              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  onClick={handleSpendHintEliminate}
                  disabled={stats.hintsRemaining <= 0 || isAnswered || eliminatedOptions.length > 0}
                  className="flex-1 sm:flex-none px-4 py-2 bg-slate-900 hover:bg-slate-850 border border-slate-800 disabled:opacity-40 text-xs text-slate-300 rounded-xl transition-colors flex items-center justify-center gap-1"
                >
                  ✂ 50/50 Хасах (Кост: 1)
                </button>
              </div>
            </div>

          </motion.div>
        )}

        {/* State 3: Game Over Overlay / Score Board */}
        {gameState === "gameover" && (
          <motion.div
            key="gameover"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col md:flex-row items-stretch p-6 gap-8"
          >
            {/* Left Box: Score card */}
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6 bg-slate-900/30 rounded-2xl border border-slate-800 space-y-6">
              <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-full animate-pulse">
                <Trophy className="w-12 h-12 text-amber-400" />
              </div>

              <div className="space-y-2">
                <h2 className="font-display text-3xl font-black text-white">Дууслаа!</h2>
                <p className="text-sm text-slate-400">Та бүх асуултуудыг амжилттай давж дуусгалаа.</p>
              </div>

              {/* Statistics Grid */}
              <div className="grid grid-cols-2 gap-4 w-full max-w-sm pt-4">
                <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800/80 text-center">
                  <span className="text-xs text-slate-500 block uppercase font-mono">Нийт Оноо</span>
                  <span className="text-2xl font-bold text-white font-sans">{stats.score}</span>
                </div>
                <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800/80 text-center">
                  <span className="text-xs text-slate-500 block uppercase font-mono">Дээд Стрик</span>
                  <span className="text-2xl font-bold text-orange-400 font-sans">🔥 {maxStreak}</span>
                </div>
              </div>

              <div className="flex gap-3 w-full max-w-sm pt-4">
                <button
                  onClick={() => startGame(gameMode)}
                  className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/10"
                >
                  <RefreshCw className="w-4 h-4" />
                  Дахин тоглох
                </button>
                <button
                  onClick={() => setGameState("start")}
                  className="px-4 py-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl text-slate-300 font-semibold"
                >
                  Цэс рүү
                </button>
              </div>
            </div>

            {/* Right Box: Leaderboard */}
            <div className="w-full md:w-80 bg-slate-900/30 p-6 rounded-2xl border border-slate-800 flex flex-col justify-between">
              <div>
                <h3 className="font-display font-extrabold text-lg text-white mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-purple-400" />
                  Leaderboard
                </h3>
                
                <div className="space-y-2.5">
                  {leaderboardMock.map((leader, i) => (
                    <div 
                      key={i} 
                      className={`p-3 rounded-xl border flex items-center justify-between text-xs transition-all ${
                        leader.isPlayer 
                          ? "bg-purple-950/40 border-purple-500/30 text-white font-bold" 
                          : "bg-slate-950/40 border-transparent text-slate-400"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className={`w-5 h-5 rounded-md flex items-center justify-center font-mono font-bold text-[10px] ${
                          i === 0 ? "bg-amber-500 text-slate-950" :
                          i === 1 ? "bg-slate-300 text-slate-950" :
                          i === 2 ? "bg-orange-600 text-white" : "bg-slate-900 text-slate-400"
                        }`}>
                          {i + 1}
                        </span>
                        <span>{leader.name}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-white block">{leader.score}</span>
                        <span className="text-[9px] text-slate-600 font-mono">{leader.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-[10px] text-slate-500 leading-relaxed mt-6">
                Амжилтаа ахим шинэчилж, Төгсбаяр болон бусад сонирхогчидтой өрсөлдөөрэй! 🎉
              </div>
            </div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* AI Sensei Helper Clue Modal */}
      <AnimatePresence>
        {showAiModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1 bg-pink-500/10 border border-pink-500/20 rounded-lg">
                    <Sparkles className="w-4 h-4 text-pink-400" />
                  </div>
                  <h3 className="font-bold text-white text-sm">🔮 Анимэ Сэнсэйн Зөвлөмж</h3>
                </div>
                <button
                  onClick={() => setShowAiModal(false)}
                  className="p-1 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 space-y-4">
                {isAiLoading ? (
                  <div className="py-8 flex flex-col items-center justify-center space-y-3">
                    <span className="w-10 h-10 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></span>
                    <p className="text-xs text-slate-400">Сэнсэй асуултыг тольдон үзэж байна...</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 text-xs text-slate-300 leading-relaxed whitespace-pre-wrap">
                      {aiClueText}
                    </div>
                    <div className="text-[10px] font-mono text-slate-500 flex items-center gap-1">
                      <Zap className="w-3 h-3 text-pink-400" />
                      <span>Зөвлөмж амжилттай ирлээ.</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-3 bg-slate-950 border-t border-slate-800 flex justify-end">
                <button
                  onClick={() => setShowAiModal(false)}
                  className="px-4 py-1.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded-lg text-xs font-semibold text-slate-200 transition-colors"
                >
                  Хаах
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
