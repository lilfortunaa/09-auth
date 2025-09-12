import axios from "axios";

const baseURL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

export const api = axios.create({
  baseURL,
  withCredentials: true, 
  headers: {
    Authorization: process.env.NEXT_PUBLIC_NOTEHUB_TOKEN
      ? `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`
      : undefined,
  },
});
