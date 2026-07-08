import { AnimeQuestion } from "../types/game";

export const ANIME_QUESTIONS: AnimeQuestion[] = [
  {
    id: "one-piece",
    title: "One Piece",
    mongolianTitle: "Ван Пис",
    emojiClue: "🏴‍☠️ 🍖 👒 🗺️ ⚓",
    pictureUrl: "/src/assets/images/op_new_clue_1783476159069.jpg",
    options: ["One Piece", "Naruto", "Fairy Tail", "Bleach"],
    difficulty: "Easy",
    hints: {
      firstLetter: "O",
      lengthInfo: "Хоёр үгнээс бүрдэнэ",
      textClue: "Далайн дээрэмчид болон эрдэнэсийн эрэлд гарах адал явдал.",
      genre: "Shonen / Adventure"
    }
  },
  {
    id: "naruto",
    title: "Naruto",
    mongolianTitle: "Наруто",
    emojiClue: "🦊 🍜 🌀 🗡️ 🐸",
    pictureUrl: "/src/assets/images/naruto_new_clue_1783476172737.jpg",
    options: ["Naruto", "Boruto", "Hunter x Hunter", "My Hero Academia"],
    difficulty: "Easy",
    hints: {
      firstLetter: "N",
      lengthInfo: "Нэг үгнээс бүрдэнэ",
      textClue: "Есөн сүүлт үнэгний хүчийг агуулсан нинжа хүүгийн түүх.",
      genre: "Shonen / Action"
    }
  },
  {
    id: "attack-on-titan",
    title: "Attack on Titan",
    mongolianTitle: "Титан руу довтолсон нь",
    emojiClue: "🧱 🧗 🗡️ 🩸 👑",
    pictureUrl: "/src/assets/images/aot_new_clue_1783476185516.jpg",
    options: ["Attack on Titan", "Neon Genesis Evangelion", "Vinland Saga", "Berserk"],
    difficulty: "Easy",
    hints: {
      firstLetter: "A",
      lengthInfo: "Гурван үгнээс бүрдэнэ",
      textClue: "Хүмүүсийг иддэг аварга биетүүд болон хананы цаана амьдрах хүн төрэлхтний тэмцэл.",
      genre: "Dark Fantasy"
    }
  },
  {
    id: "death-note",
    title: "Death Note",
    mongolianTitle: "Үхлийн тэмдэглэл",
    emojiClue: "📓 🍎 🖊️ 👁️ 👮",
    pictureUrl: "/src/assets/images/dn_new_clue_1783476197146.jpg",
    options: ["Death Note", "Code Geass", "Monster", "Detective Conan"],
    difficulty: "Easy",
    hints: {
      firstLetter: "D",
      lengthInfo: "Хоёр үгнээс бүрдэнэ",
      textClue: "Нэрээ бичсэн хүнээ алдаг нууцлаг дэвтэр олсон сурагч хүү.",
      genre: "Mystery / Thriller"
    }
  },
  {
    id: "demon-slayer",
    title: "Demon Slayer",
    mongolianTitle: "Чөтгөрийн ангууч",
    emojiClue: "👹 🎋 ⚔️ 🌊 🐗",
    pictureUrl: "/src/assets/images/ds_new_clue_1783476212052.jpg",
    options: ["Demon Slayer", "Jujutsu Kaisen", "Bleach", "Inuyasha"],
    difficulty: "Easy",
    hints: {
      firstLetter: "D",
      lengthInfo: "Хоёр үгнээс бүрдэнэ",
      textClue: "Дүүгээ хүн болгохын тулд чөтгөрүүдтэй тэмцэх ахын аялал.",
      genre: "Action / Historical"
    }
  },
  {
    id: "jujutsu-kaisen",
    title: "Jujutsu Kaisen",
    mongolianTitle: "Жужуцү Кайсэн",
    emojiClue: "👁️ 🤞 🐼 🔨 🔥",
    pictureUrl: "/src/assets/images/jjk_new_clue_1783476226483.jpg",
    options: ["Jujutsu Kaisen", "Chainsaw Man", "Tokyo Ghoul", "Bleach"],
    difficulty: "Medium",
    hints: {
      firstLetter: "J",
      lengthInfo: "Хоёр үгнээс бүрдэнэ",
      textClue: "Хараал болон шидтэнгүүдийн тулаан, Сукунагийн хурууг залгисан хүү.",
      genre: "Action / Dark Fantasy"
    }
  },
  {
    id: "dragon-ball-z",
    title: "Dragon Ball Z",
    mongolianTitle: "Драгон Бол Зэт",
    emojiClue: "🐉 ☄️ 🥋 🐵 💥",
    pictureUrl: "/src/assets/images/dbz_new_clue_1783476249104.jpg",
    options: ["Dragon Ball Z", "One Punch Man", "My Hero Academia", "Naruto"],
    difficulty: "Easy",
    hints: {
      firstLetter: "D",
      lengthInfo: "Гурван үгнээс бүрдэнэ",
      textClue: "Сөн Гокү болон түүний найзуудын дэлхийг хамгаалах хүчирхэг тулаанууд.",
      genre: "Shonen / Martial Arts"
    }
  },
  {
    id: "fullmetal-alchemist",
    title: "Fullmetal Alchemist",
    mongolianTitle: "Төмөр алхимич",
    emojiClue: "🦾 🧥 🪙 ⚙️ 🔴",
    pictureUrl: "/src/assets/images/fma_new_clue_1783476265488.jpg",
    options: ["Fullmetal Alchemist", "D.Gray-man", "Blue Exorcist", "Hunter x Hunter"],
    difficulty: "Medium",
    hints: {
      firstLetter: "F",
      lengthInfo: "Хоёр үгнээс бүрдэнэ",
      textClue: "Ээжийгээ амилуулах гэж оролдоод бие болон гараа алдсан ах дүү хоёрын түүх.",
      genre: "Adventure / Steampunk"
    }
  },
  {
    id: "hunter-x-hunter",
    title: "Hunter x Hunter",
    mongolianTitle: "Ангууч ангуучийн эрэлд",
    emojiClue: "🎣 ⚡ 🃏 👁️ 🗺️",
    pictureUrl: "/src/assets/images/hxh_new_clue_1783476277765.jpg",
    options: ["Hunter x Hunter", "Yu Yu Hakusho", "Naruto", "One Piece"],
    difficulty: "Medium",
    hints: {
      firstLetter: "H",
      lengthInfo: "Гурван үгнээс бүрдэнэ (дундаа х-тэй)",
      textClue: "Аавыгаа олохын тулд ангууч болохоор шийдсэн Гон хүүгийн аялал.",
      genre: "Adventure / Shonen"
    }
  },
  {
    id: "my-hero-academia",
    title: "My Hero Academia",
    mongolianTitle: "Миний баатрын академи",
    emojiClue: "🦸‍♂️ 🥦 💥 ❄️ 🔥",
    pictureUrl: "/src/assets/images/mha_new_clue_1783476290180.jpg",
    options: ["My Hero Academia", "One Punch Man", "Black Clover", "Assassination Classroom"],
    difficulty: "Easy",
    hints: {
      firstLetter: "M",
      lengthInfo: "Гурван үгнээс бүрдэнэ",
      textClue: "Ямар ч хүчгүй төрсөн Деку хүү All Might-аас хүч өвлөн авч буй түүх.",
      genre: "Superhero / School"
    }
  }
];
