"use client";

import React from "react";
import { ClockIcon } from "@/icons";
import { Footer } from "@/components";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";

export default function Leaderboard() {
  const router = useRouter()
  return (
    <div className="flex flex-col w-full min-h-screen bg-transparent">
      <header className="flex items-center justify-between px-6 py-3 border-b bg-transparent">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
              <ArrowLeft className="text-white cursor-pointer" onClick={()=>{router.push('/')}}/>
            <span className="text-card-foreground font-extrabold text-lg text-white">
              Leaderboard
            </span>
          </div>
        </div>
      </header>
      <main className="flex-1 flex flex-col gap-8 px-4 py-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-muted rounded-full w-8 h-8 flex items-center justify-center">
                <span className="text-sm font-medium">
                  1
                </span>
              </div>
              <div>
                <div className="font-medium text-white">John Doe</div>
              </div>
            </div>
            <div className="flex text-lg font-bold gap-2 text-white">
              <span>10:25</span>
              <ClockIcon />
            </div>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-muted rounded-full w-8 h-8 flex items-center justify-center">
                <span className="text-sm font-medium">
                  2
                </span>
              </div>
              <div>
                <div className="font-medium text-white">Jane Smith</div>
              </div>
            </div>
            <div className="flex text-lg font-bold gap-2 text-white">
              <span>10:25</span>
              <ClockIcon />
            </div>
          </div>
        </div>
      </main>
      <Footer mapHidden />
    </div>
  );
}
