"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const myWorkRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // === Lenis integration ===
    // Get the global Lenis instance from your page.tsx setup
    const getLenisInstance = () => {
      return (window as unknown as { __lenis_instance: unknown }).__lenis_instance;
    };

    // Wait for Lenis to be available
    const setupScrollTrigger = () => {
      const lenis = getLenisInstance();
      if (!lenis) {
        console.warn(
          "[ProjectsSection] Lenis instance not found. Retrying..."
        );
        setTimeout(setupScrollTrigger, 200);
        return;
      }

      console.log("[ProjectsSection] Connected to global Lenis instance");

      // Set initial state for "MY WORK" text
      gsap.set(myWorkRef.current, { 
        y: 100, 
        opacity: 0 
      });

      // Animation context
      const ctx = gsap.context(() => {
        // Smooth rise animation for "MY WORK" text
        const myWorkTl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current!,
            start: "top 90%", // Start animation as soon as section comes into view
            end: "top 50%",
            scrub: 0.5, // Faster scrub for more immediate response
            invalidateOnRefresh: true,
          },
        });

        myWorkTl.to(myWorkRef.current, {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
        });
      }, containerRef);

      // Refresh to ensure correct sizing
      ScrollTrigger.refresh();

      return () => {
        ctx.revert();
      };
    };

    // Setup with delay to ensure Lenis is ready
    const cleanup = setTimeout(() => {
      const cleanupFn = setupScrollTrigger();
      return cleanupFn;
    }, 300);

    return () => {
      clearTimeout(cleanup);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen bg-black overflow-hidden"
    >
      {/* MY WORK text in top right */}
      <div className="absolute top-0 right-0 p-6 md:p-12">
        <div
          ref={myWorkRef}
          className="text-white uppercase font-extrabold leading-[0.85] tracking-tight text-right"
          style={{
            fontSize: "clamp(3rem, 8vw, 8rem)",
            willChange: "transform, opacity",
          }}
        >
          MY<br />WORK
        </div>
      </div>

      {/* Content area for future projects */}
      <div className="relative z-10 w-full h-full pt-32 px-6 md:px-12">
        {/* Projects content will be added here later */}
      </div>
    </section>
  );
}
