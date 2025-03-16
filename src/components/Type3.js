import Image from "next/image";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { usePostQuestionMutation } from "@/services/mutations";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

import { Toast } from "@capacitor/toast";
import { Haptics } from "@capacitor/haptics";

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
    <Card className="pirate-card treasure-glow max-w-md animate-float">
      <CardHeader className="p-4 border-b border-blue-300/30">
        <CardTitle className="text-xl font-bold text-blue-100 text-center">
          Solve the Riddle
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 flex flex-col items-center gap-6">
        <div className="rounded-xl overflow-hidden border-2 border-blue-300/30 shadow-lg animate-pulse-glow">
          <Image
            src={data.image || "https://picsum.photos/500/500"}
            width="300"
            height="300"
            alt="Clue"
            className="aspect-square object-cover"
            priority={true}
          />
        </div>
        <div className="w-full">
          <Input
            placeholder="Answer"
            className="pirate-input"
            value={answer}
            onChange={(e) => setAnswer(e.target.value.toLowerCase())}
          />
        </div>
        <Button
          className="pirate-button"
          onClick={handleSubmit}
          disabled={!answer}
        >
          Check
        </Button>
      </CardContent>
    </Card>
  );
}

export default Type3;