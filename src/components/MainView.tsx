import React from "react";
import { motion } from "motion/react";
import { StayInfo, CartItem } from "../types";
import VillaMiskLogo from "./VillaMiskLogo";
import OffersCard from "./OffersCard";
import PaymentsCard from "./PaymentsCard";
import ThemeToggle from "./ThemeToggle";

interface MainViewProps {
  stayInfo: StayInfo | null;
  cart: CartItem[];
  onOpenCart: () => void;
  onNavigate: (screen: "orders" | "special_requests" | "rating" | "offers" | "payments") => void;
  onLogout: () => void;
  onCheckout: () => void;
  activeOrdersCount: number;
  onOpenOrderHistory: () => void;
  offers: { id: number; title: string; description: string }[];
  isLoadingOffers: boolean;
  stayDetails: {
    roomCharge: number;
    totalCharge: number;
    checkInTime: string;
    expectedCheckOutDate: string;
  } | null;
  isLoadingStayDetails: boolean;
}

export default function MainView({
  stayInfo,
  cart,
  onOpenCart,
  onNavigate,
  onLogout,
  onCheckout,
  activeOrdersCount,
  onOpenOrderHistory,
  offers,
  isLoadingOffers,
  stayDetails,
  isLoadingStayDetails
}: MainViewProps) {
  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const combinedTotalCount = totalCartItems + activeOrdersCount;

  const cards = [
    {
      id: "orders",
      title: "الطلبات الفندقية",
      description: "طلب المأكولات الفاخرة، المشروبات المنعشة، والمقبلات مباشرةً إلى جناحك الخاص بلمسة واحدة",
      target: "orders" as const
    },
    {
      id: "special_requests",
      title: "الطلبات الخاصة والخدمات",
      description: "خدمات ترتيب الجناح، مناولة الأمتعة، حجز السيارات، والتواصل المباشر مع المساعد الشخصي",
      target: "special_requests" as const
    },
    {
      id: "rating",
      title: "تقييم الإقامة في المنتجع",
      description: "مشاركتنا انطباعك وتقييمك يساعدنا على تقديم الخدمة الاستثنائية التي تليق بتطلعاتك الراقية",
      target: "rating" as const
    },
    {
      id: "checkout",
      title: "مغادرة الغرفة",
      description: "إتمام إجراءات المغادرة وعرض الفاتورة النهائية مع تفاصيل جميع الخدمات المستفادة",
      target: "checkout" as const
    }
  ];

  return (
    <div className="min-h-screen bg-luxury-bg flex flex-col justify-between overflow-x-hidden relative">
      {/* Background elegant golden aura */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-gold-primary/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Header Bar */}
      <header className="relative z-20 px-4 sm:px-6 py-4 sm:py-6 border-b border-white/5 bg-luxury-black/40 backdrop-blur-md flex items-center justify-between">
        {/* Left Side: Unified Single Button */}
        <div className="flex items-center">
          <button
            onClick={onOpenCart}
            className="text-[10px] sm:text-[12px] tracking-wider text-gold-primary px-3 sm:px-5 py-2 sm:py-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-gold-primary/20 hover:border-gold-primary/45 transition-all duration-300 font-medium"
          >
            طلباتي
            {combinedTotalCount > 0 && (
              <span className="mr-1 sm:mr-2 font-sans bg-gold-primary text-black px-1.5 sm:px-2 py-0.5 rounded-md text-[9px] sm:text-[10px] font-bold">
                {combinedTotalCount}
              </span>
            )}
          </button>
        </div>

        {/* Center: Miniature text logo */}
        <div className="flex flex-col items-center">
          <span className="text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.3em] font-sans text-gold-primary font-light">VILLA MISK</span>
          <span className="text-[7px] sm:text-[8px] text-gray-500 tracking-[0.15em] sm:tracking-[0.2em] hidden sm:block">PRIVATE PORTAL</span>
        </div>

        {/* Right Side: Log Out & Theme Toggle */}
        <div className="flex items-center gap-1 sm:gap-2">
          <ThemeToggle />
          <button
            onClick={onLogout}
            className="text-[10px] sm:text-xs px-2 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-white/5 hover:bg-red-500/10 border border-white/5 hover:border-red-500/20 text-gray-400 hover:text-red-400 transition-all duration-300"
          >
            خروج
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col justify-center">
        {/* Stay Summary Panel */}
        {stayInfo && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8 p-4 rounded-xl bg-white/[0.02] border border-white/5 flex justify-between items-center text-xs text-gray-400"
          >
            <div>
              <span>رقم الغرفة: {stayInfo.villaName.replace("جناح ", "")}</span>
            </div>
            <div>
              <span>وقت الوصول: {stayInfo.checkIn}</span>
            </div>
          </motion.div>
        )}

        {/* Brand center crest on Main portal */}
        <div className="flex justify-center mb-10">
          <VillaMiskLogo size="md" className="scale-90" />
        </div>

        {/* Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* Special Offers Card */}
          <OffersCard 
            offers={offers} 
            isLoadingOffers={isLoadingOffers} 
            onClick={() => onNavigate("offers")}
          />

          {/* Payments Card */}
          <PaymentsCard 
            stayDetails={stayDetails}
            isLoading={isLoadingStayDetails}
            onClick={() => onNavigate("payments")}
          />
        </div>

        {/* Massive Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 flex-1 items-stretch">
          {cards.map((card, idx) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => card.target === "checkout" ? onCheckout() : onNavigate(card.target)}
              transition={{ delay: idx * 0.1, duration: 0.9, cubicBezier: [0.16, 1, 0.3, 1] }}
              className="relative h-48 md:h-60 rounded-2xl overflow-hidden border border-white/5 hover:border-gold-primary/20 transition-all duration-500 shadow-xl bg-gradient-to-br from-gold-primary/10 via-luxury-black/60 to-luxury-black/80 cursor-pointer"
            >
              {/* Glowing gold line decoration */}
              <div className="absolute top-0 bottom-0 right-0 w-1.5 bg-gold-primary/40" />

              {/* Content overlay */}
              <div className="absolute inset-0 p-6 flex flex-col justify-center items-center text-center">
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 + 0.3, duration: 0.6 }}
                  className="text-xl md:text-2xl font-light text-primary"
                >
                  {card.title}
                </motion.h3>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Footer copyright */}
      <footer className="py-6 text-center text-[10px] text-gray-600 font-sans tracking-widest relative z-10">
        © 2026 VILLA MISK RESORTS. ALL RIGHTS RESERVED.
      </footer>
    </div>
  );
}
