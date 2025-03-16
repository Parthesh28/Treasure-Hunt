import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { MapIcon, Anchor } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useLoginMutation } from "@/services/mutations";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Card, CardContent } from "./ui/card";
import { Toast } from "@capacitor/toast";
import { Haptics } from "@capacitor/haptics";
import { Preferences } from "@capacitor/preferences";
import "animate.css";

export default function Login() {
  const [otp, setOtp] = useState("");
  const [animate, setAnimate] = useState(false);
  const loginMutation = useLoginMutation();
  const queryClient = useQueryClient();

  async function handleLogin() {
    loginMutation.mutate({ otp: parseInt(otp) }, {
      onSuccess: async ({ token }) => {
        await Preferences.set({ key: "token", value: token });
        await queryClient.invalidateQueries({ queryKey: ["loginQuery"] })
      },
      onError: async (error) => {
        setOtp("");
        setAnimate("true");
        await Haptics.vibrate();
        await Toast.show({ text: error.response.data.message });
      },
    });
  }

  return (
    <div className="flex flex-col w-full min-h-screen overflow-hidden relative">
      <main
        className={cn([
          "relative z-10 flex-1 flex flex-col items-center justify-center py-12",
          animate && "animate__animated animate__headShake",
        ])}
        onAnimationEnd={() => {
          setAnimate(false);
        }}
      >
        <Card className="pirate-card treasure-glow max-w-md w-full animate-float">
          <CardContent className="p-8">
            <div className="flex flex-col items-center space-y-6">
              <div className="bg-accent rounded-full p-5 shadow-lg animate-pulse-glow">
                <MapIcon className="w-12 h-12 text-accent-foreground" strokeWidth={2} />
              </div>

              <div className="animate__animated animate__fadeIn w-full">
                <h1 className="text-2xl font-bold text-blue-100 mb-2 text-center">Enter Secret Code</h1>
                <p className="text-blue-200 mb-8 text-center text-sm flex items-center justify-center gap-2">
                  <Anchor className="w-4 h-4" />
                  <span>Enter the secret code to claim your bounty!</span>
                </p>

                <div className="flex flex-col relative w-full mb-8 items-center">
                  <InputOTP maxLength={6} onComplete={handleLogin} value={otp} onChange={setOtp}>
                    <InputOTPGroup>
                      <InputOTPSlot className="bg-slate-700/60 border-blue-400/30 text-blue-100 font-bold focus:border-accent focus:ring-accent/30" index={0} />
                      <InputOTPSlot className="bg-slate-700/60 border-blue-400/30 text-blue-100 font-bold focus:border-accent focus:ring-accent/30" index={1} />
                      <InputOTPSlot className="bg-slate-700/60 border-blue-400/30 text-blue-100 font-bold focus:border-accent focus:ring-accent/30" index={2} />
                      <InputOTPSlot className="bg-slate-700/60 border-blue-400/30 text-blue-100 font-bold focus:border-accent focus:ring-accent/30" index={3} />
                      <InputOTPSlot className="bg-slate-700/60 border-blue-400/30 text-blue-100 font-bold focus:border-accent focus:ring-accent/30" index={4} />
                      <InputOTPSlot className="bg-slate-700/60 border-blue-400/30 text-blue-100 font-bold focus:border-accent focus:ring-accent/30" index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}