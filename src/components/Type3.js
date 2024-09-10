import React, { useState } from "react";
import Image from "next/image";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { usePostQuestionMutation } from "@/services/mutations";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

import { Haptics } from "@capacitor/haptics";
import { Toast } from "@capacitor/toast";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

function Type3({ data }) {
  const queryClient = useQueryClient();
  const [answer, setAnswer] = useState("");
  const mutation = usePostQuestionMutation();

  async function handleSubmit() {
    if (!answer) return;

    mutation.mutate({ answer }, {
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ["getQuestion"] });
      },
      onError: async (error) => {
        await Haptics.vibrate({ duration: 600 });
        await Toast.show({ text: error.response.data.message });
      }
    });
  }

  return (
    <>
      <TransformWrapper maxScale={2} doubleClick={{ mode: "toggle" }}>
        <TransformComponent>
          <Image src="https://picsum.photos/500/500" width="300" height="300" alt="Clue" className="rounded-xl aspect-square object-cover" priority={true} />
        </TransformComponent>
      </TransformWrapper>
      <div className="mx-auto flex w-80">
        <Input placeholder="Answer" className="bg-transparent text-white" value={answer} onChange={(e) => setAnswer(e.target.value.toLowerCase())} />
         </div>
      <Button className="font-bold" onClick={handleSubmit} disabled={!answer}>
        Check
      </Button>
    </>
  );
}

export default Type3;