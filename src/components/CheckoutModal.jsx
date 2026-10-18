import React, { useState } from 'react';
import { 
  X, Check, ShieldCheck, CreditCard, QrCode, Banknote, ArrowRight, 
  MapPin, Phone, User, Clock, CheckCircle2, Loader2, Sparkles, AlertCircle 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound } from '../utils/audio';

export default function CheckoutModal({
  isOpen,
  onClose,
  cartItems,
  billSummary,
  userProfile,
  onOrderSuccess
}) {
  if (!isOpen) return null;

  // Delivery type: 'delivery' or 'pickup'
  const [deliveryType, setDeliveryType] = useState('delivery');

  // Customer Contact Details
  const [customerInfo, setCustomerInfo] = useState({
    name: userProfile?.name || 'Aarav Sharma',
    phone: userProfile?.phone || '+91 98765 43210',
    address: userProfile?.address || 'Flat 402, Royal Palms, Indiranagar, Bengaluru - 560038',
    tableNumber: 'Table 7',
    notes: 'Please do not ring bell if possible',
  });

  // Payment Option: 'upi' | 'card' | 'cod'
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [upiOption, setUpiOption] = useState('gpay'); // 'gpay', 'phonepe', 'paytm', 'qr'
  const [cardDetails, setCardDetails] = useState({
    number: '•••• •••• •••• 4242',
    name: customerInfo.name,
    expiry: '08/28',
    cvv: '•••',
  });

  // Processing state for realistic checkout feedback
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState('');

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#be8152', '#f59e0b', '#d97706', '#ffffff']
      });
    } catch {
      // Ignore if unavailable
    }
  };

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    setProcessingStep('Connecting to Coffee Day payment gateway...');

    setTimeout(() => {
      setProcessingStep('Authorizing payment...');
    }, 900);

    setTimeout(() => {
      setProcessingStep('Confirming order with Central Barista Roastery...');
    }, 1800);

    setTimeout(() => {
      setIsProcessing(false);
      playSound('order-success');
      triggerConfetti();

      // Create rich order payload
      const orderId = `CD-${Math.floor(100000 + Math.random() * 900000)}`;
      const newOrder = {
        id: orderId,
        placedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        items: cartItems,
        billSummary,
        deliveryType,
        customerInfo,
        paymentMethod,
        currentStepIndex: 0, // 0: Placed, 1: Brewing, 2: Packed, 3: Out for delivery, 4: Delivered
        estimatedMinutes: 18,
        rider: {
          name: 'Vikram Rajput',
          phone: '+91 98234 56789',
          rating: 4.9,
          vehicle: 'E-Scooter (KA-04-CD-2026)',
          photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        },
        deliveryPin: Math.floor(1000 + Math.random() * 9000).toString(),
      };

      onOrderSuccess(newOrder);
      onClose();
    }, 2600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto bg-black/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bg-[#170e09] border border-amber-900/50 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-[#22140d] via-[#1a0f09] to-[#22140d] border-b border-amber-900/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-amber-100 font-serif">Checkout & Payment</h3>
              <p className="text-xs text-amber-300/60">Instant confirmation • Encrypted payment</p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-2 rounded-full text-amber-300/70 hover:text-white hover:bg-amber-950/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          
          {/* Order Type Selector */}
          <div>
            <div className="grid grid-cols-2 gap-3 p-1 rounded-2xl bg-black/40 border border-amber-900/40">
              <button
                type="button"
                onClick={() => setDeliveryType('delivery')}
                className={`py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                  deliveryType === 'delivery'
                    ? 'bg-amber-500 text-black shadow-warm'
                    : 'text-amber-300/70 hover:text-amber-200'
                }`}
              >
                <MapPin className="w-4 h-4" />
                <span>Doorstep Delivery (18m)</span>
              </button>

              <button
                type="button"
                onClick={() => setDeliveryType('pickup')}
                className={`py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                  deliveryType === 'pickup'
                    ? 'bg-amber-500 text-black shadow-warm'
                    : 'text-amber-300/70 hover:text-amber-200'
                }`}
              >
                <Clock className="w-4 h-4" />
                <span>Cafe Counter / Dine-In</span>
              </button>
            </div>
          </div>

          {/* Customer Details Form */}
          <div className="p-4 rounded-2xl bg-[#1e130c]/80 border border-amber-900/40 space-y-3">
            <div className="text-xs font-bold text-amber-200 uppercase tracking-wider flex items-center gap-2">
              <User className="w-4 h-4 text-amber-400" />
              <span>Contact & {deliveryType === 'delivery' ? 'Delivery Address' : 'Dine-In Table'}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-amber-300/70 block mb-1">Customer Name</label>
                <input
                  type="text"
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-amber-900/50 text-xs text-amber-100 focus:outline-hidden focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-[11px] text-amber-300/70 block mb-1">Mobile Phone Number</label>
                <input
                  type="text"
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-amber-900/50 text-xs text-amber-100 focus:outline-hidden focus:border-amber-500"
                />
              </div>
            </div>

            {deliveryType === 'delivery' ? (
              <div>
                <label className="text-[11px] text-amber-300/70 block mb-1">Full Street Address & Pincode</label>
                <textarea
                  rows={2}
                  value={customerInfo.address}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, address: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-amber-900/50 text-xs text-amber-100 focus:outline-hidden focus:border-amber-500 resize-none"
                />
              </div>
            ) : (
              <div>
                <label className="text-[11px] text-amber-300/70 block mb-1">Cafe Table Number / Takeaway Counter</label>
                <input
                  type="text"
                  value={customerInfo.tableNumber}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, tableNumber: e.target.value }))}
                  placeholder="e.g. Table 4 or Takeaway at counter"
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-amber-900/50 text-xs text-amber-100 focus:outline-hidden focus:border-amber-500"
                />
              </div>
            )}
          </div>

          {/* Payment Method Selector */}
          <div>
            <div className="text-xs font-bold text-amber-200 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <span>💳 Choose Payment Method</span>
            </div>

            <div className="grid grid-cols-3 gap-2.5 mb-4">
              {/* UPI Option */}
              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`p-3 rounded-2xl text-center border transition-all ${
                  paymentMethod === 'upi'
                    ? 'bg-amber-500 text-black font-bold shadow-warm'
                    : 'bg-[#1b1009] border-amber-900/40 text-amber-200 hover:bg-[#24150c]'
                }`}
              >
                <QrCode className="w-5 h-5 mx-auto mb-1" />
                <span className="text-xs block">UPI / QR</span>
                <span className={`text-[10px] ${paymentMethod === 'upi' ? 'text-black/80' : 'text-amber-400'}`}>
                  Instant Pay
                </span>
              </button>

              {/* Card Option */}
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-2xl text-center border transition-all ${
                  paymentMethod === 'card'
                    ? 'bg-amber-500 text-black font-bold shadow-warm'
                    : 'bg-[#1b1009] border-amber-900/40 text-amber-200 hover:bg-[#24150c]'
                }`}
              >
                <CreditCard className="w-5 h-5 mx-auto mb-1" />
                <span className="text-xs block">Credit / Debit</span>
                <span className={`text-[10px] ${paymentMethod === 'card' ? 'text-black/80' : 'text-amber-400'}`}>
                  Cards / RuPay
                </span>
              </button>

              {/* COD Option */}
              <button
                type="button"
                onClick={() => setPaymentMethod('cod')}
                className={`p-3 rounded-2xl text-center border transition-all ${
                  paymentMethod === 'cod'
                    ? 'bg-amber-500 text-black font-bold shadow-warm'
                    : 'bg-[#1b1009] border-amber-900/40 text-amber-200 hover:bg-[#24150c]'
                }`}
              >
                <Banknote className="w-5 h-5 mx-auto mb-1" />
                <span className="text-xs block">Cash on Delivery</span>
                <span className={`text-[10px] ${paymentMethod === 'cod' ? 'text-black/80' : 'text-amber-400'}`}>
                  Pay on Arrival
                </span>
              </button>
            </div>

            {/* UPI SUB-VIEW */}
            {paymentMethod === 'upi' && (
              <div className="p-4 rounded-2xl bg-black/40 border border-amber-900/40 space-y-3 animate-fadeIn">
                <div className="flex gap-2">
                  {['gpay', 'phonepe', 'paytm', 'qr'].map((app) => (
                    <button
                      key={app}
                      type="button"
                      onClick={() => setUpiOption(app)}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold uppercase transition-all ${
                        upiOption === app
                          ? 'bg-amber-600 text-white shadow-sm'
                          : 'bg-amber-950/40 text-amber-300/70 hover:bg-amber-900/30'
                      }`}
                    >
                      {app === 'qr' ? 'Scan QR' : app}
                    </button>
                  ))}
                </div>

                {upiOption === 'qr' ? (
                  <div className="p-4 rounded-xl bg-white text-black text-center max-w-xs mx-auto shadow-md">
                    <div className="w-36 h-36 mx-auto bg-[#f5ede5] p-2 rounded-lg border border-gray-300 flex items-center justify-center relative">
                      {/* Stylized QR mockup with coffee bean center */}
                      <div className="w-full h-full border-2 border-dashed border-gray-800 rounded flex flex-col items-center justify-center bg-gray-900 p-2 text-white">
                        <QrCode className="w-20 h-20 text-amber-400 mx-auto" />
                        <span className="text-[9px] uppercase tracking-wider font-bold text-amber-300">
                          Coffee Day Pay
                        </span>
                      </div>
                    </div>
                    <p className="text-xs font-bold text-gray-800 mt-2">Scan with any UPI App</p>
                    <p className="text-[10px] text-gray-500">GPay, PhonePe, Paytm, BHIM</p>
                  </div>
                ) : (
                  <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-900/40 text-xs text-amber-200/80 flex items-center justify-between">
                    <span>UPI ID auto-linked: <strong>aarav@okhdfcbank</strong></span>
                    <span className="text-[11px] text-emerald-400 font-bold">Verified ✓</span>
                  </div>
                )}
              </div>
            )}

            {/* CARD SUB-VIEW */}
            {paymentMethod === 'card' && (
              <div className="p-4 rounded-2xl bg-black/40 border border-amber-900/40 space-y-3 animate-fadeIn">
                <div>
                  <label className="text-[11px] text-amber-300/70 block mb-1">Card Number</label>
                  <input
                    type="text"
                    defaultValue="4532 •••• •••• 8821"
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-amber-900/50 text-xs text-amber-100 font-mono tracking-wider focus:outline-hidden focus:border-amber-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-amber-300/70 block mb-1">Expiry Date</label>
                    <input
                      type="text"
                      defaultValue="08/29"
                      className="w-full px-3 py-2 rounded-xl bg-black/50 border border-amber-900/50 text-xs text-amber-100 font-mono focus:outline-hidden focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-amber-300/70 block mb-1">CVV</label>
                    <input
                      type="password"
                      defaultValue="782"
                      className="w-full px-3 py-2 rounded-xl bg-black/50 border border-amber-900/50 text-xs text-amber-100 font-mono focus:outline-hidden focus:border-amber-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* COD SUB-VIEW */}
            {paymentMethod === 'cod' && (
              <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-900/40 text-xs text-amber-200/80 space-y-1 animate-fadeIn">
                <p className="font-semibold text-amber-300 flex items-center gap-1.5">
                  <Banknote className="w-4 h-4 text-amber-400" />
                  <span>Pay cash or scan QR at your doorstep</span>
                </p>
                <p className="text-[11px] text-amber-200/60">
                  Our delivery partner carries exact change and UPI QR scanner for contactless cash payment.
                </p>
              </div>
            )}

          </div>

          {/* Quick Order Bill Summary */}
          <div className="p-3.5 rounded-2xl bg-[#140c08] border border-amber-900/40 flex items-center justify-between text-xs">
            <div>
              <span className="text-[10px] text-amber-400/70 uppercase tracking-wider block">Payable Amount</span>
              <span className="text-xl font-black text-amber-300 font-serif">₹{billSummary.finalTotal}</span>
            </div>
            <div className="text-right text-[11px] text-amber-300/60">
              <span>{cartItems.length} Handcrafted {cartItems.length === 1 ? 'Brew' : 'Brews'}</span>
              <span className="block text-emerald-400 font-medium">Free Express Packaging Included</span>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-[#120a06] border-t border-amber-900/40 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isProcessing}
            className="px-4 py-2.5 rounded-xl border border-amber-900/50 text-xs text-amber-300/80 hover:bg-amber-950/40 font-semibold"
          >
            Back to Cart
          </button>

          <button
            type="button"
            onClick={handlePlaceOrder}
            disabled={isProcessing}
            className="flex-1 max-w-sm py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold text-sm tracking-wide shadow-warm hover:shadow-warm-lg transition-all transform active:scale-95 flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-black" />
                <span>{processingStep}</span>
              </>
            ) : (
              <>
                <span>Pay ₹{billSummary.finalTotal} & Brew Now</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
