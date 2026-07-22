import React from "react";
import { motion } from "motion/react";
import { Product, CartItem } from "../types";
import ThemeToggle from "./ThemeToggle";

interface MenuItem {
  id: number;
  name: string;
  price: number;
  category: string;
}

interface CategoryProductListProps {
  category: "restaurant" | "drinks" | "room_service";
  products: Product[];
  menuItems: MenuItem[];
  isLoading: boolean;
  onAddToCart: (product: Product) => void;
  onBack: () => void;
  onOpenCart: () => void;
  cart: CartItem[];
}

export default function CategoryProductList({
  category,
  products,
  menuItems,
  isLoading,
  onAddToCart,
  onBack,
  onOpenCart,
  cart
}: CategoryProductListProps) {
  const formatPrice = (price: number | undefined | null | string) => {
    if (price === undefined || price === null) return "0.0";
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    if (isNaN(numPrice)) return "0.0";
    return numPrice.toFixed(1);
  };

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const categoryNames = {
    restaurant: "المطعم الملكي الفاخر",
    drinks: "المشروبات والقهوة المختصة",
    room_service: "خدمة الجناح المباشرة"
  };

  // Convert API category to app category
  const apiCategoryMap = {
    restaurant: "FOOD",
    drinks: "DRINK",
    room_service: "SERVICE"
  };

  const filteredMenuItems = menuItems.filter(item => item.category === apiCategoryMap[category]);

  return (
    <div className="min-h-screen bg-luxury-bg flex flex-col justify-between overflow-x-hidden relative">
      {/* Top Header */}
      <header className="relative z-20 px-6 py-6 border-b border-white/5 bg-luxury-black/40 backdrop-blur-md flex items-center justify-between">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="text-xs text-gray-400 hover-text-primary transition-colors"
        >
          الفئات ←
        </button>

        {/* Title */}
        <div className="text-center">
          <h2 className="text-base font-light text-primary">{categoryNames[category]}</h2>
          <p className="text-[9px] text-gold-primary tracking-widest font-sans uppercase">{category}</p>
        </div>

        {/* Cart Trigger & Theme Toggle */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
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
        </div>
      </header>

      {/* Grid Content */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-6 py-10">
        {isLoading ? (
          /* Skeletons */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="glass-panel p-4 rounded-3xl border border-white/5 space-y-4 animate-pulse">
                <div className="w-full h-48 bg-white/5 rounded-2xl" />
                <div className="h-4 bg-white/5 rounded w-3/4" />
                <div className="h-3 bg-white/5 rounded w-1/2" />
                <div className="flex justify-between items-center pt-2">
                  <div className="h-5 bg-white/5 rounded w-1/4" />
                  <div className="h-8 bg-white/5 rounded-xl w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredMenuItems.length === 0 ? (
          /* Empty State */
          <div className="text-center py-24 space-y-4">
            <p className="text-gray-400 font-light">لا توجد منتجات متاحة في هذه الفئة حالياً</p>
          </div>
        ) : (
          /* Products Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredMenuItems.map((menuItem, idx) => {
              const inCartItem = cart.find(item => item.product.id === menuItem.id.toString());
              const inCartCount = inCartItem ? inCartItem.quantity : 0;

              return (
                <motion.div
                  key={menuItem.id}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08, duration: 0.8, cubicBezier: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -6 }}
                  className="glass-panel p-4 rounded-[24px] border border-gold-primary/10 hover:border-gold-primary/25 transition-all duration-500 shadow-lg flex flex-col justify-between group overflow-hidden relative"
                >
                  {/* Tag badge for in-cart items count */}
                  {inCartCount > 0 && (
                    <div className="absolute top-3 right-3 bg-gold-primary text-black text-[9px] font-sans font-bold px-2 py-1 rounded shadow-md">
                      <span>{inCartCount} في السلة</span>
                    </div>
                  )}

                  {/* Title and descriptions */}
                  <div className="flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-1">
                      <h3 className="text-xs font-light text-primary group-hover:text-gold-primary transition-colors duration-300">
                        {menuItem.name}
                      </h3>
                    </div>

                    {/* Pricing & Add Trigger */}
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs text-gold-primary font-sans font-medium tracking-wide">
                        {formatPrice(menuItem.price)} ر.س
                      </span>
                      
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onAddToCart({
                          id: menuItem.id.toString(),
                          name: menuItem.name,
                          price: menuItem.price,
                          category: category,
                          description: "",
                          image: ""
                        })}
                        className="btn-gold-outline rounded-xl px-3.5 py-1.5 text-[10px] tracking-wide font-medium"
                      >
                        + أضف للسلة
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </main>

      {/* Spacing footer */}
      <div className="py-6" />
    </div>
  );
}
