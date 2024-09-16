import React, { useState, useEffect } from "react";
import { ClockIcon } from "@/icons";
import { Ship } from "lucide-react";
import Countdown from "react-countdown";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { CapacitorBarcodeScanner, CapacitorBarcodeScannerTypeHint } from "@capacitor/barcode-scanner";

function Header({ time, fuel }) {
  const [newFuel, setFuel] = useState(fuel);
  const queryClient = useQueryClient();

  useEffect(() => {
    const id = setInterval(() => {
      // per 5 second deduct 0.125 (5/40)
      setFuel((oldFuel) => oldFuel - 0.125);
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

  async function readCoupon() {
    const { ScanResult: answer } = await CapacitorBarcodeScanner.scanBarcode({
      hint: CapacitorBarcodeScannerTypeHint.AZTEC,
    });

    if (!answer) return;

    // todo: @Type1
    // await handleSubmit(answer);

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
     
      <Dialog>
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
              Scan the coupon code to revive the ship before it's too late!!!
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