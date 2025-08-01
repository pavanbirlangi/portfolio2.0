"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader({ onFinish }: { onFinish: () => void }) {
  const [loading, setLoading] = useState(true);
  const [showSplit, setShowSplit] = useState(false);
  const [barFull, setBarFull] = useState(false);
  const [hideLine, setHideLine] = useState(false);
  const [fadeBackground, setFadeBackground] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const [showPercentage, setShowPercentage] = useState(true);

  const percentageRef = useRef(0);

  const baseDuration = 3500; // bar animation time
  const randomDelay = Math.random() * 0.5 + 0.2;
  const totalDuration = baseDuration + randomDelay * 1000;

  useEffect(() => {
    const steps = 100;
    const intervalDuration = totalDuration / steps;

    const interval = setInterval(() => {
      if (percentageRef.current < 100) {
        percentageRef.current += 1;
        setPercentage(percentageRef.current);
      } else {
        clearInterval(interval);
      }
    }, intervalDuration);

    const barTimer = setTimeout(() => {
      setBarFull(true);

      setTimeout(() => {
        setShowPercentage(false);
        setShowSplit(true);

        setTimeout(() => {
          setFadeBackground(true);

          setTimeout(() => {
            setHideLine(true);

            setTimeout(() => {
              setLoading(false);
              onFinish();
            }, 400); // Reduced from 600ms to 300ms
          }, 600); // Reduced from 1000ms to 400ms
        }, 180); // Reduced from 300ms to 150ms
      }, 500); // Reduced from 500ms to 200ms
    }, totalDuration);

    return () => {
      clearTimeout(barTimer);
      clearInterval(interval);
    };
  }, [onFinish, totalDuration]);

  const barKeyframes = [0, 0.7, 0.85, 1];
  const barTimes = [0, 0.5, 0.8, 1];

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-auto"
          initial={{ opacity: 1 }}
          animate={{ opacity: fadeBackground ? 0 : 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
          transition={{ duration: 0.3 }}
          style={{ backgroundColor: fadeBackground ? "transparent" : "white" }}
        >
          {/* Loading Bar */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-1 bg-black rounded-full overflow-hidden shadow-lg"
            initial={{ scaleX: 0, width: "32vw", opacity: 1 }}
            animate={
              !barFull
                ? { scaleX: barKeyframes, width: "32vw", opacity: 1 }
                : showSplit
                ? { scaleX: 1, width: "100vw", opacity: hideLine ? 0 : 1 }
                : { scaleX: 1, width: "100vw", opacity: 1 }
            }
            transition={
              !barFull
                ? {
                    delay: randomDelay,
                    duration: baseDuration / 1000,
                    times: barTimes,
                    ease: [0.65, 0, 0.35, 1],
                  }
                : { duration: 0.5 }
            }
            style={{ transformOrigin: "left" }}
          />

          {/* Split Reveal Panels */}
          {showSplit && (
            <>
              <motion.div
                className="fixed left-0 right-0 top-0 h-1/2 bg-white z-[10000]"
                initial={{ y: 0 }}
                animate={{ y: "-100vh" }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              />
              <motion.div
                className="fixed left-0 right-0 bottom-0 h-1/2 bg-white z-[10000]"
                initial={{ y: 0 }}
                animate={{ y: "100vh" }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              />
            </>
          )}

          {/* Percentage Display */}
          <AnimatePresence>
            {showPercentage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute bottom-6 right-8 text-sm text-gray-800 font-semibold z-[10001]"
              >
                {percentage}%
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
