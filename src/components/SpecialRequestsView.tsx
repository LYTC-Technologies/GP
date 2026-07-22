import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SpecialRequestCategory, SpecialRequest } from "../types";
import ThemeToggle from "./ThemeToggle";

interface SpecialOffer {
  id: number;
  title: string;
  description: string;
  price: number;
}

interface SpecialRequestsViewProps {
  categories: SpecialRequestCategory[];
  specialOffers: SpecialOffer[];
  isLoading: boolean;
  onSubmitRequest: (categoryId: string, notes: string) => Promise<boolean>;
  onBack: () => void;
  existingRequests: SpecialRequest[];
  onAddToCart?: (product: { id: string; name: string; price: number; category: string; description: string; image: string }) => void;
}

export default function SpecialRequestsView({
  categories,
  specialOffers,
  isLoading,
  onSubmitRequest,
  onBack,
  existingRequests,
  onAddToCart
}: SpecialRequestsViewProps) {
  const formatPrice = (price: number) => price.toFixed(1);

  const [selectedCategory, setSelectedCategory] = useState<SpecialRequestCategory | null>(null);
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory || isSubmitting) return;

    setIsSubmitting(true);
    const success = await onSubmitRequest(selectedCategory.id, notes);
    setIsSubmitting(false);

    if (success) {
      setShowSuccess(true);
      setNotes("");
      setSelectedCategory(null);
      // Let the success screen linger for 2.5 seconds, then return to main view or reset state
      setTimeout(() => {
        setShowSuccess(false);
      }, 2500);
    }
  };

  return (
    <div className="min-h-screen bg-luxury-bg flex flex-col justify-between overflow-x-hidden relative">
      {/* Success Fullscreen Overlay */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-luxury-black flex flex-col items-center justify-center text-center p-6 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, filter: "blur(5px)" }}
              animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.6, type: "spring" }}
              className="space-y-6 max-w-sm flex flex-col items-center"
            >
              {/* Luxury Gold Checkmark Circle */}
              <div className="h-16 w-16 rounded-full border border-gold-primary/30 flex items-center justify-center bg-gold-primary/10 text-gold-primary text-xl font-bold shadow-[0_0_30px_rgba(223,186,115,0.25)]">
                ✔
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-light text-white tracking-wide">
                  تم إرسال طلبك بنجاح
                </h3>
                <p className="text-xs text-gray-400 font-light leading-relaxed">
                  تم إشعار مدير الخدمة والجناح الخاص بك. جاري تلبية رغبتك الآن بأعلى معايير الرعاية.
                </p>
              </div>

              {/* Shimmer golden divider */}
              <div className="h-[1px] w-24 bg-gold-primary/30 relative overflow-hidden">
                <div className="absolute top-0 bottom-0 left-0 bg-gold-primary animate-[shimmer_1.5s_infinite]" style={{ width: '50%' }} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Header */}
      <header className="relative z-20 px-6 py-6 border-b border-white/5 bg-luxury-black/40 backdrop-blur-md flex items-center justify-between">
        {/* Back Button */}
        <button
          onClick={selectedCategory ? () => setSelectedCategory(null) : onBack}
          className="text-xs text-gray-400 hover:text-white transition-colors animate-fade-in"
        >
          {selectedCategory ? "التصنيفات ←" : "الرئيسية ←"}
        </button>

        {/* Header Title */}
        <div className="text-center">
          <h2 className="text-base font-light text-white">
            {selectedCategory ? "تفاصيل الطلب الخاص" : "الطلبات الخاصة والخدمات"}
          </h2>
          <p className="text-[9px] text-gold-primary tracking-widest font-sans">SPECIAL SERVICE</p>
        </div>

        {/* Theme Toggle */}
        <ThemeToggle />
      </header>

      {/* Main content body */}
      <main className="flex-1 w-full max-w-3xl mx-auto px-6 py-10 flex flex-col justify-center">
        {!selectedCategory ? (
          /* View A: Select special request category */
          <div className="space-y-8">
            <div className="text-center max-w-md mx-auto space-y-2">
              <h3 className="text-lg font-light text-white">كيف يمكننا خدمتك اليوم؟</h3>
              <p className="text-xs text-gray-400 font-light">
                اختر نوع الخدمة التي ترغب بها، وسيتم تلبية طلبك بواسطة المساعد الشخصي ميخائيل
              </p>
            </div>

            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-24 glass-panel rounded-2xl animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {specialOffers.map((offer, idx) => (
                  <motion.div
                    key={offer.id}
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.08, duration: 0.8, cubicBezier: [0.16, 1, 0.3, 1] }}
                    whileHover={{ y: -6 }}
                    className="glass-panel p-4 rounded-[24px] border border-gold-primary/10 hover:border-gold-primary/25 transition-all duration-500 shadow-lg flex flex-col justify-between group overflow-hidden"
                  >
                    {/* Image container with gradient */}
                    <div className="relative w-full h-48 rounded-2xl overflow-hidden mb-4 bg-black/40">
                      <div className="w-full h-full bg-gradient-to-br from-gold-primary/10 via-luxury-black/60 to-luxury-black/80" />

                      {/* Golden subtle aura decoration */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                    </div>

                    {/* Title and descriptions */}
                    <div className="flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <h3 className="text-sm text-white font-light leading-tight mb-2">
                          {offer.title}
                        </h3>
                        <p className="text-[10px] text-gray-500 font-light leading-relaxed line-clamp-3">
                          {offer.description}
                        </p>
                      </div>

                      {/* Pricing */}
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-xs text-gold-primary font-sans font-medium tracking-wide">
                          {formatPrice(offer.price)} ر.س
                        </span>
                        {onAddToCart && (
                          <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => onAddToCart({
                              id: offer.id.toString(),
                              name: offer.title,
                              price: offer.price,
                              category: "special_offers",
                              description: offer.description,
                              image: ""
                            })}
                            className="btn-gold-outline rounded-xl px-3.5 py-1.5 text-[10px] tracking-wide font-medium"
                          >
                            + أضف للسلة
                          </motion.button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* List of active requests */}
            {existingRequests.length > 0 && (
              <div className="mt-12 space-y-4">
                <div className="flex items-center text-gray-400 border-b border-white/5 pb-2">
                  <span className="text-[11px] uppercase tracking-wider font-light">سجل طلبات الخدمة الجارية</span>
                </div>
                <div className="space-y-3">
                  {existingRequests.map((req) => (
                    <div key={req.id} className="p-4 bg-white/[0.01] rounded-xl border border-white/5 flex justify-between items-center text-xs">
                      <div className="space-y-1">
                        <span className="font-medium text-white block">{req.category}</span>
                        <span className="text-[10px] text-gray-500 block leading-relaxed max-w-sm">{req.notes}</span>
                      </div>
                      <div className="text-right space-y-1 shrink-0">
                        <span className="text-[10px] bg-gold-primary/10 text-gold-primary px-2 py-0.5 rounded-full block border border-gold-primary/15">قيد المتابعة</span>
                        <span className="text-[9px] text-gray-600 block">{req.createdAt}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* View B: Complete details request form */
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-panel p-6 md:p-8 rounded-[24px] border border-gold-primary/15 shadow-2xl space-y-6"
          >
            {/* Header info */}
            <div className="border-b border-white/5 pb-4">
              <span className="text-[9px] text-gold-primary uppercase tracking-[0.2em] font-sans">SERVICE DETAILS</span>
              <h3 className="text-base text-white font-medium mt-1">{selectedCategory.name}</h3>
              <p className="text-[11px] text-gray-500 mt-1 font-light leading-relaxed">{selectedCategory.description}</p>
            </div>

            {/* Input form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="request-notes" className="block text-[10px] text-gold-primary uppercase tracking-wider mb-2">
                  تفاصيل الطلب أو ملاحظات خاصة
                </label>
                <textarea
                  id="request-notes"
                  rows={4}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="يرجى كتابة أية متطلبات خاصة أو توجيهات محددة للمساعد الشخصي هنا..."
                  className="w-full bg-luxury-black/60 rounded-xl p-4 border border-gold-primary/20 text-xs text-white placeholder-gray-600 focus:outline-none transition-all duration-300"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setSelectedCategory(null)}
                  className="flex-1 btn-gold-outline py-3 text-xs font-medium rounded-xl text-center"
                >
                  إلغاء والتراجع
                </button>
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-[2] btn-gold py-3 text-xs font-medium rounded-xl flex items-center justify-center space-x-2 space-x-reverse disabled:opacity-50"
                >
                  <span>{isSubmitting ? "جاري إرسال الطلب..." : "إرسال الطلب للمساعد"}</span>
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </main>

      <div className="py-6" />
    </div>
  );
}
