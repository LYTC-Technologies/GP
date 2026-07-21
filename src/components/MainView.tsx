import React from "react";
import { motion } from "motion/react";
import { StayInfo, CartItem } from "../types";
import VillaMiskLogo from "./VillaMiskLogo";

interface MainViewProps {
  stayInfo: StayInfo | null;
  cart: CartItem[];
  onOpenCart: () => void;
  onNavigate: (screen: "orders" | "special_requests" | "rating") => void;
  onLogout: () => void;
  activeOrdersCount: number;
  onOpenOrderHistory: () => void;
}

export default function MainView({
  stayInfo,
  cart,
  onOpenCart,
  onNavigate,
  onLogout,
  activeOrdersCount,
  onOpenOrderHistory
}: MainViewProps) {
  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const combinedTotalCount = totalCartItems + activeOrdersCount;

  const cards = [
    {
      id: "orders",
      title: "الطلبات الفندقية",
      description: "طلب المأكولات الفاخرة، المشروبات المنعشة، والمقبلات مباشرةً إلى جناحك الخاص بلمسة واحدة",
      image: "https://images.pexels.com/photos/262047/pexels-photo-262047.jpeg?auto=compress&cs=tinysrgb&w=1200",
      target: "orders" as const
    },
    {
      id: "special_requests",
      title: "الطلبات الخاصة والخدمات",
      description: "خدمات ترتيب الجناح، مناولة الأمتعة، حجز السيارات، والتواصل المباشر مع المساعد الشخصي",
      image: "https://images.pexels.com/photos/2082087/pexels-photo-2082087.jpeg?auto=compress&cs=tinysrgb&w=1200",
      target: "special_requests" as const
    },
    {
      id: "rating",
      title: "تقييم الإقامة في المنتجع",
      description: "مشاركتنا انطباعك وتقييمك يساعدنا على تقديم الخدمة الاستثنائية التي تليق بتطلعاتك الراقية",
      image: "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=1200",
      target: "rating" as const
    }
  ];

  return (
    <div className="min-h-screen bg-luxury-bg flex flex-col justify-between overflow-x-hidden relative">
      {/* Background elegant golden aura */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-gold-primary/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Header Bar */}
      <header className="relative z-20 px-6 py-6 border-b border-white/5 bg-luxury-black/40 backdrop-blur-md flex items-center justify-between">
        {/* Left Side: Unified Single Button */}
        <div className="flex items-center">
          <button
            onClick={onOpenCart}
            className="text-[12px] tracking-wider text-gold-primary px-5 py-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-gold-primary/20 hover:border-gold-primary/45 transition-all duration-300 font-medium"
          >
            طلباتي
            {combinedTotalCount > 0 && (
              <span className="mr-2 font-sans bg-gold-primary text-black px-2 py-0.5 rounded-md text-[10px] font-bold">
                {combinedTotalCount}
              </span>
            )}
          </button>
        </div>

        {/* Center: Miniature text logo */}
        <div className="flex flex-col items-center">
          <span className="text-xs tracking-[0.3em] font-sans text-gold-primary font-light">VILLA MISK</span>
          <span className="text-[8px] text-gray-500 tracking-[0.2em]">PRIVATE PORTAL</span>
        </div>

        {/* Right Side: Log Out */}
        <button
          onClick={onLogout}
          className="text-xs px-4 py-2.5 rounded-xl bg-white/5 hover:bg-red-500/10 border border-white/5 hover:border-red-500/20 text-gray-400 hover:text-red-400 transition-all duration-300"
        >
          خروج
        </button>
      </header>

      {/* Main Container */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-6 py-8 flex flex-col justify-center">
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

        {/* Massive Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 flex-1 items-stretch">
          {cards.map((card, idx) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15, duration: 1.0, cubicBezier: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8, scale: 1.01 }}
              onClick={() => onNavigate(card.target)}
              className="relative rounded-[24px] overflow-hidden group cursor-pointer border border-gold-primary/10 hover:border-gold-primary/35 shadow-[0_15px_30px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_45px_rgba(223,186,115,0.08)] transition-all duration-700 flex flex-col justify-end min-h-[320px] md:min-h-[420px] p-6 md:p-8"
              style={{
                background: "radial-gradient(circle at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.95) 100%)"
              }}
            >
              {/* Background image loaded lazily */}
              <img
                src={card.image}
                alt={card.title}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover -z-10 group-hover:scale-110 filter brightness-[0.35] group-hover:brightness-[0.45] transition-all duration-[2s] cubic-bezier(0.16, 1, 0.3, 1)"
              />

              {/* Shimmer/Reflection overlay effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-gold-primary/0 via-gold-primary/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -z-5" />

              {/* Glowing Line at top of card */}
              <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-gold-primary/30 to-transparent opacity-60 group-hover:via-gold-primary/80 transition-all duration-700" />

              {/* Content */}
              <div className="relative z-10 space-y-3">
                <h3 className="text-xl md:text-2xl font-light text-white group-hover:text-gold-primary transition-colors duration-500 flex items-center justify-between">
                  <span>{card.title}</span>
                  <span className="text-gold-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-[-4px] transition-all duration-500 text-sm">←</span>
                </h3>
                <p className="text-[11px] md:text-xs text-gray-400 font-light leading-relaxed group-hover:text-gray-300 transition-colors duration-500">
                  {card.description}
                </p>
              </div>

              {/* Fine subtle borders glow */}
              <div className="absolute inset-0 border border-white/0 group-hover:border-gold-primary/10 rounded-[24px] transition-all duration-700 pointer-events-none" />
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
