import axios, { AxiosError } from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL + '/api';

export const api = axios.create({
  baseURL,
  withCredentials: true,
});

export type ApiError = AxiosError<{
  error?: string;
  message?: string;
}>;

export const isApiError = (error: unknown): error is ApiError => {
  return axios.isAxiosError(error);
};
