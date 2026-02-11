"use client";

import { Newspaper } from "lucide-react";
import BaseCard from "./BaseCard";

interface NewsItem {
    title: string;
    link: string;
    source: string;
    date: string;
    thumbnail?: string;
}

interface NewsTrendsProps {
    news: NewsItem[];
}

/**
 * NewsTrends: Displays the latest news and trends from Google Top Stories.
 */
export default function NewsTrends({ news }: NewsTrendsProps) {
    return (
        <BaseCard
            title="Google News & Trends"
            icon={<Newspaper className="w-5 h-5 text-blue-400" />}
            delay={0.6}
        >
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {news && news.length > 0 ? (
                    news.map((item, i) => (
                        <a
                            key={i}
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex gap-4 p-4 rounded-xl bg-slate-800/30 border border-slate-700/50 hover:bg-slate-700/50 hover:border-blue-500/30 transition-all group/news shadow-sm"
                        >
                            {item.thumbnail ? (
                                <div className="relative w-24 h-20 shrink-0 overflow-hidden rounded-lg bg-slate-900 border border-slate-800">
                                    <img
                                        src={item.thumbnail}
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover/news:scale-110 transition-transform duration-500"
                                    />
                                </div>
                            ) : (
                                <div className="w-24 h-20 shrink-0 overflow-hidden rounded-lg bg-slate-800/50 border border-slate-700 flex items-center justify-center">
                                    <Newspaper className="w-8 h-8 text-slate-600 opacity-30" />
                                </div>
                            )}
                            <div className="flex-1 min-w-0 flex flex-col justify-center">
                                <div className="flex items-center gap-2 mb-1.5">
                                    <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider truncate py-0.5 px-2 bg-blue-500/10 rounded-full border border-blue-500/20">
                                        {item.source}
                                    </span>
                                    <span className="text-[10px] font-semibold text-slate-500">
                                        {item.date}
                                    </span>
                                </div>
                                <h3 className="text-sm font-bold text-slate-200 line-clamp-2 leading-snug group-hover/news:text-blue-200 transition-colors">
                                    {item.title}
                                </h3>
                            </div>
                        </a>
                    ))
                ) : (
                    <p className="text-slate-500 italic text-center py-4">No news stories found.</p>
                )}
            </div>
        </BaseCard>
    );
}
