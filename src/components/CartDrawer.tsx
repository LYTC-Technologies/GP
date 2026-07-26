import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { CartItem, Order, SpecialRequest } from "../types";

interface SpecialOrder {
  id: number;
  specialOffer: { id: number; title: string; description: string };
  agreedPrice: number;
  createdAt: string;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
  isSubmitting?: boolean;
  orders?: Order[];
  specialRequests?: SpecialRequest[];
  specialOrders?: SpecialOrder[];
  onCancelOrder?: (orderId: string) => Promise<boolean>;
  onDeleteOrder?: (orderId: string) => Promise<boolean>;
  onAcknowledgeOrder?: (orderId: string) => void;
  isCancellingId?: string | null;
  isLoadingOrders?: boolean;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  isSubmitting = false,
  orders = [],
  specialRequests = [],
  specialOrders = [],
  onCancelOrder,
  onDeleteOrder,
  onAcknowledgeOrder,
  isCancellingId = null,
  isLoadingOrders = false
}: CartDrawerProps) {
  const formatPrice = (price: number | string) => {
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    if (isNaN(numPrice)) return "0.0";
    return numPrice.toFixed(1);
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // Combine normal orders, special requests, and API special orders chronologically
  const combinedPreviousItems = [
    ...orders.map((o) => ({ ...o, type: "order" as const })),
    ...specialRequests.map((r) => ({ ...r, type: "special_request" as const })),
    ...specialOrders.map((so) => ({
      id: so.id.toString(),
      roomNumber: "",
      category: so.specialOffer.title,
      notes: so.specialOffer.description,
      createdAt: so.createdAt,
      type: "special_request" as const,
    })),
  ].sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  const hasAnyItems = cart.length > 0 || combinedPreviousItems.length > 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Blur Overlay Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-drawer-theme backdrop-blur-md"
          />

          {/* Left-aligned Cart Drawer */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 180 }}
            className="fixed top-0 bottom-0 left-0 z-50 w-full max-w-md bg-luxury-black border-r border-gold-primary/15 shadow-[25px_0_50px_rgba(0,0,0,0.3)] flex flex-col justify-between"
          >
            {/* Header */}
            <div className="p-6 border-b border-theme-subtle flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-primary">طلباتي</h3>
                <p className="text-xs text-gray-500 tracking-wider font-medium">سلة المشتريات ومتابعة الطلبات السابقة</p>
              </div>
              <button
                onClick={onClose}
                className="text-sm px-3 py-1.5 hover:bg-overlay-hover text-gray-500 hover:text-primary rounded-lg border border-theme-subtle transition-colors font-medium"
              >
                إغلاق ×
              </button>
            </div>

            {/* Items Content */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
              {!hasAnyItems ? (
                /* Empty state */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center py-20 space-y-4"
                >
                  <p className="text-sm font-medium text-gray-500">سلتك خالية تماماً</p>
                  <p className="text-xs text-gray-500 max-w-[200px] leading-relaxed font-medium">
                    تفضل بزيارة قائمة الخدمات واطلب ما يروق لك لتجده هنا فوراً
                  </p>
                </motion.div>
              ) : (
                <div className="space-y-6">
                  {/* SECTION 1: ACTIVE CART ITEMS */}
                  {cart.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-xs uppercase text-gold-primary tracking-widest font-semibold border-b border-theme-subtle pb-2">
                        السلة الحالية
                      </h4>
                      <div className="space-y-3">
                        {cart.map((item) => (
                          <motion.div
                            key={item.product.id}
                            layout
                            className="glass-panel p-4 rounded-xl border border-theme-subtle flex items-center justify-between space-x-4 space-x-reverse"
                          >
                            {/* Product Image */}
                            {item.product.image ? (
                              <img
                                src={item.product.image}
                                alt={item.product.name}
                                referrerPolicy="no-referrer"
                                className="w-14 h-14 rounded-lg object-cover border border-theme-subtle filter brightness-90 shrink-0"
                              />
                            ) : (
                              <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-gold-primary/10 via-overlay-card to-overlay-card border border-theme-subtle shrink-0" />
                            )}

                            {/* Product details */}
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm text-primary truncate font-semibold mb-1">
                                {item.product.name}
                              </h4>
                              <p className="text-xs text-gold-primary/80 font-sans tracking-wide font-semibold">
                                {formatPrice(item.product.price)} ر.س
                              </p>

                              {/* Quantity actions */}
                              <div className="flex items-center space-x-3 space-x-reverse mt-2">
                                <button
                                  onClick={() => onUpdateQuantity(item.product.id, -1)}
                                  className="px-2 py-0.5 rounded bg-overlay-card hover:bg-overlay-hover text-gray-500 hover:text-primary transition-colors text-sm font-semibold"
                                >
                                  -
                                </button>
                                <span className="text-sm font-semibold text-primary w-4 text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => onUpdateQuantity(item.product.id, 1)}
                                  className="px-2 py-0.5 rounded bg-overlay-card hover:bg-overlay-hover text-gray-500 hover:text-primary transition-colors text-sm font-semibold"
                                >
                                  +
                                </button>
                              </div>
                            </div>

                            {/* Remove item button */}
                            <button
                              onClick={() => onRemoveItem(item.product.id)}
                              className="text-xs text-gray-500 hover:text-red-400 hover:bg-red-500/5 px-2 py-1.5 rounded-lg border border-transparent hover:border-red-500/10 transition-all shrink-0 font-medium"
                            >
                              حذف
                            </button>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* SECTION 2: SENT ORDERS / REQUESTS HISTORY */}
                  {combinedPreviousItems.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-xs uppercase text-gold-primary tracking-widest font-semibold border-b border-theme-subtle pb-2">
                        الطلبات السابقة والجافة
                      </h4>
                      <div className="space-y-4">
                        {combinedPreviousItems.map((item) => {
                          if (item.type === "order") {
                            const order = item;
                            return (
                              <div
                                key={order.id}
                                className="glass-panel p-4 rounded-xl border border-theme-subtle space-y-3 relative overflow-hidden text-xs"
                              >
                                <div className="flex justify-between items-start">
                                  <div className="space-y-0.5">
                                    <span className="text-xs font-sans text-gold-primary font-semibold">
                                      {order.id}
                                    </span>
                                    <span className="text-[11px] text-gray-500 block font-medium">
                                      {order.createdAt}
                                    </span>
                                  </div>

                                  <span
                                    className={`text-[11px] px-2 py-0.5 rounded font-semibold border ${
                                      order.status === "قيد الانتظار"
                                        ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                                        : order.status === "جاري التحضير"
                                        ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                                        : order.status === "جاري التوصيل"
                                        ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
                                        : order.status === "تم التوصيل"
                                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                        : "bg-red-500/10 text-red-400 border-red-500/20"
                                    }`}
                                  >
                                    {order.status}
                                  </span>
                                </div>

                                <div className="space-y-1 border-t border-theme-subtle pt-2 text-xs text-gray-500">
                                  {order.items.map((it, idx) => (
                                    <div key={idx} className="flex justify-between">
                                      <span className="font-medium">
                                        {it.name} <span className="font-sans text-[11px] text-gray-500">x{it.quantity}</span>
                                      </span>
                                      <span className="font-sans font-semibold">{formatPrice(it.price * it.quantity)} ر.س</span>
                                    </div>
                                  ))}
                                </div>

                                <div className="flex justify-between items-center border-t border-theme-subtle pt-2">
                                  <div>
                                    <span className="text-[10px] text-gold-primary font-semibold font-sans">{formatPrice(order.total)} ر.س</span>
                                  </div>

                                  {order.status === "تم التوصيل" && (
                                    <button
                                      onClick={() => onAcknowledgeOrder?.(order.id)}
                                      className="text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-1 rounded font-medium hover:bg-emerald-500/20 transition-colors"
                                    >
                                      OK
                                    </button>
                                  )}

                                  {order.status === "قيد الانتظار" && onCancelOrder && (
                                    <button
                                      onClick={() => onCancelOrder(order.id)}
                                      disabled={isCancellingId === order.id}
                                      className="text-[9px] text-red-400 hover:text-red-300 font-light px-2.5 py-1 rounded bg-red-500/5 border border-red-500/10 hover:border-red-500/20 transition-all"
                                    >
                                      {isCancellingId === order.id ? "جاري الإلغاء..." : "إلغاء الطلب"}
                                    </button>
                                  )}

                                  {order.status === "ملغي" && onDeleteOrder && (
                                    <button
                                      onClick={() => onDeleteOrder(order.id)}
                                      className="text-[9px] text-gray-400 hover:text-red-400 font-light px-2.5 py-1 rounded bg-overlay-card border border-theme-subtle hover:border-red-500/20 transition-all"
                                    >
                                      حذف الطلب ×
                                    </button>
                                  )}
                                </div>
                              </div>
                            );
                          } else {
                            const req = item;
                            return (
                              <div
                                key={req.id}
                                className="glass-panel p-4 rounded-xl border border-gold-primary/10 space-y-3 relative overflow-hidden text-xs"
                              >
                                <div className="flex justify-between items-start">
                                  <div className="space-y-0.5">
                                    <span className="text-[10px] font-sans text-gold-primary font-medium">
                                      طلب خدمة خاص
                                    </span>
                                    <span className="text-[9px] text-gray-500 block">
                                      {req.createdAt}
                                    </span>
                                  </div>

                                  <span className="text-[9px] px-2 py-0.5 rounded font-medium border bg-gold-primary/10 text-gold-primary border-gold-primary/20">
                                    قيد المتابعة
                                  </span>
                                </div>

                                <div className="space-y-1 border-t border-theme-subtle pt-2">
                                  <span className="font-medium text-primary block text-[11px]">{req.category}</span>
                                  <p className="text-[10px] text-gray-400 leading-relaxed font-light">{req.notes || "لا توجد ملاحظات إضافية"}</p>
                                </div>
                              </div>
                            );
                          }
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer Summary / Checkout */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-theme-subtle bg-luxury-black space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>قيمة المشتريات</span>
                    <span className="font-sans">{totalAmount} ر.س</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>رسوم خدمة الغرف الراقية</span>
                    <span className="text-gold-primary text-[10px]">مشمولة مجاناً</span>
                  </div>
                  <div className="relative my-2 h-[1px] bg-border-subtle" />
                  <div className="flex justify-between text-sm">
                    <span className="text-primary font-light">الإجمالي النهائي</span>
                    <span className="text-gold-primary font-sans text-base font-semibold">{totalAmount} ر.س</span>
                  </div>
                </div>

                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={onCheckout}
                  disabled={isSubmitting}
                  className="w-full btn-gold py-3.5 rounded-xl text-center text-xs tracking-wider font-medium flex items-center justify-center space-x-2 space-x-reverse disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>جاري إرسال الطلب...</span>
                  ) : (
                    <span>تأكيد الطلب وإرساله للجناح</span>
                  )}
                </motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
