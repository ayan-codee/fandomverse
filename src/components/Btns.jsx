import React from 'react';
import { ArrowRight, Search } from 'lucide-react';

export default function HeroActionButtons({ onSearchClick }) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 z-30 relative">
      
      {/* 1. Explore Button (Primary High-Energy CTA) */}
      <a
        href="#explore"
        className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-3.5 text-sm font-extrabold text-white bg-slate-900 hover:bg-indigo-600 rounded-full shadow-xl shadow-slate-900/20 hover:shadow-indigo-500/30 transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden"
      >
        {/* Subtle Inner Glow Effect */}
        <span className="absolute inset-0 w-full h-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <span className="relative z-10">Explore Fandoms</span>
        <ArrowRight className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1.5" />
      </a>

      {/* 2. Search Button (Glassmorphic Secondary CTA) */}
      <button
        onClick={onSearchClick}
        className="group relative inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-sm font-bold text-slate-700 hover:text-indigo-600 bg-white/80 hover:bg-white backdrop-blur-md border border-slate-300/80 hover:border-indigo-300 rounded-full shadow-lg shadow-slate-200/60 transition-all duration-300 hover:scale-105 active:scale-95"
      >
        <Search className="w-4 h-4 text-slate-500 group-hover:text-indigo-600 group-hover:scale-110 transition-all duration-300" />
        <span>Search</span>
      </button>

    </div>
  );
}