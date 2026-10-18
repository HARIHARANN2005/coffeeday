import React, { useState } from 'react';
import { 
  X, User, Phone, Mail, MapPin, Award, Coffee, Clock, CheckCircle2, 
  ChevronRight, LogOut, ShieldCheck, Heart 
} from 'lucide-react';

export default function LoginProfileModal({
  isOpen,
  onClose,
  userProfile,
  onUpdateProfile,
  pastOrders,
  onTrackOrder
}) {
  if (!isOpen) return null;

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: userProfile?.name || 'Aarav Sharma',
    phone: userProfile?.phone || '+91 98765 43210',
    email: userProfile?.email || 'aarav.coffee@gmail.com',
    address: userProfile?.address || 'Flat 402, Royal Palms, Indiranagar, Bengaluru - 560038',
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    onUpdateProfile(formData);
    setIsEditing(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleQuickPreset = (preset) => {
    setFormData(preset);
    onUpdateProfile(preset);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto bg-black/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-xl bg-[#170e09] border border-amber-900/50 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-[#22140d] via-[#1a0f09] to-[#22140d] border-b border-amber-900/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center font-bold">
              {formData.name.charAt(0)}
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-amber-100 font-serif">
                {formData.name}
              </h3>
              <p className="text-xs text-amber-300/60">Coffee Day Gold Member</p>
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

          {/* Loyalty & Rewards Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-950/80 via-[#27170e] to-amber-950/80 border border-amber-600/40 shadow-warm flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-400" /> Coffee Bean Loyalty Club
              </span>
              <div className="text-2xl font-black text-amber-200 font-serif">
                380 Bean Points
              </div>
              <p className="text-xs text-amber-300/70">
                You're only 20 points away from a <strong className="text-amber-200">Free Artisan Latte!</strong>
              </p>
            </div>

            <div className="px-3 py-1.5 rounded-xl bg-amber-500 text-black text-xs font-bold shrink-0">
              Gold Tier
            </div>
          </div>

          {/* User Details / Edit Form */}
          <div className="p-5 rounded-2xl bg-[#1b1009] border border-amber-900/40 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Member Profile Details
              </h4>
              <button
                type="button"
                onClick={() => setIsEditing(!isEditing)}
                className="text-xs text-amber-400 hover:text-amber-300 font-semibold"
              >
                {isEditing ? 'Cancel' : 'Edit Details'}
              </button>
            </div>

            {savedSuccess && (
              <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Profile updated successfully!</span>
              </div>
            )}

            {isEditing ? (
              <form onSubmit={handleSave} className="space-y-3">
                <div>
                  <label className="text-[11px] text-amber-300/70 block mb-1">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-amber-900/50 text-xs text-amber-100 focus:outline-hidden focus:border-amber-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-amber-300/70 block mb-1">Phone Number</label>
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-3 py-2 rounded-xl bg-black/40 border border-amber-900/50 text-xs text-amber-100 focus:outline-hidden focus:border-amber-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-amber-300/70 block mb-1">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-3 py-2 rounded-xl bg-black/40 border border-amber-900/50 text-xs text-amber-100 focus:outline-hidden focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] text-amber-300/70 block mb-1">Default Delivery Address</label>
                  <textarea
                    rows={2}
                    value={formData.address}
                    onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-amber-900/50 text-xs text-amber-100 focus:outline-hidden focus:border-amber-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs transition-colors"
                >
                  Save Profile
                </button>
              </form>
            ) : (
              <div className="space-y-3 text-xs">
                <div className="flex items-center gap-3 text-amber-200">
                  <User className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{formData.name}</span>
                </div>
                <div className="flex items-center gap-3 text-amber-200">
                  <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{formData.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-amber-200">
                  <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{formData.email}</span>
                </div>
                <div className="flex items-start gap-3 text-amber-200">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span className="leading-snug">{formData.address}</span>
                </div>
              </div>
            )}
          </div>

          {/* Quick Demo Profile Switcher */}
          <div className="p-4 rounded-2xl bg-black/30 border border-amber-900/30">
            <span className="text-[11px] text-amber-300/70 font-semibold block mb-2">
              ⚡ Quick Switch Demo Profile:
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => handleQuickPreset({
                  name: 'Priya Nair',
                  phone: '+91 99887 76655',
                  email: 'priya.nair@techhub.in',
                  address: 'Villa 12, Palm Meadows, Whitefield, Bengaluru - 560066',
                })}
                className="p-2 rounded-xl bg-amber-950/40 hover:bg-amber-900/40 border border-amber-800/40 text-left text-amber-200"
              >
                <div className="font-bold text-amber-300">Priya Nair</div>
                <div className="text-[10px] text-amber-200/50">Whitefield Villa</div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickPreset({
                  name: 'Rohan Mehra',
                  phone: '+91 98112 23344',
                  email: 'rohan.m@agency.co',
                  address: '102, Green Glen Layout, Bellandur, Bengaluru - 560103',
                })}
                className="p-2 rounded-xl bg-amber-950/40 hover:bg-amber-900/40 border border-amber-800/40 text-left text-amber-200"
              >
                <div className="font-bold text-amber-300">Rohan Mehra</div>
                <div className="text-[10px] text-amber-200/50">Bellandur Tech</div>
              </button>
            </div>
          </div>

          {/* Recent Orders List */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Recent Orders & Trackable Brews
            </h4>

            {pastOrders.length === 0 ? (
              <p className="text-xs text-amber-300/60 italic">No past orders yet. Place your first cup today!</p>
            ) : (
              <div className="space-y-2.5">
                {pastOrders.map((ord) => (
                  <div
                    key={ord.id}
                    className="p-3.5 rounded-2xl bg-[#1b1009] border border-amber-900/40 flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-amber-100">#{ord.id}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          {ord.items.length} {ord.items.length === 1 ? 'cup' : 'cups'}
                        </span>
                      </div>
                      <p className="text-[11px] text-amber-300/70 mt-0.5">
                        {ord.items.map(i => i.coffee.name).join(', ')}
                      </p>
                      <span className="text-[10px] text-amber-400 font-semibold block mt-1">
                        Total: ₹{ord.billSummary.finalTotal} • Placed at {ord.placedAt}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        onTrackOrder(ord);
                        onClose();
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs flex items-center gap-1 transition-colors shadow-sm"
                    >
                      <span>Track</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#120a06] border-t border-amber-900/40 flex items-center justify-between">
          <span className="text-xs text-amber-300/60 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Coffee Day Verified Member
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-amber-950 hover:bg-amber-900 text-amber-200 text-xs font-bold"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
