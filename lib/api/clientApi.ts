import axios from 'axios';
import type { User } from '@/types/user';
import type { Note, NoteTag } from '@/types/note';


const clientApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});



export interface AuthRequest {
  email: string;
  password: string;
}

export async function register(data: AuthRequest): Promise<User> {
  const res = await clientApi.post<User>('/api/auth/register', data);
  return res.data;
}

export async function login(data: AuthRequest): Promise<User> {
  const res = await clientApi.post<User>('/api/auth/login', data);
  return res.data;
}

export async function logout(): Promise<void> {
  await clientApi.post('/api/auth/logout');
}

export async function checkSession(): Promise<User | null> {
  try {
    const res = await clientApi.get<User>('/api/auth/session');
    return res.data ?? null;
  } catch {
    return null;
  }
}

export async function getMe(): Promise<User> {
  const res = await clientApi.get<User>('/api/users/me');
  return res.data;
}

export async function updateMe(data: Partial<User>): Promise<User> {
  const res = await clientApi.patch<User>('/api/users/me', data);
  return res.data;
}



export interface FetchNotesParams {
  search?: string;
  tag?: string;
  page?: number;
  perPage?: number;
  sortBy?: 'created' | 'updated';
}


export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes(
  params: FetchNotesParams
): Promise<FetchNotesResponse> {
  const res = await clientApi.get<FetchNotesResponse>('/api/notes', { params });
  return res.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const res = await clientApi.get<Note>(`/api/notes/${id}`);
  return res.data;
}

export async function createNote(data: {
  title: string;
  content: string;
  tag: NoteTag;
}): Promise<Note> {
  const res = await clientApi.post<Note>('/api/notes', data);
  return res.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const res = await clientApi.delete<Note>(`/api/notes/${id}`);
  return res.data;
}
