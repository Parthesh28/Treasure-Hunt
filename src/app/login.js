import { cn } from "@/lib/utils";
import { Footer } from "@/components";
import React, { useState } from "react";
import { InstagramIcon } from "lucide-react"; // deprecated
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import "animate.css";

export default function Login({ handleLogin, animation }) {
  const [value, setValue] = useState("");

  async function handleOTPInput(e) {
    await handleLogin(e);
    setValue("");
  }

  return (
    <div className="flex flex-col w-full min-h-screen bg-background">
      <header className="flex items-center justify-between px-6 py-3 border-b bg-card">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span
              className={cn(["text-card-foreground font-extrabold text-lg"])}
            >
              SpaceRun
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <a
              href="https://instagram.com/codexsfit"
              target="_blank"
              className="text-card-foreground text-xs font-bold"
            >
              <InstagramIcon
                color="hsl(var(--card-foreground))"
                size={22}
                strokeWidth={2.2}
              />
            </a>
          </div>
        </div>
      </header>
      <main
        className={cn([
          "flex-1 flex flex-col items-center justify-center gap-6 px-4 py-8 animate__animated",
          animation.animate && "animate__headShake",
        ])}
        onAnimationEnd={() => {
          animation.setAnimate(false);
        }}
      >
        <p className="text-2xl font-bold">Enter Access Code</p>
        <InputOTP
          maxLength={6}
          onComplete={handleOTPInput}
          value={value}
          onChange={setValue}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </main>
      <Footer mapHidden />
    </div>
  );
}
