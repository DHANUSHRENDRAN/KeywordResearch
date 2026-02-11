"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface BaseCardProps {
    title: string;
    icon: ReactNode;
    children: ReactNode;
    delay?: number;
}

/**
 * BaseCard: A reusable, professional container for all research result sections.
 * Designed for a "plug-in plug-out" architecture.
 */
export default function BaseCard({ title, icon, children, delay = 0 }: BaseCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.4, delay }}
            className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-xl hover:border-white/20 transition-all group"
        >
            {/* Header Section */}
            <div className="px-6 py-4 border-b border-white/5 flex items-center space-x-3 bg-white/5">
                <div className="p-2 bg-slate-800/50 rounded-lg group-hover:scale-110 transition-transform">
                    {icon}
                </div>
                <h3 className="font-semibold text-slate-200 tracking-tight">{title}</h3>
            </div>

            {/* Content Section */}
            <div className="p-6">
                {children}
            </div>
        </motion.div>
    );
}
