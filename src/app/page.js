"use client";

import React, { useState } from "react";
import { Game, Header, Login, Type0, Type1, Type2, Type3, Winner, SkeletonCard } from "../components";
import { useLoginQuery } from "../services/queries";
import IntroSlideshow from "../components/Prologue";
import { cn } from "../lib/utils";
import WinnerPrologue from "../components/conclusion";

export default function Page() {

  const { isPending, isSuccess, data } = useLoginQuery();

  if (isPending) {
    return <SkeletonCard />;
  }

  if (isSuccess && !data) {
    return <IntroSlideshow />;
  }

  // error states maybe (not in db)

  return <Game />

}
