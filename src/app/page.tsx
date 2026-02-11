"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Activity } from "lucide-react";

// Professional Research Components (Plug-and-Play)
import AdSense from "@/components/AdSense";
import ResultsSummary from "@/components/research/ResultsSummary";
import KeywordResearchUI from "@/components/research/KeywordResearchUI";

/**
 * HOME PAGE: Global Keyword Intelligence Tool
 * Refactored for clean code, professional structure, and scalability.
 */
export default function Home() {
  // --- STATE MANAGEMENT ---
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [globalNews, setGlobalNews] = useState<any[]>([]);
  const [totalCredits, setTotalCredits] = useState<number>(0);
  const [activeRegion, setActiveRegion] = useState("India");
  const [globalError, setGlobalError] = useState<string | null>(null);

  // --- API HANDLER ---
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setLoading(true);
    setResults([]);
    setTotalCredits(0);
    setGlobalError(null);

    try {
      const res = await fetch(`/api/research?topic=${encodeURIComponent(topic)}`);
      const data = await res.json();

      if (data.error) {
        setGlobalError(data.error + (data.details ? ": " + data.details : ""));
      } else {
        setResults(data.results || []);
        setGlobalNews(data.global_news || []);
        setTotalCredits(data.total_credits_used || 5);

        // Auto-select India if it exists, otherwise select the first country
        const defaultRegion = data.results.find((r: any) => r.country === "India")
          ? "India"
          : data.results[0]?.country;
        setActiveRegion(defaultRegion || "India");
      }
    } catch (error) {
      console.error("Search failed", error);
      setGlobalError("Connectivity issue or server error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const currentData = results.find((r) => r.country === activeRegion);

  return (
    <main className="min-h-screen p-6 md:p-12 max-w-7xl mx-auto space-y-16 selection:bg-purple-500/30">

      {/* 🟢 HERO SECTION */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6"
      >
        <h1 className="text-5xl md:text-7xl font-black bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-500 leading-tight">
          Keyword <span className="text-purple-500">Intelligence.</span>
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto font-medium">
          Professional SEO insights across 5 global markets. Analyze search intent, competitors, and trends in seconds.
        </p>

        {/* Credits Status Indicator */}
        {results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center space-x-3 bg-slate-900/80 px-5 py-2 rounded-2xl border border-white/10 text-xs font-bold text-slate-300 shadow-xl"
          >
            <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span>API Credits Used: {totalCredits}</span>
          </motion.div>
        )}
      </motion.div>

      {/* 🟢 AD UNIT (TOP) */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto">
        <AdSense adSlot="1234567890" adFormat="horizontal" className="min-h-[90px] rounded-2xl overflow-hidden" />
      </motion.div>

      {/* 🟢 SEARCH INPUT SECTION */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl mx-auto relative z-20">
        <form onSubmit={handleSearch} className="group relative">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition duration-500"></div>
          <div className="relative flex items-center bg-slate-950/90 border border-white/10 rounded-2xl p-3 shadow-2xl backdrop-blur-xl">
            <Search className="ml-4 w-6 h-6 text-slate-500 group-hover:text-cyan-400 transition-colors" />
            <input
              type="text"
              placeholder="Enter a keyword or topic..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full bg-transparent border-none focus:ring-0 text-white placeholder-slate-600 text-xl px-4 py-3 font-medium"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !topic.trim()}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-lg hover:shadow-purple-500/25 active:scale-95 disabled:opacity-50"
            >
              {loading ? "Analyzing..." : "Research"}
            </button>
          </div>
        </form>
      </motion.div>

      {/* 🟢 FEEDBACK BANNERS */}
      {globalError && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl mx-auto bg-red-500/10 border border-red-500/30 text-red-200 p-5 rounded-2xl text-center backdrop-blur-md">
          <p className="font-bold underline mb-1">Search Error</p>
          <p className="text-sm opacity-90">{globalError}</p>
        </motion.div>
      )}

      {/* 🔴 RESULTS ENGINE 🔴 */}
      <AnimatePresence mode="wait">
        {results.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98 }} className="space-y-12">

            {/* Global Roundup Section */}
            {globalNews.length > 0 && <ResultsSummary globalNews={globalNews} />}

            {/* Region Switcher Tabs */}
            <div className="flex flex-wrap justify-center gap-3">
              {results.map((r) => (
                <button
                  key={r.country}
                  onClick={() => setActiveRegion(r.country)}
                  className={`px-6 py-2.5 rounded-xl text-sm font-black transition-all border ${activeRegion === r.country
                      ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                      : "bg-slate-900/50 text-slate-500 border-white/5 hover:border-white/20 hover:text-slate-300"
                    }`}
                >
                  {r.country}
                </button>
              ))}
            </div>

            {/* 🟢 DYNAMIC RESEARCH MODULE (Plug-and-Play) 🟢 */}
            {currentData && <KeywordResearchUI data={currentData} />}

          </motion.div>
        )}
      </AnimatePresence>

      {/* 🟢 EMPTY STATE */}
      {!results.length && !loading && !globalError && (
        <div className="text-center mt-32 space-y-4 opacity-30">
          <div className="inline-block p-6 rounded-3xl bg-slate-900 border border-white/5">
            <Search className="w-10 h-10 text-slate-600" />
          </div>
          <p className="text-slate-500 font-bold tracking-widest uppercase text-xs">Waiting for search input</p>
        </div>
      )}

      {/* 🟢 AD UNIT (BOTTOM) */}
      {results.length > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto pt-16 border-t border-white/5">
          <AdSense adSlot="1122334455" adFormat="horizontal" className="min-h-[120px] rounded-3xl overflow-hidden" />
        </motion.div>
      )}
    </main>
  );
}
