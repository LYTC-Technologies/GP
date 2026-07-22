import React from "react";
import { motion } from "motion/react";

interface Offer {
  id: number;
  title: string;
  description: string;
}

interface OffersCardProps {
  offers: Offer[];
  isLoadingOffers: boolean;
  onClick?: () => void;
}

export default function OffersCard({ offers, isLoadingOffers, onClick }: OffersCardProps) {
  if (isLoadingOffers) {
    return (
      <div className="relative h-48 md:h-60 rounded-2xl overflow-hidden border border-white/5 bg-luxury-black/40 animate-pulse" />
    );
  }

  // Always show the card even if empty, for debugging
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      transition={{ duration: 0.9, cubicBezier: [0.16, 1, 0.3, 1] }}
      className={`relative h-48 md:h-60 rounded-2xl overflow-hidden border border-white/5 hover:border-gold-primary/20 transition-all duration-500 shadow-xl bg-gradient-to-br from-gold-primary/10 via-luxury-black/60 to-luxury-black/80 ${onClick ? 'cursor-pointer' : ''}`}
    >
      {/* Glowing gold line decoration */}
      <div className="absolute top-0 bottom-0 right-0 w-1.5 bg-gold-primary/40" />

      {/* Content overlay */}
      <div className="absolute inset-0 p-6 flex flex-col justify-center items-center text-center">
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-xl md:text-2xl font-light text-primary"
        >
          العروض الخاصة
        </motion.h3>
      </div>
    </motion.div>
  );
}
