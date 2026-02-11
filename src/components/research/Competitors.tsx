"use client";

import { Users, ExternalLink } from "lucide-react";
import BaseCard from "./BaseCard";

interface Competitor {
    title: string;
    link: string;
    snippet: string;
    source: string;
}

interface CompetitorsProps {
    competitors: Competitor[];
}

/**
 * Competitors: Lists top organic search competitors.
 */
export default function Competitors({ competitors }: CompetitorsProps) {
    return (
        <BaseCard
            title="Top Competitors"
            icon={<Users className="w-5 h-5 text-emerald-400" />}
            delay={0.3}
        >
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {competitors && competitors.length > 0 ? (
                    competitors.map((comp, i) => (
                        <a
                            key={i}
                            href={comp.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block p-4 rounded-xl bg-slate-800/30 border border-slate-700/50 hover:bg-slate-700/50 hover:border-emerald-500/30 transition-all group/item"
                        >
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">{comp.source}</span>
                                <ExternalLink className="w-3 h-3 text-slate-500 group-hover/item:text-emerald-300 transition-colors" />
                            </div>
                            <h3 className="text-sm font-semibold text-slate-200 line-clamp-1 group-hover/item:text-emerald-200 transition-colors">
                                {comp.title}
                            </h3>
                            <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                                {comp.snippet}
                            </p>
                        </a>
                    ))
                ) : (
                    <p className="text-slate-500 italic text-center py-4">No competitors found.</p>
                )}
            </div>
        </BaseCard>
    );
}
