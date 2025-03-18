import { cn } from "../lib/utils";
import React, { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useGetQuestionQuery } from "../services/queries";
import { usePostQuestionMutation } from "../services/mutations";
import { Header, SkeletonCard, Type0, Type1, Type2, Type3, Winner, Loser, Error } from ".";

import { Toast } from "@capacitor/toast";
import { Capacitor } from "@capacitor/core";
import { Haptics } from "@capacitor/haptics";
import { NativeAudio } from "@capgo/native-audio";

export default function Game() {
  const [animate, setAnimate] = useState("animate__fadeInRight");
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800
  });
  const { isPending, isError, data, error } = useGetQuestionQuery();

  const queryClient = useQueryClient();
  const mutation = usePostQuestionMutation();

  // Update window size on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  async function handleSubmit(answer) {
    if (!answer) return;

    mutation.mutate({ answer }, {
      onSuccess: async () => {
        if (Capacitor.getPlatform() != "web") await NativeAudio.play({ assetId: "right" });
        setAnimate("animate__fadeOutLeft");
        await queryClient.invalidateQueries({ queryKey: ["getQuestion"] });
        setAnimate("animate__fadeInRight");
      },
      onError: async (error) => {
        setAnimate("animate__shakeX");
        if (Capacitor.getPlatform() != "web") await NativeAudio.play({ assetId: "wrong" });
        await Haptics.vibrate({ duration: 600 });
        await Toast.show({ text: error.response.data.message });
      }
    });
  }

  if (isPending) {
    return <SkeletonCard />;
  }

  if (isError) {
    switch (error.response.data.type) {
      case 4:
        return <Winner />;
      case 5:
        return <Loser />;
      default:
        return <Error />;
    }
  }

  return (
    <div className="flex flex-col  w-full min-h-screen">
      <div className="px-2 z-50 sm:px-4 py-2 sm:py-3 md:px-6 md:py-4 animate__animated animate__fadeIn animate__faster">
        <Header health={data.health} time={new Date(data.startTime).getTime()} />
      </div>
      <main className={cn(
        "flex-1 flex fixed flex-col items-center justify-center w-full animate__animated animate__fast p-2 sm:p-4 md:p-6",
        animate
      )}
        onAnimationEnd={() => setAnimate("")}>
        <div className="w-full max-w-4xl mx-auto">
          {getComponent({ data, handleSubmit, windowSize })}
        </div>
      </main>

      {/* Decorative elements - responsive positioning */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        {/* Adjust blur size based on screen size */}
        <div className="absolute top-10 left-10 w-24 sm:w-32 h-24 sm:h-32 bg-blue-500/10 rounded-full blur-2xl sm:blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-32 sm:w-40 h-32 sm:h-40 bg-accent/10 rounded-full blur-2xl sm:blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-20 sm:w-24 h-20 sm:h-24 bg-primary/10 rounded-full blur-2xl sm:blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>
    </div>
  );
}

function getComponent(props) {
  switch (props.data.type) {
    case 0:
      return <Type0 {...props} />;
    case 1:
      return <Type1 {...props} />;
    case 2:
      return <Type2 {...props} />;
    case 3:
      return <Type3 {...props} />;
    default:
      return <div className="text-center p-4 sm:p-6 glass-panel rounded-xl">
        <h2 className="text-xl font-bold text-blue-100 mb-4">Unknown Question Type</h2>
        <p className="text-blue-200">The treasure map seems to be damaged. Try again later.</p>
      </div>;
  }
}
