"use client";

import { BadgeDollarSign } from "lucide-react";
import BaseCard from "./BaseCard";

interface Ad {
    title: string;
    link: string;
    description: string;
    displayed_link: string;
    position?: number;
}

interface PaidAdsProps {
    ads: Ad[];
}

/**
 * PaidAds: Displays sponsored/paid results from Google.
 */
export default function PaidAds({ ads }: PaidAdsProps) {
    return (
        <BaseCard
            title="Paid Ad Results"
            icon={<BadgeDollarSign className="w-5 h-5 text-rose-400" />}
            delay={0.5}
        >
            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {ads && ads.length > 0 ? (
                    ads.map((ad, i) => (
                        <div
                            key={i}
                            className="p-4 rounded-xl bg-slate-800/30 border border-slate-700/50 group/ad hover:bg-slate-700/50 hover:border-rose-500/30 transition-all"
                        >
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-[10px] font-bold bg-rose-500/20 text-rose-300 px-2 py-1 rounded border border-rose-500/30 uppercase tracking-widest shadow-sm">
                                    Ad
                                </span>
                                {ad.position && (
                                    <span className="text-[10px] font-semibold text-slate-500 bg-slate-800/80 px-1.5 py-0.5 rounded">
                                        Pos: {ad.position}
                                    </span>
                                )}
                            </div>
                            <a
                                href={ad.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block group-hover/ad:opacity-90 transition-opacity"
                            >
                                <h3 className="text-sm font-bold text-rose-200 line-clamp-1 group-hover/ad:text-rose-100 transition-colors">
                                    {ad.title}
                                </h3>
                                <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                                    {ad.description}
                                </p>
                                <p className="text-[10px] text-rose-400/60 mt-2 truncate font-medium">
                                    {ad.displayed_link}
                                </p>
                            </a>
                        </div>
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-center bg-slate-800/20 rounded-xl border border-dashed border-slate-700">
                        <BadgeDollarSign className="w-8 h-8 text-slate-600 mb-2 opacity-20" />
                        <p className="text-slate-500 italic text-sm">No ads found for this keyword.</p>
                    </div>
                )}
            </div>
        </BaseCard>
    );
}
