import AlertDialog from '../components/AlertDialog/AlertDialog';
import CreateDealerRequest from '../payload/request/CreateDealerRequest';
import LoginRequest from '../payload/request/LoginRequest';
import LoginResponse from '../payload/response/LoginResponse';
import ServiceResponse from '../payload/response/ServiceResponse';
import {baseApi} from '../store/api/BaseApi';
import {AuthActions} from '../store/features/authReducer';

export const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<ServiceResponse<LoginResponse>, LoginRequest>({
      query: credentials => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          AlertDialog.showLoading();
          let result = await queryFulfilled;
          if (result.data.isSuccessful) {
            dispatch(AuthActions.setUser(result.data.entity));
          }
        } catch (error) {
          AlertDialog.showModal({
            title: 'Hata',
            type: 'error',
            message: 'E-posta veya şifre hatalı',
          });
        } finally {
          AlertDialog.hideLoading();
        }
      },
    }),
    createDealer: builder.mutation<
      ServiceResponse<Boolean>,
      CreateDealerRequest
    >({
      query: credentials => ({
        url: '/auth/createDealer',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const AuthApi = authApi;
