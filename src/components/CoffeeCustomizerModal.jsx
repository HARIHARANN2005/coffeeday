import React, { useState, useEffect } from 'react';
import { X, Check, Coffee, Flame, Snowflake, Sparkles, Plus, Minus, Info } from 'lucide-react';
import { CUSTOMIZATION_OPTIONS } from '../data/coffeeData';
import CupVisualizer from './CupVisualizer';
import { playSound } from '../utils/audio';

export default function CoffeeCustomizerModal({ coffee, isOpen, onClose, onAddToCart }) {
  if (!isOpen || !coffee) return null;

  // Initialize customization state from default or preset
  const [customization, setCustomization] = useState(() => ({
    ...coffee.defaultCustomization,
    toppings: coffee.defaultCustomization?.toppings ? [...coffee.defaultCustomization.toppings] : [],
    size: coffee.defaultCustomization?.size || 'regular',
    quantity: 1,
  }));

  const [activeTab, setActiveTab] = useState('milk-coffee'); // 'size', 'milk-coffee', 'sugar-sweetener', 'temperature', 'toppings'

  // Reset when a different coffee is opened
  useEffect(() => {
    if (coffee) {
      setCustomization({
        ...coffee.defaultCustomization,
        toppings: coffee.defaultCustomization?.toppings ? [...coffee.defaultCustomization.toppings] : [],
        size: coffee.defaultCustomization?.size || 'regular',
        quantity: 1,
      });
      setActiveTab('milk-coffee');
    }
  }, [coffee]);

  // Calculate live total price
  const calculateTotal = () => {
    let price = coffee.price;

    // Size adjustment
    const sizeObj = CUSTOMIZATION_OPTIONS.sizes.find(s => s.id === customization.size);
    if (sizeObj) price += sizeObj.priceAdj;

    // Milk price
    if (coffee.allowedCustomizations.milk) {
      const milkObj = CUSTOMIZATION_OPTIONS.milks.find(m => m.id === customization.milk);
      if (milkObj) price += milkObj.price;
    }

    // Bean origin price
    if (coffee.allowedCustomizations.roast) {
      const beanObj = CUSTOMIZATION_OPTIONS.beans.find(b => b.id === customization.beans);
      if (beanObj) price += beanObj.price;

      // Extra shots
      const shotObj = CUSTOMIZATION_OPTIONS.shots.find(s => s.id === customization.shots);
      if (shotObj) price += shotObj.price;
    }

    // Sweetener price
    if (coffee.allowedCustomizations.sugar) {
      const sweetObj = CUSTOMIZATION_OPTIONS.sweeteners.find(sw => sw.id === customization.sweetener);
      if (sweetObj) price += sweetObj.price;
    }

    // Toppings
    if (coffee.allowedCustomizations.toppings && customization.toppings) {
      customization.toppings.forEach(topId => {
        const topObj = CUSTOMIZATION_OPTIONS.toppings.find(t => t.id === topId);
        if (topObj) price += topObj.price;
      });
    }

    return Math.max(0, price) * (customization.quantity || 1);
  };

  const totalPrice = calculateTotal();

  const handleToppingToggle = (toppingId) => {
    setCustomization(prev => {
      const exists = prev.toppings.includes(toppingId);
      return {
        ...prev,
        toppings: exists
          ? prev.toppings.filter(id => id !== toppingId)
          : [...prev.toppings, toppingId]
      };
    });
  };

  const handleAddToCart = () => {
    playSound('add-to-cart');
    onAddToCart({
      coffee,
      customization,
      unitPrice: calculateTotal() / customization.quantity,
      totalPrice: calculateTotal(),
      id: `${coffee.id}-${Date.now()}`,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-4xl bg-[#170e09] border border-amber-900/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-[#22150e] via-[#1a0f09] to-[#22150e] border-b border-amber-900/30 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Coffee className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-bold text-amber-100 font-serif">{coffee.name}</h3>
                {coffee.badge && (
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {coffee.badge}
                  </span>
                )}
              </div>
              <p className="text-xs text-amber-200/60 hidden sm:block">{coffee.tagline}</p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-2 rounded-full text-amber-400/80 hover:text-amber-200 hover:bg-amber-950/60 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Content: Split Grid (Visualizer on Left, Customizer Options on Right) */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-12 gap-0">
          
          {/* Left Column: Visualizer & Summary */}
          <div className="md:col-span-5 p-5 bg-[#120a06]/90 border-b md:border-b-0 md:border-r border-amber-900/30 flex flex-col justify-between">
            <div>
              <div className="text-xs uppercase tracking-wider text-amber-400/70 font-semibold mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Real-time Brew Studio
              </div>
              <CupVisualizer customization={customization} coffee={coffee} />
            </div>

            {/* Quick Summary Specs */}
            <div className="mt-4 p-3.5 rounded-2xl bg-amber-950/30 border border-amber-900/40 text-xs space-y-2">
              <div className="flex justify-between text-amber-200/70">
                <span>Cup Size:</span>
                <span className="font-semibold text-amber-100 capitalize">{customization.size}</span>
              </div>
              {coffee.allowedCustomizations.milk && (
                <div className="flex justify-between text-amber-200/70">
                  <span>Selected Milk:</span>
                  <span className="font-semibold text-amber-100">
                    {CUSTOMIZATION_OPTIONS.milks.find(m => m.id === customization.milk)?.name || 'Custom'}
                  </span>
                </div>
              )}
              {coffee.allowedCustomizations.roast && (
                <div className="flex justify-between text-amber-200/70">
                  <span>Roast & Origin:</span>
                  <span className="font-semibold text-amber-100 capitalize">
                    {customization.roast} • {customization.shots}
                  </span>
                </div>
              )}
              {coffee.allowedCustomizations.sugar && (
                <div className="flex justify-between text-amber-200/70">
                  <span>Sweetness:</span>
                  <span className="font-semibold text-amber-100">{customization.sugarLevel} ({customization.sweetener})</span>
                </div>
              )}
              {customization.toppings.length > 0 && (
                <div className="flex justify-between text-amber-200/70">
                  <span>Toppings ({customization.toppings.length}):</span>
                  <span className="font-semibold text-amber-300 text-right">
                    {customization.toppings.map(t => CUSTOMIZATION_OPTIONS.toppings.find(x => x.id === t)?.name?.split(' ')[0]).join(', ')}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Customizer Tabs & Inputs */}
          <div className="md:col-span-7 p-5 sm:p-6 space-y-6 overflow-y-auto">

            {/* Customizer Section Navigation Tabs */}
            <div className="flex overflow-x-auto gap-2 pb-1 scrollbar-none border-b border-amber-900/30">
              <button
                onClick={() => setActiveTab('milk-coffee')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === 'milk-coffee'
                    ? 'bg-amber-600 text-white shadow-warm'
                    : 'bg-amber-950/40 text-amber-300/80 hover:bg-amber-900/40'
                }`}
              >
                ☕ Milk & Beans
              </button>
              <button
                onClick={() => setActiveTab('sugar-sweetener')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === 'sugar-sweetener'
                    ? 'bg-amber-600 text-white shadow-warm'
                    : 'bg-amber-950/40 text-amber-300/80 hover:bg-amber-900/40'
                }`}
              >
                🍬 Sugar & Sweetener
              </button>
              <button
                onClick={() => setActiveTab('temperature')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === 'temperature'
                    ? 'bg-amber-600 text-white shadow-warm'
                    : 'bg-amber-950/40 text-amber-300/80 hover:bg-amber-900/40'
                }`}
              >
                🌡️ Size & Temp
              </button>
              <button
                onClick={() => setActiveTab('toppings')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === 'toppings'
                    ? 'bg-amber-600 text-white shadow-warm'
                    : 'bg-amber-950/40 text-amber-300/80 hover:bg-amber-900/40'
                }`}
              >
                ✨ Add-ons & Toppings
              </button>
            </div>

            {/* TAB 1: MILK & BEANS */}
            {activeTab === 'milk-coffee' && (
              <div className="space-y-6 animate-fadeIn">
                
                {/* Milk Selector */}
                {coffee.allowedCustomizations.milk ? (
                  <div>
                    <div className="flex justify-between items-center mb-2.5">
                      <label className="text-sm font-bold text-amber-100 flex items-center gap-1.5">
                        <span>🥛 Milk Customization</span>
                        <span className="text-[10px] text-amber-400 font-normal">(Choose your dairy or plant base)</span>
                      </label>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {CUSTOMIZATION_OPTIONS.milks.map(m => {
                        const isSelected = customization.milk === m.id;
                        return (
                          <button
                            key={m.id}
                            type="button"
                            onClick={() => setCustomization(prev => ({ ...prev, milk: m.id }))}
                            className={`p-3 rounded-2xl text-left border transition-all relative flex flex-col justify-between ${
                              isSelected
                                ? 'bg-amber-500/15 border-amber-500 text-amber-100 shadow-warm'
                                : 'bg-amber-950/20 border-amber-900/40 text-amber-200/80 hover:border-amber-700/50 hover:bg-amber-950/40'
                            }`}
                          >
                            <div className="flex justify-between items-start">
                              <span className="font-semibold text-xs leading-snug">{m.name}</span>
                              {isSelected && <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />}
                            </div>
                            <div className="mt-2 flex items-center justify-between text-[11px]">
                              <span className="text-amber-300/60 text-[10px] truncate">{m.tag}</span>
                              <span className="font-semibold text-amber-300 ml-1">
                                {m.price > 0 ? `+₹${m.price}` : 'Free'}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="p-3 bg-amber-950/20 border border-amber-900/40 rounded-xl text-xs text-amber-300/80 flex items-center gap-2">
                    <Info className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>This coffee is traditionally crafted without milk to preserve its pure flavor profile.</span>
                  </div>
                )}

                {/* Coffee Powder Roast & Bean Origin */}
                {coffee.allowedCustomizations.roast && (
                  <div className="space-y-4 pt-2 border-t border-amber-900/30">
                    <div>
                      <label className="text-sm font-bold text-amber-100 block mb-2">
                        🔥 Roast Profile (Roasting Strength)
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {CUSTOMIZATION_OPTIONS.roasts.map(r => {
                          const isSelected = customization.roast === r.id;
                          return (
                            <button
                              key={r.id}
                              type="button"
                              onClick={() => setCustomization(prev => ({ ...prev, roast: r.id }))}
                              className={`p-2.5 rounded-xl text-left border transition-all ${
                                isSelected
                                  ? 'bg-amber-600/20 border-amber-500 text-amber-100'
                                  : 'bg-amber-950/20 border-amber-900/40 text-amber-200/80 hover:bg-amber-900/30'
                              }`}
                            >
                              <div className="font-semibold text-xs">{r.name.split(' ')[0]}</div>
                              <div className="text-[10px] text-amber-300/70 mt-1 line-clamp-2">{r.notes}</div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Bean Blend Origin */}
                    <div>
                      <label className="text-sm font-bold text-amber-100 block mb-2">
                        🌱 Coffee Bean Blend & Origin
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {CUSTOMIZATION_OPTIONS.beans.map(b => {
                          const isSelected = customization.beans === b.id;
                          return (
                            <button
                              key={b.id}
                              type="button"
                              onClick={() => setCustomization(prev => ({ ...prev, beans: b.id }))}
                              className={`p-2.5 rounded-xl text-left border transition-all flex flex-col justify-between ${
                                isSelected
                                  ? 'bg-amber-600/20 border-amber-500 text-amber-100'
                                  : 'bg-amber-950/20 border-amber-900/40 text-amber-200/80 hover:bg-amber-900/30'
                              }`}
                            >
                              <div>
                                <div className="font-medium text-xs text-amber-100">{b.name}</div>
                                <div className="text-[10px] text-amber-300/60 mt-0.5">{b.notes}</div>
                              </div>
                              <div className="text-[11px] font-semibold text-amber-400 mt-1.5">
                                {b.price > 0 ? `+₹${b.price}` : 'Included'}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Espresso Shots */}
                    <div>
                      <label className="text-sm font-bold text-amber-100 block mb-2">
                        ⚡ Espresso Extraction Intensity
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {CUSTOMIZATION_OPTIONS.shots.map(s => {
                          const isSelected = customization.shots === s.id;
                          return (
                            <button
                              key={s.id}
                              type="button"
                              onClick={() => setCustomization(prev => ({ ...prev, shots: s.id }))}
                              className={`p-2 rounded-xl text-center border transition-all ${
                                isSelected
                                  ? 'bg-amber-500 text-black font-bold'
                                  : 'bg-amber-950/30 border-amber-900/40 text-amber-200 hover:border-amber-700'
                              }`}
                            >
                              <div className="text-xs font-semibold">{s.name.split(' ')[0]} Shot</div>
                              <div className={`text-[10px] ${isSelected ? 'text-black/80' : 'text-amber-400'}`}>
                                {s.price > 0 ? `+₹${s.price}` : 'Standard'}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                  </div>
                )}

              </div>
            )}

            {/* TAB 2: SUGAR LEVEL & SWEETENER */}
            {activeTab === 'sugar-sweetener' && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-sm font-bold text-amber-100">
                      🍬 Sugar Level / Sweetness Percentage
                    </label>
                    <span className="text-xs font-bold text-amber-400 bg-amber-950 px-2.5 py-1 rounded-full border border-amber-800">
                      {customization.sugarLevel}
                    </span>
                  </div>

                  <div className="grid grid-cols-5 gap-2">
                    {CUSTOMIZATION_OPTIONS.sugarLevels.map(sl => {
                      const isSelected = customization.sugarLevel === sl.id;
                      return (
                        <button
                          key={sl.id}
                          type="button"
                          onClick={() => setCustomization(prev => ({ ...prev, sugarLevel: sl.id }))}
                          className={`p-2.5 rounded-xl text-center border transition-all ${
                            isSelected
                              ? 'bg-amber-500 text-black font-bold shadow-warm'
                              : 'bg-amber-950/25 border-amber-900/40 text-amber-200 hover:bg-amber-900/30'
                          }`}
                        >
                          <div className="text-xs font-bold">{sl.id}</div>
                          <div className={`text-[10px] mt-0.5 ${isSelected ? 'text-black/80' : 'text-amber-300/70'}`}>
                            {sl.label.split(' ')[1]}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Sweetener Variety */}
                <div className="pt-4 border-t border-amber-900/30">
                  <label className="text-sm font-bold text-amber-100 block mb-2.5">
                    🍯 Sweetener Choice & Natural Alternatives
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {CUSTOMIZATION_OPTIONS.sweeteners.map(sw => {
                      const isSelected = customization.sweetener === sw.id;
                      return (
                        <button
                          key={sw.id}
                          type="button"
                          onClick={() => setCustomization(prev => ({ ...prev, sweetener: sw.id }))}
                          className={`p-2.5 rounded-xl text-left border transition-all ${
                            isSelected
                              ? 'bg-amber-500/20 border-amber-500 text-amber-100'
                              : 'bg-amber-950/20 border-amber-900/40 text-amber-200/80 hover:bg-amber-900/30'
                          }`}
                        >
                          <div className="font-semibold text-xs leading-tight">{sw.name}</div>
                          <div className="text-[11px] font-medium text-amber-400 mt-1">
                            {sw.price > 0 ? `+₹${sw.price}` : 'Free'}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>
            )}

            {/* TAB 3: SIZE & TEMPERATURE */}
            {activeTab === 'temperature' && (
              <div className="space-y-6 animate-fadeIn">
                {/* Cup Size */}
                <div>
                  <label className="text-sm font-bold text-amber-100 block mb-2.5">
                    📏 Cup Size
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {CUSTOMIZATION_OPTIONS.sizes.map(s => {
                      const isSelected = customization.size === s.id;
                      return (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => setCustomization(prev => ({ ...prev, size: s.id }))}
                          className={`p-3.5 rounded-2xl text-center border transition-all ${
                            isSelected
                              ? 'bg-amber-500 text-black font-bold shadow-warm'
                              : 'bg-amber-950/20 border-amber-900/40 text-amber-200 hover:bg-amber-900/30'
                          }`}
                        >
                          <div className="text-sm font-bold">{s.name.split(' ')[0]}</div>
                          <div className={`text-[11px] mt-0.5 ${isSelected ? 'text-black/80' : 'text-amber-300/70'}`}>
                            {s.name.split(' ')[1]}
                          </div>
                          <div className={`text-xs mt-1 font-semibold ${isSelected ? 'text-black' : 'text-amber-400'}`}>
                            {s.priceAdj === 0 ? 'Base' : s.priceAdj > 0 ? `+₹${s.priceAdj}` : `-₹${Math.abs(s.priceAdj)}`}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Temperature & Ice */}
                <div className="pt-4 border-t border-amber-900/30">
                  <label className="text-sm font-bold text-amber-100 block mb-2.5">
                    🌡️ Temperature & Ice Level
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {CUSTOMIZATION_OPTIONS.temperatures.map(t => {
                      const isSelected = customization.temperature === t.id;
                      return (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setCustomization(prev => ({ ...prev, temperature: t.id }))}
                          className={`p-3 rounded-2xl text-left border transition-all flex items-center justify-between ${
                            isSelected
                              ? 'bg-amber-500/20 border-amber-500 text-amber-100'
                              : 'bg-amber-950/20 border-amber-900/40 text-amber-200/80 hover:bg-amber-900/30'
                          }`}
                        >
                          <div>
                            <div className="font-semibold text-xs text-amber-100">{t.name}</div>
                            <div className="text-[10px] text-amber-300/60 mt-0.5">{t.desc}</div>
                          </div>
                          {isSelected && <Check className="w-4 h-4 text-amber-400 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>
            )}

            {/* TAB 4: ADD-ONS & TOPPINGS */}
            {activeTab === 'toppings' && (
              <div className="space-y-5 animate-fadeIn">
                <div>
                  <label className="text-sm font-bold text-amber-100 block mb-2">
                    ✨ Barista Toppings & Infusions
                  </label>
                  <p className="text-xs text-amber-200/60 mb-3">Select any toppings or syrups you would love to crown your brew with:</p>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-2 gap-2.5">
                    {CUSTOMIZATION_OPTIONS.toppings.map(t => {
                      const isSelected = customization.toppings.includes(t.id);
                      return (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => handleToppingToggle(t.id)}
                          className={`p-3 rounded-2xl text-left border transition-all flex items-center justify-between ${
                            isSelected
                              ? 'bg-amber-600/25 border-amber-400 text-amber-100 shadow-warm'
                              : 'bg-amber-950/20 border-amber-900/40 text-amber-200/80 hover:bg-amber-900/30'
                          }`}
                        >
                          <div>
                            <div className="font-semibold text-xs leading-tight">{t.name}</div>
                            <div className="text-[11px] font-semibold text-amber-400 mt-1">
                              {t.price > 0 ? `+₹${t.price}` : 'Free'}
                            </div>
                          </div>
                          <div className={`w-5 h-5 rounded-lg flex items-center justify-center border ${
                            isSelected ? 'bg-amber-500 border-amber-400 text-black' : 'border-amber-700/60'
                          }`}>
                            {isSelected && <Check className="w-3.5 h-3.5" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Special Instructions for Barista */}
                <div className="pt-3 border-t border-amber-900/30">
                  <label className="text-xs font-bold text-amber-200/80 block mb-1.5">
                    ✍️ Special Barista Note / Instructions
                  </label>
                  <input
                    type="text"
                    value={customization.instructions || ''}
                    onChange={(e) => setCustomization(prev => ({ ...prev, instructions: e.target.value }))}
                    placeholder="e.g. Extra hot, sprinkle cinnamon on rim, write 'Alex' on cup"
                    className="w-full px-3.5 py-2.5 bg-amber-950/40 border border-amber-800/40 rounded-xl text-xs text-amber-100 placeholder-amber-400/40 focus:outline-hidden focus:border-amber-500 transition-colors"
                  />
                </div>
              </div>
            )}

          </div>

        </div>

        {/* Modal Footer: Quantity & Action Button */}
        <div className="px-6 py-4 bg-[#140c08] border-t border-amber-900/40 flex flex-wrap items-center justify-between gap-4 z-10">
          
          {/* Quantity Controls */}
          <div className="flex items-center gap-3 bg-amber-950/60 border border-amber-900/50 rounded-2xl p-1.5">
            <button
              type="button"
              onClick={() => setCustomization(prev => ({ ...prev, quantity: Math.max(1, prev.quantity - 1) }))}
              className="w-8 h-8 rounded-xl bg-amber-900/40 hover:bg-amber-800/60 text-amber-200 flex items-center justify-center transition-colors disabled:opacity-40"
              disabled={customization.quantity <= 1}
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center font-bold text-sm text-amber-100">{customization.quantity}</span>
            <button
              type="button"
              onClick={() => setCustomization(prev => ({ ...prev, quantity: prev.quantity + 1 }))}
              className="w-8 h-8 rounded-xl bg-amber-900/40 hover:bg-amber-800/60 text-amber-200 flex items-center justify-center transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Price & Add to Cart CTA */}
          <div className="flex items-center gap-4 ml-auto">
            <div className="text-right">
              <span className="text-[10px] text-amber-400/70 uppercase tracking-wider block">Custom Total</span>
              <span className="text-xl sm:text-2xl font-black text-amber-300 font-serif">₹{totalPrice}</span>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-sm tracking-wide shadow-warm hover:shadow-warm-lg transition-all transform active:scale-95 flex items-center gap-2"
            >
              <span>Add to Cart</span>
              <span>•</span>
              <span>₹{totalPrice}</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
