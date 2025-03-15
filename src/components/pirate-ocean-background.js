"use client";

import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { useWindowSize } from "@/hooks/use-window-size";
import  {CloudLayer}  from "./cloud-layer";
import { AnimatedShip } from "./animated-ship";

export default function PirateOceanBackground({
  children,
  waveColor = "#2a5b7c",
  waveHighlightColor = "#3a7b9c",
  backgroundColor = "#0c1f36",
  shipScale = 0.45,
  mobileShipScale = 0.3,
}) {
  const canvasRef = useRef(null);
  const animationRef = useRef(0);
  const lastTimeRef = useRef(0);
  const animationFrameRef = useRef(0);
  const { width, height } = useWindowSize();
  const [shipPosition, setShipPosition] = useState({ x: 0, y: 0, rotation: 0 });

  const isMobile = useMemo(() => (width ? width < 768 : false), [width]);
  const effectiveShipScale = useMemo(() => (isMobile ? mobileShipScale : shipScale), [isMobile, mobileShipScale, shipScale]);

  const animationParams = useMemo(() => {
    const safeWidth = width || 1000;
    const safeHeight = height || 600;
    const baseAmplitude = safeHeight * (isMobile ? 0.02 : 0.025);
    const shipXAmplitude = safeWidth * (isMobile ? 0.04 : 0.06);

    return {
      waves: {
        count: isMobile ? 4 : 5,
        segments: Math.ceil(safeWidth / 5),
        amplitude: baseAmplitude,
        frequency: 0.01,
        speed: 0.02,
        heightOffset: safeHeight * (isMobile ? 0.7 : 0.6),
        gerstnerFactor: 0.15,
        choppiness: 1.5,
      },
      ship: {
        xAmplitude: shipXAmplitude,
        xFrequency: 0.0003,
        yOffset: isMobile ? 120 * effectiveShipScale : 200 * effectiveShipScale,
        rotationFactor: isMobile ? 0.6 : 0.7,
        sampleDistance: 40,
      },
    };
  }, [width, height, effectiveShipScale, isMobile]);

  const lightenColor = useCallback((color, percent) => {
    const num = parseInt(color.slice(1), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.min(255, (num >> 16) + amt);
    const G = Math.min(255, ((num >> 8) & 0x00ff) + amt);
    const B = Math.min(255, (num & 0x0000ff) + amt);
    return `#${((R << 16) | (G << 8) | B).toString(16).padStart(6, "0")}`;
  }, []);

  const createWaveTexture = useCallback(() => {
    const textureCanvas = document.createElement("canvas");
    const textureCtx = textureCanvas.getContext("2d");
    textureCanvas.width = 256;
    textureCanvas.height = 256;

    if (textureCtx) {
      const gradient = textureCtx.createLinearGradient(0, 0, 256, 256);
      gradient.addColorStop(0, "rgba(255, 255, 255, 0.1)");
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
      textureCtx.fillStyle = gradient;
      textureCtx.fillRect(0, 0, 256, 256);
    }

    return textureCanvas;
  }, []);

  const calculateWave = useCallback(
    (x, time, waveIndex, choppiness) => {
      const { frequency, amplitude } = animationParams.waves;
      const waveFrequency = frequency * (1 - waveIndex * 0.05);
      const waveAmplitude = amplitude * (1 + waveIndex * 0.15);
      const waveX = x * waveFrequency;

      let y = Math.sin(waveX + time) * waveAmplitude;
      y += Math.sin(waveX * 1.5 + time * 1.2) * waveAmplitude * 0.3;

      const xDisplacement = Math.cos(waveX + time) * waveAmplitude * animationParams.waves.gerstnerFactor * choppiness;

      return { y, xDisplacement };
    },
    [animationParams.waves],
  );

  useEffect(() => {
    if (!canvasRef.current || !width || !height) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const skyGradient = ctx.createLinearGradient(0, 0, 0, animationParams.waves.heightOffset);
    skyGradient.addColorStop(0, lightenColor(backgroundColor, 40));
    skyGradient.addColorStop(0.3, lightenColor(backgroundColor, 20));
    skyGradient.addColorStop(0.6, lightenColor(backgroundColor, 10));
    skyGradient.addColorStop(1, backgroundColor);

    const waveTexture = createWaveTexture();

    const animate = (currentTime) => {
      if (lastTimeRef.current === 0) lastTimeRef.current = currentTime;
      const deltaTime = currentTime - lastTimeRef.current;
      lastTimeRef.current = currentTime;

      const speedFactor = Math.min(deltaTime / 16.667, 2);
      animationFrameRef.current += deltaTime * 0.06 * speedFactor;
      const time = animationFrameRef.current * animationParams.waves.speed;

      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = skyGradient;
      ctx.fillRect(0, 0, width, animationParams.waves.heightOffset);

      const { ship, waves } = animationParams;
      const shipBaseX = isMobile ? width * 0.6 : width * 0.8;
      const timeOffset = animationFrameRef.current * ship.xFrequency;
      const shipX = shipBaseX + Math.sin(timeOffset) * ship.xAmplitude;

      const { y: waveHeightAtShip } = calculateWave(shipX, time, 0, waves.choppiness);

      const prevX = shipX - ship.sampleDistance;
      const nextX = shipX + ship.sampleDistance;
      const { y: prevY } = calculateWave(prevX, time, 0, waves.choppiness);
      const { y: nextY } = calculateWave(nextX, time, 0, waves.choppiness);

      const shipRotation = Math.atan2(nextY - prevY, nextX - prevX) * ship.rotationFactor;
      const shipY = waves.heightOffset + waveHeightAtShip - ship.yOffset;

      setShipPosition({
        x: shipX,
        y: shipY,
        rotation: shipRotation,
      });

      for (let waveIndex = 0; waveIndex < animationParams.waves.count; waveIndex++) {
        const waveAmplitude = waves.amplitude * (1 + waveIndex * 0.15);
        const waveOffset = waves.heightOffset + waveIndex * 20;
        const waveAlpha = 1 - waveIndex * 0.15;
        const waveChoppiness = waves.choppiness * (1 - waveIndex * 0.2);

        ctx.beginPath();
        ctx.moveTo(0, height);

        for (let i = 0; i <= waves.segments; i++) {
          const x = (i / waves.segments) * width;
          const { y: waveY, xDisplacement } = calculateWave(x, time, waveIndex, waveChoppiness);

          const adjustedX = Math.max(0, Math.min(width, x + xDisplacement));
          const adjustedY = waveOffset + waveY;

          if (i === 0) {
            ctx.moveTo(adjustedX, adjustedY);
          } else {
            ctx.lineTo(adjustedX, adjustedY);
          }
        }

        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();

        const gradient = ctx.createLinearGradient(0, waveOffset - waveAmplitude * 2, 0, waveOffset + waveAmplitude * 3);
        const alphaHex = Math.floor(waveAlpha * 255)
          .toString(16)
          .padStart(2, "0");

        gradient.addColorStop(0, `${lightenColor(waveHighlightColor, 10)}${alphaHex}`);
        gradient.addColorStop(0.4, `${waveColor}${alphaHex}`);
        gradient.addColorStop(1, `${backgroundColor}${alphaHex}`);

        ctx.fillStyle = gradient;
        ctx.fill();

        if (waveIndex === 0) {
          ctx.save();
          ctx.globalAlpha = 0.05;
          ctx.globalCompositeOperation = "overlay";

          const textureOffset = (time * 20) % 256;
          ctx.drawImage(waveTexture, -textureOffset, waveOffset - waveAmplitude, width + 256, waveAmplitude * 2);
          ctx.restore();
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      lastTimeRef.current = 0;
    };
  }, [width, height, backgroundColor, waveColor, waveHighlightColor, animationParams, lightenColor, calculateWave, createWaveTexture, isMobile]);

  return (
    <div className="fixed inset-0 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{
          width: "100%",
          height: "100%",
        }}
      />

      <div className="absolute inset-0 pointer-events-none">
        <CloudLayer count={2} minY={40} maxY={120} baseSpeed={0.12} baseScale={1.2} baseOpacity={0.3} />
        <CloudLayer count={2} minY={100} maxY={180} baseSpeed={0.2} baseScale={0.9} baseOpacity={0.4} />
      </div>
      <AnimatedShip x={shipPosition.x} y={shipPosition.y} rotation={shipPosition.rotation} scale={effectiveShipScale} />

      <div className="relative z-10 w-full h-full p-4 sm:p-6 md:p-8 lg:p-12">{children}</div>
    </div>
  );
}