import React from "react";
import Link from "next/link";
import { Card } from "./ui/card";
import { TriangleAlert, Anchor } from "lucide-react";

function Error() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <main className="flex-1 flex flex-col items-center justify-center gap-8 px-4 py-8 animate__animated animate__fadeIn animate__slow">
        <Card className="pirate-card treasure-glow max-w-md w-full animate-float">
          <div className="flex flex-col items-center space-y-6 p-8">
            <div className="bg-amber-600 rounded-full p-5 shadow-lg animate-pulse-glow">
              <TriangleAlert className="w-12 h-12 text-amber-950" strokeWidth={2} />
            </div>
            <h2 className="text-2xl font-bold tracking-widest text-blue-100 text-center">
              Rough Seas Ahead!
            </h2>
            <div className="flex items-center gap-2 text-blue-200">
              <Anchor className="w-5 h-5" />
              <p className="text-lg">There was an error steering the ship</p>
            </div>
            <Link
              href="/"
              className="pirate-button mt-4 inline-flex items-center justify-center"
              prefetch={false}
            >
              Try Again
            </Link>
          </div>
        </Card>
      </main>
    </div>
  );
}

export default Error;