export interface AnimeQuestion {
  id: string;
  title: string; // The correct anime name
  mongolianTitle?: string; // Mongolian translation or popular name
  emojiClue: string; // E.g. "🍊 🏴‍☠️ 🍖 ⚓"
  pictureUrl: string; // Aesthetic Unsplash picture representing the theme
  options: string[]; // 4 multiple choice options
  difficulty: "Easy" | "Medium" | "Hard";
  hints: {
    firstLetter: string;
    lengthInfo: string;
    textClue: string; // In Mongolian
    genre: string;
  };
}

export interface PlayerStats {
  score: number;
  highScore: number;
  streak: number;
  hintsRemaining: number;
  timeLeft: number;
}

export type GameMode = "emoji" | "picture";
