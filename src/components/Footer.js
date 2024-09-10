import React from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { TrophyIcon, MapIcon, CircleHelpIcon } from "@/icons";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

function Footer({ mapHidden }) {
  const router = useRouter();

  return (
    <footer className="flex items-center justify-center gap-4 px-4 py-3 bg-transparent">
      {!mapHidden && <Map />}
      <Button variant="ghost" className="flex-1 rounded-full border border-white">
        <CircleHelpIcon className="w-5 h-5" />
        <span className="sr-only">Help</span>
      </Button>
      <Button variant="ghost" className="flex-1 rounded-full border border-white" onClick={() => { router.push("/leaderboard"); }}>
        <TrophyIcon className="w-5 h-5" />
        <span className="sr-only">Leaderboard</span>
      </Button>
    </footer>
  );
}

function Map() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="flex-1 rounded-full border border-white">
          <MapIcon className="w-5 h-5" />
          <span className="sr-only">Map</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-xl">
        <DialogHeader>
          <DialogTitle>Map</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Image src="/map.jpg" alt="Map of the spacerun" width={0} height={0} className="w-full h-full rounded-xl object-cover" priority={true} />
      </DialogContent>
    </Dialog>
  );
}

export default Footer;
