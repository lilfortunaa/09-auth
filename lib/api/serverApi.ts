import { cookies } from "next/headers";
import { api } from "./api";
import type { Note } from "../../types/note";
import type { User } from "../../types/user";

export interface SessionTokens {
  accessToken: string;
  refreshToken: string;
}

export interface SessionResponse {
  user: User | null;
  isAuthenticated: boolean;
  accessToken?: string;
  refreshToken?: string;
}

export async function getCookieHeader(): Promise<string> {
  const cookieStore = await cookies();
  return Array.from(cookieStore.getAll())
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");
}


export async function getCurrentUser(): Promise<User> {
  const cookieHeader = await getCookieHeader();
  const res = await api.get<User>("/users/me", {
    headers: { Cookie: cookieHeader },
  });
  return res.data;
}


export async function checkSession() {
  const cookieHeader = await getCookieHeader();
  return api.get<SessionResponse>("/auth/session", {
    headers: { Cookie: cookieHeader },
  });
}

export async function serverFetchNoteById(id: string): Promise<Note> {
  const cookieHeader = await getCookieHeader();
  const res = await api.get<Note>(`/notes/${id}`, {
    headers: { Cookie: cookieHeader },
  });
  return res.data;
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
}: ServerFetchNotesParams): Promise<{
  notes: Note[];
  page: number;
  perPage: number;
  totalPages: number;
}> {
  const cookieHeader = await getCookieHeader();
  const params: Record<string, string | number> = { page, perPage };
  if (search) params.search = search;
  if (tag && tag !== "All") params.tag = tag;

  const res = await api.get("/notes", {
    headers: { Cookie: cookieHeader },
    params,
  });

  return res.data;
}
