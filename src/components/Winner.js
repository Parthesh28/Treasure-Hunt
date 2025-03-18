import React from "react";
import Link from "next/link";
import { Card } from "./ui/card";
import { Award, Anchor, Trophy, Star, Sparkles } from "lucide-react";
import Image from "next/image";
import "animate.css";

function Winner({ data }) {
  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Decorative elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-accent/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Confetti effect */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-10">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`
            }}
          >
            <Star className="w-4 h-4 text-accent" fill="currentColor" />
          </div>
        ))}
      </div>

      <main className="flex-1 flex flex-col items-center justify-center gap-8 px-4 py-8 animate__animated animate__fadeIn animate__slow relative z-20">
    

        <Card className="pirate-card treasure-glow max-w-md w-full animate-float relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-accent/10 to-transparent z-0"></div>
          <div className="flex flex-col items-center space-y-6 p-8 relative z-10">
            <div className="bg-accent rounded-full p-5 shadow-lg animate-pulse-glow relative">
              <div className="absolute inset-0 rounded-full bg-accent/30 animate-ping"></div>
              <Award className="w-12 h-12 text-accent-foreground" strokeWidth={2} />
            </div>

            <h2 className="text-3xl font-bold tracking-widest text-blue-100 text-center animate__animated animate__fadeInUp">
              Team Apex, You Won!
            </h2>

            <div className="flex items-center gap-2 text-blue-200 animate__animated animate__fadeInUp animate__delay-1s">
              <Anchor className="w-5 h-5 text-blue-300" />
              <p className="text-lg">Time Taken: </p>
            </div>

            <div className="w-full bg-slate-800/50 rounded-lg p-4 border border-accent/30 animate__animated animate__fadeInUp animate__delay-2s">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-accent" />
                <h3 className="text-lg font-bold text-blue-100">Treasure Found!</h3>
              </div>
              <p className="text-blue-200 text-center text-sm">You've successfully navigated the seven seas and found the hidden treasure. The captain is proud!</p>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}

export default Winner;
