// components/ProjectsHeroSection.tsx
"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsHeroSection() {
  const containerRef = useRef<HTMLElement | null>(null);
  const headlineRef = useRef<HTMLDivElement | null>(null);
  const eCharRef = useRef<HTMLSpanElement | null>(null);
  const whiteWashRef = useRef<HTMLDivElement | null>(null);
  const lenisScrollHandlerRef = useRef<(() => void) | null>(null);

  // compute transform-origin so scale is anchored on the center of 'E'
  const updateTransformOrigin = () => {
    const headline = headlineRef.current;
    const eChar = eCharRef.current;
    if (!headline || !eChar) return;

    const headRect = headline.getBoundingClientRect();
    const eRect = eChar.getBoundingClientRect();

    const originX =
      ((eRect.left - headRect.left + eRect.width / 2) / headRect.width) *
      100;
    const originY =
      ((eRect.top - headRect.top + eRect.height / 2) / headRect.height) *
      100;

    headline.style.transformOrigin = `${originX}% ${originY}%`;
  };

  useEffect(() => {
    // recalibrate after fonts load & on resize
    document.fonts?.ready.then(updateTransformOrigin);
    window.addEventListener("resize", updateTransformOrigin);

    const container = containerRef.current!;
    const headline = headlineRef.current!;
    const whiteWash = whiteWashRef.current!;

    // === Enhanced Lenis integration for butter-smooth scrolling ===
    const lenis = (window as any).lenis || (window as any).lenisInstance || (window as any).__lenis_instance;
    if (!lenis) {
      console.warn(
        "[ProjectsHeroSection] Lenis instance not found on window; ScrollTrigger syncing may degrade."
      );
    }

    // Enhanced scrollerProxy for ultra-smooth GSAP + Lenis integration
    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value?: number) {
        if (!lenis) {
          if (arguments.length && value !== undefined) window.scrollTo(0, value);
          return window.scrollY;
        }
        if (arguments.length && value !== undefined) {
          if (typeof lenis.scrollTo === "function") {
            lenis.scrollTo(value, { immediate: true });
          } else {
            window.scrollTo(0, value);
          }
        }
        return typeof lenis.scroll === "number" ? lenis.scroll : window.scrollY;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        } as DOMRect;
      },
      pinType: document.documentElement.style.transform ? "transform" : "fixed",
    });

    // High-frequency ScrollTrigger updates for smooth animation
    const lenisHandler = () => {
      ScrollTrigger.update();
    };
    lenisScrollHandlerRef.current = lenisHandler;
    
    if (lenis && typeof lenis.on === "function") {
      lenis.on("scroll", lenisHandler);
    } else {
      // Enhanced fallback with higher frequency updates
      let ticking = false;
      const raf = () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            ScrollTrigger.update();
            ticking = false;
          });
          ticking = true;
        }
      };
      window.addEventListener('scroll', raf, { passive: true });
      requestAnimationFrame(raf);
    }

    // Set initial state - headline with 0.8 opacity and zero size
    gsap.set(headline, { opacity: 1, scale: 0 });

    // Build animation timeline
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=4000",
          scrub: 1.5,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // A single, unified animation for a smooth, continuous zoom effect
      tl.to(
        headline,
        {
          scale: 15,
          opacity: 1,
          letterSpacing: "0.05em",
          ease: "none", // Linear easing for a direct 1:1 scroll-to-animation link
          duration: 1,
        },
        0
      );

      // White wash comes in during the later part of the zoom
      tl.to(
        whiteWash,
        {
          opacity: 1,
          ease: "power1.inOut",
          duration: 0.4,
        },
        0.6
      );

      // Fade out the headline as the white wash completes
      tl.to(
        headline,
        {
          opacity: 0,
          ease: "power2.inOut",
          duration: 0.25,
        },
        0.8
      );
    }, container);

    ScrollTrigger.refresh();

    return () => {
      window.removeEventListener("resize", updateTransformOrigin);
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      if (lenis && typeof lenis.off === "function" && lenisScrollHandlerRef.current) {
        lenis.off("scroll", lenisScrollHandlerRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={containerRef as any}
      className="relative w-full min-h-screen overflow-hidden bg-black"
    >
      {/* Base dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900 to-black" />

      {/* White wash overlay */}
      <div
        ref={whiteWashRef as any}
        className="absolute inset-0 bg-white pointer-events-none"
        style={{ opacity: 0 }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto h-full px-6">
        <div className="h-full flex flex-col">
          {/* Headline centered in viewport */}
          <div className="flex-1 flex items-center justify-center">
            <div
              ref={headlineRef as any}
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
              <span>J</span>
              <span ref={eCharRef} style={{ position: "relative" }}>
                E
              </span>
              <span>C</span>
              <span>T</span>
              <span>S</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
