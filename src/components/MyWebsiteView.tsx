import React, { useState } from "react";
import { motion } from "motion/react";
import { ExternalLink, RefreshCw, Globe, ArrowLeft, ArrowRight, ShieldAlert, Monitor, Sparkles } from "lucide-react";

interface Website {
  id: string;
  name: string;
  url: string;
  description: string;
}

const WEBSITES: Website[] = [
  {
    id: "portfolio-2012",
    name: "Үндсэн вэбсайт (anherdene2012)",
    url: "https://anherdene2012.vercel.app/",
    description: "Миний анхны портфолио вэбсайт болон үндсэн хуудас.",
  },
  {
    id: "portfolio-6sf5",
    name: "Анимэ Асуулт Хариултын Тоглоом (anherdene-6sf5)",
    url: "https://anherdene-6sf5.vercel.app/",
    description: "Хэрэглэгчийн анимэ мэдлэгийг эможи, зураг болон уран зөгнөлт зөвлөмжүүдээр сорих сонирхолтой, танин мэдэхүйн тоглоом.",
  }
];

export default function MyWebsiteView() {
  const [activeSite, setActiveSite] = useState<Website>(WEBSITES[0]);
  const [iframeKey, setIframeKey] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleSelectSite = (site: Website) => {
    if (activeSite.id === site.id) return;
    setActiveSite(site);
    setIsLoading(true);
    setIframeKey((prev) => prev + 1);
  };

  const handleRefresh = () => {
    setIframeKey((prev) => prev + 1);
    setIsLoading(true);
  };

  const handleOpenNewTab = () => {
    window.open(activeSite.url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header and description */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-3xl font-bold text-white flex items-center gap-2">
            <span className="p-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-400">
              <Globe className="w-5 h-5 animate-pulse" />
            </span>
            Миний Вэбсайтууд
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Миний хөгжүүлсэн төслүүд болон вэбсайтуудтай шууд эндээс танилцаарай.
          </p>
        </div>

        <button
          onClick={handleOpenNewTab}
          className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-semibold text-xs sm:text-sm rounded-xl transition-all duration-300 flex items-center gap-2 shadow-lg shadow-indigo-600/10 hover:shadow-indigo-600/25 cursor-pointer shrink-0"
        >
          <span>Шинэ цонхонд нээх</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Website Quick Switcher Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {WEBSITES.map((site) => {
          const isActive = activeSite.id === site.id;
          return (
            <button
              key={site.id}
              onClick={() => handleSelectSite(site)}
              className={`p-4 rounded-2xl border text-left transition-all duration-300 relative overflow-hidden group cursor-pointer ${
                isActive
                  ? "bg-gradient-to-br from-indigo-950/40 to-slate-900/40 border-indigo-500/40 shadow-lg shadow-indigo-500/5"
                  : "bg-slate-900/30 hover:bg-slate-900/50 border-slate-850 hover:border-slate-800"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1">
                  <p className={`text-sm font-bold transition-colors ${isActive ? "text-indigo-400" : "text-slate-200"}`}>
                    {site.name}
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed max-w-[280px]">
                    {site.description}
                  </p>
                </div>
                <div className={`p-2 rounded-xl border shrink-0 transition-all ${
                  isActive 
                    ? "bg-indigo-500/10 border-indigo-500/20 text-indigo-400" 
                    : "bg-slate-950/40 border-slate-900 text-slate-500 group-hover:text-slate-400"
                }`}>
                  <Globe className="w-4 h-4" />
                </div>
              </div>
              {isActive && (
                <div className="absolute right-0 bottom-0 translate-x-4 translate-y-4 text-indigo-500/10 -rotate-12 select-none pointer-events-none transition-transform duration-500 group-hover:scale-110">
                  <Sparkles className="w-24 h-24" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Browser Frame */}
      <div className="bg-slate-900/60 rounded-3xl border border-slate-800/80 overflow-hidden shadow-2xl backdrop-blur-sm">
        {/* Browser Tabs Bar */}
        <div className="bg-slate-950 px-4 pt-3 flex items-end gap-1.5 border-b border-slate-900/60 overflow-x-auto scrollbar-none">
          {/* Windows controls dots */}
          <div className="flex items-center gap-1.5 mr-4 mb-2.5 shrink-0">
            <span className="w-3 h-3 rounded-full bg-red-500/70" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <span className="w-3 h-3 rounded-full bg-green-500/70" />
          </div>

          {/* Actual Tabs */}
          <div className="flex items-end gap-1 max-w-full shrink-0">
            {WEBSITES.map((site) => {
              const isActive = activeSite.id === site.id;
              return (
                <button
                  key={site.id}
                  onClick={() => handleSelectSite(site)}
                  className={`px-4 py-2 text-[11px] sm:text-xs font-medium rounded-t-xl transition-all flex items-center gap-2 border-t border-x shrink-0 ${
                    isActive
                      ? "bg-slate-900 text-white border-slate-800/80 font-semibold"
                      : "bg-slate-950/40 text-slate-400 border-transparent hover:bg-slate-900/40 hover:text-slate-300"
                  }`}
                >
                  <Globe className={`w-3.5 h-3.5 ${isActive ? "text-indigo-400" : "text-slate-500"}`} />
                  <span className="max-w-[150px] truncate">{site.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Browser Top Bar / Navigation Controls */}
        <div className="bg-slate-900/90 px-4 py-2.5 border-b border-slate-950 flex items-center justify-between gap-4">
          {/* Navigation Controls */}
          <div className="flex items-center gap-2 shrink-0">
            <button className="p-1 hover:bg-slate-800 rounded text-slate-500 hover:text-slate-300 transition-colors cursor-not-allowed" disabled>
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button className="p-1 hover:bg-slate-800 rounded text-slate-500 hover:text-slate-300 transition-colors cursor-not-allowed" disabled>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button 
              onClick={handleRefresh}
              className="p-1 hover:bg-slate-850 rounded text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Дахин ачааллах"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          {/* Address Bar */}
          <div className="flex-1 max-w-xl mx-auto flex items-center gap-2 px-3.5 py-1.5 bg-slate-950 border border-slate-850 rounded-xl text-xs text-slate-400 focus-within:text-slate-200 focus-within:border-indigo-500/50 transition-colors">
            <Globe className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span className="truncate select-all">{activeSite.url}</span>
          </div>

          {/* Open Link Button */}
          <button
            onClick={handleOpenNewTab}
            className="p-1.5 bg-slate-950 hover:bg-slate-800 border border-slate-850 rounded-lg text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer text-[11px] shrink-0"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Шууд очих</span>
          </button>
        </div>

        {/* Content area / Iframe Wrapper */}
        <div className="relative h-[650px] w-full bg-slate-950">
          {isLoading && (
            <div className="absolute inset-0 z-10 bg-slate-950 flex flex-col items-center justify-center gap-4 text-center px-4">
              <div className="w-12 h-12 rounded-full border-2 border-indigo-500/20 border-t-indigo-500 animate-spin" />
              <div className="space-y-1">
                <p className="text-sm font-semibold text-white">Вэбсайтыг ачаалж байна...</p>
                <p className="text-xs text-slate-400">Хэрэв урт хугацаанд ачааллахгүй байвал баруун дээд талын "Шинэ цонхонд нээх" товчийг ашиглана уу.</p>
              </div>
            </div>
          )}

          <iframe
            key={iframeKey}
            src={activeSite.url}
            onLoad={() => setIsLoading(false)}
            className="w-full h-full border-none bg-white"
            title={activeSite.name}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* Info Tip Block */}
      <div className="p-4 bg-slate-900/30 border border-slate-850 rounded-2xl flex items-start gap-3.5">
        <ShieldAlert className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="text-xs font-bold text-slate-300">Ачааллахгүй байна уу?</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Вэб хөтчийн аюулгүй байдлын бодлогоос (X-Frame-Options) шалтгаалан зарим сайт өөр сайт дотор шууд iframe-ээр харагдахыг хязгаарласан байдаг. Хэрэв дээрх цонхонд хоосон эсвэл алдаа зааж байвал{" "}
            <button onClick={handleOpenNewTab} className="text-pink-400 hover:text-pink-300 underline font-semibold cursor-pointer">
              энд дарж
            </button>{" "}
            шинэ цонхонд шууд нээнэ үү.
          </p>
        </div>
      </div>
    </div>
  );
}
