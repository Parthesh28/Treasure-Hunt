import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { usePostQuestionMutation } from "@/services/mutations";

function Type0({ question }) {
  const [answer, setAnswer] = useState("");

  const mutation = usePostQuestionMutation();

  async function handleSubmit() {
    await mutation.mutateAsync({ answer });
  }

  return (
    <>
      <Card>
        <CardHeader className="p-4">
          <CardTitle className="text-base font-medium">{question}</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value.toLowerCase())}
          />
        </CardContent>
      </Card>
      <Button className="font-extrabold" onClick={handleSubmit}>
        Check
      </Button>
    </>
  );
}

export default Type0;
