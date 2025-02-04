import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {AuthActions} from '../features/authReducer';
export const BaseUrl = 'https://api.ziraatbayi.com/api';

const customBaseQuery = fetchBaseQuery({
  baseUrl: BaseUrl,
  prepareHeaders: (headers, {getState}: any) => {
    const token = getState().auth.user?.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  const result = await customBaseQuery(args, api, extraOptions);
  if (
    result.error &&
    (result.error.status === 402 || result.error.status === 401) &&
    result.error
  ) {
    let ignoreUrls = ['/auth/loginForMobile'];
    if (!ignoreUrls.includes(args.url)) {
      api.dispatch(AuthActions.setErrorCode(result.error.status));
    }
  } else {
    api.dispatch(AuthActions.setErrorCode(null));
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({}),
});

export const imageApi = createApi({
  reducerPath: 'imageApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BaseUrl.replace('com/api', 'com'),

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
