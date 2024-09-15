import React, { useState, useEffect } from "react";
import { ClockIcon } from "@/icons";
import { Ship } from "lucide-react";
import Countdown from "react-countdown";
import { useQueryClient } from "@tanstack/react-query";

function Header({ time, fuel }) {
  const [newFuel, setFuel] = useState(fuel);
  const queryClient = useQueryClient();

  useEffect(() => {
    const id = setInterval(() => {
      // per 5 second deduct 0.125 (5/40)
      setFuel(async (oldFuel) => {
        if (oldFuel - 0.125 <= 0) {
          await queryClient.invalidateQueries({ queryKey: ["getQuestion"] });
          return 0;
        }
        return oldFuel - 0.125;
      });
    }, 5000);

    return () => {
      clearInterval(id);
    }
  }, [])

  function dateRenderer({ minutes, seconds }) {
    return (
      <span>
        {minutes < 10 ? `0${minutes}` : minutes}:
        {seconds < 10 ? `0${seconds}` : seconds}
      </span>
    );
  }

  async function handleCounterComplete() {
    await queryClient.invalidateQueries({ queryKey: ["getQuestion"] });
  }

  return (
    <header className="flex items-center justify-between px-6 py-3 600 bg-transparent">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <ClockIcon className="w-5 h-5 text-card-foreground" />
          <span className="text-card-foreground font-medium text-white">
            <Countdown date={time + 1820000} renderer={dateRenderer} onComplete={handleCounterComplete} key={time} />
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <Ship className="w-5 h-5 text-card-foreground text-white" />
          <div className="w-20 h-2.5 rounded-full bg-muted">
            <div className={`h-full rounded-full bg-secondary`} style={{ width: `${newFuel}%` }} />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
