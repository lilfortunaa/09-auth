import { cookies } from "next/headers";
import { api } from "./api";
import type { Note } from "../types/note";


export async function serverFetchNoteById(id: string): Promise<Note> {
  const cookieStore = cookies();

  const res = await api.get(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(), 
    },
  });

  return res.data;
}