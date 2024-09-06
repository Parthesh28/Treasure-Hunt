"use client";

import Game from "./game";
import Login from "./login";
import { useEffect, useState } from "react";

import { Toast } from "@capacitor/toast";
import { Haptics } from "@capacitor/haptics";
import { CapacitorHttp } from "@capacitor/core";
import { Preferences } from "@capacitor/preferences";
import { useLoginMutation } from "@/services/mutations";

export default function Page() {
  const [animate, setAnimate] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const loginMutation = useLoginMutation();

  useEffect(() => {
    async function checkLoggedIn() {
      const { value } = await Preferences.get({ key: "token" });
      setLoggedIn(!!value);
    }
    checkLoggedIn();
  }, []);

  async function handleLogin(otp) {
    const mutationResult = await loginMutation.mutateAsync({ otp });

    console.log(mutationResult);
  }

  return (
    <>
      {loggedIn ? (
        <Game />
      ) : (
        <Login handleLogin={handleLogin} animation={{ animate, setAnimate }} />
      )}
    </>
  );
}
