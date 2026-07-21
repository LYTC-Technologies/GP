import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface RatingViewProps {
  onSubmitRating: (stars: number, notes: string) => Promise<boolean>;
  onBack: () => void;
}

export default function RatingView({ onSubmitRating, onBack }: RatingViewProps) {
  const [stars, setStars] = useState(5);
  const [hoverStars, setHoverStars] = useState<number | null>(null);
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    const success = await onSubmitRating(stars, notes);
    setIsSubmitting(false);

    if (success) {
      setShowSuccess(true);
      setNotes("");
      setStars(5);
      setTimeout(() => {
        setShowSuccess(false);
        onBack(); // Automatically return to main screen after appreciation
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-luxury-bg flex flex-col justify-between overflow-x-hidden relative">
      {/* Fullscreen Appreciation Success Screen */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-luxury-black flex flex-col items-center justify-center text-center p-6 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, filter: "blur(5px)" }}
              animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="space-y-6 max-w-md flex flex-col items-center"
            >
              {/* Luxury Gold Heart Pulsing */}
              <div className="h-16 w-16 rounded-full border border-gold-primary/30 flex items-center justify-center bg-gold-primary/10 text-gold-primary text-3xl shadow-[0_0_30px_rgba(223,186,115,0.25)] animate-pulse">
                ♥
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-light text-white tracking-wide">
                  شكراً لتقديرك وتقييمك
                </h3>
                <p className="text-xs text-gray-400 font-light leading-relaxed">
                  ملاحظاتك الكريمة محل اهتمام بالغ لشركاء الخدمة وإدارة فيلا مسك. نسعى دوماً للرقي بخدماتنا لتفوق وتصنع فارق تطلعاتك.
                </p>
              </div>

              <div className="h-[1.5px] w-24 bg-gold-primary/30" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Bar */}
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
          <h2 className="text-base font-light text-white">تقييم الإقامة والخدمات</h2>
          <p className="text-[9px] text-gold-primary tracking-widest font-sans">FEEDBACK & RATING</p>
        </div>

        {/* Spacer */}
        <div className="w-10" />
      </header>

      {/* Rating Content */}
      <main className="flex-1 w-full max-w-2xl mx-auto px-6 py-10 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="glass-panel p-6 md:p-10 rounded-[24px] border border-gold-primary/15 shadow-2xl space-y-8 text-center"
        >
          <div className="space-y-2">
            <h3 className="text-lg font-light text-white">ما مدى رضاك عن مستوى الضيافة؟</h3>
            <p className="text-xs text-gray-400 font-light max-w-md mx-auto leading-relaxed">
              تقييمك يسهم مباشرة في ضبط جودة التفاصيل ورعاية أدق متطلبات إقامتك الحالية والقادمة في منتجعات فيلا مسك
            </p>
          </div>

          {/* Interactive Five Stars */}
          <div className="flex justify-center items-center space-x-3 space-x-reverse py-4">
            {[1, 2, 3, 4, 5].map((starIdx) => {
              const active = hoverStars !== null ? starIdx <= hoverStars : starIdx <= stars;
              return (
                <button
                  key={starIdx}
                  type="button"
                  onMouseEnter={() => setHoverStars(starIdx)}
                  onMouseLeave={() => setHoverStars(null)}
                  onClick={() => setStars(starIdx)}
                  className="text-4xl focus:outline-none transition-transform duration-300 hover:scale-125 cursor-pointer text-gold-primary"
                >
                  {active ? "★" : "☆"}
                </button>
              );
            })}
          </div>

          {/* Rating description state text */}
          <div className="h-6">
            <span className="text-[11px] text-gold-primary/80 font-medium tracking-wide">
              {stars === 1 && "مخيب للآمال - سنقوم بالتواصل معك فوراً لتدارك الأمر"}
              {stars === 2 && "مقبول - نتطلع للتحسين وسماع تفاصيل ملاحظاتك"}
              {stars === 3 && "جيد - نسعى لتقديم خدمة أفضل في المستقبل"}
              {stars === 4 && "رائع جداً - يسعدنا رضاك وسنسعى للامتياز التام"}
              {stars === 5 && "استثنائي - تليق بمستوى فيلا مسك الفاخر"}
            </span>
          </div>

          {/* Custom review form */}
          <form onSubmit={handleSubmit} className="space-y-6 text-right">
            <div>
              <label htmlFor="rating-notes" className="block text-[10px] text-gold-primary uppercase tracking-wider mb-2">
                ملاحظات أو تعليقات إضافية (اختياري)
              </label>
              <textarea
                id="rating-notes"
                rows={4}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="يسعدنا كتابة ملاحظاتك حول أي زميل في الخدمة أو تفاصيل نالت إعجابك أو نقاط تود منا تحسينها..."
                className="w-full bg-luxury-black/60 rounded-xl p-4 border border-gold-primary/20 text-xs text-white placeholder-gray-600 focus:outline-none transition-all duration-300"
              />
            </div>

            {/* Submit Button */}
            <motion.button
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-gold py-3.5 text-xs font-medium rounded-xl flex items-center justify-center space-x-2 space-x-reverse disabled:opacity-50"
            >
              <span>{isSubmitting ? "جاري إرسال التقييم..." : "إرسال التقييم الفاخر"}</span>
            </motion.button>
          </form>
        </motion.div>
      </main>

      <div className="py-6" />
    </div>
  );
}
