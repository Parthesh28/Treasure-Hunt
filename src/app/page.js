"use client";

import React, { useState } from "react";
import { Footer, Game, Header, Login, Type0 } from "../components";
import { SkeletonCard } from "@/components";
import { useLoginQuery } from "@/services/queries";
import IntroSlideshow from "@/components/Prologue";
import { cn } from "@/lib/utils";

export default function Page() {

  const data1 = {
    question: "What heavy iron beast rests in the deep, keeping a ship from drifting in its sleep?",
    health: 100,
    startTime: new Date()
  }

  const handleSubmit = () => {
    console.log("hell0")
  }

  const { isPending, isSuccess, data } = useLoginQuery();

  if (isPending) {
    return <SkeletonCard />;
  }

  if (isSuccess && !data) {
    return <IntroSlideshow />;
  }

  // error states maybe (not in db)

  return <Game/>
  // return 
  // const [animate, setAnimate] = useState("animate__fadeInRight");
  //   return (<div className="flex flex-col w-full min-h-screen">
  //     <Header health={data1.health} time={data1.startTime} />
  //     <main className={cn("flex-1 flex flex-col items-center justify-center w-full animate__animated animate__fast", animate)} onAnimationEnd={() => setAnimate("")}>
  //       <Type0 data={data1} handleSubmit={handleSubmit} />
  //     </main>
  //     <Footer />
  //   </div>)
}
