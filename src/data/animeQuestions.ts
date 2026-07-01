import { AnimeQuestion } from "../types/game";

export const ANIME_QUESTIONS: AnimeQuestion[] = [
  {
    id: "one-piece",
    title: "One Piece",
    mongolianTitle: "Ван Пис",
    emojiClue: "🏴‍☠️ 🍖 👒 🗺️ ⚓",
    pictureUrl: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&q=80&w=600",
    options: ["Naruto", "One Piece", "Bleach", "Fairy Tail"],
    difficulty: "Easy",
    hints: {
      firstLetter: "O",
      lengthInfo: "Хоёр үгнээс бүрдсэн, нийт 8 тэмдэгт (хоосон зайтай)",
      textClue: "Гол дүр нь резинэн биетэй бөгөөд далайн дээрэмчдийн хаан болохыг хүсдэг.",
      genre: "Шонэн / Аялал / Тулаант",
    }
  },
  {
    id: "naruto",
    title: "Naruto",
    mongolianTitle: "Наруто",
    emojiClue: "🦊 🍜 🌀 🗡️ 🐸",
    pictureUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&q=80&w=600",
    options: ["Boruto", "Jujutsu Kaisen", "Naruto", "Dragon Ball Z"],
    difficulty: "Easy",
    hints: {
      firstLetter: "N",
      lengthInfo: "Нэг үг, 6 тэмдэгттэй",
      textClue: "Есөн сүүлт үнэгний хүчийг дотроо агуулсан, Хокагэ болох мөрөөдөлтэй өнчин хүүгийн түүх.",
      genre: "Шонэн / Нинжа / Тулаант",
    }
  },
  {
    id: "demon-slayer",
    title: "Demon Slayer",
    mongolianTitle: "Чөтгөрийн ангууч",
    emojiClue: "⚔️ 👺 🌊 🐗 ⚡ 🎋",
    pictureUrl: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?auto=format&fit=crop&q=80&w=600",
    options: ["Demon Slayer", "Inuyasha", "Dororo", "Bleach"],
    difficulty: "Easy",
    hints: {
      firstLetter: "D",
      lengthInfo: "Хоёр үгнээс бүрдсэн, нийт 12 тэмдэгт",
      textClue: "Танжиро хүү чөтгөр болсон дүү Нэзүкогоо буцааж хүн болгохоор аялалд гардаг.",
      genre: "Шонэн / Харанхуй фэнтези / Тулаант",
    }
  },
  {
    id: "jujutsu-kaisen",
    title: "Jujutsu Kaisen",
    mongolianTitle: "Жүжүцү Кайсэн",
    emojiClue: "💀 🤞 👹 👁️ 🏫",
    pictureUrl: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&q=80&w=600",
    options: ["Chainsaw Man", "Bleach", "Jujutsu Kaisen", "Tokyo Ghoul"],
    difficulty: "Medium",
    hints: {
      firstLetter: "J",
      lengthInfo: "Хоёр үгнээс бүрдсэн, нийт 14 тэмдэгт",
      textClue: "Итадори Юүжи хараагдсан хурууг залгиснаар хамгийн хүчирхэг хараалын эзэн болох Сукунатай биеэ хуваалцах болно.",
      genre: "Шонэн / Сүнслэг хараал / Тулаант",
    }
  },
  {
    id: "attack-on-titan",
    title: "Attack on Titan",
    mongolianTitle: "Титан руу хийсэн дайралт",
    emojiClue: "🧱 🧗‍♂️ 🗡️ 🩸 🐎 👑",
    pictureUrl: "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?auto=format&fit=crop&q=80&w=600",
    options: ["Attack on Titan", "Kabaneri", "Claymore", "Neon Genesis Evangelion"],
    difficulty: "Easy",
    hints: {
      firstLetter: "A",
      lengthInfo: "Гурван үгнээс бүрдсэн, нийт 15 тэмдэгт",
      textClue: "Хүн төрэлхтөн аварга биетнүүдээс хамгаалж гурван давхар аварга том хананы цаана амьдардаг.",
      genre: "Драма / Сэтгэл зүйн триллер / Тулаант",
    }
  },
  {
    id: "death-note",
    title: "Death Note",
    mongolianTitle: "Үхлийн тэмдэглэл",
    emojiClue: "📓 🍎 🖊️ 👁️ 🍫 ⚖️",
    pictureUrl: "https://images.unsplash.com/photo-1516414447565-b14be0adf13e?auto=format&fit=crop&q=80&w=600",
    options: ["Code Geass", "Monster", "Death Note", "Psycho-Pass"],
    difficulty: "Easy",
    hints: {
      firstLetter: "D",
      lengthInfo: "Хоёр үгнээс бүрдсэн, нийт 10 тэмдэгт",
      textClue: "Ягами Лайт нэртэй ухаалаг сурагч нэрээ бичсэн хүнийг нь үхүүлдэг шидэт дэвтэр олдог.",
      genre: "Сэтгэл зүйн триллер / Мөрдөгч / Нууцлаг",
    }
  },
  {
    id: "my-hero-academia",
    title: "My Hero Academia",
    mongolianTitle: "Миний баатарлаг академи",
    emojiClue: "🦸‍♂️ 🏫 💥 ❄️ 🔥 🥦",
    pictureUrl: "https://images.unsplash.com/photo-1608889174637-3c44f6326f1a?auto=format&fit=crop&q=80&w=600",
    options: ["One Punch Man", "My Hero Academia", "Black Clover", "Assassination Classroom"],
    difficulty: "Medium",
    hints: {
      firstLetter: "M",
      lengthInfo: "Гурван үгнээс бүрдсэн, нийт 17 тэмдэгт",
      textClue: "Гол дүр Мидория Дэку ямар ч супер хүчгүй төрөх боловч дэлхийн шилдэг баатар All Might-тай уулзсанаар хүчээ өвлөн авдаг.",
      genre: "Шонэн / Супер баатар / Сургууль",
    }
  },
  {
    id: "fullmetal-alchemist",
    title: "Fullmetal Alchemist",
    mongolianTitle: "Төмөр алхимич",
    emojiClue: "🦾 🤖 ⚗️ ⚔️ 🐕 🚪",
    pictureUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600",
    options: ["Fullmetal Alchemist", "D.Gray-man", "Blue Exorcist", "Fairy Tail"],
    difficulty: "Medium",
    hints: {
      firstLetter: "F",
      lengthInfo: "Хоёр үгнээс бүрдсэн, нийт 19 тэмдэгт",
      textClue: "Элрик ах дүү хоёр нас барсан ээжийгээ алхимын хүчээр амилуулах гэж оролдоод бүтэлгүйтэж, бие махбодоо алддаг.",
      genre: "Фэнтези / Сэтгэл зүйн драма / Аялал",
    }
  },
  {
    id: "tokyo-ghoul",
    title: "Tokyo Ghoul",
    mongolianTitle: "Токиогийн хүн идэштэн",
    emojiClue: "☕ 🎭 🩸 👁️ 🧠 🦴",
    pictureUrl: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=600",
    options: ["Parasyte", "Tokyo Ghoul", "Another", "Deadman Wonderland"],
    difficulty: "Medium",
    hints: {
      firstLetter: "T",
      lengthInfo: "Хоёр үгнээс бүрдсэн, нийт 11 тэмдэгт",
      textClue: "Канеки Кэн нэгэн аймшигт ослоос амьд үлдэхдээ хагас хүн хагас күүл (хүн идэштэн) болж хувирна.",
      genre: "Харанхуй фэнтези / Аймшиг / Драма",
    }
  },
  {
    id: "sword-art-online",
    title: "Sword Art Online",
    mongolianTitle: "Сэлэмний урлаг онлайн",
    emojiClue: "🎮 ⚔️ 🏰 💻 👰 🏹",
    pictureUrl: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&q=80&w=600",
    options: ["Log Horizon", "Overlord", "Sword Art Online", "No Game No Life"],
    difficulty: "Medium",
    hints: {
      firstLetter: "S",
      lengthInfo: "Гурван үгнээс бүрдсэн, нийт 17 тэмдэгт",
      textClue: "Виртуал тоглоомд гацсан мянга мянган тоглогчид хэрэв тоглоом дотор үхвэл бодит амьдрал дээр ч мөн үхэх аюултай тулгардаг.",
      genre: "Исэкай / Виртуал бодит байдал / Тулаант",
    }
  },
  {
    id: "hunter-x-hunter",
    title: "Hunter x Hunter",
    mongolianTitle: "Ангуучдын ангууч",
    emojiClue: "🎣 🃏 ⚡ 🟢 🛹 ⛓️",
    pictureUrl: "https://images.unsplash.com/photo-1611195974226-a6a9be9dd763?auto=format&fit=crop&q=80&w=600",
    options: ["Yu Yu Hakusho", "Hunter x Hunter", "Dragon Ball", "Naruto"],
    difficulty: "Hard",
    hints: {
      firstLetter: "H",
      lengthInfo: "Гурван үгнээс бүрдсэн, нийт 15 тэмдэгт",
      textClue: "Гон нэртэй хүү аавыгаа олохын тулд дэлхийн хамгийн хэцүү Ангуучийн шалгалтыг өгөхөөр шийднэ.",
      genre: "Шонэн / Аялал / Супер хүч",
    }
  },
  {
    id: "your-name",
    title: "Your Name",
    mongolianTitle: "Чиний нэр",
    emojiClue: "☄️ 🔁 🌌 🕰️ ⛩️ ✍️",
    pictureUrl: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&q=80&w=600",
    options: ["Weathering with You", "Your Name", "Silent Voice", "5 Centimeters per Second"],
    difficulty: "Medium",
    hints: {
      firstLetter: "Y",
      lengthInfo: "Хоёр үгнээс бүрдсэн, нийт 9 тэмдэгт",
      textClue: "Токиод амьдардаг хүү, хөдөө амьдардаг охин хоёрын бие солигдож, сүүлдээ тэнгэрээс унах солирын аюулаас хотыг аврах шаардлагатай болдог.",
      genre: "Романс / Уран зөгнөлт / Сурагч",
    }
  },
  {
    id: "chainsaw-man",
    title: "Chainsaw Man",
    mongolianTitle: "Хөрөөт залуу",
    emojiClue: "🪚 🐕 😈 👔 🩸 🍔",
    pictureUrl: "https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&q=80&w=600",
    options: ["Jujutsu Kaisen", "Chainsaw Man", "Devilman Crybaby", "Dorohedoro"],
    difficulty: "Medium",
    hints: {
      firstLetter: "C",
      lengthInfo: "Хоёр үгнээс бүрдсэн, нийт 12 тэмдэгт",
      textClue: "Дэнжи хүү Почита нэртэй хөрөөт чөтгөртэй нэгдэж, чөтгөрүүдийг ангуучлах болдог.",
      genre: "Харанхуй фэнтези / Шонэн / Цус урсгасан тулаан",
    }
  },
  {
    id: "spy-x-family",
    title: "Spy x Family",
    mongolianTitle: "Тагнуулч гэр бүл",
    emojiClue: "🕵️‍♂️ 👩‍🦰 👧 🥜 🐕 🔫",
    pictureUrl: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=600",
    options: ["Spy x Family", "Kaguya-sama", "My Love Story", "Assassination Classroom"],
    difficulty: "Medium",
    hints: {
      firstLetter: "S",
      lengthInfo: "Гурван үгнээс бүрдсэн, нийт 12 тэмдэгт",
      textClue: "Нэгэн чадварлаг тагнуулч даалгавраа биелүүлэхийн тулд хуурамч гэр бүл зохиох бөгөөд эхнэр нь алуурчин, хүүхэд нь бодол уншигч байна.",
      genre: "Инээдмийн / Гэр бүл / Тулаант / Тагнуул",
    }
  },
  {
    id: "jojo",
    title: "JoJo's Bizarre Adventure",
    mongolianTitle: "ЖоЖогийн хачирхалтай адал явдал",
    emojiClue: "🧛‍♂️ 🕺 ⏳ 🐕 🦷 ✨",
    pictureUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=600",
    options: ["Fist of the North Star", "JoJo's Bizarre Adventure", "Baki the Grappler", "Bleach"],
    difficulty: "Hard",
    hints: {
      firstLetter: "J",
      lengthInfo: "Олон үгнээс бүрдсэн, нийт 24 тэмдэгт",
      textClue: "Жоэстар гэр бүлийн үе үеийн гишүүдийн адал явдал болон Stand хэмээх сүнслэг хүчний тулааны түүх.",
      genre: "Адал явдал / Зөгнөлт / Поп арт стиль",
    }
  }
];
