"use client";

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
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = "",
  textClassName = "",
}) => {
  const containerRef = useRef<HTMLHeadingElement>(null);

  // Pre-render with the "from" state to avoid flash-of-visible-text on first paint
  const splitText = useMemo(() => {
    const text = typeof children === "string" ? children : "";
    return text.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word;
      return (
        <span
          className="inline-block word"
          key={index}
          style={{
            opacity: baseOpacity,
            filter: enableBlur ? `blur(${blurStrength}px)` : undefined,
            willChange: "opacity, filter",
          }}
        >
          {word}
        </span>
      );
    });
  }, [children, baseOpacity, enableBlur, blurStrength]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Use window as scroller for better Lenis compatibility
    const scroller = window;

    // Refresh ScrollTrigger to ensure it works with Lenis
    ScrollTrigger.refresh();

    const rotationTween = gsap.fromTo(
      el,
      { transformOrigin: "0% 50%", rotate: baseRotation },
      {
        ease: "power2.out",
        rotate: 0,
        duration: 1,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: "top 80%",
          end: "top 20%",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      }
    );

    const wordElements = el.querySelectorAll<HTMLElement>(".word");

    const opacityTween = gsap.fromTo(
      wordElements,
      { opacity: baseOpacity, willChange: "opacity, filter" },
      {
        ease: "power2.out",
        opacity: 1,
        stagger: 0.03,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: "top 75%",
          end: "top 25%",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      }
    );

    let blurTween: gsap.core.Tween | null = null;
    if (enableBlur) {
      blurTween = gsap.fromTo(
        wordElements,
        { filter: `blur(${blurStrength}px)` },
        {
          ease: "power2.out",
          filter: "blur(0px)",
          stagger: 0.03,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: "top 75%",
            end: "top 25%",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        }
      );
    }

    return () => {
      rotationTween.scrollTrigger?.kill();
      opacityTween.scrollTrigger?.kill();
      blurTween?.scrollTrigger?.kill();
    };
  }, [
    enableBlur,
    baseRotation,
    baseOpacity,
    blurStrength,
  ]);

  return (
    <h2
      ref={containerRef}
      className={`my-5 ${containerClassName}`}
      style={{ transformOrigin: "0% 50%", transform: `rotate(${baseRotation}deg)` }}
    >
      <p
        className={`text-[clamp(1.6rem,4vw,3rem)] leading-[1.5] font-semibold ${textClassName}`}
      >
        {splitText}
      </p>
    </h2>
  );
};

export default ScrollReveal;
