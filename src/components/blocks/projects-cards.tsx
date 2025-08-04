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
  projects = SAMPLE_PROJECTS,
}: {
  projects?: ProjectItem[];
}) {
  const containerRef = useRef<HTMLElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);
  const lenisHandlerRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const container = containerRef.current!;
    const cardsContainer = cardsRef.current!;
    const cards: HTMLElement[] = Array.from(
      cardsContainer.querySelectorAll(".project-card")
    ) as any;

    // === Lenis integration ===
    const lenis = (window as any).lenis || (window as any).lenisInstance;
    if (!lenis) {
      console.warn(
        "[ProjectsStackSection] Lenis instance missing on window; ScrollTrigger sync may degrade."
      );
    }

    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value?: number) {
        if (!lenis) {
          if (arguments.length) window.scrollTo(0, value as number);
          return window.scrollY;
        }
        if (arguments.length) {
          if (typeof lenis.scrollTo === "function") {
            lenis.scrollTo(value, { immediate: true });
          } else {
            window.scrollTo(0, value as number);
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

    // Timeline
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=800", // controls how long the pin/animation lasts
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });

      // cards come in with staggered upward fade; they sit in their layered offset position already via CSS
      tl.from(
        cards,
        {
          y: 50,
          opacity: 0,
          scale: 0.98,
          ease: "power3.out",
          stagger: 0.15,
        },
        0
      );

      // optional subtle 3d depth shift on earlier cards as scroll progresses
      cards.forEach((card, i) => {
        const depthTl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: "+=800",
            scrub: true,
          },
        });
        // earlier cards slightly shift in z or blur to feel like depth (lightly)
        depthTl.to(
          card,
          {
            filter: i < 3 ? "brightness(0.95)" : "none",
            // you could also add a tiny rotateX/rotateY if desired for parallax:
            // rotationX: i * 0.2,
          },
          0
        );
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
      className="relative w-full min-h-[120vh] bg-transparent"
    >
      <div className="max-w-[1200px] mx-auto py-32 px-6">
        <div className="relative" style={{ perspective: "1000px" }}>
          {projects.map((p, idx) => (
            <div
              key={p.id}
              className={clsx(
                "project-card pointer-events-none relative rounded-2xl border border-gray-700 bg-[#0f0f11] p-8 shadow-2xl backdrop-blur-md max-w-xl",
                // stacking offset
                "will-change-transform"
              )}
              style={{
                zIndex: projects.length - idx,
                transform: `translateY(${idx * 10}px)`,
                marginTop: idx === 0 ? 0 : `-${(projects.length - idx) * 2}px`,
              }}
            >
              <div className="flex items-start gap-4">
                <div className="text-indigo-500 font-mono text-2xl flex-shrink-0">
                  {String(idx + 1).padStart(2, "0")}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold tracking-tight mb-1">
                    {p.title}
                  </h3>
                  <p className="text-sm text-gray-300">{p.description}</p>
                </div>
              </div>
            </div>
          ))}
          {/* Spacer so pinned section has room after animation */}
          <div ref={cardsRef as any} className="absolute inset-0 pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
