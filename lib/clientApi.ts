'use client';

import type { AxiosResponse } from "axios";
import { api } from "@/lib/api";
import type { Note } from "@/types/note";
import type { User } from "@/types/user";

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  page: number;
  totalPages: number;
  perPage: number;
}

export async function fetchNotes({
  page = 1,
  perPage = 12,
  search = '',
  tag,
}: FetchNotesParams): Promise<FetchNotesResponse> {
  const params: Record<string,string | number> = { page, perPage };
  if(search) params.search = search;
  if(tag && tag !== 'All') params.tag = tag;

  const res: AxiosResponse<FetchNotesResponse> = await api.get("/notes", { params });
  return { ...res.data, page, perPage };
}

export interface CreateNoteDto {
  title: string;
  content: string;
  tag: string;
}

export async function createNote(note: CreateNoteDto): Promise<Note> {
  const res: AxiosResponse<Note> = await api.post("/notes", note);
  return res.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const res: AxiosResponse<Note> = await api.delete(`/notes/${id}`);
  return res.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const res: AxiosResponse<Note> = await api.get(`/notes/${id}`);
  return res.data;
}

export interface SignUp {
  email: string;
  password: string;
}

export async function signUp(data: SignUp): Promise<User> {
  const res: AxiosResponse<User> = await api.post("/auth/register", data);
  return res.data;
}

export interface SignIn {
  email: string;
  password: string;
}

export async function signInUser(data: SignIn): Promise<User> {
  const res: AxiosResponse<User> = await api.post("/auth/login", data);
  return res.data;
}
