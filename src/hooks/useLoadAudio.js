import { useEffect } from "react";

import { NativeAudio } from "@capgo/native-audio";

export default function useLoadAudio() {
  useEffect(() => {
    async function loadAudio() {
      if (!await NativeAudio.isPreloaded({ assetId: "right" })) {
        await NativeAudio.preload({
          assetId: "right",
          assetPath: "assets/sounds/right.mp3",
          audioChannelNum: 1,
          isUrl: false
        });
      }

      if (!await NativeAudio.isPreloaded({ assetId: "wrong" })) {
        await NativeAudio.preload({
          assetId: "wrong",
          assetPath: "assets/sounds/wrong.mp3",
          audioChannelNum: 1,
          isUrl: false
        });
      }
    }

    loadAudio();
  }, []);
}