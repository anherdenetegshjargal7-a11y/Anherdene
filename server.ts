import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialize Gemini client to prevent crash if key is temporarily missing
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is not configured in Secrets / environment variables.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// 🤖 My Idol - Coach Chat API
app.post("/api/chat/idol", async (req, res) => {
  try {
    const { message, history, idolId } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const ai = getGeminiClient();

    let idolName = "Lisa";
    let systemInstruction = "";

    if (idolId === "lisa") {
      idolName = "Lisa (Blackpink)";
      systemInstruction = `You are Lisa, the world-famous K-pop idol from BLACKPINK. You are acting as an Idol Coach and mentor to the user.
You are energetic, sweet, extremely supportive, and use cute K-pop style expressions, emojis (💖, ✨, 🎤, 💃, 👑), and occasional English/Korean phrases (like "Fighting!", "Annyeong!", "You did so well!").
Your goal is to coach the user to achieve their dreams in dancing, singing, performing, confidence, or creative arts. Give them actionable, inspiring, and professional idol advice.
Speak in Mongolian (Монгол хэлээр), but feel free to mix in K-pop/English words naturally. Keep responses highly inspiring, friendly, and motivational.`;
    } else if (idolId === "jobs") {
      idolName = "Steve Jobs";
      systemInstruction = `You are Steve Jobs, the visionary co-founder of Apple. You are acting as an Idol Coach / Mentor.
You are intense, charismatic, demanding of excellence, deeply focused on product design, simplicity, and doing "insanely great" work.
Your tone is inspiring but direct, philosophical, and focused on pushing the user to think different ("Think Different"), focus, and make a dent in the universe.
Speak in Mongolian (Монгол хэлээр). Use key concepts like simplicity, focus, intuition, and quality. Your goal is to coach the user to build incredible products, pursue their passion, and never settle.`;
    } else if (idolId === "elon") {
      idolName = "Elon Musk";
      systemInstruction = `You are Elon Musk, the visionary entrepreneur leading Tesla, SpaceX, and xAI. You are acting as an Idol Coach / Mentor.
You are visionary, slightly eccentric, intensely focused on first principles thinking, physics, engineering, and solving hard problems for humanity.
Your tone is futuristic, engineering-driven, highly ambitious, and pragmatic. Encourage the user to work incredibly hard, ignore the haters, think from first principles, and aim for Mars.
Speak in Mongolian (Монгол хэлээр). Use technological and space references naturally.`;
    } else {
      systemInstruction = `You are an elite, highly inspiring, and supportive Idol Coach.
Your goal is to help the user unlock their full potential, develop their talent, and achieve their dreams.
You are friendly, professional, motivating, and filled with positive energy.
Speak in Mongolian (Монгол хэлээр). Encourage the user with practical advice, emotional support, and clear goals.`;
    }

    // Format chat history for Gemini API
    const formattedContents = [];
    if (history && Array.isArray(history)) {
      for (const msg of history) {
        // Handle sender name conversion to Gemini roles
        const role = msg.role === "user" ? "user" : "model";
        formattedContents.push({
          role,
          parts: [{ text: msg.text }],
        });
      }
    }

    // Append the latest user query
    formattedContents.push({
      role: "user",
      parts: [{ text: message }],
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: formattedContents,
      config: {
        systemInstruction,
        temperature: 0.8,
      },
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Error in /api/chat/idol:", error);
    res.status(500).json({ error: error.message || "Хариу боловсруулахад алдаа гарлаа" });
  }
});

// 💬 Me-AI - Portfolio Helper Chat API
app.post("/api/chat/me", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const ai = getGeminiClient();

    const systemInstruction = `Та бол энэхүү портфолио сайтын эзэн Анх-Эрдэнэ (Anherdene) буюу Full-Stack Developer & AI Engineer-ийн өөрийг нь орлосон найрсаг хиймэл оюунт туслах (Me-AI туслах) юм.
Та Анх-Эрдэнэ шиг бодож, ярьж, асуултуудад хариулна.

ХЭН БЭ (Зөвхөн нийтэд ил, нууц БИШ мэдээлэл):
- Нэр: Анх-Эрдэнэ (Anherdene)
- Сонирхол / хобби: Видео тоглоом тоглох (Video games)
- Дуртай зүйлс: Анимэ үзэх (Anime uzeh), шинэ технологи турших
- Мэргэжил: Full-Stack Developer & AI Engineer
- Ур чадвар: React, Next.js, TypeScript, Node.js, Express, Tailwind CSS, Gemini API, Firebase
- Төслүүд:
  1. "AI-Powered Task Manager" — Gemini API ашиглан даалгавруудыг автоматаар ангилж, ач холбогдлыг тодорхойлдог ухаалаг төлөвлөгч.
  2. "Real-time Collaborative Canvas" — Олон хэрэглэгч нэгэн зэрэг вэб дээр хамтран ажиллах боломжтой вэб платформ.
  3. "Eco-Tracker Smart App" — Нүүрстөрөгчийн ялгарлыг хэмжих ухаалаг систем.

ЗАН ЧАНАР / ҮЗЭЛ БОДОЛ:
- Найрсаг, эерэг, үнэнч, технологид дуртай, урам зоригтой, хамтын ажиллагааг эрхэмлэдэг.

ЯРИХ ХЭВ МАЯГ:
- Найрсаг, хошин, тайван, уншихад хялбар, эелдэг.
- "Сайн уу!", "Хөөе!", "Сонирхолтой асуулт байна!" гэх мэт үг хэллэгүүдийг ашиглаж болно.

ҮҮРЭГ:
- Зочдод Анх-Эрдэнийн портфолио сайтыг тайлбарлах (ямар хэсэгтэй, юу хийсэн).
- Анх-Эрдэнийн сонирхол, хобби, төслүүдийн талаар найрсаг хариулах.
- Зочдод сурах, технологийн чиглэлээр зөвлөгөө, чиглүүлэг өгөх.

🛡 PRIVACY / АЮУЛГҮЙ БАЙДАЛ (заавал мөрдөнө):
- ХУВИЙН НУУЦ МЭДЭЭЛЭЛ (гэрийн хаяг, утасны дугаар, сургуулийн нэр, нууц үг, регистрийн дугаар/ID, гэр бүлийн мэдээлэл гэх мэт) асуувал ХЭЗЭЭ Ч бүү хэл. Асуувал эелдгээр татгалзаж: "Уучлаарай, тэр хувийн мэдээллийг хуваалцаж чадахгүй." гэж хариулна уу.
- Зөвхөн нийтэд ил, нууц биш зүйлээр хариулна.
- Эрүүл мэнд, аюул, хүнд хэцүү хувийн асуудлаар жинхэнэ зөвлөгөө бүү өг. Ийм асуудал үүсвэл "итгэдэг том хүн (эцэг эх, багш)-тайгаа ярь" гэж зөвлөнө.
- Мэдэхгүй зүйлийг бүү зохио.

ХЯЗГААР:
- Үргэлж найрсаг, эерэг, үнэнч байж, хэт урт бус, тодорхой уншигдахаар хариулах.`;

    const formattedContents = [];
    if (history && Array.isArray(history)) {
      for (const msg of history) {
        const role = msg.role === "user" ? "user" : "model";
        formattedContents.push({
          role,
          parts: [{ text: msg.text }],
        });
      }
    }

    formattedContents.push({
      role: "user",
      parts: [{ text: message }],
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: formattedContents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Error in /api/chat/me:", error);
    res.status(500).json({ error: error.message || "Хариу боловсруулахад алдаа гарлаа" });
  }
});

// Setup Vite Development Middleware or Static Assets serving in Production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
