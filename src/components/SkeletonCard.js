import { Button } from "./ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "./ui/card";

export default function SkeletonCard() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <div className="px-4 py-3 md:px-6 md:py-4">
        <header className="pirate-header">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 rounded-full border border-blue-300/20">
              <Skeleton className="h-5 w-5 rounded-full bg-blue-400/20" />
              <Skeleton className="h-4 w-16 bg-blue-400/20" />
            </div>
          </div>
          <div className="flex items-center gap-3 px-4 py-2">
            <Skeleton className="h-6 w-6 rounded-full bg-blue-400/20" />
            <div className="w-28 h-4 rounded-full bg-slate-700 overflow-hidden border border-blue-400/20">
              <div className="h-full w-3/4 rounded-full bg-blue-500/30" />
            </div>
          </div>
        </header>
      </div>
      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-6">
        <Card className="pirate-card max-w-md w-full animate-pulse">
          <CardHeader className="p-4 border-b border-blue-300/30">
            <Skeleton className="h-7 w-3/4 mx-auto bg-blue-400/20" />
          </CardHeader>
          <CardContent className="p-6 flex flex-col items-center gap-6">
            <Skeleton className="h-[250px] w-full rounded-xl bg-blue-400/20" />
            <Skeleton className="h-12 w-full rounded-lg bg-blue-400/20" />
            <Skeleton className="h-12 w-32 rounded-full bg-blue-400/20" />
          </CardContent>
        </Card>
      </main>
      <div className="px-4 py-3 md:px-6 md:py-4">
        <footer className="pirate-header">
          <Button variant="ghost" className="flex-1 rounded-full">
            <Skeleton className="h-6 w-6 rounded-full bg-blue-400/20" />
          </Button>
          <Button variant="ghost" className="flex-1 rounded-full">
            <Skeleton className="h-6 w-6 rounded-full bg-blue-400/20" />
          </Button>
          <Button variant="ghost" className="flex-1 rounded-full">
            <Skeleton className="h-6 w-6 rounded-full bg-blue-400/20" />
          </Button>
        </footer>
      </div>
    </div>
  );
}
