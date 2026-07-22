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
}

export default function PaymentsView({ stayDetails, isLoading, orders, onBack }: PaymentsViewProps) {
  const formatPrice = (price: number | string) => {
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    if (isNaN(numPrice)) return "0.0";
    return numPrice.toFixed(1);
  };
  return (
    <div className="min-h-screen bg-luxury-bg flex flex-col justify-between overflow-x-hidden relative">
      {/* Top Header Bar */}
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
          <h2 className="text-base font-light text-white">المدفوعات والفواتير</h2>
          <p className="text-[9px] text-gold-primary tracking-widest font-sans">PAYMENTS & BILLING</p>
        </div>

        {/* Spacer */}
        <div className="w-10" />
      </header>

      {/* Payments Content */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-6 py-10 flex flex-col justify-center">
        {isLoading ? (
          <div className="h-96 rounded-2xl border border-white/5 bg-luxury-black/40 animate-pulse" />
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
              <h3 className="text-lg font-light text-white border-b border-white/10 pb-3">
                تفاصيل الإقامة
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400 block mb-1">تاريخ الوصول:</span>
                  <span className="text-white">{stayDetails.checkInTime}</span>
                </div>
                <div>
                  <span className="text-gray-400 block mb-1">تاريخ المغادرة المتوقع:</span>
                  <span className="text-white">{stayDetails.expectedCheckOutDate}</span>
                </div>
                {stayDetails.checkOutTime && (
                  <div>
                    <span className="text-gray-400 block mb-1">تاريخ المغادرة الفعلي:</span>
                    <span className="text-white">{stayDetails.checkOutTime}</span>
                  </div>
                )}
                <div>
                  <span className="text-gray-400 block mb-1">حالة الإقامة:</span>
                  <span className="text-gold-primary">{stayDetails.status}</span>
                </div>
              </div>
            </div>

            {/* Payment Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-light text-white border-b border-white/10 pb-3">
                تفاصيل الفاتورة
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-white/5">
                  <span className="text-gray-400">مصاريف الغرفة:</span>
                  <span className="text-white text-lg font-light">{formatPrice(stayDetails.roomCharge)} ر.س</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-white/5">
                  <span className="text-gray-400">الخدمات الإضافية:</span>
                  <span className="text-white text-lg font-light">{formatPrice(stayDetails.totalCharge - stayDetails.roomCharge)} ر.س</span>
                </div>
                <div className="flex justify-between items-center py-4 bg-gold-primary/10 rounded-xl px-4">
                  <span className="text-gold-primary font-medium">إجمالي الفاتورة:</span>
                  <span className="text-gold-primary text-2xl font-light">{formatPrice(stayDetails.totalCharge)} ر.س</span>
                </div>
              </div>
            </div>

            {/* Orders Invoice */}
            {orders.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-light text-white border-b border-white/10 pb-3">
                  فاتورة الطلبات
                </h3>
                <div className="space-y-3">
                  {orders.map((order) => (
                    <div key={order.id} className="bg-white/[0.02] rounded-xl p-4 border border-white/5">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <span className="text-xs text-gray-500 block">رقم الطلب</span>
                          <span className="text-white font-medium">#{order.id}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs text-gray-500 block">الحالة</span>
                          <span className="text-gold-primary text-sm">{order.status}</span>
                        </div>
                      </div>
                      <div className="space-y-2 mb-3">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between items-center text-sm">
                            <span className="text-gray-300">{item.name} x{item.quantity}</span>
                            <span className="text-white">{formatPrice(item.price * item.quantity)} ر.س</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between items-center pt-3 border-t border-white/5">
                        <span className="text-xs text-gray-500">الإجمالي</span>
                        <span className="text-gold-primary font-medium">{formatPrice(order.total)} ر.س</span>
                      </div>
                      <div className="text-xs text-gray-600 mt-2">
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
                <h3 className="text-lg font-light text-white border-b border-white/10 pb-3">
                  ملاحظات
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
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
