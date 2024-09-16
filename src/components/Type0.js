import { Input } from "./ui/input";
import { Button } from "./ui/button";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

function Type0({ data, handleSubmit }) {
  const [answer, setAnswer] = useState("");

  return (
    <>
      <Card className="bg-slate-600 bg-opacity-25 backdrop-blur-3xl">
        <CardHeader className="p-4">
          <CardTitle className="text-lg font-medium text-white">{data.question}</CardTitle>
        </CardHeader>
        <CardContent>
          <Input placeholder="Answer" className="bg-slate-800 bg-opacity-30 backdrop-blur-3xl text-white" value={answer} onChange={(e) => setAnswer(e.target.value.toLowerCase())} />
        </CardContent>
      </Card>
      <Button className="font-bold" onClick={() => handleSubmit(answer)} disabled={!answer}>
        Check
      </Button>
    </>
  );
}

export default Type0;
