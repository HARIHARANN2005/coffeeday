import React from 'react';
import { Sparkles, Flame, Snowflake, IceCream, Crown, Cookie, Search, X } from 'lucide-react';
import { CATEGORIES } from '../data/coffeeData';

export default function CategoryFilter({ 
  selectedCategory, 
  onSelectCategory, 
  searchQuery, 
  onSearchChange,
  totalItemsCount 
}) {
  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'Sparkles': return <Sparkles className="w-4 h-4" />;
      case 'Flame': return <Flame className="w-4 h-4" />;
      case 'Snowflake': return <Snowflake className="w-4 h-4" />;
      case 'IceCream': return <IceCream className="w-4 h-4" />;
      case 'Crown': return <Crown className="w-4 h-4" />;
      case 'Cookie': return <Cookie className="w-4 h-4" />;
      default: return <Sparkles className="w-4 h-4" />;
    }
  };

  return (
    <div className="px-4 sm:px-6 max-w-7xl mx-auto space-y-4">
      
      {/* Search Bar & Total results row */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        
        {/* Search input with icon and clear button */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-amber-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search espresso, cold brew, oat milk, mocha..."
            className="w-full pl-10 pr-9 py-2.5 rounded-2xl bg-[#1c120c]/80 border border-amber-900/40 text-amber-100 placeholder-amber-400/40 text-xs sm:text-sm focus:outline-hidden focus:border-amber-500 transition-all shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-400 hover:text-amber-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Total coffees count badge */}
        <div className="text-xs text-amber-300/70 font-medium self-end sm:self-center">
          Showing <strong className="text-amber-400 font-bold">{totalItemsCount}</strong> freshly roasted choices
        </div>

      </div>

      {/* Horizontal Category Pills */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map(cat => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap transition-all duration-200 border ${
                isSelected
                  ? 'bg-amber-500 text-black border-amber-400 shadow-warm'
                  : 'bg-[#1a0f09]/80 border-amber-900/40 text-amber-200/80 hover:bg-[#25150d] hover:border-amber-700/50'
              }`}
            >
              <span className={isSelected ? 'text-black' : 'text-amber-400'}>
                {getCategoryIcon(cat.icon)}
              </span>
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>

    </div>
  );
}
