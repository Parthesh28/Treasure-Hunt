import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Compass } from "lucide-react";

export default function SkeletonCard() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Decorative elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="px-4 py-3 md:px-6 md:py-4 relative z-10">
        <header className="pirate-header">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 rounded-full ">
              <Skeleton className="h-4 w-16 bg-blue-400/20 animate-pulse" />
            </div>
          </div>
          <div className="flex items-center gap-3 px-4 py-2">
            <div className="health-bar w-28">
              <div className="h-full w-3/4 rounded-full bg-blue-500/30 animate-shimmer relative">
                <div className="absolute inset-0 animate-shimmer"></div>
              </div>
            </div>
          </div>
        </header>
      </div>

      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-6 relative z-10">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Compass className="w-16 h-16 text-blue-300/20 animate-spin-slow" />
        </div>

        <Card className="pirate-card max-w-md w-full animate-pulse relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent z-0"></div>
          <CardHeader className="p-4 border-b border-blue-300/30 relative z-10">
            <Skeleton className="h-7 w-3/4 mx-auto bg-blue-400/20 animate-pulse" />
          </CardHeader>
          <CardContent className="p-6 flex flex-col items-center gap-6 relative z-10">
            <Skeleton className="h-[250px] w-full rounded-xl bg-blue-400/20 animate-pulse shadow-inner" />
            <div className="w-full space-y-2">
              <Skeleton className="h-4 w-full rounded-lg bg-blue-400/20 animate-pulse" />
              <Skeleton className="h-4 w-5/6 rounded-lg bg-blue-400/20 animate-pulse" />
              <Skeleton className="h-4 w-4/6 rounded-lg bg-blue-400/20 animate-pulse" />
            </div>
            <Skeleton className="h-12 w-40 rounded-full bg-blue-400/20 animate-pulse shadow-md" />
          </CardContent>
        </Card>

        <div className="mt-6 text-blue-300/30 text-sm animate-pulse">
          Loading your adventure...
        </div>
      </main>

      <div className="px-4 py-3 md:px-6 md:py-4 relative z-10">
        <footer className="pirate-header">
          <Button variant="ghost" className="flex-1 rounded-full">
            <Skeleton className="h-6 w-6 rounded-full bg-blue-400/20 animate-pulse" />
          </Button>
          <Button variant="ghost" className="flex-1 rounded-full">
            <Skeleton className="h-6 w-6 rounded-full bg-blue-400/20 animate-pulse" />
          </Button>
          <Button variant="ghost" className="flex-1 rounded-full">
            <Skeleton className="h-6 w-6 rounded-full bg-blue-400/20 animate-pulse" />
          </Button>
        </footer>
      </div>
    </div>
  );
}
