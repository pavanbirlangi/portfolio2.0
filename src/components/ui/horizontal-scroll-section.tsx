// /components/HorizontalScrollSection.jsx

'use client';

import React, { useRef, useLayoutEffect, useEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// --- BLOG CARD DATA ---
// Replace these with your actual blog posts data
type BlogCard = {
  src: string;
  title: string;
  excerpt: string;
  href?: string;
};

const blogCards: BlogCard[] = [
  {
    src: '/images/img_2.png',
    title: 'Writing Maintainable Frontend Systems',
    excerpt: 'Patterns, constraints, and trade-offs that keep large codebases fast and flexible.',
    href: '#/blog/1',
  },
  {
    src: '/images/img_2.png',
    title: 'Smoother UX with Scroll-Driven Animations',
    excerpt: 'Using Lenis + GSAP for motion that feels intentional rather than flashy.',
    href: '#/blog/2',
  },
  {
    src: '/images/img_2.png',
    title: 'Building Content Systems that Scale',
    excerpt: 'How to structure content and avoid the common CMS pitfalls.',
    href: '#/blog/3',
  },
  {
    src: '/images/img_2.png',
    title: 'Design Tokens Done Right',
    excerpt: 'A practical guide to shared language across design and engineering.',
    href: '#/blog/4',
  },
  {
    src: '/images/img_2.png',
    title: 'Observability for Frontend Engineers',
    excerpt: 'What to measure, how to alert, and where performance really gets lost.',
    href: '#/blog/5',
  },
  {
    src: '/images/img_2.png',
    title: 'State Machines vs. State Chaos',
    excerpt: 'Taming complex UI flows with predictability and confidence.',
    href: '#/blog/6',
  },
];

const HorizontalScrollSection = () => {
  const componentRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // Set up GSAP and ScrollTrigger (Lenis is handled globally)
    gsap.registerPlugin(ScrollTrigger);

    if (!sliderRef.current) return;
    const slider = sliderRef.current;
    
    // Check if mobile
    const isMobile = window.innerWidth < 768;
    
    if (isMobile) {
      // Mobile: Disable GSAP, enable native horizontal scrolling
      slider.style.overflowX = 'scroll';
      slider.style.overflowY = 'hidden';
      slider.style.scrollbarWidth = 'none'; // Firefox
      (slider.style as { msOverflowStyle?: string }).msOverflowStyle = 'none'; // IE/Edge
      slider.style.scrollBehavior = 'smooth';
      
      // Prevent vertical scroll interference
      slider.style.touchAction = 'pan-x pinch-zoom';
      
      // Hide scrollbar and add momentum scrolling
      const styleSheet = document.createElement('style');
      styleSheet.textContent = `
        .mobile-horizontal-scroll::-webkit-scrollbar {
          display: none;
        }
        .mobile-horizontal-scroll {
          -webkit-overflow-scrolling: touch;
          scroll-snap-type: x mandatory;
        }
        .mobile-scroll-card {
          scroll-snap-align: center;
        }
      `;
      document.head.appendChild(styleSheet);
      
      slider.classList.add('mobile-horizontal-scroll');
      
      // Add scroll snap to cards
      const cards = slider.querySelectorAll('.scroll-card');
      cards.forEach(card => {
        (card as HTMLElement).classList.add('mobile-scroll-card');
      });
      
      return () => {
        if (document.head.contains(styleSheet)) {
          document.head.removeChild(styleSheet);
        }
      };
    } else {
      // Desktop: Use GSAP horizontal scroll animation
      const totalWidth = slider.scrollWidth - window.innerWidth;

      const horizontalScroll = gsap.to(slider, {
        x: -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: slider,
          pin: true,
          scrub: 1,
          start: 'center center',
          end: () => `+=${totalWidth}`,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        horizontalScroll.kill();
        ScrollTrigger.killAll();
      };
    }
  }, []);

  // Letter-by-letter animation on scroll
  useEffect(() => {
    const handleScroll = () => {
      const letters = document.querySelectorAll('[data-letter-index]');
      const headerSection = headerRef.current;
      
      if (!headerSection || letters.length === 0) return;
      
      const rect = headerSection.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate when the TEXT (h2 element) is in viewport
      // We want animation to complete before the text leaves the viewport
      const sectionTop = rect.top;
      const sectionBottom = rect.bottom;
      
      // Calculate progress: 0 = entering viewport, 1 = animation should complete
      let progress = 0;
      
      if (sectionTop < windowHeight && sectionBottom > 0) {
        // Section is in viewport
        // Calculate how much of the text is visible
        const textHeight = rect.height * 0.4; // Approximate text height (40% of section)
        // const textBottom = sectionTop + textHeight; // Bottom of text area (not used)
        
        // Animation should complete when text is about to leave viewport
        // Use textBottom instead of sectionBottom for more precise control
        const totalDistance = windowHeight + textHeight;
        const currentPosition = windowHeight - sectionTop;
        const rawProgress = currentPosition / totalDistance;
        
        // Accelerate progress so animation completes before text leaves viewport
        // Give more time for all letters to complete
        progress = Math.min(1, rawProgress / 0.8);
        
        // Debug logging
        console.log(`Text progress: ${(rawProgress * 100).toFixed(1)}%, Animation progress: ${(progress * 100).toFixed(1)}%`);
      } else if (sectionBottom <= 0) {
        // Section has left viewport - ensure animation is complete
        progress = 1;
        console.log('Section left viewport, animation complete');
      }
      
      letters.forEach((letter, index) => {
        const letterElement = letter as HTMLElement;
        const delay = index * 0.03; // 30ms delay between letters for smoother completion
        
        // Calculate individual letter progress with delay
        // Ensure all letters can complete by using a larger division factor
        const letterProgress = Math.max(0, Math.min(1, (progress - delay) / 0.5));
        
        // Debug logging for last few letters to see their progress
        if (index >= letters.length - 5) {
          console.log(`Letter ${index} (${letterElement.textContent}): progress=${letterProgress.toFixed(3)}, delay=${delay.toFixed(3)}, final=${letterProgress === 1 ? 'COMPLETE' : 'INCOMPLETE'}`);
        }
        
        // Animate opacity from 0.2 to 1
        const opacity = 0.2 + (letterProgress * 0.8);
        letterElement.style.opacity = opacity.toString();
        
        // Animate color from light gray to white
        if (letterProgress > 0) {
          // Interpolate from neutral-500 (#6B7280) to white (#FFFFFF)
          const r = Math.floor(107 + (letterProgress * 148)); // 107 -> 255
          const g = Math.floor(114 + (letterProgress * 141)); // 114 -> 255
          const b = Math.floor(128 + (letterProgress * 127)); // 128 -> 255
          letterElement.style.color = `rgb(${r}, ${g}, ${b})`;
        }
        
        // Subtle scale effect
        const scale = 0.95 + (letterProgress * 0.05);
        letterElement.style.transform = `scale(${scale})`;
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative bg-transparent text-white mt-20">
      {/* SECTION HEADER */}
      <div ref={headerRef} className="container mx-auto px-6 pt-24 pb-12 md:pt-32 md:pb-16">
        <h2 className="mb-4 text-5xl font-bold md:text-7xl">
          {Array.from("Thoughts in Code & Beyond").map((letter, index) => (
            <span
              key={index}
              className="inline-block text-neutral-500 transition-all duration-700 ease-out"
              style={{
                animationDelay: `${index * 50}ms`,
                animationFillMode: 'forwards'
              }}
              data-letter-index={index}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </span>
          ))}
        </h2>
        <p className="max-w-xl text-lg text-neutral-300">
          I write about development, design, and the little hacks that make building smoother.
        </p>
      </div>

      {/* HORIZONTAL SCROLL CONTAINER */}
      <div ref={componentRef} className="relative">
        {/* Mobile scroll hint */}
        <div className="md:hidden mb-4 flex justify-center">
          <div className="flex items-center gap-2 text-neutral-400 text-sm">
            <span>Swipe horizontally to explore</span>
            <svg width="20" height="12" viewBox="0 0 20 12" fill="none" className="animate-pulse">
              <path d="M1 6h18m-6-5l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        
        {/* Desktop: Standard flex layout | Mobile: Horizontal scroll container */}
        <div 
          ref={sliderRef} 
          className="
            flex h-[90vh] items-center
            md:w-max md:space-x-20 md:px-20
            overflow-x-auto md:overflow-x-visible
            gap-6 px-6 md:gap-0 md:px-0
            snap-x snap-mandatory md:snap-none
          "
        >
          {blogCards.map((card, index) => (
            <div
              key={index}
              className="
                scroll-card group relative flex-shrink-0 overflow-hidden rounded-2xl shadow-2xl
                h-[70vh] w-[85vw] sm:w-[75vw] md:h-[80vh] md:w-[60vw]
                snap-center md:snap-align-none
                bg-neutral-900
              "
            >
              {/* Image wrapper */}
              <div className="relative h-full w-full overflow-hidden">
                <Image
                  src={card.src}
                  alt={`Project mockup ${index + 1}`}
                  width={1600}
                  height={1200}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
                />
              </div>

              {/* Smoked overlay - covers right 65% on hover */}
              <div
                className="pointer-events-none absolute inset-0 z-10"
              >
                <div className="absolute right-0 top-0 h-full w-[60%] bg-black/55 backdrop-blur-sm translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
              </div>

              {/* Content on smoked half */}
              <div className="absolute inset-0 z-20 flex items-center justify-end p-6 md:p-8">
                <div
                  className="pointer-events-none w-[55%] translate-x-4 opacity-0 transition-all duration-500 ease-out group-hover:translate-x-0 group-hover:opacity-100 pl-6 md:pl-10"
                >
                  <h3 className="mb-2 text-xl md:text-2xl font-semibold text-white">
                    {card.title}
                  </h3>
                  <p className="mb-5 text-sm md:text-base text-white/80 leading-relaxed">
                    {card.excerpt}
                  </p>
                  <a
                    href={card.href || '#'}
                    aria-label={`Visit blog: ${card.title}`}
                    className="pointer-events-auto inline-flex items-center gap-2 text-sm md:text-base font-medium text-white/90 hover:text-white rounded-full border border-white/30 px-4 py-2 bg-white/10 hover:bg-white/20 transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-white/40 active:scale-[0.98]"
                  >
                    <span>Visit blog</span>
                    <svg
                      className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M7 17L17 7M7 7h10v10" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Spacer to ensure the page continues scrolling after the pinned section */}
      <div className="h-[20vh] bg-black"></div>
    </div>
  );
};

export default HorizontalScrollSection;