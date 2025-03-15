"use client";

import { useEffect, useState, useRef } from "react";

export function AnimatedCloud({ initialX, y, scale, speed, opacity }) {
  const [x, setX] = useState(initialX);
  const lastTimeRef = useRef(0);
  const requestRef = useRef();
  const width = typeof window !== "undefined" ? window.innerWidth : 1000;

  useEffect(() => {
    const animate = (time) => {
      if (lastTimeRef.current === 0) {
        lastTimeRef.current = time;
      }

      const deltaTime = time - lastTimeRef.current;
      lastTimeRef.current = time;

      setX((prev) => {
        const newX = prev + speed * (deltaTime * 0.05);
        return newX > width + 200 ? -200 : newX;
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [speed, width]);

  return (
    <img
      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-48ApH8YyFYKxOH59BqCT42cEq4krX6.png"
      alt="Cloud"
      className="absolute pointer-events-none"
      style={{
        transform: `translateX(${x}px) translateY(${y}px) scale(${scale})`,
        opacity,
        width: "200px",
        height: "auto",
        willChange: "transform",
        filter: "brightness(0.95) contrast(1.05)",
      }}
    />
  );
}