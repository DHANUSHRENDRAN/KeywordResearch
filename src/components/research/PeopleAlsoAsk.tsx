"use client";

import { HelpCircle } from "lucide-react";
import BaseCard from "./BaseCard";

interface PeopleAlsoAskProps {
    questions: string[];
}

/**
 * PeopleAlsoAsk: Displays questions users frequently ask on Google.
 */
export default function PeopleAlsoAsk({ questions }: PeopleAlsoAskProps) {
    return (
        <BaseCard
            title="People Also Ask"
            icon={<HelpCircle className="w-5 h-5 text-amber-400" />}
            delay={0.4}
        >
            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {questions && questions.length > 0 ? (
                    questions.map((q: string, i: number) => (
                        <div
                            key={i}
                            className="flex items-start p-4 rounded-xl bg-slate-800/30 border border-slate-700/50 hover:bg-slate-700/50 transition-colors"
                        >
                            <div className="mt-1 mr-4 flex items-center justify-center">
                                <div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]"></div>
                            </div>
                            <p className="text-sm text-slate-300 italic leading-relaxed font-medium">
                                "{q}"
                            </p>
                        </div>
                    ))
                ) : (
                    <p className="text-slate-500 italic text-center py-4">No questions found.</p>
                )}
            </div>
        </BaseCard>
    );
}
