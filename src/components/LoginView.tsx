import React, { useState } from "react";
import { motion } from "motion/react";
import VillaMiskLogo from "./VillaMiskLogo";
import { apiService } from "../lib/api";
import { GuestSession } from "../types";

interface LoginViewProps {
  onLoginSuccess: (session: GuestSession) => void;
}

export default function LoginView({ onLoginSuccess }: LoginViewProps) {
  const [roomNumber, setRoomNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [shouldShake, setShouldShake] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    if (!roomNumber.trim()) {
      setError("يرجى كتابة رقم الغرفة أولاً");
      triggerShake();
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const session = await apiService.login(roomNumber);
      onLoginSuccess(session);
    } catch (err: any) {
      setError(err.response?.data?.error || "رقم الغرفة غير صحيح. يرجى التحقق من الرقم والمحاولة مجدداً.");
      triggerShake();
    } finally {
      setIsLoading(false);
    }
  };

  const triggerShake = () => {
    setShouldShake(true);
    setTimeout(() => setShouldShake(false), 500);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-luxury-bg p-4 overflow-hidden">
      {/* Background Decorative Radial Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(223,186,115,0.03)_0%,transparent_70%)]" />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -30, scale: 0.95 }}
        transition={{ duration: 0.8, cubicBezier: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-md"
      >
        <div 
          className={`glass-panel rounded-[24px] p-8 md:p-12 border transition-all duration-300 ${
            shouldShake ? "animate-shake border-red-500/50 shadow-[0_0_25px_rgba(239,68,68,0.15)]" : "border-gold-primary/20 shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
          }`}
        >
          {/* Villa Misk Logo */}
          <VillaMiskLogo size="md" className="mb-8" />

          {/* Titles */}
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-light text-primary tracking-wide mb-2">
              مرحباً بك
            </h2>
            <p className="text-xs tracking-wider text-gray-400">
              يرجى إدخال رقم الجناح الخاص بك لتفعيل المساعد الرقمي
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="room-number" className="block text-[10px] uppercase tracking-[0.2em] text-gold-primary mb-2 mr-1">
                رقم الغرفة
              </label>
              <input
                id="room-number"
                type="text"
                value={roomNumber}
                onChange={(e) => {
                  setRoomNumber(e.target.value);
                  setError("");
                }}
                disabled={isLoading}
                placeholder="مثال: ١٠١"
                className={`w-full bg-luxury-black/60 rounded-xl px-5 py-4 border text-center font-sans text-xl text-primary tracking-[0.1em] placeholder-gray-600 focus:outline-none transition-all duration-300 ${
                  error ? "border-red-500/40 focus:border-red-500/60" : "border-gold-primary/25 focus:border-gold-primary"
                }`}
                autoComplete="off"
              />
            </div>

            {/* Error Message */}
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-red-400 text-center mr-1"
              >
                {error}
              </motion.p>
            )}

            {/* Submit Button */}
            <motion.button
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="relative w-full btn-gold rounded-xl py-4 text-center text-sm tracking-[0.1em] font-medium overflow-hidden group disabled:opacity-50"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2 space-x-reverse">
                  {/* Fine Horizontal Animated Gold Line loader */}
                  <div className="h-0.5 w-16 bg-black/20 overflow-hidden relative">
                    <div className="absolute top-0 bottom-0 left-0 bg-black animate-[shimmer_1.5s_infinite]" style={{ width: '40%' }} />
                  </div>
                  <span className="text-xs">جاري التحقق...</span>
                </div>
              ) : (
                "دخول"
              )}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
