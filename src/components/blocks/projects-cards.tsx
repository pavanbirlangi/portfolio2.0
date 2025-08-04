// components/ProjectsStackSection.tsx
"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import clsx from "clsx";

gsap.registerPlugin(ScrollTrigger);

interface ProjectItem {
  id: string;
  title: string;
  description: string;
}

const DEFAULT_PROJECTS: ProjectItem[] = [
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
    title: "Deployment Tracker",
    description: "Audit trail and health insights for CI/CD flows.",
  },
  {
    id: "p7",
    title: "Edge Function Platform",
    description: "Distributed execution with graceful fallback.",
  },
  {
    id: "p8",
    title: "User Behavior Insights",
    description: "Event-stream processing and anomaly detection.",
  },
  {
    id: "p9",
    title: "AI-Powered Search UX",
    description: "Semantic summarization layered on results.",
  },
];

export default function ProjectsStackSection({
  projects = DEFAULT_PROJECTS,
}: {
  projects?: ProjectItem[];
}) {
  const containerRef = useRef<HTMLElement | null>(null);
  const cardsWrapperRef = useRef<HTMLDivElement | null>(null);
  const lenisHandlerRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const container = containerRef.current!;
    const wrapper = cardsWrapperRef.current!;
    const cards: HTMLElement[] = Array.from(
      wrapper.querySelectorAll<HTMLElement>(".project-card")
    );

    // === Lenis integration ===
    const lenis = (window as any).lenis || (window as any).lenisInstance;
    if (!lenis) {
      console.warn(
        "[ProjectsStackSection] Lenis instance not found on window; ScrollTrigger might not sync perfectly."
      );
    }

    // Proxy scroll for GSAP to use Lenis
    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value?: number) {
        if (!lenis) {
          if (arguments.length && typeof value === "number") window.scrollTo(0, value);
          return window.scrollY;
        }
        if (arguments.length && typeof value === "number") {
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

    const lenisHandler = () => {
      ScrollTrigger.update();
    };
    lenisHandlerRef.current = lenisHandler;
    if (lenis && typeof lenis.on === "function") {
      lenis.on("scroll", lenisHandler);
    } else {
      const raf = (time: number) => {
        ScrollTrigger.update();
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);
    }

    // Build the scroll timeline
    const ctx = gsap.context(() => {
      const totalSpacing = 120 * projects.length; // determines how long the pin lasts
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: `+=${totalSpacing}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Staggered reveal: each card comes in with upward/fade
      tl.from(
        cards,
        {
          y: 60,
          opacity: 0,
          scale: 0.98,
          ease: "power3.out",
          stagger: 0.15,
        },
        0
      );

      // Optional: add slight de-emphasis on earlier cards as scroll progresses
      cards.forEach((card, i) => {
        const depthTl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: `+=${totalSpacing}`,
            scrub: true,
          },
        });
        // earlier cards slightly dim
        if (i < 3) {
          depthTl.to(
            card,
            {
              filter: "brightness(0.94)",
            },
            0
          );
        }
      });
    }, container);

    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      if (lenis && typeof lenis.off === "function" && lenisHandlerRef.current) {
        lenis.off("scroll", lenisHandlerRef.current);
      }
    };
  }, [projects]);

  return (
    <section
      ref={containerRef as any}
      className="relative w-full bg-transparent"
      style={{ minHeight: `${projects.length * 120}vh` }} // enough scroll space
    >
      <div className="max-w-[1400px] mx-auto py-32 px-6">
        <div
          ref={cardsWrapperRef as any}
          className="relative h-[80vh] flex items-center"
          style={{ perspective: "1400px" }}
        >
          {projects.map((p, idx) => {
            const OFFSET_X = 50; // horizontal step
            const OFFSET_Y = 15; // vertical step
            return (
              <div
                key={p.id}
                className={clsx(
                  "project-card pointer-events-none absolute rounded-2xl border border-gray-300 bg-white/[0.95] p-8 shadow-lg backdrop-blur-sm",
                  "overflow-hidden"
                )}
                style={{
                  zIndex: projects.length - idx,
                  transform: `translate(${idx * OFFSET_X}px, ${idx * OFFSET_Y}px)`,
                  width: "380px",
                  // Slight translucent look to earlier ones
                  opacity: 1,
                }}
              >
                <div className="flex items-start gap-4">
                  <div className="text-pink-400 font-extrabold text-4xl flex-shrink-0 leading-none">
                    {String(idx + 1).padStart(2, "0")}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold tracking-tight mb-1 text-black">
                      {p.title}
                    </h3>
                    <p className="text-sm text-gray-700">{p.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
