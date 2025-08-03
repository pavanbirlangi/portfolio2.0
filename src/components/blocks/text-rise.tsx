

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
  const projectsRef = useRef<HTMLDivElement | null>(null);
  const eCharRef = useRef<HTMLSpanElement | null>(null);
  const jCharRef = useRef<HTMLSpanElement | null>(null); // Ref for letter J
  const whiteWashRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null); // Main content container for unified zoom
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // === Lenis integration ===
    // Get the global Lenis instance from your page.tsx setup
    const getLenisInstance = () => {
      return (window as any).__lenis_instance;
    };

    // compute transform-origin for content container so scale is anchored on the center of 'J' in PROJECTS
    const updateTransformOrigin = () => {
      const contentContainer = contentRef.current;
      const jChar = jCharRef.current;
      if (!contentContainer || !jChar) return;

      const containerRect = contentContainer.getBoundingClientRect();
      const jRect = jChar.getBoundingClientRect();

      const originX =
        ((jRect.left - containerRect.left + jRect.width / 2) / containerRect.width) * 100;
      const originY =
        ((jRect.top - containerRect.top + jRect.height / 2) / containerRect.height) * 100;

      contentContainer.style.transformOrigin = `${originX}% ${originY}%`;
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

      // Set initial states
      gsap.set(projectsRef.current, { opacity: 1, scale: 0.1 }); // Start with small scale instead of 0
      gsap.set(whiteWashRef.current, { opacity: 0 });
      gsap.set(contentRef.current, { scale: 1 }); // Initial scale for content container

      // recalibrate transform origin after fonts load & on resize
      document.fonts?.ready.then(() => {
        setTimeout(updateTransformOrigin, 100); // Delay to ensure elements are rendered
      });
      window.addEventListener("resize", updateTransformOrigin);
      
      // Initial call with delay to ensure DOM is ready
      setTimeout(updateTransformOrigin, 200);

      // Animation timeline combining text-rise and unified zoom effects
      const ctx = gsap.context(() => {
        // Text rise animation timeline
        const textRiseTl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current!,
            start: "top center",
            end: "bottom center", 
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        textRiseTl.from(line1Ref.current, {
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

        // Unified zoom animation timeline for entire viewport
        const unifiedZoomTl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current!,
            start: "top 80px", // Start when section reaches just below navbar (80px from top)
            end: "+=4000",
            scrub: 1.5,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onRefresh: () => {
              // Recalculate transform origin when ScrollTrigger refreshes
              setTimeout(updateTransformOrigin, 100);
            },
          },
        });

        // Zoom the entire content container (including text-rise content)
        unifiedZoomTl.to(
          contentRef.current,
          {
            scale: 8, // Increased zoom for more dramatic effect before white wash
            ease: "none",
            duration: 0.8, // Longer duration for more zoom time
          },
          0
        );

        // Simultaneously animate PROJECTS text from small to visible
        unifiedZoomTl.to(
          projectsRef.current,
          {
            scale: 6, // Increased scale relative to the zoomed container
            opacity: 1,
            letterSpacing: "0.05em",
            ease: "none",
            duration: 0.8, // Match the container zoom duration
          },
          0
        );

        // Black wash comes in much later after more zoom
        unifiedZoomTl.to(
          whiteWashRef.current,
          {
            opacity: 1,
            ease: "power1.inOut",
            duration: 0.3,
          },
          0.75 // Delayed much later to allow more zoom
        );

        // Fade out all content as black wash completes
        unifiedZoomTl.to(
          contentRef.current,
          {
            opacity: 0,
            ease: "power2.inOut",
            duration: 0.2,
          },
          0.9 // Start fade out after black wash is well established
        );
      }, containerRef);

      // Refresh to ensure correct sizing
      ScrollTrigger.refresh();

      return () => {
        window.removeEventListener("resize", updateTransformOrigin);
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

      {/* Black wash overlay for PROJECTS zoom */}
      <div
        ref={whiteWashRef}
        className="absolute inset-0 bg-black pointer-events-none z-20"
        style={{ opacity: 0 }}
      />

      {/* Main content container that will be zoomed */}
      <div ref={contentRef} className="relative z-10 w-full h-full">
        {/* PROJECTS zoom text overlay */}
        <div className="absolute inset-0 z-30 flex items-center justify-center">
          <div
            ref={projectsRef}
            className="text-white uppercase font-extrabold leading-[0.85] tracking-tight"
            style={{
              fontSize: "clamp(4rem, 14vw, 12rem)",
              whiteSpace: "nowrap",
              willChange: "transform, opacity",
              display: "inline-flex",
              gap: "0",
            }}
          >
            <span>P</span>
            <span>R</span>
            <span>O</span>
            <span ref={jCharRef} style={{ position: "relative" }}>
              J
            </span>
            <span ref={eCharRef} style={{ position: "relative" }}>
              E
            </span>
            <span>C</span>
            <span>T</span>
            <span>S</span>
          </div>
        </div>

        {/* Text-rise content */}
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
      </div>
    </section>
  );
}
