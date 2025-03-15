import React from "react";
import { Button } from "./ui/button";
import { CarouselUI } from "../components";
import { CapacitorBarcodeScanner, CapacitorBarcodeScannerTypeHint } from "@capacitor/barcode-scanner";
import { ScanQrCode } from "lucide-react";

export default function Type2({ data, handleSubmit }) {
  async function readCode() {
    const { ScanResult: answer } = await CapacitorBarcodeScanner.scanBarcode({
      hint: CapacitorBarcodeScannerTypeHint.AZTEC,
    });

    if (!answer) return;

    // todo: @Type1
    await handleSubmit(answer);
  }

  return (
    <>
      <CarouselUI images={data.images} />
      <div className="fixed bottom-20 right-4 z-50">
        <Button
          onClick={readCode}
          size="icon"
          className="bg-gray-900 text-gray-50 hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300 h-14 w-14 rounded-full"
        >
          <ScanQrCode className="h-7 w-7" />
          <span className="sr-only">Add</span>
        </Button>
      </div>
    </>
  );
}