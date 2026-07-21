import React, { useEffect } from "react";
import { motion } from "motion/react";
import VillaMiskLogo from "./VillaMiskLogo";

interface SplashViewProps {
  onComplete: () => void;
}

export default function SplashView({ onComplete }: SplashViewProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2200); // Allow a slightly longer duration for the luxury reveal (1.5s visual + 0.7s transition)
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-luxury-black"
    >
      <div className="flex flex-col items-center">
        {/* Logo Reveal */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, filter: "blur(5px)" }}
          animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <VillaMiskLogo size="lg" />
        </motion.div>

        {/* Elegant growing horizontal gold line */}
        <div className="relative mt-8 h-[1px] w-48 overflow-hidden bg-white/10">
          <motion.div
            initial={{ left: "-100%", width: "0%" }}
            animate={{ left: "0%", width: "100%" }}
            transition={{ delay: 0.4, duration: 1.2, ease: "easeInOut" }}
            className="absolute top-0 bottom-0 bg-gold-primary"
            style={{ boxShadow: "0 0 10px #dfba73" }}
          />
        </div>
      </div>
    </motion.div>
  );
}
