import axios from "axios";
import { API_URL } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Preferences } from "@capacitor/preferences";

export function useGetQuestionQuery() {
  return useQuery({
    queryKey: ["getQuestion"],
    queryFn: async () => {
      const { value } = await Preferences.get({ key: "token" });
      return (
        await axios.get(`${API_URL}/question`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${value}`,
          },
        })
      ).data;
    },
    refetchOnWindowFocus: "always",
  });
}

export function useLoginQuery() {
  return useQuery({
    queryKey: ["loginQuery"],
    queryFn: async () => {
      return (
        await Preferences.get({ key: "token" })
      ).value;
    },
  });
}
