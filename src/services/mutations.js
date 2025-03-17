import axios from "axios";
import { API_URL } from "../lib/utils";
import { useMutation } from "@tanstack/react-query";
import { Preferences } from "@capacitor/preferences";

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
        await axios.post(`${API_URL}/login`, data, {
          headers: { "Content-Type": "application/json" },
        })
      ).data;
    },
  });
}

export function useRestoreHealthMutation() {
  return useMutation({
    mutationKey: ["restoreHealthMutation"],
    mutationFn: async (data) => {
      const { value } = await Preferences.get({ key: "token" });
      return (
        await axios.post(`${API_URL}/refuel`, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${value}`,
          },
        })
      ).data;
    },
  });
}
