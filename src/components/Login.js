import { cn } from "../lib/utils";
import React, { useState, useEffect } from "react";
import { MapIcon, Anchor, Compass, Key } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useLoginMutation } from "../services/mutations";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./ui/input-otp";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Toast } from "@capacitor/toast";
import { Haptics } from "@capacitor/haptics";
import { Preferences } from "@capacitor/preferences";
import "animate.css";

export default function Login() {
  const [otp, setOtp] = useState("");
  const [animate, setAnimate] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const loginMutation = useLoginMutation();
  const queryClient = useQueryClient();

  useEffect(() => {
    setIsComplete(otp.length === 6);
  }, [otp]);

  async function handleLogin() {
    if (otp.length !== 6) return;

    loginMutation.mutate({ otp: parseInt(otp) }, {
      onSuccess: async ({ token }) => {
        await Preferences.set({ key: "token", value: token });
        await queryClient.invalidateQueries({ queryKey: ["loginQuery"] })
      },
      onError: async (error) => {
        setOtp("");
        setAnimate(true);
        await Haptics.vibrate();
        await Toast.show({ text: error.response.data.message });
      },
    });
  }

  return (
    <div className="flex flex-col w-full min-h-screen overflow-hidden relative">
      {/* Decorative elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      <main
        className={cn([
          "relative z-10 flex-1 flex flex-col items-center justify-center py-12 px-4",
          animate && "animate__animated animate__headShake",
        ])}
        onAnimationEnd={() => {
          setAnimate(false);
        }}
      >
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 animate-wave">
          <Compass className="w-16 h-16 text-blue-300/30" strokeWidth={1} />
        </div>

        <Card className="pirate-card treasure-glow max-w-md w-full animate-float">
          <CardContent className="p-8">
            <div className="flex flex-col items-center space-y-6">
              <div className="bg-accent rounded-full p-5 shadow-lg animate-pulse-glow relative">
                <div className="absolute inset-0 rounded-full bg-accent/30 animate-ping"></div>
                <MapIcon className="w-12 h-12 text-accent-foreground" strokeWidth={2} />
              </div>

              <div className="animate__animated animate__fadeIn w-full">
                <h1 className="text-2xl font-bold text-blue-100 mb-2 text-center">Enter Secret Code</h1>
                <p className="text-blue-200 mb-8 text-center text-sm flex items-center justify-center gap-2">
                  <Anchor className="w-4 h-4 text-blue-300" />
                  <span>Enter the secret code to claim your bounty!</span>
                </p>

                <div className="flex flex-col relative w-full mb-8 items-center">
                  <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                    <InputOTPGroup>
                      {Array.from({ length: 6 }).map((_, index) => (
                        <InputOTPSlot
                          key={index}
                          index={index}
                          className="bg-slate-700/60 backdrop-blur-md border-blue-400/30 text-blue-100 font-bold focus:border-accent focus:ring-accent/30 h-12 w-12 text-xl transition-all duration-200"
                        />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                </div>

                <Button
                  onClick={handleLogin}
                  disabled={!isComplete || loginMutation.isPending}
                  className={`w-full treasure-button flex items-center justify-center gap-2 ${!isComplete ? 'opacity-70' : 'animate-pulse-glow'}`}
                >
                  <Key className="w-5 h-5" />
                  {loginMutation.isPending ? "Unlocking..." : "Unlock Treasure"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-blue-300/70 text-sm text-center animate__animated animate__fadeIn animate__delay-1s">
          <p>Find the secret code hidden in the treasure map</p>
        </div>
      </main>
    </div>
  );
}