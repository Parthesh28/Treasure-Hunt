import React from "react";
import Link from "next/link";
import { Card, CardFooter } from "./ui/card";
import { HeartCrack, Anchor, Ship, CloudRain, Waves } from "lucide-react";
import "animate.css";

function Loser({ data }) {
  const handleLogout = async () => {
    localStorage.clear();
    // await queryClient.invalidateQueries({ queryKey: ["getQuestion"] });
    window.location.reload();
  }
  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Decorative elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-destructive/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-destructive/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-destructive/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Rain effect */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-10">
        {Array.from({ length: 20 }).map((_, i) => (
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
            <CloudRain className="w-6 h-6 text-blue-400/30" />
          </div>
        ))}
      </div>

      <main className="flex-1 flex flex-col items-center justify-center gap-8 px-4 py-8 animate__animated animate__fadeIn animate__slow relative z-20">

        <Card className="pirate-card treasure-glow max-w-md w-full animate-float relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-destructive/10 to-transparent z-0"></div>
          <div className="flex flex-col items-center space-y-6 p-8 relative z-10">
            <div className="bg-destructive rounded-full p-5 shadow-lg animate-pulse-glow relative">
              <div className="absolute inset-0 rounded-full bg-destructive/30 animate-ping"></div>
              <HeartCrack className="w-12 h-12 text-destructive-foreground" strokeWidth={2} />
            </div>

            <h2 className="text-3xl font-bold tracking-widest text-blue-100 text-center animate__animated animate__fadeInUp">
              Ship Wrecked!
            </h2>

            <div className="flex items-center gap-2 text-blue-200 animate__animated animate__fadeInUp animate__delay-1s">
              <Anchor className="w-5 h-5 text-blue-300" />
              <p className="text-lg">Better luck next voyage!</p>
            </div>

            <div className="w-full bg-slate-800/50 rounded-lg p-4 border border-destructive/30 animate__animated animate__fadeInUp animate__delay-2s">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Waves className="w-5 h-5 text-blue-400" />
                <h3 className="text-lg font-bold text-blue-100">Lost at Sea</h3>
              </div>
              <p className="text-blue-200 text-center text-sm">Your ship has sunk beneath the waves. The treasure remains hidden, waiting for the next brave crew to find it.</p>
            </div>
          </div>
          <CardFooter className='flex justify-center' >
            <Button
              className="pirate-button mt-4"
              onClick={handleLogout}
            >
              Escape
            </Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}

export default Loser;
