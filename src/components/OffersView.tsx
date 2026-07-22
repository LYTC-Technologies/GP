import React from "react";
import { motion } from "motion/react";

interface Offer {
  id: number;
  title: string;
  description: string;
}

interface OffersViewProps {
  offers: Offer[];
  isLoading: boolean;
  onBack: () => void;
}

export default function OffersView({ offers, isLoading, onBack }: OffersViewProps) {
  return (
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
          <h2 className="text-base font-light text-white">العروض الخاصة</h2>
          <p className="text-[9px] text-gold-primary tracking-widest font-sans">SPECIAL OFFERS</p>
        </div>

        {/* Spacer */}
        <div className="w-10" />
      </header>

      {/* Offers Content */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-6 py-10 flex flex-col justify-center space-y-6 md:space-y-8">
        {isLoading ? (
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-48 md:h-60 rounded-2xl border border-white/5 bg-luxury-black/40 animate-pulse" />
            ))}
          </div>
        ) : offers.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-sm">لا توجد عروض خاصة متاحة حالياً</p>
          </div>
        ) : (
          offers.map((offer, idx) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.8, cubicBezier: [0.16, 1, 0.3, 1] }}
              className="relative h-48 md:h-60 rounded-2xl overflow-hidden border border-white/5 hover:border-gold-primary/20 transition-all duration-500 shadow-xl bg-gradient-to-br from-gold-primary/10 via-luxury-black/60 to-luxury-black/80"
            >
              {/* Glowing gold line decoration */}
              <div className="absolute top-0 bottom-0 right-0 w-1.5 bg-gold-primary/40" />

              {/* Content overlay */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between">
                {/* Top Subtitle */}
                <div className="flex items-center space-x-2 space-x-reverse">
                  <div className="px-2.5 py-1 bg-luxury-black/60 rounded-md border border-gold-primary/10 text-[9px] text-gold-primary">
                    عرض خاص
                  </div>
                  <span className="text-[10px] font-sans tracking-[0.3em] text-gray-400 font-light">
                    SPECIAL OFFER
                  </span>
                </div>

                {/* Bottom Content */}
                <div className="space-y-2 max-w-md">
                  <h3 className="text-lg md:text-xl font-light text-white">
                    {offer.title}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed font-light">
                    {offer.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </main>

      {/* Simple footer spacer */}
      <div className="py-4" />
    </div>
  );
}
