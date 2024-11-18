import LoginRequest from '../payload/request/LoginRequest';
import LoginResponse from '../payload/response/LoginResponse';
import ServiceResponse from '../payload/response/ServiceResponse';
import {baseApi} from '../store/api/BaseApi';

export const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<ServiceResponse<LoginResponse>, LoginRequest>({
      query: credentials => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const {useLoginMutation} = authApi;
