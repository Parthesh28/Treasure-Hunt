"use client";

import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { Grandstander, Special_Elite} from "next/font/google";
import { useRouter } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { App } from "@capacitor/app";
import { Capacitor } from "@capacitor/core";
import { Toast } from "@capacitor/toast";
import { NativeAudio } from "@capgo/native-audio"
import { StatusBar } from "@capacitor/status-bar";

import "./globals.css";

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

  const router = useRouter();

  useEffect(() => {
    async function initialSetup() {
      await NativeAudio.configure({
        focus: false
      });

      await NativeAudio.preload({
        assetId: "music",
        assetPath: "assets/sounds/music.mp3",
        audioChannelNum: 1,
        isUrl: false
      });

      await NativeAudio.loop({
        assetId: "music"
      })

      // status bar color matching
      await StatusBar.setBackgroundColor({
        color: "#0c0a09", // from globals.css
      });

      // back button disable
      App.addListener("backButton", async () => {
        if (location.pathname == "/leaderboard") {
          router.push("/");
        } else {
          await Toast.show("Exiting app will deduct fuel by 10");
          // api call to deduct
        }
      })

      return async () => {
        await App.removeAllListeners();
        await NativeAudio.unload({ assetId: "music" });
      }
    }

    if (Capacitor.getPlatform() != "web") initialSetup();
  }, []);

  const queryClient = new QueryClient();

  return (
    <html lang="en">
      <body className={cn("antialiased", fontHeading.className, fontMono.variable)}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
