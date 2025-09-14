import { cookies } from "next/headers";
import { api } from "./api";
import type { Note } from "../../types/note";
import type { User } from "../../types/user";


export async function getCookieHeader(): Promise<string> {
  const cookieStore = await cookies();
  return cookieStore.toString();
}

export async function serverFetchNoteById(id: string): Promise<Note> {
  const cookieHeader = await getCookieHeader();
  const res = await api.get(`/notes/${id}`, {
    headers: { Cookie: cookieHeader },
  });
  return res.data;
}


export async function checkSession(refreshToken: string): Promise<{ accessToken: string; refreshToken: string } | null> {
  try {
    const res = await api.post(
      "/auth/refresh",
      { refreshToken },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return res.data;
  } catch (error) {
    console.error("checkSession error:", error);
    return null;
  }
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const cookieHeader = await getCookieHeader();
    const res = await api.get("/users/me", {
      headers: { Cookie: cookieHeader },
    });
    return res.data;
  } catch (error) {
    console.error("getCurrentUser error:", error);
    return null;
  }
}

export interface ServerFetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: string;
}

export async function serverFetchNotes({
  page = 1,
  perPage = 12,
  search,
  tag,
}: ServerFetchNotesParams) {
  const cookieHeader = await getCookieHeader();

  const params: Record<string, string | number> = { page, perPage };
  if (search) params.search = search;
  if (tag) params.tag = tag;

  const res = await api.get("/notes", {
    headers: { Cookie: cookieHeader },
    params,
  });

  return res.data;
}