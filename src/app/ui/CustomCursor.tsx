"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    window.addEventListener("mousemove", moveCursor);
    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-50 mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <div className="relative w-full h-full">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border-2 border-white animate-pulse" />
          {/* Inner dot */}
          <div className="absolute inset-[25%] rounded-full bg-white" />
        </div>
      </motion.div>

      {/* Trail effect */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 pointer-events-none z-40 mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          scale: 0.5,
          opacity: 0.5,
        }}
      >
        <div className="w-full h-full rounded-full bg-white blur-sm" />
      </motion.div>
    </>
  );
} 