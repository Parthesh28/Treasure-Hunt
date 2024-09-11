import { Input } from "./ui/input";
import { Button } from "./ui/button";
import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { usePostQuestionMutation } from "@/services/mutations";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

import { NativeAudio } from "@capgo/native-audio";
import { Haptics } from "@capacitor/haptics";
import { Toast } from "@capacitor/toast";

function Type0({ data }) {
  const queryClient = useQueryClient();
  const [answer, setAnswer] = useState("");
  const mutation = usePostQuestionMutation();

  async function handleSubmit() {
    if (!answer) return;

    mutation.mutate({ answer }, {
      onSuccess: async () => {
        await NativeAudio.play({ assetId: "right" });
        await queryClient.invalidateQueries({ queryKey: ["getQuestion"] });
      },
      onError: async (error) => {
        await NativeAudio.play({ assetId: "wrong" });
        await Haptics.vibrate({ duration: 600 });
        await Toast.show({ text: error.response.data.message });
      }
    });
  }

  return (
    <>
      <Card>
        <CardHeader className="p-4">
          <CardTitle className="text-lg font-medium text-white">{data.question}</CardTitle>
        </CardHeader>
        <CardContent>
          <Input placeholder="Answer" className="bg-transparent text-white" value={answer} onChange={(e) => setAnswer(e.target.value.toLowerCase())} />
        </CardContent>
      </Card>
      <Button className="font-bold" onClick={handleSubmit} disabled={!answer}>
        Check
      </Button>
    </>
  );
}

export default Type0;
