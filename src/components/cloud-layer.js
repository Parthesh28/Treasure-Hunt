"use client";

import { useMemo } from "react";
import { AnimatedCloud } from "./animated-cloud";

export function CloudLayer({ count, minY, maxY, baseSpeed, baseScale, baseOpacity }) {
  const clouds = useMemo(() => {
    const windowWidth = typeof window !== "undefined" ? window.innerWidth : 1000;

    return Array.from({ length: count }, (_, i) => ({
      id: i,
      initialX: Math.random() * windowWidth,
      y: minY + Math.random() * (maxY - minY),
      scale: baseScale * (0.8 + Math.random() * 0.4),
      speed: baseSpeed * (0.8 + Math.random() * 0.4),
      opacity: baseOpacity * (0.8 + Math.random() * 0.4),
    }));
  }, [count, minY, maxY, baseSpeed, baseScale, baseOpacity]);

  return (
    <>
      {clouds.map((cloud) => (
        <AnimatedCloud key={cloud.id} {...cloud} />
      ))}
    </>
  );
}