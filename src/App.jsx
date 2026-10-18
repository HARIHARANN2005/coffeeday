import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import BrewBarSuggestions from './components/BrewBarSuggestions';
import CategoryFilter from './components/CategoryFilter';
import CoffeeCard from './components/CoffeeCard';
import CoffeeCustomizerModal from './components/CoffeeCustomizerModal';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import OrderTrackerModal from './components/OrderTrackerModal';
import LoginProfileModal from './components/LoginProfileModal';
import Footer from './components/Footer';

import { COFFEE_MENU } from './data/coffeeData';

export default function App() {
  // Persistence with LocalStorage
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('coffeeday_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activeOrder, setActiveOrder] = useState(() => {
    try {
      const saved = localStorage.getItem('coffeeday_active_order');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [pastOrders, setPastOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('coffeeday_past_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [userProfile, setUserProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('coffeeday_user');
      return saved ? JSON.parse(saved) : {
        name: 'Aarav Sharma',
        phone: '+91 98765 43210',
        email: 'aarav.coffee@gmail.com',
        address: 'Flat 402, Royal Palms, 12th Main, Indiranagar, Bengaluru - 560038'
      };
    } catch {
      return {
        name: 'Aarav Sharma',
        phone: '+91 98765 43210',
        email: 'aarav.coffee@gmail.com',
        address: 'Flat 402, Royal Palms, 12th Main, Indiranagar, Bengaluru - 560038'
      };
    }
  });

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('coffeeday_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    if (activeOrder) {
      localStorage.setItem('coffeeday_active_order', JSON.stringify(activeOrder));
    } else {
      localStorage.removeItem('coffeeday_active_order');
    }
  }, [activeOrder]);

  useEffect(() => {
    localStorage.setItem('coffeeday_past_orders', JSON.stringify(pastOrders));
  }, [pastOrders]);

  useEffect(() => {
    localStorage.setItem('coffeeday_user', JSON.stringify(userProfile));
  }, [userProfile]);

  // Filtering & Search
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [customizerModal, setCustomizerModal] = useState({ isOpen: false, coffee: null });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Cart enhancements
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [baristaTip, setBaristaTip] = useState(20); // Default polite tip

  const menuSectionRef = useRef(null);

  // Filter coffees
  const filteredCoffees = COFFEE_MENU.filter(coffee => {
    const matchesCategory = selectedCategory === 'all' || coffee.category === selectedCategory;
    const matchesSearch = !searchQuery.trim() || 
      coffee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coffee.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coffee.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Cart Calculations
  const cartCount = cartItems.reduce((acc, item) => acc + (item.customization?.quantity || 1), 0);
  const cartSubtotal = cartItems.reduce((acc, item) => acc + (item.totalPrice || item.unitPrice * item.customization.quantity), 0);
  
  let deliveryFee = cartSubtotal >= 299 || appliedCoupon?.code === 'FREESHIP' ? 0 : 40;
  if (cartItems.length === 0) deliveryFee = 0;
  const taxes = Math.round(cartSubtotal * 0.05);
  
  let discount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountPercent) {
      discount = Math.min(appliedCoupon.maxDiscount || 999, Math.round((cartSubtotal * appliedCoupon.discountPercent) / 100));
    } else if (appliedCoupon.discountFixed) {
      discount = appliedCoupon.discountFixed;
    }
  }
  const finalTotal = Math.max(0, cartSubtotal + taxes + deliveryFee + baristaTip - discount);

  // Handlers
  const handleOpenCustomizer = (coffee) => {
    setCustomizerModal({ isOpen: true, coffee });
  };

  const handleCloseCustomizer = () => {
    setCustomizerModal({ isOpen: false, coffee: null });
  };

  const handleAddToCart = (customizedItem) => {
    setCartItems(prev => [customizedItem, ...prev]);
  };

  const handleQuickAdd = (coffee) => {
    const defaultItem = {
      coffee,
      customization: {
        ...coffee.defaultCustomization,
        quantity: 1,
        toppings: coffee.defaultCustomization.toppings || []
      },
      unitPrice: coffee.price,
      totalPrice: coffee.price,
      id: `${coffee.id}-${Date.now()}`
    };
    setCartItems(prev => [defaultItem, ...prev]);
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === itemId) {
        const unit = item.unitPrice || Math.round(item.totalPrice / (item.customization.quantity || 1));
        return {
          ...item,
          customization: { ...item.customization, quantity: newQuantity },
          totalPrice: unit * newQuantity
        };
      }
      return item;
    }));
  };

  const handleRemoveItem = (itemId) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderSuccess = (newOrder) => {
    setActiveOrder(newOrder);
    setPastOrders(prev => [newOrder, ...prev]);
    setCartItems([]);
    setAppliedCoupon(null);
    setIsCheckoutOpen(false);
    setIsTrackerOpen(true);
  };

  const handleUpdateOrder = (updatedOrder) => {
    setActiveOrder(updatedOrder);
    setPastOrders(prev => prev.map(o => o.id === updatedOrder.id ? updatedOrder : o));
  };

  const scrollToMenu = () => {
    menuSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0f0a07] text-[#f7eee4] flex flex-col font-sans selection:bg-amber-600 selection:text-white">
      
      {/* Top Navigation */}
      <Navbar
        cartCount={cartCount}
        cartTotal={cartSubtotal}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        userProfile={userProfile}
        activeOrder={activeOrder}
        onOpenTracker={() => setIsTrackerOpen(true)}
      />

      <main className="flex-1">
        {/* Landing Hero Section */}
        <HeroBanner
          onExploreMenu={scrollToMenu}
          onOpenCustomBrew={() => handleOpenCustomizer(COFFEE_MENU[1])} // Default to Artisanal Latte
          activeOrder={activeOrder}
          onOpenTracker={() => setIsTrackerOpen(true)}
        />

        {/* Suggestion Studio / Barista AI Matchmaker */}
        <BrewBarSuggestions
          onSelectCoffee={handleOpenCustomizer}
          onQuickAdd={handleQuickAdd}
        />

        {/* Menu Section */}
        <div ref={menuSectionRef} className="pt-10 scroll-mt-24 space-y-8">
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-amber-900/40 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-amber-400 block mb-1">
                  Artisanal Coffee Bar
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-amber-100 font-serif">
                  Explore Handcrafted Roasts
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-amber-200/60 max-w-sm">
                Each cup is freshly extracted to order. Click <span className="text-amber-400 font-semibold">Customize</span> to tweak milk, roast intensity, and sweetness.
              </p>
            </div>
          </div>

          {/* Category Filter & Search */}
          <CategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            totalItemsCount={filteredCoffees.length}
          />

          {/* Coffee Grid */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            {filteredCoffees.length === 0 ? (
              <div className="py-20 text-center glass-panel rounded-3xl p-8 border border-amber-900/30">
                <p className="text-amber-300 text-base font-bold">No coffees found matching your search.</p>
                <p className="text-amber-200/50 text-xs mt-1">Try searching for "latte", "oat milk", "cold brew", or "mocha".</p>
                <button
                  onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
                  className="mt-4 px-4 py-2 rounded-xl bg-amber-500 text-black text-xs font-bold shadow-warm"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
                {filteredCoffees.map(coffee => (
                  <CoffeeCard
                    key={coffee.id}
                    coffee={coffee}
                    onOpenCustomizer={handleOpenCustomizer}
                    onQuickAdd={handleQuickAdd}
                  />
                ))}
              </div>
            )}
          </div>

        </div>
      </main>

      {/* Footer */}
      <Footer
        onExploreMenu={scrollToMenu}
        onOpenCustomBrew={() => handleOpenCustomizer(COFFEE_MENU[0])}
        onOpenTracker={() => activeOrder ? setIsTrackerOpen(true) : alert('No active orders to track yet. Pick a coffee to order!')}
      />

      {/* MODALS */}
      
      {/* 1. Coffee Customizer Modal */}
      <CoffeeCustomizerModal
        coffee={customizerModal.coffee}
        isOpen={customizerModal.isOpen}
        onClose={handleCloseCustomizer}
        onAddToCart={handleAddToCart}
      />

      {/* 2. Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={handleProceedToCheckout}
        appliedCoupon={appliedCoupon}
        onApplyCoupon={setAppliedCoupon}
        onRemoveCoupon={() => setAppliedCoupon(null)}
        baristaTip={baristaTip}
        onSelectTip={setBaristaTip}
      />

      {/* 3. Checkout Modal (Payment Options: UPI, Card, COD) */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        billSummary={{
          subtotal: cartSubtotal,
          taxes,
          deliveryFee,
          discount,
          baristaTip,
          finalTotal
        }}
        userProfile={userProfile}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* 4. Live Order Tracker Modal */}
      <OrderTrackerModal
        isOpen={isTrackerOpen}
        onClose={() => setIsTrackerOpen(false)}
        order={activeOrder}
        onUpdateOrder={handleUpdateOrder}
      />

      {/* 5. User Profile & Login Modal */}
      <LoginProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        userProfile={userProfile}
        onUpdateProfile={setUserProfile}
        pastOrders={pastOrders}
        onTrackOrder={(ord) => {
          setActiveOrder(ord);
          setIsTrackerOpen(true);
        }}
      />

    </div>
  );
}
