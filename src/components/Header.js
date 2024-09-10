import { ClockIcon, FuelIcon } from "@/icons";
import Countdown from "react-countdown";
import React from "react";
import { Ship } from "lucide-react";

function Header({ time, fuel }) {
  function dateRenderer({ minutes, seconds }) {
    return (
      <span>
        {minutes < 10 ? `0${minutes}` : minutes}:
        {seconds < 10 ? `0${seconds}` : seconds}
      </span>
    );
  }

  return (
    <header className="flex items-center justify-between px-6 py-3 600 bg-transparent">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <ClockIcon className="w-5 h-5 text-card-foreground" />
          <span className="text-card-foreground font-medium text-white">
            <Countdown date={Date.now() + 20000} renderer={dateRenderer} key={time} />
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <Ship className="w-5 h-5 text-card-foreground text-white" />
          <div className="w-20 h-2.5 rounded-full bg-muted">
            <div className={`h-full rounded-full bg-primary`} style={{ width: `${fuel}%` }} />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
