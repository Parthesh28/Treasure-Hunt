import { useEffect } from "react";

import { NativeAudio } from "@capgo/native-audio";

export default function useLoadAudio() {
  useEffect(() => {
    async function loadAudio() {
      await NativeAudio.preload({
        assetId: "right",
        assetPath: "assets/sounds/right.mp3",
        audioChannelNum: 1,
        isUrl: false
      });

      await NativeAudio.preload({
        assetId: "wrong",
        assetPath: "assets/sounds/wrong.mp3",
        audioChannelNum: 1,
        isUrl: false
      });
    }

    loadAudio();

    return async () => {
      await NativeAudio.unload({ assetId: "right" });
      await NativeAudio.unload({ assetId: "wrong" });
    }
  }, []);
}