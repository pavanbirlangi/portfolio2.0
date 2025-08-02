

// components/HeroScrollSection.tsx
"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroScrollSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const line1Ref = useRef<HTMLDivElement | null>(null);
  const line2Ref = useRef<HTMLDivElement | null>(null);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // === Lenis integration ===
    // Get the global Lenis instance from your page.tsx setup
    const getLenisInstance = () => {
      return (window as any).__lenis_instance;
    };

    // Wait for Lenis to be available
    const setupScrollTrigger = () => {
      const lenis = getLenisInstance();
      if (!lenis) {
        console.warn(
          "[HeroScrollSection] Lenis instance not found. Retrying..."
        );
        setTimeout(setupScrollTrigger, 200);
        return;
      }

      console.log("[HeroScrollSection] Connected to global Lenis instance");

      // Animation timeline: light rising reveal
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current!,
            start: "top center",
            end: "bottom center",
            scrub: 1, // smooth scrubbing
            invalidateOnRefresh: true, // Important for Lenis
          },
        });

        tl.from(line1Ref.current, {
          y: 80,
          opacity: 0,
          duration: 1.5,
          ease: "power2.out",
        }).from(
          line2Ref.current,
          {
            y: 80,
            opacity: 0,
            duration: 1.5,
            ease: "power2.out",
          },
          "<0.3"
        );
      }, containerRef);

      // Refresh to ensure correct sizing
      ScrollTrigger.refresh();

      return ctx;
    };

    // Setup with delay to ensure Lenis is ready
    const cleanup = setTimeout(() => {
      setupScrollTrigger();
    }, 300);

    return () => {
      clearTimeout(cleanup);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[calc(100vh-80px)] mt-20 overflow-hidden bg-black"
    >
      {/* Dark background base */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900 to-black" />

      {/* Optional subtle noise overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"200\" height=\"200\"><circle cx=\"100\" cy=\"100\" r=\"0.5\" fill=\"rgba(255,255,255,0.02)\"/><circle cx=\"50\" cy=\"50\" r=\"0.5\" fill=\"rgba(255,255,255,0.02)\"/><circle cx=\"150\" cy=\"150\" r=\"0.5\" fill=\"rgba(255,255,255,0.02)\"/></svg>') repeat",
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full h-full px-6">
        {/* First line top-left */}
        <div className="h-full flex flex-col justify-between">
          <div className="flex justify-start pt-12">
            <div
              ref={line1Ref}
              className="text-white uppercase font-extrabold leading-[0.85] tracking-tight"
              style={{
                fontSize: "clamp(4rem, 9vw, 9rem)",
                maxWidth: "70%",
              }}
            >
              SCROLL  <br />
                    TO SEE
            </div>
          </div>

          {/* Second line bottom right */}
          <div className="flex justify-end pb-12">
            <div
              ref={line2Ref}
              className="text-white uppercase font-extrabold leading-[0.85] tracking-tight text-right"
              style={{
                fontSize: "clamp(4rem, 9vw, 9rem)",
                maxWidth: "70%",
              }}
            >
              SECRETS I SHIP
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

