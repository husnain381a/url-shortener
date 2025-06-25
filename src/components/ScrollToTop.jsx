import React, { useState, useEffect, useCallback } from 'react';
import { Scissors } from 'lucide-react';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Throttled scroll handler to prevent excessive updates
  const handleScroll = useCallback(() => {
    const scrolled = document.documentElement.scrollTop;
    const maxHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = Math.min((scrolled / maxHeight) * 100, 100);
    
    setScrollProgress(progress);
    setIsVisible(scrolled > 300);
  }, []);

  useEffect(() => {
    let ticking = false;
    
    const scrollListener = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', scrollListener, { passive: true });
    
    return () => window.removeEventListener('scroll', scrollListener);
  }, [handleScroll]);

  const scrollToTop = () => {
    setIsScrolling(true);
    
    // Smooth scroll with custom easing
    const scrollDuration = 800;
    const scrollStep = -window.scrollY / (scrollDuration / 15);
    
    const scrollInterval = setInterval(() => {
      if (window.scrollY !== 0) {
        window.scrollBy(0, scrollStep);
      } else {
        clearInterval(scrollInterval);
        setIsScrolling(false);
      }
    }, 15);
  };

  if (!isVisible) return null;

  const circumference = 2 * Math.PI * 28;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <button
        onClick={scrollToTop}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          relative w-16 h-16 rounded-full overflow-hidden
          transform transition-all duration-500 ease-out
          ${isScrolling ? 'scale-95' : isHovered ? 'scale-110' : 'scale-100'}
          ${isScrolling ? 'animate-pulse' : ''}
          focus:outline-none focus:ring-4 focus:ring-yellow-400/30
          shadow-2xl hover:shadow-yellow-400/30
        `}
        aria-label="Scroll to top"
        disabled={isScrolling}
      >
        {/* Main gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500 rounded-full" />
        
        {/* Rotating shimmer effect */}
        <div 
          className={`
            absolute inset-0 rounded-full opacity-60
            bg-gradient-to-br from-yellow-300 via-transparent to-orange-400
            transition-transform duration-1000 ease-linear
            ${isHovered ? 'animate-spin' : ''}
          `}
          style={{ 
            animationDuration: isHovered ? '2s' : '0s',
            transform: isScrolling ? 'rotate(180deg)' : 'rotate(0deg)'
          }}
        />
        
        {/* Progress ring container */}
        <svg 
          className="absolute inset-0 w-full h-full transform -rotate-90" 
          viewBox="0 0 64 64"
        >
          {/* Background ring */}
          <circle
            cx="32"
            cy="32"
            r="28"
            fill="none"
            stroke="rgba(0, 0, 0, 0.1)"
            strokeWidth="2"
          />
          {/* Progress ring */}
          <circle
            cx="32"
            cy="32"
            r="28"
            fill="none"
            stroke="rgba(0, 0, 0, 0.3)"
            strokeWidth="2"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-300 ease-out"
          />
        </svg>

        {/* Scissors icon container */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Scissors 
            className={`
              w-6 h-6 text-black transition-all duration-300 ease-out
              ${isScrolling ? 'animate-bounce scale-110 rotate-12' : ''}
              ${isHovered ? 'rotate-6 scale-105' : 'rotate-0 scale-100'}
            `}
          />
        </div>

        {/* Hover glow effect */}
        <div 
          className={`
            absolute inset-0 rounded-full transition-all duration-300
            bg-gradient-to-br from-yellow-300 to-orange-400
            ${isHovered ? 'opacity-20 blur-md scale-110' : 'opacity-0 blur-none scale-100'}
          `}
        />

        {/* Floating particles */}
        {isHovered && (
          <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full animate-ping opacity-70"
                style={{
                  top: `${25 + Math.random() * 50}%`,
                  left: `${25 + Math.random() * 50}%`,
                  animationDelay: `${i * 0.3}s`,
                  animationDuration: `${1.2 + Math.random() * 0.8}s`
                }}
              />
            ))}
          </div>
        )}
      </button>
     
    </div>
  );
};

export default ScrollToTop;