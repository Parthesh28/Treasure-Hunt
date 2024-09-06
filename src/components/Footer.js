import React from "react";
import { Button } from "./ui/button";
import { TrophyIcon, MapIcon, CircleHelpIcon } from "@/icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { useRouter } from "next/navigation";

function Footer({ mapHidden }) {
  const router = useRouter();

  return (
    <footer className="flex items-center justify-center gap-4 px-4 py-3 bg-card border-t">
      {!mapHidden && <Map />}
      <Button variant="outline" className="flex-1 rounded-full">
        <CircleHelpIcon className="w-5 h-5" />
        <span className="sr-only">Help</span>
      </Button>
      <Button
        variant="outline"
        className="flex-1 rounded-full"
        onClick={() => {
          router.push("/leaderboard");
        }}
      >
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
        <Button variant="outline" className="flex-1 rounded-full">
          <MapIcon className="w-5 h-5" />
          <span className="sr-only">Map</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-xl">
        <DialogHeader>
          <DialogTitle>Map</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Image
          src="/map.jpg"
          alt="Map of the spacerun"
          width={0}
          height={0}
          className="w-full h-full rounded-xl object-cover"
          priority={true}
        />
      </DialogContent>
    </Dialog>
  );
}

export default Footer;
