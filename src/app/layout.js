"use client";

import { cn } from "@/lib/utils";
import { useEffect } from "react";
import StarField from "react-starfield";
import { Cinzel } from "next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Capacitor } from "@capacitor/core";
import { StatusBar } from "@capacitor/status-bar";

import "./globals.css";

const fontHeading = Cinzel({
  weight: "500",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});

export default function Layout({ children }) {
  useEffect(() => {
    async function changeStatusBarColor() {
      await StatusBar.setBackgroundColor({
        color: "#0c0a09",
      });
    }
    if (Capacitor.getPlatform() != "web") changeStatusBarColor();
  }, []);

  const queryClient = new QueryClient();

  return (
    <html lang="en">
      <body className={cn("antialiased", fontHeading.className)}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
        <StarField />
      </body>
    </html>
  );
}
