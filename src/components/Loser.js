import React from "react";
import Link from "next/link";
import { Card } from "./ui/card";
import { HeartCrack } from "lucide-react";

function Loser({ data }) {
  return (
    <div className="flex flex-col w-full min-h-screen bg-transparent backdrop-brightness-50">
      <main className="flex-1 flex flex-col items-center justify-center gap-8 px-4 py-8 animate__animated animate__fast">
        <Card className="bg-transparent p-8 rounded-lg shadow-lg max-w-md w-full">
          <div className="flex flex-col items-center space-y-4">
            <div className="bg-primary rounded-full p-4">
              <HeartCrack />
            </div>
            <h2 className="text-2xl font-bold tracking-widest text-white">
              You Lost!
            </h2>
            <p className="text-muted">Better luck next time!</p>
            <Link href="/leaderboard" className="font-bold inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground shadow transition-colors hover:bg-primary/90" prefetch={false}>
              View Leaderboard
            </Link>
          </div>
        </Card>
      </main>
    </div>
  );
}

export default Loser;
