import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  Heart, 
  ShoppingBag, 
  Menu, 
  X, 
  Compass, 
  Users, 
  Film, 
  Calendar, 
  Store 
} from 'lucide-react';

export default function Header({ favoriteCount = 0, cartCount = 0, onSearchClick }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Explore', href: '#explore', icon: Compass },
    { name: 'Characters', href: '#characters', icon: Users },
    { name: 'Trailers', href: '#trailers', icon: Film },
    { name: 'Events', href: '#events', icon: Calendar },
    { name: 'Merch Store', href: '#merch', icon: Store },
  ];

  return (
    <header className="relative  z-30 max-w-7xl mx-auto px-4 sm:px-8 py-4">
      {/* Main Floating Glassmorphic Container */}
      <div className="backdrop-blur-lg backdrop-brightness-70 rounded-full px-5 sm:px-7 py-3  flex items-center justify-between transition-all gap-4">
        
        {/* 1. Brand Logo */}
        <a href="#" className="flex items-center gap-2.5 font-black text-xl tracking-tight text-white cursor-pointer group shrink-0">
          <div className="p-1.5 bg-red-600 rounded-xl text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition">
            <Sparkles className="w-5 h-5 fill-white" />
          </div>
          <span className="text-lg sm:text-xl">Fandom<span className="text-red-600"> Verse</span></span>
        </a>

        {/* 2. Navigation Links (Desktop) */}
        <nav className="hidden xl:flex items-center gap-6 text-sm text-slate-100 shrink-0">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="hover:text-red-600 transition"
            >
              {link.name}
            </a>
          ))}
        </nav>

       

       {/* Right Action Icons Group */}
<div className="flex items-center gap-1.5 sm:gap-2">

  {/* 1. Search Icon Button (Explore/Search Page Redirect) */}
  <button 
    onClick={() => window.location.href = '#explore'} // ya page navigation logic
    aria-label="Search Fandoms"
    className="p-2.5 hover:bg-slate-100 text-slate-700 rounded-full transition hover:scale-105 border border-transparent hover:border-slate-200"
  >
    <Search className="w-5 h-5 text-indigo-600" />
  </button>

  {/* 2. Favorites Button */}
  <button 
    aria-label="Favorites"
    className="relative p-2.5 hover:bg-slate-100 text-slate-700 rounded-full transition hover:scale-105 border border-transparent hover:border-slate-200"
  >
    <Heart className="w-5 h-5 text-rose-500" />
    {favoriteCount > 0 && (
      <span className="absolute top-0 right-0 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
        {favoriteCount}
      </span>
    )}
  </button>

  {/* 3. Merch Cart Button */}
  <button 
    aria-label="Shopping Cart"
    className="relative p-2.5 hover:bg-slate-100 text-slate-700 rounded-full transition hover:scale-105 border border-transparent hover:border-slate-200"
  >
    <ShoppingBag className="w-5 h-5 text-indigo-600" />
    {cartCount > 0 && (
      <span className="absolute top-0 right-0 bg-indigo-600 text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">
        {cartCount}
      </span>
    )}
  </button>

</div>

        {/* 5. Mobile Search & Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button 
            onClick={onSearchClick}
            className="p-2 hover:bg-slate-100 text-slate-700 rounded-full transition"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-slate-700 hover:bg-slate-100 rounded-full transition"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-3 bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-2xl p-4 shadow-xl space-y-3 font-semibold text-sm text-slate-700">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 hover:bg-slate-100 rounded-xl transition"
                >
                  <Icon className="w-4 h-4 text-indigo-600" />
                  <span>{link.name}</span>
                </a>
              );
            })}
          </div>
          
          <div className="pt-3 border-t border-slate-100 flex items-center justify-around">
            <button className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-100 px-4 py-2.5 rounded-full">
              <Heart className="w-4 h-4 text-rose-500" />
              <span>Favorites ({favoriteCount})</span>
            </button>
            <button className="flex items-center gap-2 text-xs font-semibold text-white bg-indigo-600 px-4 py-2.5 rounded-full shadow-md shadow-indigo-500/20">
              <ShoppingBag className="w-4 h-4 text-white" />
              <span>Cart ({cartCount})</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}