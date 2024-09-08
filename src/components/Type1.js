import React from "react";
import { Button } from "./ui/button";
import { usePostQuestionMutation } from "@/services/mutations";

import { CapacitorBarcodeScanner, CapacitorBarcodeScannerTypeHint } from "@capacitor/barcode-scanner";

export default function Type1({ data }) {
  const mutation = usePostQuestionMutation();

  async function readCode() {
    const result = await CapacitorBarcodeScanner.scanBarcode({
      hint: CapacitorBarcodeScannerTypeHint.AZTEC,
    });

    await mutation.mutateAsync({ answer: result.ScanResult });
  }

  return (
    <>
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-secondary rounded-lg p-4 flex flex-col items-center justify-center">
          <div className="text-2xl font-bold">{data.coordinates[0]}</div>
        </div>
        <div className="bg-secondary rounded-lg p-4 flex flex-col items-center justify-center">
          <div className="text-2xl font-bold">{data.coordinates[1]}</div>
        </div>
        <div className="bg-secondary rounded-lg p-4 flex flex-col items-center justify-center">
          <div className="text-2xl font-bold">{data.coordinates[2]}</div>
        </div>
      </div>
      <h1 className="font-bold tracking-wide">Head to this Location</h1>
      <Button onClick={readCode} className="font-bold">
        Scan Code
      </Button>
    </>
  );
}
