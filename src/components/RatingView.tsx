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
              className="space-y-8 max-w-md flex flex-col items-center"
            >
              {/* Luxury Gold Checkmark Circle */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="h-20 w-20 rounded-full border-2 border-gold-primary/40 flex items-center justify-center bg-gold-primary/10 shadow-[0_0_40px_rgba(223,186,115,0.3)]"
              >
                <svg className="w-10 h-10 text-gold-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>

              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-primary tracking-wide leading-relaxed">
                  شكرا علي تقييمك لنا و تشرفنا بك
                </h3>
                <div className="h-[1.5px] w-20 mx-auto bg-gold-primary/40" />
                <p className="text-sm text-gray-500 font-medium leading-loose">
                  تقييمك يساعدنا على تقديم أفضل تجربة ضيافة فاخرة في فيلا مسك
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Bar */}
      <header className="relative z-20 px-6 py-6 border-b border-theme-subtle bg-overlay-header backdrop-blur-md flex items-center justify-between">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="text-sm text-gray-500 hover:text-primary transition-colors font-medium"
        >
          الرئيسية ←
        </button>

        {/* Title */}
        <div className="text-center">
          <h2 className="text-base font-semibold text-primary">تقييم الإقامة والخدمات</h2>
          <p className="text-[10px] text-gold-primary tracking-widest font-semibold">FEEDBACK & RATING</p>
        </div>

        {/* Spacer for layout balance */}
        <div className="w-16" />
      </header>

      {/* Rating Content */}
      <main className="flex-1 w-full max-w-2xl mx-auto px-6 py-10 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="glass-panel p-6 md:p-10 rounded-[24px] border border-gold-primary/15 shadow-2xl space-y-8 text-center"
        >
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-primary">ما مدى رضاك عن مستوى الضيافة؟</h3>
            <p className="text-sm text-gray-500 font-medium max-w-md mx-auto leading-loose">
              تقييمك يسهم مباشرة في ضبط جودة التفاصيل ورعاية أدق متطلبات إقامتك
            </p>
          </div>

          {/* Interactive Five Stars */}
          <div className="flex justify-center items-center space-x-4 space-x-reverse py-4">
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
            <span className="text-sm text-gold-primary font-semibold tracking-wide">
              {stars === 1 && "مخيب للآمال - سنقوم بالتواصل معك فوراً"}
              {stars === 2 && "مقبول - نتطلع للتحسين"}
              {stars === 3 && "جيد - نسعى لتقديم خدمة أفضل"}
              {stars === 4 && "رائع جداً - يسعدنا رضاك"}
              {stars === 5 && "استثنائي - تليق بمستوى فيلا مسك"}
            </span>
          </div>

          {/* Custom review form */}
          <form onSubmit={handleSubmit} className="space-y-6 text-right">
            <div>
              <label htmlFor="rating-notes" className="block text-xs text-gold-primary uppercase tracking-wider mb-3 font-semibold">
                ملاحظات أو تعليقات إضافية (اختياري)
              </label>
              <textarea
                id="rating-notes"
                rows={4}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="يسعدنا كتابة ملاحظاتك حول أي زميل في الخدمة أو تفاصيل نالت إعجابك..."
                className="w-full bg-input-theme rounded-xl p-4 border border-gold-primary/20 text-sm text-primary placeholder-gray-500 focus:outline-none transition-all duration-300 font-medium leading-relaxed"
              />
            </div>

            {/* Submit Button */}
            <motion.button
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-gold py-4 text-sm font-semibold rounded-xl flex items-center justify-center space-x-2 space-x-reverse disabled:opacity-50"
            >
              <span>{isSubmitting ? "جاري إرسال التقييم..." : "إرسال التقييم"}</span>
            </motion.button>
          </form>
        </motion.div>
      </main>

      <div className="py-6" />
    </div>
  );
}
