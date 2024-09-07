import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "./ui/button";

export default function SkeletonCard() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-background">
      <header className="flex items-center justify-between px-6 py-3 border-b bg-card">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-5 rounded-full" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-5 rounded-full" />
            <div className="w-20 h-2.5 rounded-full bg-muted">
              <div className="h-full w-3/4 rounded-full bg-primary" />
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center gap-6 px-4 py-8">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-[300px] w-[300px] rounded-xl" />
        <Skeleton className="h-10 w-32" />
      </main>
      <footer className="flex items-center justify-center gap-4 px-4 py-3 bg-card rounded-t-xl">
        <Button variant="outline" className="flex-1 rounded-full">
          <Skeleton className="h-5 w-5" />
          <span className="sr-only">View Map</span>
        </Button>
        <Button variant="outline" className="flex-1 rounded-full">
          <Skeleton className="h-5 w-5" />
          <span className="sr-only">View Hint</span>
        </Button>
        <Button variant="outline" className="flex-1 rounded-full">
          <Skeleton className="h-5 w-5" />
          <span className="sr-only">View Leaderboard</span>
        </Button>
      </footer>
    </div>
  );
}
