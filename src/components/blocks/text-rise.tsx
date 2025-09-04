

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
  shortDescription: string; // concise summary for front (3–4 lines)
  longDescription: string;  // detailed paragraph for back
  image: string;
  codeUrl: string; // GitHub repository URL
  viewUrl: string; // Live demo URL
}

const SAMPLE_PROJECTS: ProjectItem[] = [
  {
    id: "p1",
    title: "Guardiann",
    shortDescription:
      "Full‑stack booking platform for institutions. Filter by preferences, pay via Razorpay, and receive PDF receipts. Admins manage categories, listings, and bookings from a powerful dashboard.",
    longDescription:
      "Guardiann is a full-stack React + Express.js platform designed to simplify the search and booking process for institutions such as schools, colleges, and PGs. It enables users to filter by preferences, securely pay via Razorpay integration, and instantly receive auto-generated PDF receipts. The admin dashboard offers powerful tools for managing categories, listings, and bookings with ease. Optimized for performance, Guardiann streamlines the entire journey from discovery to payment. Whether for students finding the right institution or admins managing data, Guardiann delivers a reliable, intuitive, and professional digital booking experience.",
    image: "/images/img_1.png",
    codeUrl: "#",
    viewUrl: "#",
  },
  {
    id: "p2",
    title: "MindVault",
    shortDescription:
      "AI web app that turns long video lectures into concise, test-ready notes. Whisper for transcripts, T5/BART for summaries, and LLMs for quizzes and flashcards.",
    longDescription:
      "MindVault is an AI-powered web app that transforms lengthy video lectures into concise, test-ready study material. Built with React, Node.js, and OpenRouter APIs, it integrates Whisper for speech-to-text, T5-small/BART for summarization, and advanced LLMs for generating quizzes and flashcards. Students can upload lectures, view accurate transcripts, explore structured summaries, and practice with automatically generated questions—all within a sleek, interactive dashboard. Designed for students and lifelong learners, MindVault turns unstructured video content into clear, engaging, and digestible notes, making revision faster, smarter, and more effective.",
    image: "/images/img_2.png",
    codeUrl: "#",
    viewUrl: "#",
  },
  {
    id: "p3",
    title: "Aethel Jewelry",
    shortDescription:
      "Custom Shopify storefront for luxury jewelry. Premium theme, optimized catalogs, responsive design, and a conversion-focused checkout experience.",
    longDescription:
      "Aethel Jewelry is a custom Shopify-powered online store designed for luxury jewelry brands. With premium theme customization, optimized product catalogs, and a conversion-focused checkout flow, it delivers an elegant shopping experience that mirrors the sophistication of the products. The store balances aesthetics with performance, offering responsive design across devices and smooth navigation for customers. On the backend, it ensures scalability and easy management for store owners. Aethel Jewelry embodies a perfect blend of visual appeal, usability, and technical efficiency, helping brands establish a polished digital presence while boosting online sales.",
    image: "/images/img_3.png",
    codeUrl: "#",
    viewUrl: "#",
  },
  {
    id: "p4",
    title: "Vortex AI",
    shortDescription:
      "Personal finance + productivity hub with an AI assistant. Track expenses, tasks, and goals in a sleek, glassmorphic Next.js dashboard.",
    longDescription:
      "Vortex AI is a futuristic personal finance and productivity platform built using Next.js, Node.js, and OpenRouter AI. It combines expense tracking, task management, goal-setting, and an AI assistant into one cohesive dashboard. Users can interact with an intelligent chatbot to gain real-time financial insights, manage daily tasks, and simplify decision-making. With a sleek, Apple-inspired design enhanced by glassmorphism and smooth animations, Vortex AI feels modern, intuitive, and engaging. Built for everyday users who want a single hub to manage both productivity and money, Vortex AI transforms complexity into clarity with AI-driven assistance.",
    image: "/images/img_4.png",
    codeUrl: "#",
    viewUrl: "#",
  },
  {
    id: "p5",
    title: "PRFL",
    shortDescription:
      "Instant portfolio/profile generator with Next.js + PostgreSQL. Create shareable profiles with projects, skills, and experience in minutes.",
    longDescription:
      "PRFL is a streamlined portfolio/profile generator built with Next.js and PostgreSQL, aimed at freelancers and developers who want to showcase their work instantly. It allows users to create dynamic, shareable profiles with sections for skills, projects, and experience—without the need for manual coding or design. With its lightweight architecture and clean UI, PRFL makes creating a professional online presence as easy as filling out a form. The platform is designed for speed, simplicity, and elegance, empowering individuals to put their best foot forward in just minutes.",
    image: "/images/img_5.png",
    codeUrl: "#",
    viewUrl: "#",
  },
  {
    id: "p6",
    title: "DevConnect",
    shortDescription:
      "Developer collaboration platform with projects, messaging, and collaborator matching. Build, network, and grow together.",
    longDescription:
      "DevConnect is a collaboration platform for developers, built with React and Supabase. It enables users to post projects, apply as collaborators, and connect with peers to work on real-world software ideas. Key features include a project feed with likes and comments, a messaging system for real-time collaboration, resume uploads for project applications, and a collaborator-matching workflow where project owners can accept or reject applicants. Additionally, users can send and manage connection requests, track their applied projects via a personal dashboard, and showcase their work. DevConnect creates an ecosystem where developers can network, build, and grow together.",
    image: "/images/QR-Code.png",
    codeUrl: "#",
    viewUrl: "#",
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
  // Flip handlers for project cards
  const handleFlipToBack = (e: React.MouseEvent) => {
    e.stopPropagation();
    const card = (e.currentTarget as HTMLElement).closest('.project-card') as HTMLElement | null;
    const inner = card?.querySelector('[data-card-inner]') as HTMLElement | null;
    if (inner) {
      inner.style.transform = 'rotateY(180deg)';
    }
  };

  const handleFlipToFront = (e: React.MouseEvent) => {
    e.stopPropagation();
    const card = (e.currentTarget as HTMLElement).closest('.project-card') as HTMLElement | null;
    const inner = card?.querySelector('[data-card-inner]') as HTMLElement | null;
    if (inner) {
      inner.style.transform = 'rotateY(0deg)';
    }
  };

  const rafId = useRef<number | null>(null);
  const scrollDirection = useRef<'down' | 'up' | null>(null);
  const lastScrollY = useRef<number>(0);

  useEffect(() => {
    // === Lenis integration ===
    // Get the global Lenis instance from your page.tsx setup
    const getLenisInstance = () => {
      return (window as unknown as { __lenis_instance: unknown }).__lenis_instance;
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
          // Check if mobile/tablet view for initial positioning (safely)
          const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
          const cardSpacing = isMobile ? 50 : 60; // Tighter spacing on mobile
          const initialX = isMobile ? 0 : 300 + (index * 120);
          const initialY = isMobile 
            ? 300 + (index * cardSpacing) // Mobile: start lower to move up closer to MY WORK
            : 400 + (index * 60); // Desktop: start lower to move up to top-left
          
          gsap.set(card, { 
            opacity: 0, 
            y: initialY, // Responsive initial Y position with consistent spacing
            x: initialX, // Responsive initial X position (0 for mobile)
            scale: 0.7,
            rotation: 0, // No rotation - straight diagonal movement
            force3D: true, // Enable GPU acceleration from start
            backfaceVisibility: "hidden", // Prevent flickering
            transformOrigin: "center center",
            willChange: "transform, opacity", // Optimize for animation
          });
        });
      }

      // recalibrate transform origin after fonts load & on resize
      document.fonts?.ready.then(() => {
        setTimeout(updateTransformOrigin, 100); // Delay to ensure elements are rendered
      });
      
        const handleResize = () => {
          updateTransformOrigin();
          // Update card positions for responsive layout
          const projectCards = projectsCardsRef.current?.querySelectorAll('.project-card');
          if (projectCards) {
            projectCards.forEach((card, index) => {
              const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
              const isTablet = typeof window !== 'undefined' && window.innerWidth >= 768 && window.innerWidth < 1024;
              const cardSpacing = isMobile ? 50 : 60; // Tighter spacing on mobile
              
              const finalOffset = isMobile 
                ? { x: 0, y: 80 + (index * cardSpacing) } // Mobile: closer below MY WORK text
                : isTablet 
                  ? { x: index * 80, y: index * 60 } // Tablet: diagonal from top
                  : { x: index * 120, y: index * 60 }; // Desktop: diagonal from top-left
                  
              // Update transform immediately for resize
              gsap.set(card, {
                x: finalOffset.x,
                y: finalOffset.y,
              });
            });
          }
        };      window.addEventListener("resize", handleResize);
      
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
            end: "+=10000", // Longer scroll distance for smoother animation
            scrub: 0.5, // Slightly higher scrub for better reverse performance
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            refreshPriority: -1, // Lower priority to avoid conflicts
            fastScrollEnd: true, // Better performance on fast scrolling
            preventOverlaps: true, // Prevent animation conflicts
            onUpdate: (self) => {
              // Track scroll direction for performance optimization
              const currentScrollY = window.scrollY;
              const currentDirection = currentScrollY > lastScrollY.current ? 'down' : 'up';
              
              // Only update if direction changed
              if (currentDirection !== scrollDirection.current) {
                scrollDirection.current = currentDirection;
                
                // Optimize performance based on direction
                const cards = projectsCardsRef.current?.querySelectorAll('.project-card');
                if (cards && self.isActive) {
                  cards.forEach((card) => {
                    // Use RAF for smoother performance updates
                    if (rafId.current) cancelAnimationFrame(rafId.current);
                    rafId.current = requestAnimationFrame(() => {
                      gsap.set(card, { 
                        willChange: "transform, opacity",
                        backfaceVisibility: "hidden"
                      });
                    });
                  });
                }
              }
              
              lastScrollY.current = currentScrollY;
            },
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
            // Set will-change for better performance and disable any CSS transitions
            gsap.set(card, { 
              willChange: "transform, opacity",
              transition: "none", // Disable any CSS transitions that might interfere
              backfaceVisibility: "hidden", // Prevent flickering
              perspective: 1000, // Enable 3D acceleration
            });
            
            // Check if mobile/tablet view
            const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
            const isTablet = typeof window !== 'undefined' && window.innerWidth >= 768 && window.innerWidth < 1024;
            
            // Calculate responsive positioning with consistent Y spacing
            const cardSpacing = isMobile ? 50 : 60; // Tighter spacing on mobile
            const mobileOffset = { x: 0, y: 80 + (index * cardSpacing) }; // Mobile: start closer below MY WORK text
            const tabletOffset = { x: index * 80, y: index * 60 }; // Tablet: diagonal from top (keep 60px spacing)
            const desktopOffset = { x: index * 120, y: index * 60 }; // Desktop: diagonal from top-left (keep 60px spacing)
            
            const finalOffset = isMobile ? mobileOffset : isTablet ? tabletOffset : desktopOffset;
            const startOffset = isMobile 
              ? { x: 0, y: 300 + (index * cardSpacing) } 
              : { x: 300 + (index * 120), y: 400 + (index * 60) };
            
            // Each card starts from a distance and moves to its final stacked position
            unifiedZoomTl.fromTo(
              card,
              {
                y: startOffset.y, // Each card starts from progressively lower position
                x: startOffset.x, // Mobile: center, Desktop: right offset
                opacity: 0,
                scale: 0.7,
                rotation: 0, // No rotation - straight diagonal movement
                force3D: true, // Force hardware acceleration
                transformOrigin: "center center",
              },
              {
                y: finalOffset.y, // Final Y position (responsive)
                x: finalOffset.x, // Final X position (responsive)
                opacity: 1,
                scale: 1,
                rotation: 0, // No rotation - cards stay straight
                ease: "none", // Use linear easing for consistent forward/reverse performance
                duration: 0.8, // Longer duration for smoother animation
                force3D: true, // Force hardware acceleration
                transformOrigin: "center center",
                onStart: () => {
                  // Ensure optimal performance settings at animation start
                  gsap.set(card, { 
                    willChange: "transform, opacity",
                    backfaceVisibility: "hidden"
                  });
                },
                onReverseComplete: () => {
                  // Reset performance optimizations when animation reverses completely
                  gsap.set(card, { 
                    willChange: "auto",
                    backfaceVisibility: "visible"
                  });
                },
                onComplete: () => {
                  // Keep will-change during scroll for smooth reverse
                  gsap.set(card, { willChange: "transform, opacity" });
                }
              },
              1.8 + (index * 0.8) // Reduced stagger for smoother flow
            );
          });
        }
      }, containerRef);

      // Refresh to ensure correct sizing
      ScrollTrigger.refresh();

      return () => {
        window.removeEventListener("resize", handleResize);
        if (rafId.current) cancelAnimationFrame(rafId.current);
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
      if (rafId.current) cancelAnimationFrame(rafId.current);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section
      id="projects"
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
        <div className="absolute top-20 right-0 p-4 md:p-6 lg:p-12 pointer-events-auto">
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
                  fontSize: "clamp(2rem, 8vw, 8rem)",
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
                  fontSize: "clamp(2rem, 8vw, 8rem)",
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
          className="absolute top-20 md:top-20 left-0 w-full h-[calc(100vh-5rem)] md:h-[calc(100vh-5rem)] px-4 md:px-6 pointer-events-auto"
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
                    "project-card group absolute",
                    "overflow-hidden pointer-events-auto"
                  )}
                  style={{
                    zIndex: idx + 10,
                    width: "min(480px, calc(100vw - 2rem))",
                    height: "min(440px, 50vh)",
                    transform: `translate(${idx * 120}px, ${idx * 60}px)`,
                    willChange: "transform, opacity",
                    isolation: "isolate",
                    perspective: 1000,
                  }}
                >
                  {/* Card inner wrapper for flip */}
                  <div
                    data-card-inner
                    className="relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d]"
                  >
                    {/* Front */}
                    <div className="absolute inset-0 rounded-2xl border border-neutral-800 bg-neutral-900 shadow-2xl overflow-hidden [backface-visibility:hidden]">
                      {/* Project Image - 65% height */}
                      <div className="relative w-full overflow-hidden" style={{ height: "65%" }}>
                        <Image src={project.image} alt={project.title} fill className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]" />
                      </div>
                      {/* Project Content - 25% height */}
                      <div className="p-4 relative flex flex-col" style={{ height: "25%" }}>
                        <div className="flex items-start gap-3 flex-1">
                          <div className="text-gray-400 font-extrabold text-xl flex-shrink-0 leading-none">
                            {String(idx + 1).padStart(2, "0")}
                          </div>
                          <div className="flex-1 min-h-0">
                            <h3 className="text-lg md:text-xl font-bold tracking-tight mb-1 text-white line-clamp-2">{project.title}</h3>
                            <p className="text-xs md:text-sm text-white/70 leading-tight line-clamp-3">{project.shortDescription}</p>
                          </div>
                        </div>
                      </div>
                      {/* Bottom links */}
                      <div className="relative flex items-center justify-end px-4 py-2 pointer-events-auto z-20" style={{ height: "10%" }}>
                        <div className="flex items-center gap-4 pointer-events-auto">
                          {/* Details first with icon */}
                          <button className="flex items-center gap-1 cursor-pointer group/details hover:scale-105 transition-transform duration-200 pointer-events-auto z-30" onClick={handleFlipToBack}>
                            <svg className="w-4 h-4 text-white/70 group-hover/details:text-white transition-transform duration-300 group-hover/details:translate-x-0.5 group-hover/details:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M19 12H6"/></svg>
                            <span className="text-sm font-medium text-white/70 group-hover/details:text-white transition-colors duration-300 relative">Details<span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white group-hover/details:w-full transition-all duration-300 ease-out"></span></span>
                          </button>
                          <div className="w-px h-4 bg-white/20"></div>
                          {/* Code */}
                          <a href={project.codeUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 cursor-pointer group/code hover:scale-105 transition-transform duration-200 pointer-events-auto z-30" onClick={(e) => e.stopPropagation()}>
                            <svg className="w-4 h-4 text-white/70 group-hover/code:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                            <span className="text-sm font-medium text-white/70 group-hover/code:text-white transition-colors duration-300 relative">Code<span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white group-hover/code:w-full transition-all duration-300 ease-out"></span></span>
                          </a>
                          <div className="w-px h-4 bg-white/20"></div>
                          {/* View (Live) */}
                          <a href={project.viewUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 cursor-pointer group/view hover:scale-105 transition-transform duration-200 pointer-events-auto z-30" onClick={(e) => e.stopPropagation()}>
                            <span className="text-sm font-medium text-white/70 group-hover/view:text-white transition-colors duration-300 relative">View<span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white group-hover/view:w-full transition-all duration-300 ease-out"></span></span>
                            <svg className="w-4 h-4 text-white/70 group-hover/view:text-white group-hover/view:translate-x-0.5 group-hover/view:-translate-y-0.5 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                          </a>
                        </div>
                      </div>
                    </div>
                    {/* Back */}
                    <div className="absolute inset-0 rounded-2xl border border-neutral-800 bg-neutral-900 shadow-2xl p-4 [backface-visibility:hidden] [transform:rotateY(180deg)] overflow-hidden pointer-events-auto z-30">
                      <div className="flex h-full flex-col justify-between">
                        <div>
                          <h4 className="text-white font-semibold text-xl md:text-2xl mb-3">{project.title}</h4>
                          <p className="text-white/80 text-base md:text-[1rem] leading-relaxed">{project.longDescription}</p>
                        </div>
                        <div className="flex items-center justify-end gap-4 z-40 pointer-events-auto">
                          <button className="flex items-center gap-1 group/back text-sm font-medium text-white/80 hover:text-white transition-colors pointer-events-auto z-40" onClick={handleFlipToFront}>
                            <span className="relative">
                              Back
                              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white/80 group-hover/back:w-full transition-all duration-300 ease-out"></span>
                            </span>
                            <svg className="w-4 h-4 text-white/70 group-hover/back:text-white transition-transform duration-300 group-hover/back:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                          </button>
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
