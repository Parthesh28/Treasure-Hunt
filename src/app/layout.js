"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Grandstander, Special_Elite } from "next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { App } from "@capacitor/app";
import { Capacitor } from "@capacitor/core";
import { Toast } from "@capacitor/toast";
import { NativeAudio } from "@capgo/native-audio"
import { StatusBar } from "@capacitor/status-bar";

import "./globals.css";
import PirateOceanBackground from "@/components/pirate-ocean-background";

const fontHeading = Grandstander({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});

const fontMono = Special_Elite({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});


export default function Layout({ children }) {
  const [lastBack, setLastBack] = useState(Date.now());

  useEffect(() => {
    async function initialSetup() {
      await NativeAudio.configure({
        focus: false
      });

      await NativeAudio.preload({
        assetId: "music",
        assetPath: "assets/sounds/music.mp3",
        audioChannelNum: 1,
        isUrl: false,
        volume: 0.3
      });

      await NativeAudio.preload({
        assetId: "right",
        assetPath: "assets/sounds/right.mp3",
        audioChannelNum: 1,
        isUrl: false,
        volume: 1
      });

      await NativeAudio.preload({
        assetId: "wrong",
        assetPath: "assets/sounds/wrong.mp3",
        audioChannelNum: 1,
        isUrl: false,
        volume: 1
      });

      await NativeAudio.loop({
        assetId: "music"
      })

      // status bar color matching
      await StatusBar.setBackgroundColor({
        color: "#0000ff",
      });

      // back button disable
      const backButtonListener = await App.addListener("backButton", async (e) => {
        if (e.canGoBack) {
          window.history.back();
        } else {
          if (Date.now() - lastBack < 500) {
            await App.exitApp();
          }
          setLastBack(Date.now());
          await Toast.show({ text: `Exiting app will deduct damage by 10 ${Date.now() - lastBack}` });
        }
      })

      return async () => {
        await backButtonListener.remove();
        await NativeAudio.unload({ assetId: "music" });
        await NativeAudio.unload({ assetId: "right" });
        await NativeAudio.unload({ assetId: "wrong" });
      }
    }

    if (Capacitor.getPlatform() != "web") initialSetup();
  }, []);

  const queryClient = new QueryClient();

  return (
    <html lang="en">
      <body className={cn("antialiased", fontHeading.className, fontMono.variable)}>
        <PirateOceanBackground>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </PirateOceanBackground>
      </body>
    </html>
  );
}
