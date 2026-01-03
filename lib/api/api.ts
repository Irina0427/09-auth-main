import axios, { AxiosError } from 'axios';

export const api = axios.create({
  withCredentials: true,
});


export type ApiError = AxiosError<{
  error?: string;
  message?: string;
}>;

export const isApiError = (error: unknown): error is ApiError => {
  return axios.isAxiosError(error);
};
console.log('API_URL:', process.env.API_URL);