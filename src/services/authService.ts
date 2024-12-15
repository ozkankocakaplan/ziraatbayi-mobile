import AlertDialog from '../components/AlertDialog/AlertDialog';
import CreateDealerRequest from '../payload/request/CreateDealerRequest';
import LoginRequest from '../payload/request/LoginRequest';
import DealerResponse from '../payload/response/DealerResponse';
import LoginResponse from '../payload/response/LoginResponse';
import ServiceResponse from '../payload/response/ServiceResponse';
import {baseApi} from '../store/api/BaseApi';
import {AuthActions} from '../store/features/authReducer';
import auth from '@react-native-firebase/auth';
import {DealerActions} from '../store/features/dealerReducer';

export const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<ServiceResponse<LoginResponse>, LoginRequest>({
      query: credentials => ({
        url: '/auth/loginForMobile',
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          AlertDialog.showLoading();
          let result = await queryFulfilled;
          if (result.data.isSuccessful) {
            await auth().signInWithCustomToken(
              result.data.entity.firebaseAccessToken,
            );
            dispatch(AuthActions.setUser(result.data.entity));
          }
        } catch (error) {
          AlertDialog.showModal({
            title: 'Hata',
            type: 'error',
            message: 'E-posta veya şifre hatalı',
          });
          AlertDialog.hideLoading();
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
        url: 'dealer/register',
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          AlertDialog.showLoading();
          let result = await queryFulfilled;

          AlertDialog.hideLoading();
          if (result.data.isSuccessful) {
            AlertDialog.showModal({
              title: 'Başarılı',
              type: 'success',
              message: 'Kayıt başarılı',
            });
          }
        } catch (error: any) {
          AlertDialog.showModal({
            type: 'error',
            message: error?.error?.data?.exceptionMessage || 'Bir hata oluştu',
          });
          AlertDialog.hideLoading();
        } finally {
          AlertDialog.hideLoading();
        }
      },
    }),
    getDealer: builder.query<ServiceResponse<DealerResponse>, void>({
      query: () => ({
        url: '/dealer',
        method: 'GET',
      }),
      async onQueryStarted(queryArgument, {queryFulfilled, dispatch}) {
        try {
          AlertDialog.showLoading();
          let {data} = await queryFulfilled;
          if (data.isSuccessful) {
            dispatch(DealerActions.setDealer(data.entity));
          }
        } finally {
          AlertDialog.hideLoading();
        }
      },
    }),
    updateDealer: builder.mutation<
      ServiceResponse<DealerResponse>,
      CreateDealerRequest
    >({
      query: credentials => ({
        url: '/dealer/update',
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          AlertDialog.showLoading();
          let result = await queryFulfilled;

          AlertDialog.hideLoading();
          if (result.data.isSuccessful) {
            AlertDialog.showModal({
              title: 'Başarılı',
              type: 'success',
              message: 'Güncelleme başarılı',
            });
          }
        } catch (error: any) {
          AlertDialog.showModal({
            type: 'error',
            message: error?.error?.data?.exceptionMessage || 'Bir hata oluştu',
          });
          AlertDialog.hideLoading();
        } finally {
          AlertDialog.hideLoading();
        }
      },
    }),
  }),
});

export const AuthApi = authApi;
