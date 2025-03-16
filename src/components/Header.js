import { ClockIcon } from "@/icons";
import { Ship, Scroll } from "lucide-react";
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
  const [openHealthModal, setOpenHealthModal] = useState(false);
  const [openRulesModal, setOpenRulesModal] = useState(false);

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
        setOpenHealthModal(false);
      },
      onError: async (error) => {
        if (Capacitor.getPlatform() != "web") await NativeAudio.play({ assetId: "wrong" });
        await Haptics.vibrate({ duration: 600 });
        await Toast.show({ text: error.response.data.message });
        setOpenHealthModal(false);
      },
    });
  }

  async function handleCounterComplete() {
    await queryClient.invalidateQueries({ queryKey: ["getQuestion"] });
  }

  return (
    <header className="pirate-header">
      {/* Game Rules Dialog */}
      <Dialog open={openRulesModal} onOpenChange={setOpenRulesModal}>
        <DialogTrigger asChild>
          <div className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-slate-700/70 transition-colors duration-200">
            <ClockIcon className="w-5 h-5" />
            <span className="text-blue-100 font-bold">
              <Countdown date={time + 1820000} renderer={dateRenderer} onComplete={handleCounterComplete} key={time} />
            </span>
          </div>
        </DialogTrigger>
        <DialogContent className="pirate-dialog">
          <DialogHeader>
            <DialogTitle className="text-blue-100 font-bold text-xl flex items-center gap-2">
              <Scroll className="w-5 h-5 text-accent" />
              Game Rules
            </DialogTitle>
            <DialogDescription className="text-blue-200 font-medium">
              Navigate the seven seas and find the hidden treasure!
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="bg-slate-800/70 p-4 rounded-lg border border-blue-400/20">
              <h3 className="text-blue-100 font-bold mb-2">Time Limit</h3>
              <p className="text-blue-200 text-sm">You have 30 minutes to complete the quest. The timer at the top shows your remaining time.</p>
            </div>

            <div className="bg-slate-800/70 p-4 rounded-lg border border-blue-400/20">
              <h3 className="text-blue-100 font-bold mb-2">Ship Health</h3>
              <p className="text-blue-200 text-sm">Your ship's health decreases over time. Scan coupons to restore health and keep sailing!</p>
            </div>

            <div className="bg-slate-800/70 p-4 rounded-lg border border-blue-400/20">
              <h3 className="text-blue-100 font-bold mb-2">Treasure Hunt</h3>
              <p className="text-blue-200 text-sm">Solve riddles, find clues, and scan QR codes to progress through your adventure.</p>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setOpenRulesModal(false)} className="pirate-button">
              Set Sail!
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Ship Health Dialog */}
      <Dialog open={openHealthModal} onOpenChange={setOpenHealthModal}>
        <DialogTrigger asChild>
          <div className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-slate-700/30 rounded-full transition-colors duration-200">
            <Ship className="w-6 h-6 text-blue-200" strokeWidth={2} />
            <div className="w-28 h-4 rounded-full bg-slate-700 overflow-hidden border border-blue-400/20 shadow-inner">
              <div
                className={`h-full rounded-full ${health <= 20 ? "bg-red-500" :
                  health <= 50 ? "bg-yellow-500" : "bg-green-500"
                  } transition-all duration-300 shadow-inner`}
                style={{ width: `${health}%` }}
              />
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="pirate-dialog">
          <DialogHeader>
            <DialogTitle className="text-blue-100 font-bold text-xl">Restore Ship Health</DialogTitle>
            <DialogDescription className="text-blue-200 font-medium">
              Scan the coupon code to revive the Ship before it's too late!
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="w-full bg-slate-900 h-6 rounded-full overflow-hidden my-4 border border-blue-400/30 shadow-inner">
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
            <Button onClick={readCoupon} className="pirate-button">
              Scan Coupon
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </header>
  );
}

export default Header;