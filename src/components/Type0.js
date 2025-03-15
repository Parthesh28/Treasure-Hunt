import { Button } from "./ui/button";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

function Type0({ data, handleSubmit }) {
  const [answer, setAnswer] = useState("");

  return (
    <>
      <Card className="bg-slate-800 bg-opacity-70 backdrop-blur-xl border-2 border-blue-400 border-opacity-40 shadow-lg shadow-blue-950/50 rounded-xl max-w-md">
        <CardHeader className="p-4 border-b border-blue-300 border-opacity-30">
          <CardTitle className="text-xl font-bold text-blue-100 text-center">
            {data.question}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="relative">
            <input
              placeholder="Answer"
              className="w-full bg-slate-700 bg-opacity-60 backdrop-blur-xl text-white py-3 px-4 rounded-lg border border-blue-400 border-opacity-30 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder-blue-200 placeholder-opacity-50"
              value={answer}
              onChange={(e) => setAnswer(e.target.value.toLowerCase())}
            />
          </div>
        </CardContent>
      </Card>
      <Button
        className="mt-4 bg-cyan-900 hover:bg-cyan-700 text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-blue-900/50 transition-all duration-200 ease-in-out transform hover:scale-105 border-2 border-blue-300 border-opacity-30"
        onClick={() => handleSubmit(answer)}
        disabled={!answer}
      >
        Check
      </Button>
    </>
  );
}

export default Type0;