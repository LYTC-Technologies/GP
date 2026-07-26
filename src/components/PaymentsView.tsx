import React from "react";
import { motion } from "motion/react";
import { Order } from "../types";

interface StayDetails {
  roomCharge: number;
  totalCharge: number;
  checkInTime: string;
  expectedCheckOutDate: string;
  checkOutTime: string | null;
  status: string;
  notes: string | null;
}

interface PaymentsViewProps {
  stayDetails: StayDetails | null;
  isLoading: boolean;
  orders: Order[];
  onBack: () => void;
  onRemoveFromInvoice?: (orderId: string) => void;
  onFinalCheckout?: () => void;
  onMarkDelivered?: (orderId: string) => void;
}

export default function PaymentsView({ stayDetails, isLoading, orders, onBack, onRemoveFromInvoice, onFinalCheckout, onMarkDelivered }: PaymentsViewProps) {
  const formatPrice = (price: number | string) => {
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    if (isNaN(numPrice)) return "0.0";
    return numPrice.toFixed(1);
  };
  return (
    <div className="min-h-screen bg-luxury-bg flex flex-col justify-between overflow-x-hidden relative">
      {/* Top Header Bar */}
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
          <h2 className="text-base font-semibold text-primary">المدفوعات والفواتير</h2>
          <p className="text-[10px] text-gold-primary tracking-widest font-semibold">PAYMENTS & BILLING</p>
        </div>

        {/* Spacer for layout balance */}
        <div className="w-16" />
      </header>

      {/* Payments Content */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-6 py-10 flex flex-col justify-center">
        {isLoading ? (
          <div className="h-96 rounded-2xl border border-theme-subtle bg-overlay-skeleton animate-pulse" />
        ) : !stayDetails ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-sm">لا توجد بيانات مدفوعات متاحة حالياً</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, cubicBezier: [0.16, 1, 0.3, 1] }}
            className="glass-panel p-8 rounded-2xl border border-gold-primary/15 shadow-2xl space-y-8"
          >
            {/* Stay Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-primary border-b border-theme-medium pb-3">
                تفاصيل الإقامة
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500 block mb-1 font-medium">تاريخ الوصول:</span>
                  <span className="text-primary font-medium">{stayDetails.checkInTime}</span>
                </div>
                <div>
                  <span className="text-gray-500 block mb-1 font-medium">تاريخ المغادرة المتوقع:</span>
                  <span className="text-primary font-medium">{stayDetails.expectedCheckOutDate}</span>
                </div>
                {stayDetails.checkOutTime && (
                  <div>
                    <span className="text-gray-500 block mb-1 font-medium">تاريخ المغادرة الفعلي:</span>
                    <span className="text-primary font-medium">{stayDetails.checkOutTime}</span>
                  </div>
                )}
                <div>
                  <span className="text-gray-500 block mb-1 font-medium">حالة الإقامة:</span>
                  <span className="text-gold-primary font-semibold">{stayDetails.status}</span>
                </div>
              </div>
            </div>

            {/* Payment Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-primary border-b border-theme-medium pb-3">
                تفاصيل الفاتورة
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-theme-subtle">
                  <span className="text-gray-500 font-medium">مصاريف الغرفة:</span>
                  <span className="text-primary text-lg font-semibold">{formatPrice(stayDetails.roomCharge)} ر.س</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-theme-subtle">
                  <span className="text-gray-500 font-medium">الخدمات الإضافية:</span>
                  <span className="text-primary text-lg font-semibold">{formatPrice(stayDetails.totalCharge - stayDetails.roomCharge)} ر.س</span>
                </div>
                <div className="flex justify-between items-center py-4 bg-gold-primary/10 rounded-xl px-4">
                  <span className="text-gold-primary font-semibold">إجمالي الفاتورة:</span>
                  <span className="text-gold-primary text-2xl font-semibold">{formatPrice(stayDetails.totalCharge)} ر.س</span>
                </div>
              </div>
            </div>

            {/* Checkout Button */}
            {onFinalCheckout && (
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={onFinalCheckout}
                className="w-full btn-gold py-4 rounded-xl text-center text-sm tracking-wider font-semibold flex items-center justify-center space-x-2 space-x-reverse"
              >
                <span>خروج</span>
                <span className="text-gold-primary/70">|</span>
                <span>{formatPrice(stayDetails.totalCharge)} ر.س</span>
              </motion.button>
            )}

            {/* Orders Invoice */}
            {orders.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-primary border-b border-theme-medium pb-3">
                  فاتورة الطلبات
                </h3>
                <div className="space-y-3">
                  {orders.map((order) => (
                    <div key={order.id} className="bg-overlay-card rounded-xl p-4 border border-theme-subtle">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <span className="text-xs text-gray-500 block font-medium">رقم الطلب</span>
                          <span className="text-primary font-semibold">#{order.id}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-right">
                            <span className="text-xs text-gray-500 block font-medium">الحالة</span>
                            <span className="text-gold-primary text-sm font-semibold">{order.status}</span>
                          </div>
                          {order.status !== "تم التوصيل" && onMarkDelivered && (
                            <button
                              onClick={() => onMarkDelivered(order.id)}
                              className="text-[9px] bg-green-500/10 text-green-400 border border-green-500/20 px-2 py-1 rounded font-medium hover:bg-green-500/20 transition-colors"
                            >
                              تم التوصيل
                            </button>
                          )}
                          {onRemoveFromInvoice && (
                            <button
                              onClick={() => onRemoveFromInvoice(order.id)}
                              className="text-[9px] bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-1 rounded font-medium hover:bg-red-500/20 transition-colors"
                            >
                              إزالة
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="space-y-2 mb-3">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between items-center text-sm">
                            <span className="text-gray-500 font-medium">{item.name} x{item.quantity}</span>
                            <span className="text-primary font-semibold">{formatPrice(item.price * item.quantity)} ر.س</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between items-center pt-3 border-t border-theme-subtle">
                        <span className="text-xs text-gray-500 font-medium">الإجمالي</span>
                        <span className="text-gold-primary font-semibold">{formatPrice(order.total)} ر.س</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-2 font-medium">
                        {order.createdAt}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Notes */}
            {stayDetails.notes && (
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-primary border-b border-theme-medium pb-3">
                  ملاحظات
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed font-medium">
                  {stayDetails.notes}
                </p>
              </div>
            )}
          </motion.div>
        )}
      </main>

      {/* Simple footer spacer */}
      <div className="py-4" />
    </div>
  );
}
