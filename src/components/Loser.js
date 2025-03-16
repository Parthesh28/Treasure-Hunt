import React from "react";
import Link from "next/link";
import { Card } from "./ui/card";
import { HeartCrack, Anchor } from "lucide-react";

function Loser({ data }) {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <main className="flex-1 flex flex-col items-center justify-center gap-8 px-4 py-8 animate__animated animate__fadeIn animate__slow">
        <Card className="pirate-card treasure-glow max-w-md w-full animate-float">
          <div className="flex flex-col items-center space-y-6 p-8">
            <div className="bg-destructive rounded-full p-5 shadow-lg animate-pulse-glow">
              <HeartCrack className="w-12 h-12 text-destructive-foreground" strokeWidth={2} />
            </div>
            <h2 className="text-3xl font-bold tracking-widest text-blue-100 text-center">
              Ship Wrecked!
            </h2>
            <div className="flex items-center gap-2 text-blue-200">
              <Anchor className="w-5 h-5" />
              <p className="text-lg">Better luck next voyage!</p>
            </div>
            <Link
              href="/leaderboard"
              className="pirate-button mt-4 inline-flex items-center justify-center"
              prefetch={false}
            >
              View Leaderboard
            </Link>
          </div>
        </Card>
      </main>
    </div>
  );
}

export default Loser;
