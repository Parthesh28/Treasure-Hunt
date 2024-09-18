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

function Header({ time, fuel }) {
  const [newFuel, setFuel] = useState(fuel);
  const [openModal, setOpenModal] = useState(false);

  const queryClient = useQueryClient();
  const mutation = useRestoreHealthMutation();

  // todo: when 0 invalidate query
  useEffect(() => {
    setFuel(fuel);

    const id = setInterval(() => {
      // per 5 second deduct 0.125 (5/40)
      setFuel((oldFuel) => oldFuel - 0.125);
    }, 5000);
    return () => {
      clearInterval(id);
    }
  }, [fuel])

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
    <header className="flex items-center justify-between px-6 py-3 600 bg-transparent">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <ClockIcon className="w-5 h-5 text-card-foreground" />
          <span className="text-card-foreground font-medium text-white">
            <Countdown date={time + 1820000} renderer={dateRenderer} onComplete={handleCounterComplete} key={time} />
          </span>
        </div>
      </div>

      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogTrigger asChild>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <Ship className="w-5 h-5 text-card-foreground text-white" />
              <div className="w-20 h-2.5 rounded-full bg-muted">
                <div className={`h-full rounded-full bg-secondary`} style={{ width: `${newFuel}%` }} />
              </div>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className=" rounded-xl bg-gray-300 bg-opacity-95">
          <DialogHeader>
            <DialogTitle>Restore Ship Health</DialogTitle>
            <DialogDescription>
              Scan the coupon code to revive the Ship before it's too late!!!
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={readCoupon} className="font-bold">Scan Coupon</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </header>
  );
}

export default Header;