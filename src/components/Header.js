import { ClockIcon, FuelIcon } from "@/icons";
import Countdown from "react-countdown";
import React from "react";
import { JetBrains_Mono } from "next/font/google";

const timeFont = JetBrains_Mono({
  weight: "500",
  subsets: ["latin"],
  display: "swap",
});

function Header({ time, fuel }) {
  function dateRenderer({ minutes, seconds }) {
    return (
      <span className={`${timeFont.className}`}>
        {minutes < 10 ? `0${minutes}` : minutes}:
        {seconds < 10 ? `0${seconds}` : seconds}
      </span>
    );
  }

  return (
    <header className="flex items-center justify-between px-6 py-3 border-b bg-card">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <ClockIcon className="w-5 h-5 text-card-foreground" />
          <span className="text-card-foreground font-medium">
            <Countdown date={Date.now() + 20000} renderer={dateRenderer} key={time} />
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <FuelIcon className="w-5 h-5 text-card-foreground" />
          <div className="w-20 h-2.5 rounded-full bg-muted">
            <div className={`h-full rounded-full bg-primary`} style={{ width: `${fuel}%` }} />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
