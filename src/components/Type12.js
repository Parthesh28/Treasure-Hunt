import React from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { usePostQuestionMutation } from "@/services/mutations";

import { CapacitorBarcodeScanner, CapacitorBarcodeScannerTypeHint } from "@capacitor/barcode-scanner";

function Type12({ data }) {
  const mutation = usePostQuestionMutation();

  async function readCode() {
    const result = await CapacitorBarcodeScanner.scanBarcode({
      hint: CapacitorBarcodeScannerTypeHint.AZTEC,
    });

    await mutation.mutateAsync({ answer: result.ScanResult });
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

export default Type12;
