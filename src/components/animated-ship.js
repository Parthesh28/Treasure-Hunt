"use client";

import { motion } from "framer-motion";

export function AnimatedShip({ x, y, rotation, scale }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        width: `${400 * scale}px`,
        height: `${400 * scale}px`,
        willChange: "transform",
        transformOrigin: "center 75%", // Adjusted from 70% to 75%
      }}
      animate={{
        x,
        y,
        rotate: rotation * (180 / Math.PI),
      }}
      transition={{
        type: "spring",
        damping: 18, // Increased from 12 to 18 for less oscillation
        stiffness: 180, // Increased from 120 to 180 for tighter following
        restDelta: 0.0005, // Reduced for more precise positioning
        mass: 0.8, // Slightly reduced for better responsiveness
      }}
    >
      <img
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL_E_2025-03-11_08.51.07_-_A_detailed_and_semi-realistic_cartoon-style_pirate_ship_viewed_strictly_from_the_front._The_ship_has_a_large_wooden_hull_with_intricate_carvings_and_m-removebg-preview-erfNv2ZuTrEkO6npKvuae3334QFvCZ.png"
        alt="Pirate Ship"
        className="w-full h-full object-contain"
        style={{
          filter: "drop-shadow(0 8px 16px rgba(0, 0, 0, 0.4)) brightness(0.95) contrast(1.05)",
        }}
      />
    </motion.div>
  );
}