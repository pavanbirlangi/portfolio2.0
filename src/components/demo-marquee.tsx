import React, { useRef, useEffect } from "react";
import gsap from "gsap";

export function Marquee({
  children,
  baseSpeed = 800, // Speed in pixels per second
  gap = "2rem",
}: {
  children: React.ReactNode;
  baseSpeed?: number;
  gap?: string | number;
}) {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee || !marquee.children.length) return;
  
    const contentBlock = marquee.children[0] as HTMLElement;
    const contentWidth = contentBlock.offsetWidth;
    const gapInPixels = parseFloat(getComputedStyle(marquee).gap);
    const distanceToTravel = contentWidth + gapInPixels;
    const duration = distanceToTravel / baseSpeed;
  
    // IMPORTANT: Reset the position before creating the new animation
    gsap.set(marquee, { x: 0 });
  
    const anim = gsap.to(marquee, {
      x: `-${distanceToTravel}px`,
      duration: duration,
      ease: "none",
      repeat: -1,
    });
  
    return () => {
      anim.kill();
    };
  
  }, [baseSpeed, children, gap]); // Rerun effect if props change

  return (
    <div className="overflow-hidden">
      <div
        ref={marqueeRef}
        className="flex" // Use flex for robust alignment
        style={{ gap: gap }} // Apply the gap between the two content blocks
      >
        {/* Render children twice to create the seamless illusion */}
        <div className="flex-none flex items-center" style={{ gap: gap }}>
          {children}
        </div>
        <div className="flex-none flex items-center" aria-hidden="true" style={{ gap: gap }}>
          {children}
        </div>
      </div>
    </div>
  );
}
