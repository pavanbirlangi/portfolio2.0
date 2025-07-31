import React, { useRef, useEffect } from "react";
import gsap from "gsap";

export function Marquee({
  children,
  baseSpeed = 800, // Speed in pixels per second
  gap = "1rem",
}: {
  children: React.ReactNode;
  baseSpeed?: number;
  gap?: string | number;
}) {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee || !marquee.children.length) return;
  
    const updateAnimation = () => {
      const contentBlock = marquee.children[0] as HTMLElement;
      const contentWidth = contentBlock.offsetWidth;
      const gapInPixels = parseFloat(getComputedStyle(marquee).gap) || 16; // fallback to 16px
      const distanceToTravel = contentWidth + gapInPixels;
      
      // Adjust speed based on screen size for better experience across devices
      const screenWidth = window.innerWidth;
      let adjustedSpeed = baseSpeed;
      
      if (screenWidth < 768) {
        // Mobile: slower speed
        adjustedSpeed = baseSpeed * 0.7;
      } else if (screenWidth < 1024) {
        // Tablet: medium speed
        adjustedSpeed = baseSpeed * 0.85;
      } else {
        // Desktop: full speed
        adjustedSpeed = baseSpeed;
      }
      
      const duration = distanceToTravel / adjustedSpeed;
    
      // IMPORTANT: Reset the position before creating the new animation
      gsap.set(marquee, { x: 0 });
    
      return gsap.to(marquee, {
        x: `-${distanceToTravel}px`,
        duration: duration,
        ease: "none",
        repeat: -1,
      });
    };
    
    let anim = updateAnimation();
    
    // Handle resize events
    const handleResize = () => {
      anim.kill();
      anim = updateAnimation();
    };
    
    window.addEventListener('resize', handleResize);
  
    return () => {
      anim.kill();
      window.removeEventListener('resize', handleResize);
    };
  
  }, [baseSpeed, children, gap]); // Rerun effect if props change

  return (
    <div className="overflow-hidden py-4 md:py-8">
      <div
        ref={marqueeRef}
        className="flex gap-4 md:gap-12 lg:gap-16" // Responsive gaps using Tailwind
      >
        {/* Render children twice to create the seamless illusion */}
        <div className="flex-none flex items-center gap-4 md:gap-12 lg:gap-16">
          {children}
        </div>
        <div className="flex-none flex items-center gap-4 md:gap-12 lg:gap-16" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
