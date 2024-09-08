import axios from "axios";
import { API_URL } from "@/lib/utils";
import { Preferences } from "@capacitor/preferences";
import { useMutation } from "@tanstack/react-query";

export function usePostQuestionMutation() {
  return useMutation({
    mutationKey: ["postQuestion"],
    mutationFn: async (data) => {
      const { value } = await Preferences.get({ key: "token" });
      return (
        await axios.post(`${API_URL}/question`, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${value}`,
          },
        })
      ).data;
    },
  });
}

export function useLoginMutation() {
  return useMutation({
    mutationKey: ["loginMutation"],
    mutationFn: async (data) => {
      return (
        await axios.post(`${API_URL}/auth/login`, data, {
          headers: { "Content-Type": "application/json" },
        })
      ).data;
    },
  });
}
