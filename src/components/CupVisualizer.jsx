import React from 'react';

export default function CupVisualizer({ customization, coffee }) {
  const { size, milk, temperature, toppings } = customization;

  // Determine liquid color based on milk and roast
  let liquidColor = '#4a2810'; // default rich coffee
  if (milk === 'none') {
    liquidColor = '#24140b'; // dark black
  } else if (milk === 'whole' || milk === 'skimmed') {
    liquidColor = '#b58963'; // classic cafe au lait
  } else if (milk === 'oat') {
    liquidColor = '#be9975'; // oat tint
  } else if (milk === 'almond') {
    liquidColor = '#c4a689'; // almond beige
  } else if (milk === 'soy') {
    liquidColor = '#bda07e';
  } else if (milk === 'coconut') {
    liquidColor = '#cbaf94';
  }

  // Cup heights based on size
  let cupHeight = 'h-52';
  let cupWidth = 'w-36';
  let sizeLabel = 'Regular (350ml)';

  if (size === 'small') {
    cupHeight = 'h-44';
    cupWidth = 'w-32';
    sizeLabel = 'Small (240ml)';
  } else if (size === 'large') {
    cupHeight = 'h-60';
    cupWidth = 'w-40';
    sizeLabel = 'Large (480ml)';
  }

  const isHot = temperature === 'hot' || temperature === 'extra_hot';
  const hasIce = temperature && temperature.startsWith('iced_');
  const hasWhippedCream = toppings.includes('whipped_cream');
  const hasCaramel = toppings.includes('caramel_drizzle');
  const hasChoco = toppings.includes('chocolate_shavings');
  const hasBoba = toppings.includes('boba');

  return (
    <div className="relative flex flex-col items-center justify-end py-6 px-4 bg-gradient-to-b from-[#1c120c]/80 to-[#120a06] rounded-2xl border border-amber-900/30 overflow-hidden min-h-[300px]">
      {/* Background ambient glow */}
      <div className="absolute inset-0 bg-radial from-amber-600/10 via-transparent to-transparent pointer-events-none" />

      {/* Steam Effect for Hot Drinks */}
      {isHot && (
        <div className="absolute top-8 flex space-x-3 pointer-events-none z-20">
          <span className="w-1.5 h-10 bg-gradient-to-t from-white/30 to-transparent rounded-full animate-steam-1" />
          <span className="w-2 h-14 bg-gradient-to-t from-white/40 to-transparent rounded-full animate-steam-2" />
          <span className="w-1.5 h-12 bg-gradient-to-t from-white/30 to-transparent rounded-full animate-steam-3" />
        </div>
      )}

      {/* Whipped Cream Top if selected */}
      {hasWhippedCream && (
        <div className="relative -mb-3 z-10 w-28 h-12 flex items-center justify-center">
          <div className="w-24 h-11 bg-gradient-to-b from-amber-50 to-[#faeedb] rounded-t-full shadow-inner flex items-center justify-center relative overflow-hidden border border-amber-100/40">
            {/* Drizzles on cream */}
            {hasCaramel && (
              <div className="absolute inset-0 flex justify-around items-center opacity-85 rotate-12">
                <span className="w-1.5 h-full bg-amber-500 rounded-full" />
                <span className="w-1 h-full bg-amber-600 rounded-full" />
                <span className="w-1.5 h-full bg-amber-500 rounded-full" />
              </div>
            )}
            {hasChoco && (
              <div className="absolute inset-0 flex justify-evenly items-center opacity-80 -rotate-12">
                <span className="w-1.5 h-full bg-amber-950 rounded-full" />
                <span className="w-1 h-full bg-amber-950 rounded-full" />
                <span className="w-1.5 h-full bg-amber-950 rounded-full" />
              </div>
            )}
          </div>
        </div>
      )}

      {/* The Coffee Cup Container */}
      <div className={`relative ${cupWidth} ${cupHeight} transition-all duration-300 flex flex-col items-center justify-end`}>
        {/* Cup Rim */}
        <div className="w-full h-4 bg-gradient-to-r from-amber-200/40 via-amber-100/60 to-amber-200/40 rounded-t-lg border-t border-amber-300/40 shadow-sm z-10" />

        {/* Cup Body (Tapered glass / ceramic look) */}
        <div 
          className="w-full flex-1 relative rounded-b-3xl border-x-2 border-b-2 border-amber-700/30 overflow-hidden shadow-2xl backdrop-blur-sm"
          style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(20,12,8,0.7) 100%)'
          }}
        >
          {/* Coffee Liquid Fill */}
          <div 
            className="absolute bottom-0 inset-x-0 transition-all duration-500 ease-out"
            style={{
              height: '82%',
              backgroundColor: liquidColor,
              boxShadow: 'inset 0 4px 12px rgba(0,0,0,0.5)'
            }}
          >
            {/* Microfoam / Crema Layer on Top of Liquid */}
            <div className="w-full h-3 bg-gradient-to-b from-amber-200/50 to-transparent opacity-80" />

            {/* Ice Cubes floating if Iced */}
            {hasIce && (
              <div className="absolute inset-0 p-3 grid grid-cols-2 gap-2 opacity-65 pointer-events-none">
                <div className="w-7 h-7 bg-white/30 backdrop-blur-md rounded-md rotate-6 border border-white/40 shadow-sm" />
                <div className="w-6 h-6 bg-white/25 backdrop-blur-md rounded-md -rotate-12 border border-white/30 ml-auto" />
                <div className="w-7 h-7 bg-white/35 backdrop-blur-md rounded-md rotate-45 border border-white/40 mt-1" />
                <div className="w-5 h-5 bg-white/20 backdrop-blur-md rounded-md -rotate-6 border border-white/30 mt-2 ml-1" />
              </div>
            )}

            {/* Boba pearls sitting at bottom if selected */}
            {hasBoba && (
              <div className="absolute bottom-1 inset-x-0 flex flex-wrap justify-center gap-1 px-2 pointer-events-none">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="w-3.5 h-3.5 bg-black/80 rounded-full border border-amber-900/40 shadow-inner" />
                ))}
              </div>
            )}
          </div>

          {/* Cup Glass Highlight reflection */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-transparent pointer-events-none" />

          {/* Coffee Day Brand Emblem on Cup */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 opacity-70">
            <div className="px-2.5 py-1 rounded-full bg-black/30 backdrop-blur-xs border border-amber-200/20 text-center">
              <span className="text-[10px] uppercase tracking-widest font-bold text-amber-200 block">Coffee Day</span>
              <span className="text-[8px] text-amber-400 font-medium">Crafted For You</span>
            </div>
          </div>
        </div>

        {/* Cup Saucer Base Shadow */}
        <div className="w-32 h-2.5 bg-amber-950/60 rounded-full blur-xs mt-1" />
      </div>

      {/* Current Preview Meta Tags */}
      <div className="mt-4 flex flex-wrap justify-center gap-1.5 text-xs text-amber-200/80">
        <span className="px-2 py-0.5 rounded-md bg-amber-950/70 border border-amber-800/40 font-medium">
          {sizeLabel}
        </span>
        <span className="px-2 py-0.5 rounded-md bg-amber-950/70 border border-amber-800/40">
          {milk === 'none' ? 'Pure Black' : `${milk.charAt(0).toUpperCase() + milk.slice(1)} Milk`}
        </span>
        <span className="px-2 py-0.5 rounded-md bg-amber-950/70 border border-amber-800/40">
          {customization.sugarLevel} Sugar
        </span>
        <span className="px-2 py-0.5 rounded-md bg-amber-950/70 border border-amber-800/40 capitalize">
          {customization.roast} Roast
        </span>
        <span className="px-2 py-0.5 rounded-md bg-amber-950/70 border border-amber-800/40 capitalize">
          {customization.shots} Shot
        </span>
      </div>
    </div>
  );
}
