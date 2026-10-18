import React from 'react';
import { Star, Clock, Flame, Sliders, Plus, Check } from 'lucide-react';
import { playSound } from '../utils/audio';

export default function CoffeeCard({ coffee, onOpenCustomizer, onQuickAdd }) {
  const handleQuickAdd = (e) => {
    e.stopPropagation();
    playSound('add-to-cart');
    onQuickAdd(coffee);
  };

  return (
    <div 
      onClick={() => onOpenCustomizer(coffee)}
      className="group relative bg-[#170e09]/80 rounded-3xl border border-amber-900/30 hover:border-amber-600/50 p-4 transition-all duration-300 hover:shadow-warm-lg hover:-translate-y-1 flex flex-col justify-between cursor-pointer overflow-hidden"
    >
      {/* Top Image Container */}
      <div className="relative w-full h-48 sm:h-52 rounded-2xl overflow-hidden mb-3.5 bg-amber-950/40">
        <img 
          src={coffee.image} 
          alt={coffee.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
          {coffee.badge && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500 text-black shadow-md">
              {coffee.badge}
            </span>
          )}
          {coffee.isVeg && (
            <span className="w-5 h-5 rounded-md bg-black/60 backdrop-blur-xs border border-emerald-500/60 flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
            </span>
          )}
        </div>

        {/* Rating pill */}
        <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-amber-400/30 flex items-center gap-1 text-[11px] font-bold text-amber-300">
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          <span>{coffee.rating}</span>
          <span className="text-[9px] text-amber-200/50 font-normal">({coffee.reviewsCount})</span>
        </div>

        {/* Prep Time & Calories meta at bottom of image */}
        <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-[11px] text-amber-200/80 font-medium">
          <span className="flex items-center gap-1 bg-black/50 backdrop-blur-xs px-2 py-0.5 rounded-md">
            <Clock className="w-3 h-3 text-amber-400" /> {coffee.prepTime}
          </span>
          <span className="bg-black/50 backdrop-blur-xs px-2 py-0.5 rounded-md">
            {coffee.calories}
          </span>
        </div>
      </div>

      {/* Coffee Info */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-amber-100 font-serif group-hover:text-amber-400 transition-colors line-clamp-1">
            {coffee.name}
          </h3>
          <p className="text-xs text-amber-300/70 italic mt-0.5 line-clamp-1">
            {coffee.tagline}
          </p>
          <p className="text-xs text-amber-200/50 mt-1.5 line-clamp-2">
            {coffee.description}
          </p>
        </div>

        {/* Price & Action Buttons */}
        <div className="mt-4 pt-3 border-t border-amber-900/30 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-amber-400/60 block uppercase font-medium">Starts at</span>
            <span className="text-lg sm:text-xl font-black text-amber-300 font-serif">
              ₹{coffee.price}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Customize button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpenCustomizer(coffee);
              }}
              className="px-3 py-2 rounded-xl bg-amber-950/60 hover:bg-amber-900/70 border border-amber-700/50 text-amber-200 text-xs font-semibold flex items-center gap-1.5 transition-all"
              title="Customize milk, sugar, roast, shots"
            >
              <Sliders className="w-3.5 h-3.5 text-amber-400" />
              <span>Customize</span>
            </button>

            {/* Quick add button */}
            <button
              type="button"
              onClick={handleQuickAdd}
              className="p-2 sm:px-3 sm:py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black text-xs font-bold shadow-warm flex items-center gap-1 transition-all active:scale-95"
              title="Quick Add standard brew"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
