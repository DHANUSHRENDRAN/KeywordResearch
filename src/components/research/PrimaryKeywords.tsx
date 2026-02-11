"use client";

import { Key } from "lucide-react";
import BaseCard from "./BaseCard";

interface PrimaryKeywordsProps {
    keywords: string[];
}

/**
 * PrimaryKeywords: Displays the main keyword variations found in search.
 */
export default function PrimaryKeywords({ keywords }: PrimaryKeywordsProps) {
    return (
        <BaseCard
            title="Primary Keywords (Search Queries)"
            icon={<Key className="w-5 h-5 text-purple-400" />}
            delay={0.1}
        >
            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {keywords && keywords.length > 0 ? (
                    keywords.map((kw: string, i: number) => (
                        <div
                            key={i}
                            className="flex items-center p-3 rounded-lg bg-slate-800/30 border border-slate-700/50 text-sm text-slate-300 hover:bg-slate-800/50 transition-colors"
                        >
                            <span className="w-6 h-6 flex items-center justify-center bg-purple-500/20 text-purple-300 rounded-full text-xs mr-3 min-w-[24px] font-bold">
                                {i + 1}
                            </span>
                            {kw}
                        </div>
                    ))
                ) : (
                    <p className="text-slate-500 italic text-center py-4">No variations found.</p>
                )}
            </div>
        </BaseCard>
    );
}
