import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

const API_URL = "https://hunt.dedomil.workers.dev"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export {
  API_URL
}