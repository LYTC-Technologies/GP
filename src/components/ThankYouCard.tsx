import React from "react";
import { motion, AnimatePresence } from "motion/react";

interface ThankYouCardProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function ThankYouCard({ isVisible, onClose }: ThankYouCardProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="glass-panel p-8 md:p-12 rounded-[32px] border border-gold-primary/20 shadow-2xl max-w-md w-full text-center relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Golden decorative elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-gold-primary to-transparent" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-gold-primary to-transparent" />
            
            {/* Golden glow effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gold-primary/10 blur-[60px] rounded-full pointer-events-none" />

            {/* Content */}
            <div className="relative z-10 space-y-6">
              {/* Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-20 h-20 mx-auto rounded-full bg-gold-primary/10 border border-gold-primary/30 flex items-center justify-center"
              >
                <span className="text-4xl text-gold-primary">✨</span>
              </motion.div>

              {/* Title */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-2"
              >
                <h2 className="text-2xl md:text-3xl font-light text-primary tracking-wide">
                  شكراً لتشريفك لنا
                </h2>
                <div className="h-[1px] w-24 mx-auto bg-gold-primary/30" />
              </motion.div>

              {/* Message */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-sm text-gray-400 leading-relaxed font-light"
              >
                نتمنى أن تكون قد استمتعت بإقامتك في فيلا مسك.
                <br />
                نتطلع لاستقبالك مرة أخرى قريباً.
              </motion.p>

              {/* Close button */}
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                className="btn-gold py-3 px-8 rounded-xl text-sm tracking-wider font-medium w-full"
              >
                إغلاق
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
