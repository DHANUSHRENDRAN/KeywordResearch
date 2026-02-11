"use client";

import { Newspaper } from "lucide-react";
import { motion } from "framer-motion";

interface GlobalNewsSummary {
    country: string;
    top_story: {
        title: string;
        link: string;
        source: string;
        date: string;
    };
}

interface ResultsSummaryProps {
    globalNews: GlobalNewsSummary[];
}

/**
 * ResultsSummary: Displays a grid of top news stories across all major regions.
 */
export default function ResultsSummary({ globalNews }: ResultsSummaryProps) {
    if (!globalNews || globalNews.length === 0) return null;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-900/80 backdrop-blur-3xl border border-blue-500/20 rounded-3xl p-8 shadow-[0_0_50px_rgba(59,130,246,0.1)] relative overflow-hidden"
        >
            {/* Decorative background pulse */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] animate-pulse"></div>

            <div className="flex items-center space-x-4 mb-8 relative z-10">
                <div className="p-3 bg-blue-500/20 rounded-xl border border-blue-500/30">
                    <Newspaper className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">Top Headlines per Country</h2>
                    <p className="text-sm text-slate-400 font-medium">The most relevant news from each major region</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 relative z-10">
                {globalNews.map((news, idx) => {
                    if (!news?.top_story) return null;
                    return (
                        <motion.a
                            key={idx}
                            href={news.top_story.link}
                            target="_blank"
                            rel="noreferrer"
                            whileHover={{ y: -5 }}
                            className="group relative bg-slate-800/40 border border-slate-700/50 rounded-2xl p-5 transition-all hover:bg-slate-700/40 hover:border-blue-500/50 hover:shadow-lg shadow-blue-500/10"
                        >
                            <div className="absolute top-4 right-4 px-2.5 py-1 bg-blue-500/20 rounded-lg text-[10px] font-black text-blue-300 border border-blue-500/30 uppercase tracking-tighter shadow-sm">
                                {news.country}
                            </div>
                            <div className="mt-6">
                                <span className="text-[10px] text-blue-400/80 font-bold uppercase tracking-widest block mb-2">
                                    {typeof news.top_story.source === 'string' ? news.top_story.source : 'Source'}
                                </span>
                                <h4 className="text-sm font-bold text-slate-200 line-clamp-3 group-hover:text-blue-300 transition-colors leading-tight">
                                    {news.top_story.title}
                                </h4>
                                <div className="flex items-center justify-between mt-4">
                                    <p className="text-[10px] text-slate-500 font-medium">{news.top_story.date}</p>
                                    <div className="w-5 h-5 rounded-full bg-slate-700 group-hover:bg-blue-500/30 flex items-center justify-center transition-colors">
                                        <div className="w-1.5 h-1.5 border-t border-r border-slate-400 group-hover:border-blue-400 transform rotate-45 ml-[-1px]"></div>
                                    </div>
                                </div>
                            </div>
                        </motion.a>
                    );
                })}
            </div>
        </motion.div>
    );
}
