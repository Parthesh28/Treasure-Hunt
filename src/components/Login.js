import { cn } from "@/lib/utils";
import { Footer } from "@/components";
import React, { useState } from "react";
import { InstagramIcon, MapIcon } from "lucide-react"; // deprecated
import { useQueryClient } from "@tanstack/react-query";
import { useLoginMutation } from "@/services/mutations";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
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
        <div className="w-full max-w-md transition-all duration-500">
          <div className="relative bg-gradient-to-br from-[#ffe9c2] to-[#d4b483] rounded-xl p-8 shadow-2xl overflow-hidden">
            <div className="absolute inset-0 border-8 border-transparent rounded-xl" style={{
              boxShadow: 'inset 0 0 30px rgba(139, 69, 19, 0.5)'
            }}></div>

            <div className="relative flex flex-col items-center z-10">
              <div className="mb-6 flex items-center justify-center">
                <div className="relative animate__animated animate__pulse animate__infinite animate__slower">
                  <MapIcon className="h-16 w-16 text-[#8b4513]" />
                </div>
              </div>

              <div className="animate__animated animate__fadeIn w-full">
                <h1 className="text-2xl font-bold text-[#8b4513] mb-2 text-center">Enter Code</h1>
                <p className="text-[#8b4513]/80 mb-8 text-center text-sm">
                  Enter the secret code to claim your bounty!
                </p>

                <div className="flex flex-col relative w-full mb-8 items-center">
                  <InputOTP maxLength={6} onComplete={handleLogin} value={otp} onChange={setOtp}>
                    <InputOTPGroup >
                          <InputOTPSlot className="bg-[#ffe9c2] border-[#8b4513]/50 text-[#8b4513] font-bold focus:border-[#e83b3b] focus:ring-[#e83b3b]/30"  index={0} />
                          <InputOTPSlot className="bg-[#ffe9c2] border-[#8b4513]/50 text-[#8b4513] font-bold focus:border-[#e83b3b] focus:ring-[#e83b3b]/30" index={1} />
                          <InputOTPSlot className="bg-[#ffe9c2] border-[#8b4513]/50 text-[#8b4513] font-bold focus:border-[#e83b3b] focus:ring-[#e83b3b]/30" index={2} />
                          <InputOTPSlot className="bg-[#ffe9c2] border-[#8b4513]/50 text-[#8b4513] font-bold focus:border-[#e83b3b] focus:ring-[#e83b3b]/30" index={3} />
                          <InputOTPSlot className="bg-[#ffe9c2] border-[#8b4513]/50 text-[#8b4513] font-bold focus:border-[#e83b3b] focus:ring-[#e83b3b]/30" index={4} />
                          <InputOTPSlot className="bg-[#ffe9c2] border-[#8b4513]/50 text-[#8b4513] font-bold focus:border-[#e83b3b] focus:ring-[#e83b3b]/30" index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer mapHidden className="relative z-10 bg-transparent text-[#f0c05a]/70" />
    </div>
  );
}