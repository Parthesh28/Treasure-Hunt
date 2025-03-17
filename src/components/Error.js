import React from "react";
import Link from "next/link";
import { Card } from "./ui/card";
import { TriangleAlert, Anchor, RefreshCw, Compass, Wind } from "lucide-react";
import "animate.css";

function Error() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Decorative elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-amber-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Wind effect */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-10">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute animate-wave"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 5}s`
            }}
          >
            <Wind className="w-6 h-6 text-blue-400/20" />
          </div>
        ))}
      </div>

      <main className="flex-1 flex flex-col items-center justify-center gap-8 px-4 py-8 animate__animated animate__fadeIn animate__slow relative z-20">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Compass className="w-24 h-24 text-amber-500/50 animate-spin-slow" style={{ animationDuration: '15s' }} />
        </div>

        <Card className="pirate-card treasure-glow max-w-md w-full animate-float relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 to-transparent z-0"></div>
          <div className="flex flex-col items-center space-y-6 p-8 relative z-10">
            <div className="bg-amber-600 rounded-full p-5 shadow-lg animate-pulse-glow relative">
              <div className="absolute inset-0 rounded-full bg-amber-500/30 animate-ping"></div>
              <TriangleAlert className="w-12 h-12 text-amber-950" strokeWidth={2} />
            </div>

            <h2 className="text-2xl font-bold tracking-widest text-blue-100 text-center animate__animated animate__fadeInUp">
              Rough Seas Ahead!
            </h2>

            <div className="flex items-center gap-2 text-blue-200 animate__animated animate__fadeInUp animate__delay-1s">
              <Anchor className="w-5 h-5 text-blue-300" />
              <p className="text-lg">There was an error steering the ship</p>
            </div>

            <div className="w-full bg-slate-800/50 rounded-lg p-4 border border-amber-500/30 animate__animated animate__fadeInUp animate__delay-2s">
              <p className="text-blue-200 text-center text-sm">The compass is spinning wildly and the maps are soaked. We need to recalibrate our navigation tools.</p>
            </div>

            <Link
              href="/"
              className="pirate-button mt-4 inline-flex items-center justify-center gap-2 animate__animated animate__fadeInUp animate__delay-3s"
              prefetch={false}
            >
              <RefreshCw className="w-5 h-5" />
              Try Again
            </Link>
          </div>
        </Card>
      </main>
    </div>
  );
}

export default Error;