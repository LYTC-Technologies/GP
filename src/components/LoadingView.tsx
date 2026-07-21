import React, { useEffect } from "react";
import { motion } from "motion/react";

interface LoadingViewProps {
  onComplete: () => void;
}

export default function LoadingView({ onComplete }: LoadingViewProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2000); // Strict 2-second loading duration
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-luxury-bg/90 backdrop-blur-[30px]"
    >
      <div className="flex flex-col items-center max-w-sm px-6 text-center">
        {/* Subtle Luxury Pulse Text */}
        <motion.p
          initial={{ opacity: 0.3, letterSpacing: "0.2em" }}
          animate={{ opacity: [0.3, 0.9, 0.3], letterSpacing: "0.25em" }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="text-[10px] uppercase font-light text-gold-primary tracking-[0.2em] mb-4"
        >
          جاري تهيئة الخدمات الفندقية
          <span className="font-sans mr-2">VILLA MISK</span>
        </motion.p>

        {/* Golden line expand loader */}
        <div className="h-[1.5px] w-64 bg-white/10 rounded-full overflow-hidden relative">
          <motion.div
            initial={{ left: "-100%", width: "20%" }}
            animate={{ left: "100%", width: "40%" }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 bottom-0 bg-gold-primary"
            style={{ boxShadow: "0 0 15px #dfba73, 0 0 3px #dfba73" }}
          />
        </div>
      </div>
    </motion.div>
  );
}
