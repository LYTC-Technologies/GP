import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface MenuItem {
  id: number;
  name: string;
  price: number;
  category: string;
}

interface CreateOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  roomNumber: string;
  onAddToCart: (item: { id: string; name: string; price: number; category: string; description: string; image: string }) => void;
  isLoading: boolean;
}

export default function CreateOrderModal({
  isOpen,
  onClose,
  roomNumber,
  onAddToCart,
  isLoading
}: CreateOrderModalProps) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<"FOOD" | "DRINK" | "SERVICE">("FOOD");
  const [orderItems, setOrderItems] = useState<{ menuItemId: number; quantity: number; notes?: string }[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingMenu, setIsLoadingMenu] = useState(false);

  // Fetch menu items when modal opens or category changes
  useEffect(() => {
    if (!isOpen) return;

    const fetchMenuItems = async () => {
      setIsLoadingMenu(true);
      try {
        const response = await fetch(`https://lytc-hotel-backend.onrender.com/api/guest/menu?page=0&size=100&category=${selectedCategory}`);
        const data = await response.json();
        setMenuItems(data.content || []);
      } catch (error) {
        console.error("Failed to fetch menu items:", error);
      } finally {
        setIsLoadingMenu(false);
      }
    };

    fetchMenuItems();
  }, [isOpen, selectedCategory]);

  const addItemToOrder = (menuItem: MenuItem) => {
    const existingItem = orderItems.find(item => item.menuItemId === menuItem.id);
    if (existingItem) {
      setOrderItems(orderItems.map(item =>
        item.menuItemId === menuItem.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setOrderItems([...orderItems, { menuItemId: menuItem.id, quantity: 1 }]);
    }
  };

  const updateItemQuantity = (menuItemId: number, quantity: number) => {
    if (quantity <= 0) {
      setOrderItems(orderItems.filter(item => item.menuItemId !== menuItemId));
    } else {
      setOrderItems(orderItems.map(item =>
        item.menuItemId === menuItemId
          ? { ...item, quantity }
          : item
      ));
    }
  };

  const updateItemNotes = (menuItemId: number, notes: string) => {
    setOrderItems(orderItems.map(item =>
      item.menuItemId === menuItemId
        ? { ...item, notes }
        : item
    ));
  };

  const handleSubmit = async () => {
    if (orderItems.length === 0) return;

    setIsSubmitting(true);
    try {
      // Add all items to cart
      orderItems.forEach((orderItem) => {
        const menuItem = menuItems.find(m => m.id === orderItem.menuItemId);
        if (menuItem) {
          // Convert category from API format to app format
          const appCategory = selectedCategory === "FOOD" ? "restaurant" :
                             selectedCategory === "DRINK" ? "drinks" : "room_service";

          for (let i = 0; i < orderItem.quantity; i++) {
            onAddToCart({
              id: menuItem.id.toString(),
              name: menuItem.name,
              price: menuItem.price,
              category: appCategory,
              description: orderItem.notes || "",
              image: ""
            });
          }
        }
      });

      setOrderItems([]);
      onClose();
    } catch (error) {
      console.error("Failed to add items to cart:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatPrice = (price: number | string) => {
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    if (isNaN(numPrice)) return "0.0";
    return numPrice.toFixed(1);
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case "FOOD": return "المأكولات";
      case "DRINK": return "المشروبات";
      case "SERVICE": return "الخدمات";
      default: return category;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="bg-luxury-black border border-gold-primary/20 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <h2 className="text-xl font-light text-white">إنشاء طلب جديد</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Category Selector */}
            <div className="p-4 border-b border-white/10">
              <div className="flex gap-2">
                {(["FOOD", "DRINK", "SERVICE"] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-lg transition-all ${
                      selectedCategory === cat
                        ? "bg-gold-primary text-black"
                        : "bg-white/5 text-gray-400 hover:bg-white/10"
                    }`}
                  >
                    {getCategoryName(cat)}
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[50vh]">
              {isLoadingMenu ? (
                <div className="text-center py-8 text-gray-400">جاري التحميل...</div>
              ) : menuItems.length === 0 ? (
                <div className="text-center py-8 text-gray-400">لا توجد عناصر متاحة</div>
              ) : (
                <div className="space-y-3">
                  {menuItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 bg-white/5 rounded-xl border border-white/10 hover:border-gold-primary/30 transition-all"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <h3 className="text-white font-light">{item.name}</h3>
                          <p className="text-gold-primary text-sm">{formatPrice(item.price)} ر.س</p>
                        </div>
                        <button
                          onClick={() => addItemToOrder(item)}
                          className="px-3 py-1 bg-gold-primary/20 text-gold-primary rounded-lg hover:bg-gold-primary/30 transition-all text-sm"
                        >
                          + إضافة
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Order Items Summary */}
            {orderItems.length > 0 && (
              <div className="p-4 border-t border-white/10 bg-white/5">
                <h3 className="text-white font-light mb-3">العناصر المطلوبة</h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {orderItems.map((orderItem) => {
                    const menuItem = menuItems.find(m => m.id === orderItem.menuItemId);
                    if (!menuItem) return null;
                    return (
                      <div key={orderItem.menuItemId} className="flex items-center gap-2 p-2 bg-white/5 rounded-lg">
                        <div className="flex-1">
                          <p className="text-white text-sm">{menuItem.name}</p>
                          <input
                            type="text"
                            placeholder="ملاحظات..."
                            value={orderItem.notes || ""}
                            onChange={(e) => updateItemNotes(orderItem.menuItemId, e.target.value)}
                            className="w-full mt-1 bg-transparent border border-white/10 rounded px-2 py-1 text-xs text-gray-400 focus:outline-none focus:border-gold-primary/30"
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateItemQuantity(orderItem.menuItemId, orderItem.quantity - 1)}
                            className="w-6 h-6 bg-white/10 rounded flex items-center justify-center text-white hover:bg-white/20"
                          >
                            -
                          </button>
                          <span className="text-white w-6 text-center">{orderItem.quantity}</span>
                          <button
                            onClick={() => updateItemQuantity(orderItem.menuItemId, orderItem.quantity + 1)}
                            className="w-6 h-6 bg-white/10 rounded flex items-center justify-center text-white hover:bg-white/20"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="p-6 border-t border-white/10 flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-white/5 text-gray-400 rounded-lg hover:bg-white/10 transition-all"
              >
                إلغاء
              </button>
              <button
                onClick={handleSubmit}
                disabled={orderItems.length === 0 || isSubmitting || isLoading}
                className="px-6 py-2 bg-gold-primary text-black rounded-lg hover:bg-gold-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "جاري الإرسال..." : "إرسال الطلب"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
