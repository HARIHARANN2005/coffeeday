import React from 'react';
import { Coffee, ShoppingBag, User, Bike, MapPin, Award, ChevronDown } from 'lucide-react';

export default function Navbar({
  cartCount,
  cartTotal,
  onOpenCart,
  onOpenProfile,
  userProfile,
  activeOrder,
  onOpenTracker
}) {
  return (
    <header className="sticky top-0 z-40 bg-[#120a06]/90 backdrop-blur-md border-b border-amber-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 sm:h-20 flex items-center justify-between gap-4">
        
        {/* Brand Logo & Tagline */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 text-black shadow-warm border border-amber-400/40 group">
            <Coffee className="w-6 h-6 stroke-[2.2] group-hover:scale-110 transition-transform" />
            {/* Steam animation on logo */}
            <span className="absolute -top-1 right-2 w-1 h-3 bg-white/70 rounded-full animate-steam-1 pointer-events-none" />
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl sm:text-2xl font-black text-amber-50 tracking-tight font-serif">
                Coffee Day
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1" />
            </div>
            <p className="text-[10px] sm:text-xs text-amber-300/70 font-medium tracking-wide">
              Crafted Fresh • Brewed For You
            </p>
          </div>
        </div>

        {/* Center: Delivery Location Pill (Hidden on mobile) */}
        <div 
          onClick={onOpenProfile}
          className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-[#1c120c]/80 border border-amber-900/40 hover:border-amber-700/60 cursor-pointer transition-colors"
        >
          <div className="w-6 h-6 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
            <MapPin className="w-3.5 h-3.5" />
          </div>
          <div className="text-left text-xs">
            <span className="text-[10px] text-amber-400/80 uppercase font-bold block">Delivering To</span>
            <span className="text-amber-100 font-semibold truncate max-w-[170px] block">
              {userProfile?.address?.split(',')[0] || 'Indiranagar, BLR'}
            </span>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-amber-400/60 ml-1" />
        </div>

        {/* Right Action Icons: Active Tracker, Profile & Cart */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Active Order Pill */}
          {activeOrder && (
            <button
              type="button"
              onClick={onOpenTracker}
              className="px-3 py-2 rounded-2xl bg-gradient-to-r from-amber-600/30 to-amber-700/30 border border-amber-500/50 text-amber-300 text-xs font-bold flex items-center gap-2 shadow-glow animate-pulseSubtle"
            >
              <Bike className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Track Live</span>
            </button>
          )}

          {/* User Profile Button */}
          <button
            type="button"
            onClick={onOpenProfile}
            className="p-2 sm:px-3 sm:py-2 rounded-2xl bg-amber-950/40 hover:bg-amber-900/40 border border-amber-900/50 text-amber-200 text-xs font-semibold flex items-center gap-2 transition-all"
            title="Profile & Rewards"
          >
            <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs">
              {userProfile?.name ? userProfile.name.charAt(0) : <User className="w-3.5 h-3.5" />}
            </div>
            <span className="hidden sm:inline font-bold text-amber-100">{userProfile?.name?.split(' ')[0] || 'Profile'}</span>
            <div className="hidden lg:flex items-center gap-1 text-[11px] text-amber-400 font-medium bg-black/40 px-2 py-0.5 rounded-lg border border-amber-900/40">
              <Award className="w-3 h-3 text-amber-400" />
              <span>380 pts</span>
            </div>
          </button>

          {/* Shopping Cart Button */}
          <button
            type="button"
            onClick={onOpenCart}
            className="relative px-3.5 sm:px-4 py-2 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold text-xs sm:text-sm shadow-warm flex items-center gap-2 transition-all transform active:scale-95"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Cart</span>
            {cartCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-black text-amber-400 text-xs font-black flex items-center justify-center">
                {cartCount}
              </span>
            )}
            {cartTotal > 0 && (
              <span className="font-serif border-l border-black/20 pl-1.5 hidden sm:inline">
                ₹{cartTotal}
              </span>
            )}
          </button>

        </div>

      </div>
    </header>
  );
}
