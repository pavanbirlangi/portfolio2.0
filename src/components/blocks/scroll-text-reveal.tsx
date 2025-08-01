import React, { useEffect, useRef, useMemo, ReactNode, RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Ensure ScrollTrigger works with smooth scrolling
ScrollTrigger.defaults({
  // scroller: window,
  invalidateOnRefresh: true,
});

interface ScrollRevealProps {
  children: ReactNode;
  scrollContainerRef?: RefObject<HTMLElement>;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
  rotationEnd?: string;
  wordAnimationEnd?: string;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = "",
  textClassName = "",
  rotationEnd = "bottom bottom",
  wordAnimationEnd = "bottom bottom",
}) => {
  const containerRef = useRef<HTMLHeadingElement>(null);

  const splitText = useMemo(() => {
    const text = typeof children === "string" ? children : "";
    return text.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word;
      return (
        <span className="inline-block word" key={index}>
          {word}
        </span>
      );
    });
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Use window as scroller for better Lenis compatibility
    const scroller = window;

    // Refresh ScrollTrigger to ensure it works with Lenis
    ScrollTrigger.refresh();

    gsap.fromTo(
      el,
      { transformOrigin: "0% 50%", rotate: baseRotation },
      {
        ease: "power2.out", // Changed from "none" for smoother animation
        rotate: 0,
        duration: 1, // Added duration for better control
        scrollTrigger: {
          trigger: el,
          scroller,
          start: "top 80%", // Start earlier for smoother experience
          end: "top 20%", // Shorter animation range
          scrub: 1, // Changed from true to 1 for smoother scrubbing
          invalidateOnRefresh: true, // Important for Lenis
        },
      }
    );

    const wordElements = el.querySelectorAll<HTMLElement>(".word");

    gsap.fromTo(
      wordElements,
      { opacity: baseOpacity, willChange: "opacity, filter" },
      {
        ease: "power2.out", // Smoother easing
        opacity: 1,
        stagger: 0.03, // Reduced stagger for faster reveal
        scrollTrigger: {
          trigger: el,
          scroller,
          start: "top 75%", // Start earlier
          end: "top 25%", // Shorter range
          scrub: 1, // Smoother scrubbing
          invalidateOnRefresh: true,
        },
      }
    );

    if (enableBlur) {
      gsap.fromTo(
        wordElements,
        { filter: `blur(${blurStrength}px)` },
        {
          ease: "power2.out", // Smoother easing
          filter: "blur(0px)",
          stagger: 0.03, // Reduced stagger
          scrollTrigger: {
            trigger: el,
            scroller,
            start: "top 75%", // Start earlier
            end: "top 25%", // Shorter range
            scrub: 1, // Smoother scrubbing
            invalidateOnRefresh: true,
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [
    enableBlur,
    baseRotation,
    baseOpacity,
    blurStrength,
  ]);

  return (
    <h2 ref={containerRef} className={`my-5 ${containerClassName}`}>
      <p
        className={`text-[clamp(1.6rem,4vw,3rem)] leading-[1.5] font-semibold ${textClassName}`}
      >
        {splitText}
      </p>
    </h2>
  );
};

export default ScrollReveal;
