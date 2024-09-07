import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { usePostQuestionMutation } from "@/services/mutations";

function Type0({ data }) {
  const [answer, setAnswer] = useState("");

  const mutation = usePostQuestionMutation();

  async function handleSubmit() {
    if (!answer) return;
    await mutation.mutateAsync({ answer });
  }

  return (
    <>
      <Card>
        <CardHeader className="p-4">
          <CardTitle className="text-base font-medium">{data.question}</CardTitle>
        </CardHeader>
        <CardContent>
          <Input placeholder="Answer" value={answer} onChange={(e) => setAnswer(e.target.value.toLowerCase())} />
        </CardContent>
      </Card>
      <Button className="font-extrabold" onClick={handleSubmit} disabled={!answer}>
        Check
      </Button>
    </>
  );
}

export default Type0;
