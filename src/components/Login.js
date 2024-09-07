import { cn } from "@/lib/utils";
import { Footer } from "@/components";
import React, { useState } from "react";
import { InstagramIcon } from "lucide-react"; // deprecated
import { useQueryClient } from "@tanstack/react-query";
import { useLoginMutation } from "@/services/mutations";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

import { Haptics } from "@capacitor/haptics";
import { Toast } from "@capacitor/toast";
import { Preferences } from "@capacitor/preferences";

import "animate.css";

export default function Login() {
  const [otp, setOtp] = useState("");
  const loginMutation = useLoginMutation();
  const queryClient = useQueryClient();

  async function handleLogin() {
    loginMutation.mutate({ otp }, {
      onSuccess: async ({ token }) => {
        await Preferences.set({ key: "token", value: token });
        await queryClient.invalidateQueries({ queryKey: ["loginQuery"] })
      },
      onError: async (error) => {
        setOtp("");
        await Haptics.vibrate();
        await Toast.show({ text: error.response.data.message });
      },
    });
  }

  return (
    <div className="flex flex-col w-full min-h-screen bg-background">
      <header className="flex items-center justify-between px-6 py-3 border-b bg-card">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className={cn(["text-card-foreground font-extrabold"])}>
              SpaceRun
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <a href="https://instagram.com/codexsfit" target="_blank" className="text-card-foreground text-xs font-bold">
              <InstagramIcon color="hsl(var(--card-foreground))" size={22} strokeWidth={2.2} />
            </a>
          </div>
        </div>
      </header>
      <main className={"flex-1 flex flex-col items-center justify-center gap-6 px-4 py-8"}>
        <p className="text-2xl font-bold">Enter Access Code</p>
        <InputOTP maxLength={6} onComplete={handleLogin} value={otp} onChange={setOtp}>
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
