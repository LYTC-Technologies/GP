import React, { useEffect } from "react";
import { motion } from "motion/react";
import VillaMiskLogo from "./VillaMiskLogo";

interface WelcomeViewProps {
  guestName?: string;
  onComplete: () => void;
}

export default function WelcomeView({ guestName, onComplete }: WelcomeViewProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2800); // 2.8 seconds to appreciate the elegant greetings, auto-advances
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.0, ease: "easeOut" }}
      onClick={onComplete} // Tap anywhere to skip
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-luxury-black cursor-pointer select-none"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(223,186,115,0.02)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative flex flex-col items-center max-w-lg px-8 text-center pointer-events-none">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        >
          <VillaMiskLogo size="md" className="mb-10" />
        </motion.div>

        {/* Greetings Text */}
        <div className="space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1.2, ease: "easeOut" }}
            className="text-2xl md:text-3xl font-light text-white tracking-wide leading-relaxed"
          >
            أهلاً بك في فيلا مسك
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1.2, ease: "easeOut" }}
            className="text-gold-primary text-sm tracking-[0.1em] font-light"
          >
            نتمنى لك إقامة فريدة ومميزة تليق بمقامك الكريــم
          </motion.p>
        </div>

        {/* Tap to Skip Prompt */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.4, 0] }}
          transition={{ delay: 1.5, duration: 2.5, repeat: Infinity }}
          className="absolute bottom-[-100px] text-[10px] tracking-[0.25em] text-gray-500 uppercase"
        >
          انقر في أي مكان للتخطي
        </motion.div>
      </div>
    </motion.div>
  );
}
