"use client";

import React from "react";
import { Game, Login } from "../components";
import { SkeletonCard } from "@/components";
import { useLoginQuery } from "@/services/queries";

export default function Page() {

  const { isPending, isSuccess, data } = useLoginQuery();

  if (isPending) {
    return <SkeletonCard />;
  }

  if (isSuccess && !data) {
    return <Login />;
  }

  // error states maybe (not in db)

  return <Game />;
}
