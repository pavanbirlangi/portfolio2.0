// /components/HorizontalScrollSection.jsx

'use client';

import React, { useRef, useLayoutEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// --- MOCK DATA ---
// Replace these with your actual blog/project image paths
const projectImages = [
  '/images/img_2.png',
  '/images/img_2.png',
  '/images/img_2.png',
  '/images/img_2.png',
  '/images/img_2.png',
  '/images/img_2.png',
];

const HorizontalScrollSection = () => {
  const componentRef = useRef(null);
  const sliderRef = useRef<HTMLDivElement>(null);

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
      (slider.style as any).msOverflowStyle = 'none'; // IE/Edge
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
      const firstCard = slider.querySelector('.scroll-card');
      const cardWidth = firstCard ? (firstCard as HTMLElement).offsetWidth : 0;
      const totalWidth = slider.scrollWidth - window.innerWidth;

      let horizontalScroll = gsap.to(slider, {
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

  return (
    <div className="relative bg-transparent text-white mt-20">
      {/* SECTION HEADER */}
      <div className="container mx-auto px-6 pt-24 pb-12 md:pt-32 md:pb-16">
        <h2 className="mb-4 text-5xl font-bold md:text-7xl">We're Known For</h2>
        <p className="max-w-xl text-lg text-neutral-300">
          Building high-performance websites that are specifically designed to
          showcase your unique style of work and boost client leads.
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
          {projectImages.map((src, index) => (
            <div
              key={index}
              className="
                scroll-card flex-shrink-0 overflow-hidden rounded-2xl shadow-2xl
                h-[70vh] w-[85vw] sm:w-[75vw] md:h-[80vh] md:w-[60vw]
                snap-center md:snap-align-none
              "
            >
              <Image
                src={src}
                alt={`Project mockup ${index + 1}`}
                width={1600}
                height={1200}
                className="h-full w-full bg-neutral-800 object-cover"
                // Remember to replace with real images, or this will look blank
              />
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