import { Button } from "./ui/button";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

function Type0({ data, handleSubmit }) {
  const [answer, setAnswer] = useState("");

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen pr-4">
      <Card className="pirate-card treasure-glow max-w-md animate-float">
        <CardHeader className="p-4 border-b border-blue-300/30">
          <CardTitle className="text-xl font-bold text-blue-100 text-center">
            {data.question}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="relative">
            <input
              placeholder="Answer"
              className="pirate-input"
              value={answer}
              onChange={(e) => setAnswer(e.target.value.toLowerCase())}
            />
          </div>
        </CardContent>
      </Card>
      <Button
        className="pirate-button mt-4"
        onClick={() => handleSubmit(answer)}
        disabled={!answer}
      >
        Check
      </Button>
    </div>
  );
}

export default Type0;