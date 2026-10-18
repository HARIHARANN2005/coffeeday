import React from 'react';
import { Coffee, ShieldCheck, Heart, Sparkles, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer({ onExploreMenu, onOpenCustomBrew, onOpenTracker }) {
  return (
    <footer className="mt-20 bg-[#0c0704] border-t border-amber-900/40 text-amber-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12 pb-12 border-b border-amber-950/80">
          
          {/* Col 1: Brand & Story */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500 text-black flex items-center justify-center font-bold">
                <Coffee className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="text-xl font-black text-amber-100 font-serif">Coffee Day</span>
            </div>
            <p className="text-xs text-amber-300/70 leading-relaxed">
              Pioneering India's coffee culture since 1996. Sourced straight from the sun-drenched estates of Chikmagalur, freshly roasted and custom-brewed for every cup.
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>A Lot Can Happen Over Coffee</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Quick Brew Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={onExploreMenu} className="hover:text-amber-300 transition-colors">
                  Artisanal Coffee Menu
                </button>
              </li>
              <li>
                <button onClick={onOpenCustomBrew} className="hover:text-amber-300 transition-colors">
                  Custom Brew Bar (Milk & Roast)
                </button>
              </li>
              <li>
                <button onClick={onOpenTracker} className="hover:text-amber-300 transition-colors">
                  Live Order Tracker
                </button>
              </li>
              <li>
                <span className="text-amber-400/60 cursor-pointer hover:text-amber-300">
                  Coffee Day Bean Club & Rewards
                </span>
              </li>
              <li>
                <span className="text-amber-400/60 cursor-pointer hover:text-amber-300">
                  Store Locator & Roastery Cafes
                </span>
              </li>
            </ul>
          </div>

          {/* Col 3: Roastery Heritage & Quality */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              The Coffee Day Standard
            </h4>
            <div className="space-y-2.5 text-xs text-amber-300/70">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Shade-Grown Arabica</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Custom Milk: Oat, Almond, Soy & Dairy</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Spill-Proof Heat-Lock Eco-Packaging</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Express 18-min E-Scooter Delivery</span>
              </div>
            </div>
          </div>

          {/* Col 4: Contact & Care */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Customer Care Hotline
            </h4>
            <div className="space-y-2 text-xs">
              <p className="flex items-center gap-2 text-amber-100 font-semibold">
                <Phone className="w-4 h-4 text-amber-400" />
                <span>1800-102-BREW (2739)</span>
              </p>
              <p className="flex items-center gap-2 text-amber-300/70">
                <Mail className="w-4 h-4 text-amber-400" />
                <span>orders@coffeeday.in</span>
              </p>
              <p className="flex items-start gap-2 text-amber-300/70">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Coffee Day Square, Vittal Mallya Road, Bengaluru 560001</span>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-amber-300/50">
          <p>© 2026 Coffee Day Global Limited. Handcrafted for true coffee lovers.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-amber-300 cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-amber-300 cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-amber-300 cursor-pointer">FSSAI Certified</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
