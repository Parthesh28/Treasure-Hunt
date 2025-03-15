import { ClockIcon } from "@/icons";
import { Ship } from "lucide-react";
import Countdown from "react-countdown";
import { Button } from "@/components/ui/button"
import React, { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useRestoreHealthMutation } from "@/services/mutations";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

import { Toast } from "@capacitor/toast";
import { Capacitor } from "@capacitor/core";
import { Haptics } from "@capacitor/haptics";
import { NativeAudio } from "@capgo/native-audio";
import { CapacitorBarcodeScanner, CapacitorBarcodeScannerTypeHint } from "@capacitor/barcode-scanner";

function Header({ time, health }) {
  const [newhealth, setHealth] = useState(health);
  const [openModal, setOpenModal] = useState(false);

  const queryClient = useQueryClient();
  const mutation = useRestoreHealthMutation();

  useEffect(() => {
    setHealth(health);

    const id = setInterval(() => {
      // per 5 second deduct 0.125 (5/40)
      setHealth((oldhealth) => oldhealth - 0.125);
    }, 5000);
    return () => {
      clearInterval(id);
    }
  }, [health])

  function dateRenderer({ minutes, seconds }) {
    return (
      <span>
        {minutes < 10 ? `0${minutes}` : minutes}:
        {seconds < 10 ? `0${seconds}` : seconds}
      </span>
    );
  }

  async function readCoupon() {
    const { ScanResult: coupon } = await CapacitorBarcodeScanner.scanBarcode({
      hint: CapacitorBarcodeScannerTypeHint.AZTEC,
    });

    if (!coupon) return;

    mutation.mutate({ coupon }, {
      onSuccess: async () => {
        if (Capacitor.getPlatform() != "web") await NativeAudio.play({ assetId: "right" });
        await queryClient.invalidateQueries({ queryKey: ["getQuestion"] });
        await Toast.show({ text: "Ship Restoration Successful" });
        setOpenModal(false);
      },
      onError: async (error) => {
        if (Capacitor.getPlatform() != "web") await NativeAudio.play({ assetId: "wrong" });
        await Haptics.vibrate({ duration: 600 });
        await Toast.show({ text: error.response.data.message });
        setOpenModal(false);
      },
    });
  }

  async function handleCounterComplete() {
    await queryClient.invalidateQueries({ queryKey: ["getQuestion"] });
  }

  return (
    <header className="flex items-center bg-slate-800 bg-opacity-70 backdrop-blur-md rounded-full shadow-md justify-between">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-4 py-2">
          <ClockIcon className="w-5 h-5 text-blue-200" />
          <span className="text-blue-100 font-bold">
            <Countdown date={time + 1820000} renderer={dateRenderer} onComplete={handleCounterComplete} key={time} />
          </span>
        </div>
      </div>

      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogTrigger asChild>
          <div className="flex items-center gap-3 px-4 py-2 cursor-pointer">
            <Ship className="w-6 h-6 text-blue-200" strokeWidth={2} />
            <div className="w-28 h-4 rounded-full bg-slate-700 overflow-hidden border border-blue-400 border-opacity-20">
              <div
                className={`h-full rounded-full ${health <= 20 ? "bg-red-500" :
                    health <= 50 ? "bg-yellow-500" : "bg-green-500"
                  } transition-all duration-300 shadow-inner`}
                style={{ width: `${health}%` }}
              />
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="rounded-xl bg-cyan-950 border-2 border-blue-300 border-opacity-40 shadow-xl shadow-blue-900/30">
          <DialogHeader>
            <DialogTitle className="text-blue-100 font-bold text-xl">Restore Ship Health</DialogTitle>
            <DialogDescription className="text-blue-200 font-medium">
              Scan the coupon code to revive the Ship before it's too late!
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="w-full bg-slate-900 h-6 rounded-full overflow-hidden my-4 border border-blue-400 border-opacity-30">
              <div
                className={`h-full ${health <= 20 ? "bg-red-500" :
                    health <= 50 ? "bg-yellow-500" : "bg-green-500"
                  } transition-all duration-300 shadow-inner`}
                style={{ width: `${health}%` }}
              />
            </div>
            <p className="text-center text-sm font-medium text-blue-100">Current health: {Math.round(health)}%</p>
          </div>
          <DialogFooter>
            <Button onClick={readCoupon} className="bg-sky-900 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105 border border-blue-300 border-opacity-30">
              Scan Coupon
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </header>
  );
}

export default Header;