import { Button } from "./ui/button";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

function Type4({ data, handleSubmit }) {
  const [answer, setAnswer] = useState("");

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      <Card className="pirate-card treasure-glow max-w-md animate-float">
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

export default Type3;