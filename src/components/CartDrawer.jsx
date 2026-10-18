import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, Tag, Coffee, ArrowRight, ShieldCheck, Check, Sparkles } from 'lucide-react';
import { COUPONS, CUSTOMIZATION_OPTIONS } from '../data/coffeeData';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  appliedCoupon,
  onApplyCoupon,
  onRemoveCoupon,
  baristaTip,
  onSelectTip
}) {
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isOpen) return null;

  // Calculate Subtotal
  const subtotal = cartItems.reduce((acc, item) => acc + (item.totalPrice || item.unitPrice * item.customization.quantity), 0);

  // Delivery fee logic: Free if subtotal >= 299 or coupon is FREESHIP
  let deliveryFee = subtotal >= 299 || appliedCoupon?.code === 'FREESHIP' ? 0 : 40;
  if (cartItems.length === 0) deliveryFee = 0;

  // Taxes (5% GST)
  const taxes = Math.round(subtotal * 0.05);

  // Discount calculation
  let discount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountPercent) {
      discount = Math.min(appliedCoupon.maxDiscount || 999, Math.round((subtotal * appliedCoupon.discountPercent) / 100));
    } else if (appliedCoupon.discountFixed) {
      discount = appliedCoupon.discountFixed;
    }
  }

  // Final Total
  const finalTotal = Math.max(0, subtotal + taxes + deliveryFee + baristaTip - discount);

  const handleApplyCouponCode = (codeToApply) => {
    const code = (codeToApply || couponInput).trim().toUpperCase();
    setCouponError('');

    const found = COUPONS.find(c => c.code === code);
    if (!found) {
      setCouponError('Invalid coupon code. Try COFFEEDAY30');
      return;
    }

    if (found.minOrder && subtotal < found.minOrder) {
      setCouponError(`Min order of ₹${found.minOrder} required for ${found.code}`);
      return;
    }

    onApplyCoupon(found);
    setCouponInput('');
  };

  // Helper to format customization details nicely
  const renderCustomizationTags = (c) => {
    const tags = [];
    if (c.size) tags.push(`${c.size.toUpperCase()}`);
    if (c.milk && c.milk !== 'none') {
      const milkName = CUSTOMIZATION_OPTIONS.milks.find(m => m.id === c.milk)?.name;
      if (milkName) tags.push(milkName);
    } else if (c.milk === 'none') {
      tags.push('Pure Black');
    }
    if (c.roast) tags.push(`${c.roast} roast`);
    if (c.shots) tags.push(`${c.shots} shot`);
    if (c.sugarLevel) tags.push(`${c.sugarLevel} sugar`);
    if (c.temperature) {
      const tempObj = CUSTOMIZATION_OPTIONS.temperatures.find(t => t.id === c.temperature);
      if (tempObj) tags.push(tempObj.name.split(' ')[0]);
    }
    if (c.toppings && c.toppings.length > 0) {
      const topNames = c.toppings.map(t => CUSTOMIZATION_OPTIONS.toppings.find(x => x.id === t)?.name?.split(' ')[0]);
      tags.push(`+ ${topNames.join(', ')}`);
    }

    return tags.join(' • ');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-[#160d08] border-l border-amber-900/40 text-amber-100 flex flex-col shadow-2xl">
          
          {/* Cart Header */}
          <div className="px-6 py-4 bg-gradient-to-r from-[#20130d] via-[#180e08] to-[#20130d] border-b border-amber-900/40 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Coffee className="w-5 h-5" />
              </span>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-amber-100 font-serif">Your Coffee Basket</h2>
                <p className="text-xs text-amber-300/60">
                  {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} selected
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-amber-300/70 hover:text-white hover:bg-amber-950/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            
            {cartItems.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-20 h-20 rounded-full bg-amber-950/40 border border-amber-800/40 flex items-center justify-center mx-auto text-amber-400">
                  <Coffee className="w-10 h-10 stroke-[1.5]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-amber-100 font-serif">Your cup is empty</h3>
                  <p className="text-xs text-amber-200/60 max-w-xs mx-auto mt-1">
                    Explore our handcrafted artisanal coffees and build your custom brew.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 text-black text-xs font-bold shadow-warm hover:bg-amber-400 transition-all"
                >
                  Explore Menu
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div 
                    key={item.id}
                    className="p-3.5 rounded-2xl bg-[#1e130c]/90 border border-amber-900/40 hover:border-amber-700/50 transition-all flex gap-3"
                  >
                    {/* Item Thumbnail */}
                    <img 
                      src={item.coffee.image} 
                      alt={item.coffee.name}
                      className="w-16 h-16 rounded-xl object-cover shrink-0 bg-amber-950/50 border border-amber-900/30"
                    />

                    {/* Item Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm font-bold text-amber-100 font-serif truncate">
                          {item.coffee.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-amber-400/50 hover:text-rose-400 p-0.5 transition-colors shrink-0"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Customization Specs summary */}
                      <p className="text-[11px] text-amber-300/80 mt-0.5 leading-snug line-clamp-2">
                        {renderCustomizationTags(item.customization)}
                      </p>

                      {item.customization.instructions && (
                        <p className="text-[10px] text-amber-400/70 italic mt-0.5">
                          "{item.customization.instructions}"
                        </p>
                      )}

                      {/* Price & Quantity Adjuster */}
                      <div className="mt-2.5 flex items-center justify-between">
                        <span className="font-bold text-sm text-amber-300 font-serif">
                          ₹{item.totalPrice || item.unitPrice * item.customization.quantity}
                        </span>

                        <div className="flex items-center gap-2 bg-amber-950/60 border border-amber-900/50 rounded-xl px-1 py-0.5">
                          <button
                            onClick={() => onUpdateQuantity(item.id, Math.max(1, item.customization.quantity - 1))}
                            className="w-6 h-6 rounded-lg bg-amber-900/30 hover:bg-amber-800 text-amber-200 flex items-center justify-center text-xs"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-5 text-center text-xs font-bold text-amber-100">
                            {item.customization.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.customization.quantity + 1)}
                            className="w-6 h-6 rounded-lg bg-amber-900/30 hover:bg-amber-800 text-amber-200 flex items-center justify-center text-xs"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            )}

            {cartItems.length > 0 && (
              <>
                {/* Coupon Code Section */}
                <div className="pt-2">
                  <div className="p-3.5 rounded-2xl bg-amber-950/20 border border-amber-900/40 space-y-2.5">
                    <div className="flex items-center justify-between text-xs font-bold text-amber-200">
                      <span className="flex items-center gap-1.5">
                        <Tag className="w-3.5 h-3.5 text-amber-400" /> Have a Coupon?
                      </span>
                      {appliedCoupon && (
                        <button
                          onClick={onRemoveCoupon}
                          className="text-[11px] text-rose-400 hover:underline font-semibold"
                        >
                          Remove
                        </button>
                      )}
                    </div>

                    {appliedCoupon ? (
                      <div className="p-2 rounded-xl bg-emerald-950/40 border border-emerald-500/40 flex items-center justify-between text-xs text-emerald-300">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-emerald-400" />
                          <div>
                            <span className="font-bold">{appliedCoupon.code} applied!</span>
                            <span className="block text-[10px] text-emerald-400/80">Saved ₹{discount} on this brew</span>
                          </div>
                        </div>
                        <Check className="w-4 h-4 text-emerald-400" />
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={couponInput}
                          onChange={(e) => setCouponInput(e.target.value)}
                          placeholder="Enter code (e.g. COFFEEDAY30)"
                          className="flex-1 px-3 py-2 rounded-xl bg-black/40 border border-amber-900/50 text-xs text-amber-100 uppercase placeholder-amber-500/40 focus:outline-hidden focus:border-amber-500"
                        />
                        <button
                          type="button"
                          onClick={() => handleApplyCouponCode()}
                          className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-black font-bold text-xs transition-colors"
                        >
                          Apply
                        </button>
                      </div>
                    )}

                    {couponError && (
                      <p className="text-[11px] text-rose-400 font-medium">{couponError}</p>
                    )}

                    {/* Quick Coupon Chips */}
                    {!appliedCoupon && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {COUPONS.map(c => (
                          <button
                            key={c.code}
                            type="button"
                            onClick={() => handleApplyCouponCode(c.code)}
                            className="px-2 py-1 rounded-lg bg-amber-950/50 hover:bg-amber-900/50 border border-amber-800/40 text-[10px] font-bold text-amber-300 tracking-wider transition-colors"
                          >
                            {c.code}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Barista Tip Selector */}
                <div className="p-3.5 rounded-2xl bg-amber-950/20 border border-amber-900/40">
                  <div className="text-xs font-bold text-amber-200 mb-2 flex items-center justify-between">
                    <span>☕ Tip your Master Barista</span>
                    <span className="text-[10px] text-amber-400 font-normal">100% goes to the brew team</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {[0, 20, 30, 50].map((amount) => (
                      <button
                        key={amount}
                        type="button"
                        onClick={() => onSelectTip(amount)}
                        className={`py-1.5 rounded-xl text-xs font-bold border transition-all ${
                          baristaTip === amount
                            ? 'bg-amber-500 text-black border-amber-400 shadow-sm'
                            : 'bg-black/30 border-amber-900/40 text-amber-200 hover:border-amber-700'
                        }`}
                      >
                        {amount === 0 ? 'None' : `₹${amount}`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Billing Summary Breakdown */}
                <div className="p-4 rounded-2xl bg-black/40 border border-amber-900/40 space-y-2 text-xs">
                  <div className="flex justify-between text-amber-200/70">
                    <span>Items Subtotal</span>
                    <span className="font-semibold text-amber-100">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-amber-200/70">
                    <span>Cafe GST (5%)</span>
                    <span className="font-semibold text-amber-100">₹{taxes}</span>
                  </div>
                  <div className="flex justify-between text-amber-200/70">
                    <span>Express Delivery Fee</span>
                    <span className="font-semibold text-amber-100">
                      {deliveryFee === 0 ? <span className="text-emerald-400 font-bold">FREE</span> : `₹${deliveryFee}`}
                    </span>
                  </div>
                  {baristaTip > 0 && (
                    <div className="flex justify-between text-amber-200/70">
                      <span>Barista Tip</span>
                      <span className="font-semibold text-amber-300">₹{baristaTip}</span>
                    </div>
                  )}
                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-400 font-semibold">
                      <span>Promo Discount</span>
                      <span>-₹{discount}</span>
                    </div>
                  )}
                  <div className="pt-2 border-t border-amber-900/40 flex justify-between text-sm font-bold text-amber-100">
                    <span className="font-serif">Grand Total</span>
                    <span className="text-base font-black text-amber-300 font-serif">₹{finalTotal}</span>
                  </div>
                </div>
              </>
            )}

          </div>

          {/* Cart Footer Checkout CTA */}
          {cartItems.length > 0 && (
            <div className="p-4 sm:p-5 bg-[#120a06] border-t border-amber-900/40 space-y-3">
              <div className="flex items-center justify-between text-xs text-amber-300/80">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Spill-proof guaranteed
                </span>
                <span className="font-bold text-amber-200">Total: ₹{finalTotal}</span>
              </div>

              <button
                type="button"
                onClick={onProceedToCheckout}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold text-sm tracking-wide shadow-warm hover:shadow-warm-lg transition-all transform active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
