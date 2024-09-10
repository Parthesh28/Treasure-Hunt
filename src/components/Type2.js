import React from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { usePostQuestionMutation } from "@/services/mutations";

import { CapacitorBarcodeScanner, CapacitorBarcodeScannerTypeHint } from "@capacitor/barcode-scanner";
import { Toast } from "@capacitor/toast";
import { Haptics } from "@capacitor/haptics";
import { NativeAudio } from "@capgo/native-audio";
import { useQueryClient } from "@tanstack/react-query";

export default function Type2({ data }) {
  const queryClient = useQueryClient();
  const mutation = usePostQuestionMutation();

  async function readCode() {
    const { ScanResult: answer } = await CapacitorBarcodeScanner.scanBarcode({
      hint: CapacitorBarcodeScannerTypeHint.AZTEC,
    });

    // for debugging
    await Toast.show({ text: `readed code: ${answer}` });

    mutation.mutate({ answer }, {
      onSuccess: async () => {
        await NativeAudio.play({ assetId: "right" });
        await queryClient.invalidateQueries({ queryKey: ["getQuestion"] });
      },
      onError: async (error) => {
        await NativeAudio.play({ assetId: "wrong" });
        await Haptics.vibrate({ duration: 600 });
        await Toast.show({ text: error.response.data.message });
      }
    });
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
