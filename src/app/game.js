import React from "react";
import {
  Header,
  Footer,
  SkeletonCard,
  Type0,
  Type12,
  Type3,
} from "@/components";
import { useGetQuestionQuery } from "@/services/queries";

export default function Game() {
  const { isPending, isError, data } = useGetQuestionQuery();

  if (isPending) {
    return <SkeletonCard />;
  }

  if (isError) {
    return <></>;
  }

  return (
    <div className="flex flex-col w-full min-h-screen bg-background">
      <Header fuel={data.fuel} time={data.startTime} />
      <main className="flex-1 flex flex-col items-center justify-center gap-8 px-4 py-8 animate__animated animate__fadeIn">
        <p className="text-2xl font-bold">
          Stage {data.currentState.phase} - Phase {data.currentState.clue}
        </p>
        {getComponent(data)}
      </main>
      <Footer />
    </div>
  );
}

function getComponent(data) {
  switch (data.type) {
    case 0:
      return <Type0 question={data.question} />;
    case 1:
      return <Type12 />;
    case 2:
      return <Type12 />;
    case 3:
      return <Type3 />;
    default:
      return <></>;
  }
}
