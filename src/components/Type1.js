import React from "react";
import { Button } from "./ui/button";
import useLoadAudio from "@/hooks/useLoadAudio";
import { usePostQuestionMutation } from "@/services/mutations";

import { Toast } from "@capacitor/toast";
import { CapacitorBarcodeScanner, CapacitorBarcodeScannerTypeHint } from "@capacitor/barcode-scanner";
import { useQueryClient } from "@tanstack/react-query";

export default function Type1({ data }) {
  useLoadAudio();
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
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-secondary rounded-lg p-4 flex flex-col items-center justify-center">
          <div className="text-2xl font-ibm font-bold">{data.coordinates[0]}</div>
        </div>
        <div className="bg-secondary rounded-lg p-4 flex flex-col items-center justify-center">
          <div className="text-2xl font-ibm font-bold">{data.coordinates[1]}</div>
        </div>
        <div className="bg-secondary rounded-lg p-4 flex flex-col items-center justify-center">
          <div className="text-2xl font-ibm font-bold">{data.coordinates[2]}</div>
        </div>
      </div>
      <h1 className="font-bold tracking-wide text-white">Head to this Location</h1>
      <Button onClick={readCode} className="font-bold">
        Scan Code
      </Button>
    </>
  );
}
