import React from 'react';
import { Coffee, Sparkles, ChevronRight, Award, ShieldCheck, Clock, Zap } from 'lucide-react';

export default function HeroBanner({ onExploreMenu, onOpenCustomBrew, activeOrder, onOpenTracker }) {
  return (
    <div className="relative pt-6 pb-12 px-4 sm:px-6 max-w-7xl mx-auto overflow-hidden">
      
      {/* Active Order Live Alert Bar if user has a brew in progress */}
      {activeOrder && (
        <div 
          onClick={onOpenTracker}
          className="mb-6 p-3 sm:p-4 rounded-2xl bg-gradient-to-r from-amber-600/30 via-amber-500/20 to-amber-600/30 border border-amber-500/50 shadow-glow cursor-pointer flex items-center justify-between transition-all hover:scale-[1.01]"
        >
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
            </span>
            <div>
              <span className="text-xs font-bold text-amber-200 uppercase tracking-wider block">
                Live Order in Progress: #{activeOrder.id.slice(-6)}
              </span>
              <span className="text-sm font-semibold text-white">
                Status: {activeOrder.statusText || 'Barista is brewing your coffee...'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300 bg-black/40 px-3 py-1.5 rounded-xl border border-amber-500/30">
            <span>Track Live</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </div>
      )}

      {/* Main Hero Card */}
      <div className="relative rounded-3xl overflow-hidden glass-panel-warm border border-amber-800/40 p-6 sm:p-10 lg:p-12 shadow-2xl">
        
        {/* Glow ambient spots */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-10 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>India's Favorite Coffee Day Experience</span>
              <span className="w-1 h-1 rounded-full bg-amber-400" />
              <span className="text-amber-200/80 font-normal">Chikmagalur Grown</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-amber-50 leading-[1.15] font-serif tracking-tight">
              A Lot Can Happen Over <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500">Coffee Day.</span>
            </h1>

            {/* Subheading */}
            <p className="text-sm sm:text-base text-amber-200/80 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Order your favorite coffees custom-brewed to your exact liking. Customize <strong className="text-amber-300">milk type</strong>, <strong className="text-amber-300">roast intensity</strong>, <strong className="text-amber-300">sugar level %</strong>, and artisan toppings. Delivered hot or chilled in under 20 mins.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                type="button"
                onClick={onOpenCustomBrew}
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-sm shadow-warm hover:shadow-warm-lg transition-all transform active:scale-95 flex items-center gap-2"
              >
                <Coffee className="w-4 h-4" />
                <span>Customize Your Cup</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onExploreMenu}
                className="px-6 py-3.5 rounded-2xl bg-amber-950/40 hover:bg-amber-900/40 border border-amber-700/50 text-amber-200 font-semibold text-sm transition-all flex items-center gap-2"
              >
                <span>View Full Menu</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-4 border-t border-amber-900/30 grid grid-cols-3 gap-3 max-w-lg mx-auto lg:mx-0 text-center">
              <div className="p-2">
                <div className="text-lg sm:text-xl font-black text-amber-300 font-serif">100%</div>
                <div className="text-[11px] text-amber-200/60 leading-tight mt-0.5">Single Origin Arabica</div>
              </div>
              <div className="p-2 border-x border-amber-900/30">
                <div className="text-lg sm:text-xl font-black text-amber-300 font-serif">18 Mins</div>
                <div className="text-[11px] text-amber-200/60 leading-tight mt-0.5">Average Delivery</div>
              </div>
              <div className="p-2">
                <div className="text-lg sm:text-xl font-black text-amber-300 font-serif">4.9 ★</div>
                <div className="text-[11px] text-amber-200/60 leading-tight mt-0.5">25,000+ Reviews</div>
              </div>
            </div>

          </div>

          {/* Right Visual Image */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden border-2 border-amber-700/40 shadow-2xl group">
              <img 
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80" 
                alt="Coffee Day Signature Brew"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              {/* Floating Offer Tag */}
              <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-2xl bg-black/70 backdrop-blur-md border border-amber-500/30 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-amber-400 block tracking-wider">Today's Special Deal</span>
                  <span className="text-xs font-semibold text-white">Flat 30% OFF with code <strong className="text-amber-300">COFFEEDAY30</strong></span>
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-amber-500 text-black text-xs font-bold shrink-0">
                  Save ₹100
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
