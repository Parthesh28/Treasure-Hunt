"use client";

import React from "react";
import { ClockIcon } from "@/icons";
import { Footer } from "@/components";
import { Separator } from "@/components/ui/separator";

export default function Leaderboard() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-background">
      <header className="flex items-center justify-between px-6 py-3 border-b bg-card">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-card-foreground font-extrabold text-lg">
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
                <span className="text-sm font-medium text-muted-foreground">
                  1
                </span>
              </div>
              <div>
                <div className="font-medium">John Doe</div>
              </div>
            </div>
            <div className="flex text-lg font-bold gap-2">
              <span>10:25</span>
              <ClockIcon />
            </div>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-muted rounded-full w-8 h-8 flex items-center justify-center">
                <span className="text-sm font-medium text-muted-foreground">
                  2
                </span>
              </div>
              <div>
                <div className="font-medium">Jane Smith</div>
              </div>
            </div>
            <div className="flex text-lg font-bold gap-2">
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
