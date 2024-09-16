import React from "react";
import { Button } from "./ui/button";
import { CarouselUI } from "../components";

import { CapacitorBarcodeScanner, CapacitorBarcodeScannerTypeHint } from "@capacitor/barcode-scanner";

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
      <Button onClick={readCode} className="font-bold">
        Scan Code
      </Button>
    </>
  );
}