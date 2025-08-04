

// components/HeroScrollSection.tsx
"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import clsx from "clsx";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

interface ProjectItem {
  id: string;
  title: string;
  description: string;
}

const SAMPLE_PROJECTS: ProjectItem[] = [
  {
    id: "p1",
    title: "Realtime Search Engine",
    description: "Low-latency indexing with incremental updates.",
  },
  {
    id: "p2",
    title: "GenAI Assistant",
    description: "Context-aware prompt orchestration pipeline.",
  },
  {
    id: "p3",
    title: "Scalable API Mesh",
    description: "Resilient routing and observability baked in.",
  },
  {
    id: "p4",
    title: "Personal Dashboard",
    description: "Unified metrics with live polling and caching.",
  },
  {
    id: "p5",
    title: "Content Recommendation",
    description: "Hybrid filtering with user-adaptive scoring.",
  },
  {
    id: "p6",
    title: "AI-Powered Analytics",
    description: "Real-time insights with machine learning predictions.",
  },
];

export default function HeroScrollSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const line1Ref = useRef<HTMLDivElement | null>(null);
  const line2Ref = useRef<HTMLDivElement | null>(null);
  const projectsRef = useRef<HTMLDivElement | null>(null);
  const eCharRef = useRef<HTMLSpanElement | null>(null);
  const jCharRef = useRef<HTMLSpanElement | null>(null); // Ref for letter J
  const whiteWashRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null); // Main content container for unified zoom
  const myRef = useRef<HTMLDivElement | null>(null); // Ref for "MY" text
  const workRef = useRef<HTMLDivElement | null>(null); // Ref for "WORK" text
  const myContainerRef = useRef<HTMLDivElement | null>(null); // Ref for "MY" container for clipping
  const workContainerRef = useRef<HTMLDivElement | null>(null); // Ref for "WORK" container for clipping
  const projectsCardsRef = useRef<HTMLDivElement | null>(null); // Ref for projects cards container
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
      gsap.set(myContainerRef.current, { clipPath: "inset(100% 0% 0% 0%)" }); // Clip "MY" from bottom for baseline rise
      gsap.set(workContainerRef.current, { clipPath: "inset(100% 0% 0% 0%)" }); // Clip "WORK" from bottom for baseline rise
      
      // Set initial state for individual project cards
      const projectCards = projectsCardsRef.current?.querySelectorAll('.project-card');
      if (projectCards) {
        projectCards.forEach((card, index) => {
          gsap.set(card, { 
            opacity: 0, 
            y: 400 + (index * 50), // Each card starts from progressively lower position
            x: 300 + (index * 100), // Each card starts from progressively more right position
            scale: 0.7,
            rotation: 0, // No rotation - straight diagonal movement
          });
        });
      }

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
            start: "top top", // Start when section reaches just below navbar (80px from top)
            end: "+=6000", // Extended for project cards scroll
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

        // MY and WORK text animations - separate baseline rise for each line after black screen is loaded
        unifiedZoomTl.to(
          myContainerRef.current,
          {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "power2.out",
            duration: 0.4,
          },
          1.0 // Start after black wash and content fade are complete
        );

        // WORK animates slightly after MY for staggered effect
        unifiedZoomTl.to(
          workContainerRef.current,
          {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "power2.out",
            duration: 0.4,
          },
          1.15 // Start slightly after MY for staggered baseline rise
        );

        // Project cards stacking animation - each card comes and stacks on top of previous ones
        const projectCards = projectsCardsRef.current?.querySelectorAll('.project-card');
        if (projectCards) {
          projectCards.forEach((card, index) => {
            // Each card starts from a distance and moves to its final stacked position
            unifiedZoomTl.fromTo(
              card,
              {
                y: 400 + (index * 50), // Each card starts from progressively lower position
                x: 300 + (index * 100), // Each card starts from progressively more right position
                opacity: 0,
                scale: 0.7,
                rotation: 0, // No rotation - straight diagonal movement
              },
              {
                y: index * 50, // Final diagonal Y position (adjusted for 6 cards)
                x: index * 100, // Final diagonal X position (adjusted for 6 cards)
                opacity: 1,
                scale: 1,
                rotation: 0, // No rotation - cards stay straight
                ease: "power3.out",
                duration: 0.8,
              },
              1.8 + (index * 1.2) // Much larger delay between cards so each card waits for previous to finish
            );
          });
        }
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
      className="relative w-full h-screen overflow-hidden bg-black"
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

      {/* Black wash overlay for PROJECTS zoom - this becomes the projects section background */}
      <div
        ref={whiteWashRef}
        className="absolute inset-0 bg-black pointer-events-none z-20"
        style={{ opacity: 0 }}
      >
        {/* Projects content that appears on the black screen */}
        <div className="absolute top-20 right-0 p-6 md:p-12 pointer-events-auto">
          <div className="text-right">
            {/* MY container with its own baseline clipping */}
            <div
              ref={myContainerRef}
              style={{
                overflow: "hidden",
              }}
            >
              <div
                ref={myRef}
                className="text-white uppercase font-extrabold leading-[0.85] tracking-tight"
                style={{
                  fontSize: "clamp(3rem, 8vw, 8rem)",
                  willChange: "clip-path",
                }}
              >
                MY
              </div>
            </div>
            
            {/* WORK container with its own baseline clipping */}
            <div
              ref={workContainerRef}
              style={{
                overflow: "hidden",
              }}
            >
              <div
                ref={workRef}
                className="text-white uppercase font-extrabold leading-[0.85] tracking-tight"
                style={{
                  fontSize: "clamp(3rem, 8vw, 8rem)",
                  willChange: "clip-path",
                }}
              >
                WORK
              </div>
            </div>
          </div>
        </div>

        {/* Project cards that appear after MY WORK animation */}
        <div 
          ref={projectsCardsRef}
          className="absolute top-20 left-0 w-full h-[calc(100vh-5rem)] px-6"
        >
          <div 
            className="relative w-full h-full"
            style={{ perspective: "1400px" }}
          >
            {SAMPLE_PROJECTS.map((project, idx) => {
              return (
                <div
                  key={project.id}
                  className={clsx(
                    "project-card absolute rounded-2xl border border-white/20 backdrop-blur-md shadow-2xl",
                    "overflow-hidden group cursor-pointer transition-all duration-300 hover:scale-105"
                  )}
                  style={{
                    zIndex: idx + 1, // Later cards have higher z-index (appear on top)
                    width: "480px", // Increased width for better visual presence
                    height: "460px", // Slightly reduced height for better fit
                    background: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    // Diagonal positioning from top-left to bottom-right (adjusted for 6 cards)
                    transform: `translate(${idx * 100}px, ${idx * 50}px)`, // Reduced offsets to fit 6 cards better
                  }}
                >
                  {/* Project Image */}
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src="/images/img_2.png"
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    
                    {/* Hover overlay with View Demo link */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border border-white/30">
                        <span className="text-white font-semibold">View Demo</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Project Content */}
                  <div className="p-6 relative h-full flex flex-col">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="text-pink-400 font-extrabold text-2xl flex-shrink-0 leading-none">
                        {String(idx + 1).padStart(2, "0")}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold tracking-tight mb-2 text-white">
                          {project.title}
                        </h3>
                        <p className="text-sm text-white/70 leading-relaxed">
                          {project.description}
                        </p>
                      </div>
                    </div>
                    
                    {/* View Details Link - Bottom Right Corner */}
                    <div className="flex justify-end mt-4">
                      <div className="group/details cursor-pointer">
                        <div className="flex items-center gap-2 text-white/70 group-hover/details:text-white transition-colors duration-300">
                          <span className="text-sm font-medium relative overflow-hidden">
                            View Details
                            {/* Smooth underline animation */}
                            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-white group-hover/details:w-full transition-all duration-500 ease-out"></span>
                          </span>
                          {/* Arrow with smooth animation */}
                          <div className="relative w-4 h-4 overflow-hidden">
                            <svg 
                              className="w-4 h-4 transform transition-all duration-500 ease-out group-hover/details:translate-x-1 group-hover/details:scale-110" 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                                className="transition-all duration-500 ease-out"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

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
