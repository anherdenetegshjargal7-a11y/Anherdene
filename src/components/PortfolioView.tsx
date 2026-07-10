import React, { useState } from "react";
import { motion } from "motion/react";
import { Project, Skill } from "../types";
import { Github, Linkedin, Mail, ArrowRight, ExternalLink, Code2, Brain, Database, Cpu, Send, CheckCircle2 } from "lucide-react";

const PROJECTS: Project[] = [
  {
    title: "AI-Powered Task Manager",
    description: "Gemini API ашиглан өдөр тутмын төлөвлөгөө, даалгавруудыг автоматаар ангилж, гүйцэтгэх дараалал, ач холбогдлыг тодорхойлдог ухаалаг систем.",
    tech: ["React", "TypeScript", "Node.js", "Express", "Gemini API", "Tailwind CSS"],
    category: "AI",
    link: "#",
  },
  {
    title: "Real-time Collaborative Canvas",
    description: "Олон хэрэглэгч нэгэн зэрэг вэб дээр хамтран зураг зурах, диаграмм гаргах боломжтой WebSocket болон Canvas дээр суурилсан систем.",
    tech: ["React", "Node.js", "Express", "WebSockets", "Canvas API", "Framer Motion"],
    category: "Full-Stack",
    link: "#",
  },
  {
    title: "Eco-Tracker Smart App",
    description: "Хэрэглэгчийн өдөр тутмын нүүрстөрөгчийн ялгарлыг хэмжиж, байгальд ээлтэй амьдралын хэв маягийг урамшуулдаг вэб ба гар утасны систем.",
    tech: ["React Native", "Node.js", "PostgreSQL", "Drizzle ORM", "Tailwind CSS"],
    category: "Full-Stack",
    link: "#",
  },
  {
    title: "AI Customer Support Bot",
    description: "Байгууллагын дотоод баримт бичгүүд болон бүтээгдэхүүний мэдээлэл дээр суралцаж, хэрэглэгчдэд 24/7 хариулт өгөх ухаалаг чатбот.",
    tech: ["React", "Express", "LangChain", "Gemini API", "Vector DB"],
    category: "AI",
    link: "#",
  }
];

const SKILLS: Skill[] = [
  // Frontend
  { name: "React / Next.js", category: "frontend", level: 92 },
  { name: "TypeScript", category: "frontend", level: 88 },
  { name: "Tailwind CSS & Framer Motion", category: "frontend", level: 95 },
  // Backend
  { name: "Node.js / Express", category: "backend", level: 85 },
  { name: "PostgreSQL & Drizzle ORM", category: "backend", level: 80 },
  { name: "REST APIs & WebSockets", category: "backend", level: 90 },
  // AI & Cloud
  { name: "Gemini API Integration", category: "ai", level: 94 },
  { name: "LLM Fine-tuning & Prompting", category: "ai", level: 88 },
  { name: "Firebase (Auth, Firestore)", category: "ai", level: 85 },
];

export default function PortfolioView({ onNavigateToIdol }: { onNavigateToIdol: () => void }) {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [isSent, setIsSent] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const filteredProjects = activeFilter === "All"
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeFilter);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) return;
    
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
      setContactForm({ name: "", email: "", message: "" });
      setTimeout(() => setIsSent(false), 5000);
    }, 1200);
  };

  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative pt-12 md:pt-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(236,72,153,0.05),transparent_50%)]" />
        
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12 relative z-10 px-4">
          <div className="flex-1 space-y-6 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-xs font-semibold"
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Full-Stack Developer & AI Engineer</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-none bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-indigo-200"
            >
              Ирээдүйг <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-pink-500">Ухаалгаар</span> Бүтээцгээе
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-400 text-base sm:text-lg max-w-2xl leading-relaxed"
            >
              Сайн байна уу? Намайг <span className="text-white font-medium">Анх-Эрдэнэ</span> гэдэг. Би орчин үеийн вэб технологи, гар утасны аппликейшн болон хиймэл оюун ухааны (AI) дэвшилтэт загваруудыг ашиглан хүний амьдралыг хөнгөвчлөх бүтээгдэхүүнүүдийг хөгжүүлдэг. Чөлөөт цагаараа видео тоглоом тоглож, анимэ үзэх дуртай!
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2"
            >
              <a
                href="#projects"
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl transition-all duration-300 flex items-center gap-2 group shadow-lg shadow-indigo-600/15"
              >
                Миний бүтээлүүд
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <button
                onClick={onNavigateToIdol}
                className="px-6 py-3 bg-slate-900/80 hover:bg-slate-800 text-slate-200 font-medium rounded-xl border border-slate-800 transition-colors flex items-center gap-2"
              >
                🤖 My Idol Coach
              </button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center justify-center md:justify-start gap-4 pt-4 text-slate-500"
            >
              <a href="#" className="hover:text-white transition-colors p-1.5 hover:bg-slate-900 rounded-lg"><Github className="w-5 h-5" /></a>
              <a href="#" className="hover:text-white transition-colors p-1.5 hover:bg-slate-900 rounded-lg"><Linkedin className="w-5 h-5" /></a>
              <a href="mailto:anherdene@example.com" className="hover:text-white transition-colors p-1.5 hover:bg-slate-900 rounded-lg"><Mail className="w-5 h-5" /></a>
              <span className="text-xs text-slate-600 border-l border-slate-800 pl-4">anherdene@example.com</span>
            </motion.div>
          </div>

          {/* Graphical element representing developer profile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full md:w-96 shrink-0 flex justify-center"
          >
            <div className="relative w-72 h-72">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 opacity-20 blur-2xl animate-pulse" />
              <div className="w-full h-full rounded-3xl bg-slate-900 border border-slate-800 p-6 flex flex-col justify-between shadow-2xl relative z-10">
                <div className="flex items-center justify-between">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-500/70" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                    <span className="w-3 h-3 rounded-full bg-green-500/70" />
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">anherdene.ts</span>
                </div>

                <div className="my-auto space-y-4 font-mono text-xs text-indigo-300">
                  <p className="text-slate-500">// Ухаалаг код, урам зориг</p>
                  <p>
                    <span className="text-pink-400">const</span> <span className="text-slate-100">developer</span> = &#123;
                    <br />
                    &nbsp;&nbsp;name: <span className="text-emerald-400">"Анх-Эрдэнэ"</span>,
                    <br />
                    &nbsp;&nbsp;role: <span className="text-emerald-400">"Full-Stack & AI"</span>,
                    <br />
                    &nbsp;&nbsp;hobbies: <span className="text-emerald-400">["Video games", "Anime"]</span>
                    <br />
                    &#125;;
                  </p>
                  <p className="text-emerald-400/90">
                    &gt; developer.innovate()
                    <br />
                    <span className="text-white text-xs font-semibold">// "Insanely Great Products..."</span>
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-slate-800/80 pt-4 mt-2">
                  <span className="text-[10px] text-slate-400 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    Шинэ төсөл бэлэн
                  </span>
                  <Code2 className="w-4 h-4 text-indigo-500" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>



      {/* Projects Section */}
      <section id="projects" className="max-w-5xl mx-auto px-4 scroll-mt-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="font-display text-3xl font-bold text-white">Хийж гүйцэтгэсэн бүтээлүүд</h2>
            <p className="text-slate-400 text-sm mt-1">Хамгийн сүүлийн үеийн технологийг агуулсан зарим томоохон төслүүд.</p>
          </div>
          
          <div className="flex gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800 self-start sm:self-auto">
            {["All", "AI", "Full-Stack"].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  activeFilter === filter
                    ? "bg-indigo-600 text-white"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-slate-900/40 hover:bg-slate-900/80 rounded-2xl border border-slate-800/80 p-6 flex flex-col justify-between transition-all group hover:border-indigo-500/30"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    project.category === "AI" ? "bg-pink-500/10 text-pink-400 border border-pink-500/20" : "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                  }`}>
                    {project.category}
                  </span>
                  <a href={project.link} className="text-slate-500 hover:text-white transition-colors">
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
                
                <h3 className="font-bold text-white text-lg group-hover:text-indigo-400 transition-colors leading-tight">
                  {project.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-6 mt-auto">
                {project.tech.map((t) => (
                  <span key={t} className="px-2 py-1 bg-slate-950 text-slate-400 rounded-md text-[10px] font-mono border border-slate-900">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Skills Matrix Section */}
      <section id="skills" className="max-w-5xl mx-auto px-4 scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-display text-3xl font-bold text-white">Мэргэжлийн Ур Чадварууд</h2>
          <p className="text-slate-400 text-sm mt-1">Орчин үеийн вэб платформ, хиймэл оюуны загвар болон өгөгдлийн сангийн шийдлүүдийг боловсруулах түвшин.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Frontend Category */}
          <div className="bg-slate-900/20 rounded-2xl border border-slate-800/50 p-6 space-y-6">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-3">
              <Code2 className="w-4 h-4 text-indigo-400" />
              Frontend Ур Чадвар
            </h3>
            <div className="space-y-4">
              {SKILLS.filter(s => s.category === "frontend").map((skill) => (
                <div key={skill.name} className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300 font-medium">{skill.name}</span>
                    <span className="text-indigo-400 font-mono font-bold">{skill.level}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-indigo-600 to-indigo-400 rounded-full" style={{ width: `${skill.level}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Backend Category */}
          <div className="bg-slate-900/20 rounded-2xl border border-slate-800/50 p-6 space-y-6">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-3">
              <Database className="w-4 h-4 text-emerald-400" />
              Backend & DB Ур Чадвар
            </h3>
            <div className="space-y-4">
              {SKILLS.filter(s => s.category === "backend").map((skill) => (
                <div key={skill.name} className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300 font-medium">{skill.name}</span>
                    <span className="text-emerald-400 font-mono font-bold">{skill.level}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full" style={{ width: `${skill.level}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI & Cloud Category */}
          <div className="bg-slate-900/20 rounded-2xl border border-slate-800/50 p-6 space-y-6">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-3">
              <Brain className="w-4 h-4 text-pink-400" />
              AI & Cloud Ур Чадвар
            </h3>
            <div className="space-y-4">
              {SKILLS.filter(s => s.category === "ai").map((skill) => (
                <div key={skill.name} className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300 font-medium">{skill.name}</span>
                    <span className="text-pink-400 font-mono font-bold">{skill.level}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-pink-600 to-pink-400 rounded-full" style={{ width: `${skill.level}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="max-w-5xl mx-auto px-4 scroll-mt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 p-8 md:p-12 bg-slate-900/40 rounded-3xl border border-slate-800/80 backdrop-blur-sm">
          <div className="space-y-6">
            <h2 className="font-display text-3xl font-bold text-white">Хамтран ажиллах уу?</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Та шинээр вэбсайт эсвэл систем хийлгэх, AI загвар нэгтгэх эсвэл зүгээр л уулзаж ярилцахыг хүсвэл чөлөөтэй холбогдоно уу. Би хурдан хугацаанд хариу өгөх болно.
            </p>
            
            <div className="space-y-4 pt-4 text-sm text-slate-300">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-indigo-400"><Mail className="w-4 h-4" /></span>
                <div>
                  <h4 className="text-slate-500 text-xs">Имэйл хаяг</h4>
                  <p className="font-mono">anherdene@example.com</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-emerald-400"><ExternalLink className="w-4 h-4" /></span>
                <div>
                  <h4 className="text-slate-500 text-xs">GitHub хуудас</h4>
                  <p className="font-mono">github.com/anherdene</p>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Таны нэр</label>
                <input
                  type="text"
                  required
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none transition-colors"
                  placeholder="Нэрээ оруулна уу"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Таны имэйл</label>
                <input
                  type="email"
                  required
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none transition-colors"
                  placeholder="name@example.com"
                />
              </div>
            </div>
            
            <div className="space-y-1">
              <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Зурвас</label>
              <textarea
                required
                rows={4}
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none transition-colors resize-none"
                placeholder="Санал хүсэлт, зурвасаа бичнэ үү..."
              />
            </div>

            <button
              type="submit"
              disabled={isSending}
              className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/10 hover:shadow-indigo-600/20 disabled:opacity-50"
            >
              {isSending ? (
                <span>Илгээж байна...</span>
              ) : isSent ? (
                <span className="flex items-center gap-1 text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  Амжилттай илгээгдлээ!
                </span>
              ) : (
                <>
                  <span>Зурвас илгээх</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
