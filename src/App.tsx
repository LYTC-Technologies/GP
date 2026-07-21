/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider, useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "motion/react";
import { apiService } from "./lib/api";
import { Product, CartItem, Order, SpecialRequest, GuestSession } from "./types";

// Import Custom Modular Views & Drawers
import SplashView from "./components/SplashView";
import LoginView from "./components/LoginView";
import LoadingView from "./components/LoadingView";
import WelcomeView from "./components/WelcomeView";
import MainView from "./components/MainView";
import CartDrawer from "./components/CartDrawer";
import OrdersView from "./components/OrdersView";
import CategoryProductList from "./components/CategoryProductList";
import SpecialRequestsView from "./components/SpecialRequestsView";
import RatingView from "./components/RatingView";

// Initialize TanStack Query Client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      retry: 1,
    },
  },
});

type ScreenState =
  | "splash"
  | "login"
  | "loading"
  | "welcome"
  | "main"
  | "orders"
  | "restaurant"
  | "drinks"
  | "room_service"
  | "special_requests"
  | "rating";

function AppContent() {
  const queryClientRef = useQueryClient();

  // Core App Navigation State
  const [activeScreen, setActiveScreen] = useState<ScreenState>("splash");
  
  // Session State (Room number, guest name)
  const [session, setSession] = useState<GuestSession | null>(null);

  // Shopping Cart State
  const [cart, setCart] = useState<CartItem[]>(() => {
    const cached = localStorage.getItem("vms_cart");
    return cached ? JSON.parse(cached) : [];
  });

  // UI Drawer states
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrderHistoryOpen, setIsOrderHistoryOpen] = useState(false);
  const [isCancellingId, setIsCancellingId] = useState<string | null>(null);
  const [isSubmittingCart, setIsSubmittingCart] = useState(false);

  // Sync state to LocalStorage
  useEffect(() => {
    if (session) {
      localStorage.setItem("vms_session", JSON.stringify(session));
    } else {
      localStorage.removeItem("vms_session");
    }
  }, [session]);

  useEffect(() => {
    localStorage.setItem("vms_cart", JSON.stringify(cart));
  }, [cart]);

  // Scroll to top elegantly when navigating to a different screen
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeScreen]);

  // Queries (TanStack Query)
  
  // Fetch products
  const { data: products = [], isLoading: isProductsLoading } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: apiService.getProducts,
  });

  // Fetch special request categories
  const { data: requestCategories = [], isLoading: isCategoriesLoading } = useQuery({
    queryKey: ["requestCategories"],
    queryFn: apiService.getSpecialRequestCategories,
  });

  // Fetch submitted orders for this room
  const { data: orders = [], isLoading: isOrdersLoading } = useQuery<Order[]>({
    queryKey: ["orders", session?.roomNumber],
    queryFn: () => apiService.getOrders(session!.roomNumber),
    enabled: !!session?.roomNumber,
  });

  // Fetch special butler requests for this room
  const { data: specialRequests = [], isLoading: isRequestsLoading } = useQuery<SpecialRequest[]>({
    queryKey: ["specialRequests", session?.roomNumber],
    queryFn: () => apiService.getSpecialRequests(session!.roomNumber),
    enabled: !!session?.roomNumber,
  });

  // Get active count of pending orders (status starting from قيد الانتظار)
  const activeOrdersCount = orders.filter(o => o.status === "قيد الانتظار" || o.status === "جاري التحضير" || o.status === "جاري التوصيل").length;

  // Shopping Cart Interactions
  const handleAddToCart = (product: Product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.product.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.product.id === productId) {
            const nextQty = item.quantity + delta;
            return { ...item, quantity: nextQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  // Submit/Checkout Cart Order
  const handleCheckout = async () => {
    if (!session || cart.length === 0 || isSubmittingCart) return;

    setIsSubmittingCart(true);
    try {
      const itemsPayload = cart.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
      }));

      const res = await apiService.createOrder(session.roomNumber, itemsPayload);
      if (res.success) {
        setCart([]); // Clear cart
        setIsCartOpen(false); // Close cart
        
        // Invalidate and refetch orders
        await queryClientRef.invalidateQueries({ queryKey: ["orders", session.roomNumber] });
        
        // Open order history to let them track progress
        setIsOrderHistoryOpen(true);
      }
    } catch (err) {
      console.error("Failed to place order:", err);
    } finally {
      setIsSubmittingCart(false);
    }
  };

  // Cancel order handler
  const handleCancelOrder = async (orderId: string): Promise<boolean> => {
    if (!session || isCancellingId) return false;

    setIsCancellingId(orderId);
    try {
      const res = await apiService.cancelOrder(orderId);
      if (res.success) {
        await queryClientRef.invalidateQueries({ queryKey: ["orders", session.roomNumber] });
        return true;
      }
      return false;
    } catch (err) {
      console.error("Failed to cancel order:", err);
      return false;
    } finally {
      setIsCancellingId(null);
    }
  };

  // Delete/dismiss order handler
  const handleDeleteOrder = async (orderId: string): Promise<boolean> => {
    if (!session) return false;

    try {
      const res = await apiService.deleteOrder(orderId);
      if (res.success) {
        await queryClientRef.invalidateQueries({ queryKey: ["orders", session.roomNumber] });
        return true;
      }
      return false;
    } catch (err) {
      console.error("Failed to delete order:", err);
      return false;
    }
  };

  // Submit special butler request
  const handleSubmitSpecialRequest = async (categoryId: string, notes: string): Promise<boolean> => {
    if (!session) return false;

    try {
      const res = await apiService.submitSpecialRequest(session.roomNumber, categoryId, notes);
      if (res.success) {
        await queryClientRef.invalidateQueries({ queryKey: ["specialRequests", session.roomNumber] });
        return true;
      }
      return false;
    } catch (err) {
      console.error("Failed to submit special request:", err);
      return false;
    }
  };

  // Submit luxury guest rating
  const handleSubmitRating = async (stars: number, notes: string): Promise<boolean> => {
    if (!session) return false;

    try {
      const res = await apiService.submitRating(session.roomNumber, stars, notes);
      return res.success;
    } catch (err) {
      console.error("Failed to submit rating:", err);
      return false;
    }
  };

  // Auth & Screen stage controllers
  const handleSplashComplete = () => {
    // If we have an existing session cached, bypass login but show loading
    if (session) {
      setActiveScreen("loading");
    } else {
      setActiveScreen("login");
    }
  };

  const handleLoginSuccess = (guestSession: GuestSession) => {
    setSession(guestSession);
    setActiveScreen("loading");
  };

  const handleLoadingComplete = () => {
    setActiveScreen("welcome");
  };

  const handleWelcomeComplete = () => {
    setActiveScreen("main");
  };

  const handleLogout = () => {
    setSession(null);
    setCart([]);
    setActiveScreen("login");
  };

  return (
    <div className="min-h-screen bg-luxury-bg text-white relative">
      {/* App transitions and container structure */}
      <AnimatePresence mode="wait">
        {/* Splash View */}
        {activeScreen === "splash" && (
          <motion.div
            key="splash"
            className="fixed inset-0 w-full h-full z-50 flex items-center justify-center bg-luxury-black"
            initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -15, filter: "blur(4px)" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <SplashView onComplete={handleSplashComplete} />
          </motion.div>
        )}

        {/* Login View */}
        {activeScreen === "login" && (
          <motion.div
            key="login"
            className="fixed inset-0 w-full h-full z-50 flex items-center justify-center bg-luxury-bg overflow-y-auto"
            initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -15, filter: "blur(4px)" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <LoginView onLoginSuccess={handleLoginSuccess} />
          </motion.div>
        )}

        {/* Loading View */}
        {activeScreen === "loading" && (
          <motion.div
            key="loading"
            className="fixed inset-0 w-full h-full z-50 flex items-center justify-center bg-luxury-bg"
            initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -15, filter: "blur(4px)" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <LoadingView onComplete={handleLoadingComplete} />
          </motion.div>
        )}

        {/* Welcome View */}
        {activeScreen === "welcome" && (
          <motion.div
            key="welcome"
            className="fixed inset-0 w-full h-full z-50 flex items-center justify-center bg-luxury-black"
            initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -15, filter: "blur(4px)" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <WelcomeView guestName={session?.guestName} onComplete={handleWelcomeComplete} />
          </motion.div>
        )}

        {/* Main View Portal */}
        {activeScreen === "main" && (
          <motion.div
            key="main"
            initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -15, filter: "blur(4px)" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <MainView
              stayInfo={session?.stayInfo || null}
              cart={cart}
              onOpenCart={() => setIsCartOpen(true)}
              onNavigate={(screen) => setActiveScreen(screen)}
              onLogout={handleLogout}
              activeOrdersCount={activeOrdersCount}
              onOpenOrderHistory={() => setIsCartOpen(true)}
            />
          </motion.div>
        )}

        {/* Orders Screen (Category choose) */}
        {activeScreen === "orders" && (
          <motion.div
            key="orders"
            initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -15, filter: "blur(4px)" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <OrdersView
              cart={cart}
              onOpenCart={() => setIsCartOpen(true)}
              onSelectCategory={(category) => setActiveScreen(category)}
              onBack={() => setActiveScreen("main")}
            />
          </motion.div>
        )}

        {/* Food, drinks or room service catalog listings */}
        {(activeScreen === "restaurant" || activeScreen === "drinks" || activeScreen === "room_service") && (
          <motion.div
            key={activeScreen}
            initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -15, filter: "blur(4px)" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <CategoryProductList
              category={activeScreen}
              products={products}
              isLoading={isProductsLoading}
              onAddToCart={handleAddToCart}
              onBack={() => setActiveScreen("orders")}
              onOpenCart={() => setIsCartOpen(true)}
              cart={cart}
            />
          </motion.div>
        )}

        {/* Special Requests */}
        {activeScreen === "special_requests" && (
          <motion.div
            key="special_requests"
            initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -15, filter: "blur(4px)" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <SpecialRequestsView
              categories={requestCategories}
              isLoading={isCategoriesLoading}
              onSubmitRequest={handleSubmitSpecialRequest}
              onBack={() => setActiveScreen("main")}
              existingRequests={specialRequests}
            />
          </motion.div>
        )}

        {/* Rating View */}
        {activeScreen === "rating" && (
          <motion.div
            key="rating"
            initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -15, filter: "blur(4px)" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <RatingView
              onSubmitRating={handleSubmitRating}
              onBack={() => setActiveScreen("main")}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
        isSubmitting={isSubmittingCart}
        orders={orders}
        specialRequests={specialRequests}
        onCancelOrder={handleCancelOrder}
        onDeleteOrder={handleDeleteOrder}
        isCancellingId={isCancellingId}
        isLoadingOrders={isOrdersLoading}
      />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}
