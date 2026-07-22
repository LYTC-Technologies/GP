import React, { useState } from "react";
import { motion } from "motion/react";
import { CartItem } from "../types";
import CreateOrderModal from "./CreateOrderModal";

interface OrdersViewProps {
  cart: CartItem[];
  onOpenCart: () => void;
  onSelectCategory: (category: "restaurant" | "drinks" | "room_service") => void;
  onBack: () => void;
  roomNumber: string;
  onAddToCart: (item: { id: string; name: string; price: number; category: string; description: string; image: string }) => void;
}

export default function OrdersView({
  cart,
  onOpenCart,
  onSelectCategory,
  onBack,
  roomNumber,
  onAddToCart
}: OrdersViewProps) {
  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const [isCreateOrderModalOpen, setIsCreateOrderModalOpen] = useState(false);

  const categories = [
    {
      id: "restaurant" as const,
      title: "المطعم الملكي الفاخر",
      subtitle: "RESTAURANT",
      description: "تشكيلة من الأطباق الرئيسية المحضرة بعناية من الطهاة الحائزين على تصنيفات عالمية",
      image: "https://images.pexels.com/photos/675951/pexels-photo-675951.jpeg?auto=compress&cs=tinysrgb&w=1200",
      tag: "المأكولات"
    },
    {
      id: "drinks" as const,
      title: "المشروبات والقهوة المختصة",
      subtitle: "DRINKS & BREWS",
      description: "قهوة إسبريسو نادرة، خلطات منقوعة بالزعفران، وعصائر طبيعية باردة ومنعشة",
      image: "https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=1200",
      tag: "المشروبات"
    },
    {
      id: "room_service" as const,
      title: "خدمة الجناح المباشرة",
      subtitle: "ROOM SERVICE",
      description: "وجبات فطور ملكية متكاملة، حلويات فرنسية طازجة، وألواح أجبان أوروبية معتقة",
      image: "https://images.pexels.com/photos/103124/pexels-photo-103124.jpeg?auto=compress&cs=tinysrgb&w=1200",
      tag: "خدمة الغرف"
    }
  ];

  return (
    <>
      <div className="min-h-screen bg-luxury-bg flex flex-col justify-between overflow-x-hidden relative">
        {/* Top Header Bar */}
        <header className="relative z-20 px-6 py-6 border-b border-white/5 bg-luxury-black/40 backdrop-blur-md flex items-center justify-between">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="text-xs text-gray-400 hover:text-white transition-colors"
        >
          الرئيسية ←
        </button>

        {/* Title */}
        <div className="text-center">
          <h2 className="text-base font-light text-white">قائمة الطلبات</h2>
          <p className="text-[9px] text-gold-primary tracking-widest font-sans">SELECT CATEGORY</p>
        </div>

        {/* Cart */}
        <button
          onClick={onOpenCart}
          className="text-xs text-gold-primary px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 font-medium"
        >
          سلة الطلبات
          {totalCartItems > 0 && (
            <span className="mr-1.5 font-sans bg-gold-primary text-black px-1.5 py-0.5 rounded text-[10px] font-bold">
              {totalCartItems}
            </span>
          )}
        </button>

        {/* Create Order Button */}
        <button
          onClick={() => setIsCreateOrderModalOpen(true)}
          className="text-xs text-white px-3 py-1.5 rounded-lg bg-gold-primary/20 hover:bg-gold-primary/30 transition-all duration-300 font-medium border border-gold-primary/30"
        >
          + طلب جديد
        </button>
      </header>

      {/* Categories Content */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-6 py-10 flex flex-col justify-center space-y-6 md:space-y-8">
        {categories.map((cat, idx) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.9, cubicBezier: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.01 }}
            onClick={() => onSelectCategory(cat.id)}
            className="relative h-48 md:h-60 rounded-2xl overflow-hidden group cursor-pointer border border-white/5 hover:border-gold-primary/20 transition-all duration-500 shadow-xl"
          >
            {/* Lazy Image Background */}
            <img
              src={cat.image}
              alt={cat.title}
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 brightness-[0.3] group-hover:brightness-[0.4]"
            />

            {/* Glowing gold line arch decoration */}
            <div className="absolute top-0 bottom-0 right-0 w-1.5 bg-gold-primary/40 group-hover:bg-gold-primary transition-colors duration-500" />

            {/* Content overlay */}
            <div className="absolute inset-0 p-6 flex flex-col justify-between">
              {/* Top Subtitle */}
              <div className="flex items-center space-x-2 space-x-reverse">
                <div className="px-2.5 py-1 bg-luxury-black/60 rounded-md border border-gold-primary/10 text-[9px] text-gold-primary">
                  {cat.tag}
                </div>
                <span className="text-[10px] font-sans tracking-[0.3em] text-gray-400 font-light">
                  {cat.subtitle}
                </span>
              </div>

              {/* Bottom Titles */}
              <div className="space-y-2 max-w-md">
                <h3 className="text-lg md:text-xl font-light text-white group-hover:text-gold-primary transition-colors duration-300">
                  {cat.title}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed font-light line-clamp-2">
                  {cat.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </main>

      {/* Simple footer spacer */}
      <div className="py-4" />
    </div>

    {/* Create Order Modal */}
    <CreateOrderModal
      isOpen={isCreateOrderModalOpen}
      onClose={() => setIsCreateOrderModalOpen(false)}
      roomNumber={roomNumber}
      onAddToCart={onAddToCart}
      isLoading={false}
    />
  </>
  );
}
