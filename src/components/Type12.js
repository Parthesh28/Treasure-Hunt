import React, { useCallback, useRef } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
// import { Toast } from "@capacitor/toast";
// import QuickPinchZoom, { make3dTransformValue } from "react-quick-pinch-zoom";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import {
  CapacitorBarcodeScanner,
  CapacitorBarcodeScannerTypeHint,
} from "@capacitor/barcode-scanner";
import { usePostQuestionMutation } from "@/services/mutations";

function Type12() {
  const imgRef = useRef();

  // code from https://www.npmjs.com/package/react-quick-pinch-zoom#usage, dont know what it does
  // const onUpdate = useCallback(({ x, y, scale }) => {
  //   if (imgRef.current) {
  //     const value = make3dTransformValue({ x, y, scale });
  //     imgRef.current.style.setProperty("transform", value);
  //   }
  // }, []);

  const mutation = usePostQuestionMutation();

  async function readCode() {
    const result = await CapacitorBarcodeScanner.scanBarcode({
      hint: CapacitorBarcodeScannerTypeHint.AZTEC,
    });

    // result.ScanResult

    await mutation.mutateAsync({ answer: "CCCCC" }); // change this only for test
  }

  return (
    <>
      <TransformWrapper maxScale={2} doubleClick={{ mode: "toggle" }}>
        <TransformComponent>
          <Image
            src="https://picsum.photos/1000/1000"
            ref={imgRef}
            width="300"
            height="300"
            alt="Clue of the spacerun game"
            className="rounded-xl aspect-square object-cover"
            priority={true}
          />
        </TransformComponent>
      </TransformWrapper>
      <Button onClick={readCode} className="font-bold">
        Scan Code
      </Button>
    </>
  );
}

export default Type12;
