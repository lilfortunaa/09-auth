import { cookies } from "next/headers";
import { api } from "./api";
import type { Note } from "../types/note";

function getCookieHeader() {
  return cookies().toString();
}


export async function serverFetchNoteById(id: string): Promise<Note> {
  const res = await api.get(`/notes/${id}`, {
    headers: {
      Cookie: getCookieHeader(), 
    },
  });

  return res.data;
}