import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

const API_URL = "https://spacerunbackend-1-d7277620.deta.app"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export {
  API_URL
}