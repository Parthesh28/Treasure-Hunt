import React from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

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
      <TransformWrapper maxScale={2} doubleClick={{ mode: "toggle" }}>
        <TransformComponent>
          <Image src={data.image} width="300" height="300" alt="Clue of the spacerun game" className="rounded-xl aspect-square object-cover" priority={true} />
        </TransformComponent>
      </TransformWrapper>
      <Button onClick={readCode} className="font-bold">
        Scan Code
      </Button>
    </>
  );
}
