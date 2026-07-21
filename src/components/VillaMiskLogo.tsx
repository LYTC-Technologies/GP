import React from "react";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export default function VillaMiskLogo({ className = "", size = "md" }: LogoProps) {
  const sizeClasses = {
    sm: "h-12 w-12",
    md: "h-20 w-20",
    lg: "h-32 w-32",
    xl: "h-48 w-48"
  };

  const textSizes = {
    sm: "text-base tracking-[0.15em]",
    md: "text-xl tracking-[0.2em] font-light",
    lg: "text-2xl tracking-[0.25em] font-light",
    xl: "text-3xl tracking-[0.3em] font-light"
  };

  return (
    <div className={`flex flex-col items-center justify-center text-center ${className}`}>
      {/* Golden Crest */}
      <svg
        className={`${sizeClasses[size]} text-gold-primary filter drop-shadow-[0_0_15px_rgba(223,186,115,0.2)] transition-all duration-1000`}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer Fine Circle */}
        <circle cx="100" cy="100" r="85" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3 3" opacity="0.6" />
        
        {/* Second Circle */}
        <circle cx="100" cy="100" r="75" stroke="currentColor" strokeWidth="1.2" opacity="0.8" />
        
        {/* Gold Diamond Inner Frame */}
        <rect x="52" y="52" width="96" height="96" transform="rotate(45 100 100)" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
        
        {/* Abstract Arabic 'M' and English 'V' Monogram lines */}
        <path
          d="M60,100 L100,160 L140,100"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M75,80 L100,125 L125,80"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M100,45 L100,110"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        
        {/* Architectural dome arches */}
        <path
          d="M70,100 C70,75 100,60 100,60 C100,60 130,75 130,100"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.8"
        />
        
        {/* Dots representing elite service */}
        <circle cx="100" cy="60" r="2.5" fill="currentColor" />
        <circle cx="70" cy="100" r="2" fill="currentColor" />
        <circle cx="130" cy="100" r="2" fill="currentColor" />
        <circle cx="100" cy="145" r="2" fill="currentColor" />
      </svg>
      
      {/* Brand Name */}
      <h1 className={`mt-5 font-sans uppercase text-gold-primary ${textSizes[size]}`}>
        VILLA MISK
      </h1>
      <p className="mt-1.5 text-[10px] tracking-[0.4em] text-gray-500 font-sans uppercase">
        HOTEL & RESORT
      </p>
    </div>
  );
}
