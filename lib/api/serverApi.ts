import { cookies } from 'next/headers';
import type { User } from '@/types/user';
import type { Note } from '@/types/note';
import { api } from './api';




export const checkServerSession = async () => {
  const cookieStore = await cookies();

  return api.get('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
};

export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();

  const { data } = await api.get<User>('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return data;
};


export interface FetchNotesParams {
  search?: string;
  tag?: string;
  page?: number;
  perPage?: number;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  params: FetchNotesParams
): Promise<FetchNotesResponse> => {
  const cookieStore = await cookies();

  const { data } = await api.get<FetchNotesResponse>('/notes', {
    params,
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return data;
};

export const getServerNoteById = async (id: string): Promise<Note> => {
  const cookieStore = await cookies();

  const { data } = await api.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return data;
}; 