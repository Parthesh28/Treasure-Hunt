import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useGetQuestionQuery } from "@/services/queries";
import { usePostQuestionMutation } from "@/services/mutations";
import { Header, Footer, SkeletonCard, Type0, Type1, Type2, Type3, Winner, Loser, Error } from "@/components";

import { Toast } from "@capacitor/toast";
import { Haptics } from "@capacitor/haptics";
import { NativeAudio } from "@capgo/native-audio";

export default function Game() {
  const [animate, setAnimate] = useState("animate__fadeInRight");
  const { isPending, isError, data, error } = useGetQuestionQuery();

  const queryClient = useQueryClient();
  const mutation = usePostQuestionMutation();

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
        return <Error/>;
    }
  }


  return (
    <div className="flex flex-col w-full min-h-screen">
      <Header health={data.health} time={data.startTime} />
      <main className={cn("flex-1 flex flex-col items-center justify-center w-full animate__animated animate__fast", animate)} onAnimationEnd={() => setAnimate("")}>
        {getComponent({ data, handleSubmit })}
      </main>
      <Footer />
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
      return <></>; // maybe somthing better default component
  }
}
