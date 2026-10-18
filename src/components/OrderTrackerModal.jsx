import React, { useState, useEffect } from 'react';
import { 
  X, CheckCircle2, Clock, Phone, MapPin, Bike, Coffee, PackageCheck, 
  Flame, Sparkles, Shield, ChevronRight, RefreshCw, AlertCircle 
} from 'lucide-react';
import { CUSTOMIZATION_OPTIONS } from '../data/coffeeData';

const TRACKING_STAGES = [
  {
    title: 'Order Confirmed',
    subtitle: 'Payment verified & sent to roastery',
    icon: CheckCircle2,
    eta: '18 mins away',
    timeOffset: 'Just now',
    statusNote: 'Your order has been acknowledged by Coffee Day Central Kitchen.'
  },
  {
    title: 'Grinding & Brewing',
    subtitle: 'Barista Ananya is pulling your shots',
    icon: Coffee,
    eta: '14 mins away',
    timeOffset: '3 mins ago',
    statusNote: 'Extracting 100% Chikmagalur Arabica at 9-bar pressure with custom milk & temperature.'
  },
  {
    title: 'Packed & Spill-Proof Sealed',
    subtitle: 'Thermal insulated pack & sealed lid',
    icon: PackageCheck,
    eta: '10 mins away',
    timeOffset: '7 mins ago',
    statusNote: 'Drink temperature locked. Sealed with safety tamper sticker.'
  },
  {
    title: 'Out for Delivery',
    subtitle: 'Rider Vikram is en route on E-Scooter',
    icon: Bike,
    eta: '4 mins away',
    timeOffset: '12 mins ago',
    statusNote: 'Delivery partner is navigating to your address. Keep phone handy.'
  },
  {
    title: 'Delivered Fresh & Hot!',
    subtitle: 'Enjoy your handcrafted coffee moment',
    icon: Sparkles,
    eta: 'Delivered',
    timeOffset: '18 mins ago',
    statusNote: 'Order handed over safely! Thank you for choosing Coffee Day.'
  }
];

export default function OrderTrackerModal({ isOpen, onClose, order, onUpdateOrder }) {
  if (!isOpen || !order) return null;

  const currentStep = order.currentStepIndex || 0;
  const isDelivered = currentStep >= TRACKING_STAGES.length - 1;

  // Auto-progress simulation state
  const [autoProgress, setAutoProgress] = useState(false);
  const [callModalOpen, setCallModalOpen] = useState(false);

  // Auto progression effect if enabled
  useEffect(() => {
    let timer;
    if (autoProgress && currentStep < TRACKING_STAGES.length - 1) {
      timer = setTimeout(() => {
        handleAdvanceStep();
      }, 5000); // Advances every 5 seconds
    }
    return () => clearTimeout(timer);
  }, [autoProgress, currentStep]);

  const handleAdvanceStep = () => {
    if (currentStep < TRACKING_STAGES.length - 1) {
      const nextStep = currentStep + 1;
      onUpdateOrder({
        ...order,
        currentStepIndex: nextStep,
        statusText: TRACKING_STAGES[nextStep].title,
      });
    }
  };

  const handleResetProgress = () => {
    onUpdateOrder({
      ...order,
      currentStepIndex: 0,
      statusText: TRACKING_STAGES[0].title,
    });
  };

  const activeStage = TRACKING_STAGES[currentStep];

  // Calculate simulated bike position percentage along the road
  const mapProgressPercentages = [10, 30, 55, 80, 100];
  const scooterPosition = mapProgressPercentages[currentStep];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto bg-black/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-3xl bg-[#170e09] border border-amber-900/50 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-[#22140d] via-[#1a0f09] to-[#22140d] border-b border-amber-900/40 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Bike className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-amber-100 font-serif">
                  Live Brew & Delivery Tracker
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  #{order.id}
                </span>
              </div>
              <p className="text-xs text-amber-300/60">
                Placed at {order.placedAt} • {order.deliveryType === 'delivery' ? 'Doorstep Delivery' : 'Table / Pickup'}
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

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">

          {/* Interactive Simulation Bar */}
          <div className="p-3.5 rounded-2xl bg-amber-950/30 border border-amber-800/40 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-amber-400 font-bold uppercase tracking-wider text-[10px]">
                Tracker Simulation:
              </span>
              <button
                type="button"
                onClick={() => setAutoProgress(!autoProgress)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold border transition-all ${
                  autoProgress 
                    ? 'bg-amber-500 text-black border-amber-400' 
                    : 'bg-black/40 text-amber-300 border-amber-900/60 hover:bg-black/60'
                }`}
              >
                {autoProgress ? 'Auto-Advancing (5s)' : 'Enable Auto-Sim'}
              </button>
            </div>

            <div className="flex items-center gap-2">
              {!isDelivered ? (
                <button
                  type="button"
                  onClick={handleAdvanceStep}
                  className="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-black font-bold text-xs flex items-center gap-1 transition-colors shadow-sm"
                >
                  <span>Advance to Next Stage</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleResetProgress}
                  className="px-3.5 py-1.5 rounded-xl bg-amber-900/50 hover:bg-amber-800 text-amber-200 font-semibold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Restart Simulation</span>
                </button>
              )}
            </div>
          </div>

          {/* Live Animated Map Visualizer */}
          <div className="relative rounded-3xl overflow-hidden border border-amber-800/40 bg-gradient-to-b from-[#130b07] to-[#1c110a] p-5 shadow-2xl">
            {/* Ambient grid background pattern */}
            <div 
              className="absolute inset-0 opacity-15 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(#be8152 1px, transparent 1px)',
                backgroundSize: '16px 16px'
              }}
            />

            <div className="relative z-10 space-y-4">
              {/* ETA Bar */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-amber-400/80 block">Estimated Arrival</span>
                    <span className="text-sm sm:text-base font-extrabold text-white">
                      {isDelivered ? 'Order Completed' : activeStage.eta}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-amber-400/80 block">Delivery Verification</span>
                  <span className="px-2.5 py-0.5 rounded-lg bg-black/60 border border-amber-500/30 text-amber-300 font-mono font-bold text-xs">
                    PIN: {order.deliveryPin}
                  </span>
                </div>
              </div>

              {/* Graphical Route Track */}
              <div className="py-6 px-2 relative">
                {/* Road Line Base */}
                <div className="w-full h-3 bg-black/70 rounded-full border border-amber-900/50 relative overflow-hidden">
                  {/* Glowing progress fill */}
                  <div 
                    className="h-full bg-gradient-to-r from-amber-600 to-amber-400 transition-all duration-700 ease-out rounded-full"
                    style={{ width: `${scooterPosition}%` }}
                  />
                </div>

                {/* Road markers */}
                <div className="flex justify-between items-center -mt-5 relative z-10">
                  {/* Origin Cafe */}
                  <div className="flex flex-col items-center">
                    <div className="w-9 h-9 rounded-2xl bg-amber-950 border border-amber-500 text-amber-300 flex items-center justify-center shadow-lg">
                      <Coffee className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-bold text-amber-300 mt-1">Coffee Day</span>
                  </div>

                  {/* Rider on Scooter Marker (Moves along path) */}
                  <div 
                    className="absolute top-0 transform -translate-x-1/2 transition-all duration-700 ease-out flex flex-col items-center z-20"
                    style={{ left: `${scooterPosition}%` }}
                  >
                    <div className="w-10 h-10 rounded-full bg-amber-500 text-black flex items-center justify-center shadow-warm animate-bounce border-2 border-white">
                      <Bike className="w-5 h-5" />
                    </div>
                    <span className="text-[9px] font-extrabold text-white bg-black/80 px-1.5 py-0.5 rounded-md mt-0.5 whitespace-nowrap border border-amber-400/40">
                      {currentStep >= 3 ? 'Rider on Way' : 'Brewing'}
                    </span>
                  </div>

                  {/* Customer Destination Pin */}
                  <div className="flex flex-col items-center">
                    <div className={`w-9 h-9 rounded-2xl flex items-center justify-center shadow-lg border transition-all ${
                      isDelivered 
                        ? 'bg-emerald-500 text-black border-emerald-400' 
                        : 'bg-amber-950/80 border-amber-700/60 text-amber-400'
                    }`}>
                      <MapPin className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-bold text-amber-200 mt-1">You</span>
                  </div>
                </div>
              </div>

              {/* Status Note Banner */}
              <div className="p-3 rounded-2xl bg-black/60 border border-amber-900/40 flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping shrink-0" />
                <p className="text-xs text-amber-200/90 leading-relaxed">
                  <strong className="text-amber-400 font-bold">{activeStage.title}: </strong>
                  {activeStage.statusNote}
                </p>
              </div>

            </div>
          </div>

          {/* Stepper Progression List */}
          <div className="p-5 rounded-3xl bg-[#1c120c]/80 border border-amber-900/40 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400/80 mb-2">
              Brew & Dispatch Milestones
            </h4>

            <div className="space-y-4">
              {TRACKING_STAGES.map((stage, idx) => {
                const IconComponent = stage.icon;
                const isCompleted = idx < currentStep;
                const isCurrent = idx === currentStep;
                const isPending = idx > currentStep;

                return (
                  <div key={stage.title} className="flex items-start gap-3.5 relative">
                    {/* Connecting line */}
                    {idx < TRACKING_STAGES.length - 1 && (
                      <div 
                        className={`absolute left-4 top-8 w-0.5 h-10 ${
                          idx < currentStep ? 'bg-amber-500' : 'bg-amber-950/80'
                        }`} 
                      />
                    )}

                    {/* Step Icon */}
                    <div 
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border z-10 transition-all ${
                        isCompleted
                          ? 'bg-amber-500 border-amber-400 text-black'
                          : isCurrent
                          ? 'bg-amber-500/20 border-amber-400 text-amber-300 ring-4 ring-amber-500/20'
                          : 'bg-black/50 border-amber-900/40 text-amber-600'
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                    </div>

                    {/* Step Text Info */}
                    <div className="flex-1 pt-0.5">
                      <div className="flex items-center justify-between">
                        <span className={`text-xs sm:text-sm font-bold ${
                          isCurrent ? 'text-amber-300' : isCompleted ? 'text-amber-100' : 'text-amber-500/40'
                        }`}>
                          {stage.title}
                        </span>
                        <span className="text-[10px] text-amber-300/50">
                          {isCompleted ? 'Done' : isCurrent ? 'Active' : ''}
                        </span>
                      </div>
                      <p className={`text-[11px] mt-0.5 ${
                        isCurrent ? 'text-amber-200/80' : isCompleted ? 'text-amber-200/60' : 'text-amber-600/40'
                      }`}>
                        {stage.subtitle}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Delivery Rider & Barista Contact Box */}
          <div className="p-4 rounded-2xl bg-[#1a100a] border border-amber-900/40 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img 
                src={order.rider.photo} 
                alt={order.rider.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-amber-500/50"
              />
              <div>
                <span className="text-[10px] uppercase font-bold text-amber-400 block">Assigned Delivery Partner</span>
                <h5 className="text-sm font-bold text-amber-100">{order.rider.name}</h5>
                <p className="text-[11px] text-amber-300/70">{order.rider.vehicle} • ⭐ {order.rider.rating}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setCallModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Rider</span>
            </button>
          </div>

          {/* Itemized Order Details Accordion */}
          <div className="p-4 rounded-2xl bg-black/40 border border-amber-900/40 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-amber-200">
              <span>🧾 Order Summary ({order.items.length} {order.items.length === 1 ? 'item' : 'items'})</span>
              <span className="text-amber-300 font-mono">Paid via {order.paymentMethod.toUpperCase()}</span>
            </div>

            <div className="divide-y divide-amber-950/60 space-y-2">
              {order.items.map((item, idx) => (
                <div key={idx} className="pt-2 flex justify-between items-start text-xs">
                  <div>
                    <span className="font-semibold text-amber-100">
                      {item.customization.quantity}x {item.coffee.name}
                    </span>
                    <span className="block text-[11px] text-amber-300/70">
                      {item.customization.size} • {item.customization.milk} milk • {item.customization.roast} roast • {item.customization.sugarLevel} sugar
                    </span>
                  </div>
                  <span className="font-bold text-amber-300 font-serif">
                    ₹{item.totalPrice || item.unitPrice * item.customization.quantity}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-amber-900/40 flex justify-between text-xs font-bold text-amber-100">
              <span>Total Paid</span>
              <span className="text-sm font-black text-amber-300 font-serif">₹{order.billSummary.finalTotal}</span>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-[#120a06] border-t border-amber-900/40 flex items-center justify-between">
          <p className="text-xs text-amber-300/60">
            Need help with your cup? Call Coffee Day Care at <strong className="text-amber-300">1800-102-BREW</strong>
          </p>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs transition-colors shadow-warm"
          >
            Done
          </button>
        </div>

      </div>

      {/* Rider Call Mock Dialog */}
      {callModalOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#1b1009] border border-amber-600/40 p-6 rounded-3xl max-w-sm w-full text-center space-y-4 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
              <Phone className="w-8 h-8 animate-pulse" />
            </div>
            <div>
              <h4 className="text-base font-bold text-amber-100">Calling Vikram Rajput...</h4>
              <p className="text-xs text-amber-300/70 mt-1">+91 98234 56789 • Coffee Day Delivery Fleet</p>
              <p className="text-[11px] text-amber-400/80 mt-2">"Hello! I am just 3 minutes away from your apartment gate."</p>
            </div>
            <button
              onClick={() => setCallModalOpen(false)}
              className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-colors"
            >
              End Call
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
