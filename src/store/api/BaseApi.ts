import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
export const BaseUrl =
  process.env.NODE_ENV === 'developer'
    ? 'http://195.85.207.129:6868/api'
    : 'http://localhost:8080/api';
console.log(BaseUrl);
export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BaseUrl,
    prepareHeaders: (headers, {getState}: any) => {
      const token = getState().auth.user?.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: builder => ({}),
});
export const imageApi = createApi({
  reducerPath: 'imageApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BaseUrl.replace('/api', ''),
    prepareHeaders: (headers, {getState}: any) => {
      const token = getState().auth.user?.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: builder => ({}),
});
