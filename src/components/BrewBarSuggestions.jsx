import React, { useState } from 'react';
import { Sparkles, Zap, Heart, Sun, Leaf, ArrowRight, Sliders, CheckCircle2 } from 'lucide-react';
import { SUGGESTION_PRESETS, COFFEE_MENU } from '../data/coffeeData';

export default function BrewBarSuggestions({ onSelectCoffee, onQuickAdd }) {
  const [selectedPresetIdx, setSelectedPresetIdx] = useState(0);

  const currentPreset = SUGGESTION_PRESETS[selectedPresetIdx];
  const suggestedCoffee = COFFEE_MENU.find(c => c.id === currentPreset.recommendation);

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Zap': return <Zap className="w-4 h-4" />;
      case 'Heart': return <Heart className="w-4 h-4" />;
      case 'Sun': return <Sun className="w-4 h-4" />;
      case 'Leaf': return <Leaf className="w-4 h-4" />;
      default: return <Sparkles className="w-4 h-4" />;
    }
  };

  return (
    <div className="py-8 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="glass-panel-warm rounded-3xl p-6 sm:p-8 border border-amber-800/40 shadow-warm-lg relative overflow-hidden">
        
        {/* Ambient background blur elements */}
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-amber-700/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Barista AI Matchmaker • Suggestion Studio</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-amber-100 font-serif">
                Not sure what to order? Let us brew the idea.
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-amber-200/70 max-w-md">
              Select your current mood or craving, and our Head Barista suggests the exact roast and brew tailored for you.
            </p>
          </div>

          {/* Mood Selector Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-8">
            {SUGGESTION_PRESETS.map((preset, idx) => {
              const isSelected = selectedPresetIdx === idx;
              return (
                <button
                  key={preset.title}
                  onClick={() => setSelectedPresetIdx(idx)}
                  className={`p-3.5 rounded-2xl text-left border transition-all duration-300 relative ${
                    isSelected
                      ? 'bg-gradient-to-r from-amber-600/30 to-amber-700/20 border-amber-400 text-amber-100 shadow-warm'
                      : 'bg-black/30 border-amber-900/30 text-amber-200/70 hover:bg-black/50 hover:border-amber-700/40'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-amber-200">
                    <span className={`p-1.5 rounded-lg ${isSelected ? 'bg-amber-500 text-black' : 'bg-amber-950 text-amber-400'}`}>
                      {getIcon(preset.icon)}
                    </span>
                    <span>{preset.title}</span>
                  </div>
                  <p className="text-[11px] text-amber-200/60 mt-1.5 line-clamp-1">
                    {preset.desc}
                  </p>
                  {isSelected && (
                    <span className="absolute bottom-1 right-2 text-amber-400 text-[10px] font-semibold flex items-center gap-0.5">
                      Selected <CheckCircle2 className="w-3 h-3 inline" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Suggested Coffee Spotlight Banner */}
          {suggestedCoffee && (
            <div className="bg-[#120a06]/90 rounded-2xl border border-amber-700/30 p-5 sm:p-6 flex flex-col md:flex-row items-center gap-6">
              
              {/* Coffee Thumbnail */}
              <div className="relative w-full md:w-56 h-48 rounded-2xl overflow-hidden shrink-0 shadow-lg">
                <img 
                  src={suggestedCoffee.image} 
                  alt={suggestedCoffee.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500 text-black">
                  Recommended For You
                </span>
              </div>

              {/* Coffee Details & Recommendation Rationale */}
              <div className="flex-1 text-center md:text-left">
                <div className="inline-block px-3 py-1 rounded-full bg-amber-900/40 border border-amber-600/30 text-amber-300 text-xs font-semibold mb-2">
                  💡 Why this cup: {currentPreset.reason}
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-amber-100 font-serif">
                  {suggestedCoffee.name}
                </h3>
                <p className="text-xs sm:text-sm text-amber-200/70 mt-1 max-w-xl">
                  {suggestedCoffee.description}
                </p>

                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-4 text-xs text-amber-300/80">
                  <span className="px-2.5 py-1 rounded-lg bg-amber-950/60 border border-amber-900/40">
                    ⏱️ Prep: {suggestedCoffee.prepTime}
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-amber-950/60 border border-amber-900/40">
                    🔥 Calories: {suggestedCoffee.calories}
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-amber-950/60 border border-amber-900/40">
                    ⭐ Rating: {suggestedCoffee.rating} / 5.0
                  </span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="w-full md:w-auto flex md:flex-col gap-3 justify-center shrink-0 border-t md:border-t-0 md:border-l border-amber-900/40 pt-4 md:pt-0 md:pl-6">
                <div className="text-center md:text-right">
                  <span className="text-[10px] text-amber-400/60 uppercase block">Starting from</span>
                  <span className="text-2xl font-black text-amber-300 font-serif">₹{suggestedCoffee.price}</span>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectCoffee(suggestedCoffee)}
                  className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-xs sm:text-sm shadow-warm flex items-center justify-center gap-2 transition-all active:scale-95 whitespace-nowrap"
                >
                  <Sliders className="w-4 h-4" />
                  <span>Customize & Order</span>
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
