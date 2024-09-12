import React from "react";
import { Button } from "./ui/button";

import { CapacitorBarcodeScanner, CapacitorBarcodeScannerTypeHint } from "@capacitor/barcode-scanner";

export default function Type1({ data, handleSubmit }) {
  async function readCode() {
    const { ScanResult: answer } = await CapacitorBarcodeScanner.scanBarcode({
      hint: CapacitorBarcodeScannerTypeHint.AZTEC,
    });

    if (!answer) return;

    // todo: add try-catch for error handling
    await handleSubmit(answer);
  }

  return (
    <>
      <div className="grid grid-cols-3 gap-9 text-amber-600">
        <div className="coin-bg rounded-lg p-6 w-full">
          <div className="text-3xl font-bold">{data.coordinates[0]}</div>
        </div>
        <div className="coin-bg rounded-lg p-6">
          <div className="text-3xl font-bold">{data.coordinates[1]}</div>
        </div>
        <div className="coin-bg rounded-lg p-6 ">
          <div className="text-3xl font-bold">{data.coordinates[2]}</div>
        </div>
      </div>
      <h1 className="font-bold tracking-wide text-white">Head to this Location</h1>
      <Button onClick={readCode} className="font-bold">
        Scan Code
      </Button>
    </>

  );
}
