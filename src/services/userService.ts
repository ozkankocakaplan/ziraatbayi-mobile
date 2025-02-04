import AlertDialog from '../components/AlertDialog/AlertDialog';
import DealerResponse from '../payload/response/DealerResponse';
import ServiceResponse from '../payload/response/ServiceResponse';
import {baseApi} from '../store/api/BaseApi';

export const userApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    updatePassword: builder.mutation<
      ServiceResponse<Boolean>,
      {oldPassword: string; newPassword: string}
    >({
      query: ({oldPassword, newPassword}) => ({
        url: '/user/update-password',
        method: 'POST',
        body: {oldPassword, newPassword},
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
    getVerifyToken: builder.query<ServiceResponse<Boolean>, string>({
      query: token => ({
        url: '/user/verify-token?token=' + token,
        method: 'GET',
      }),
      async onQueryStarted(queryArgument, {queryFulfilled}) {
        try {
          AlertDialog.showLoading();
          await queryFulfilled;

          AlertDialog.hideLoading();
        } finally {
          AlertDialog.hideLoading();
        }
      },
    }),
    resetPassword: builder.mutation<
      ServiceResponse<Boolean>,
      {token: string; password: string; goToLogin: () => void}
    >({
      query: ({token, password}) => ({
        url: '/user/reset-password?token=' + token + '&password=' + password,
        method: 'POST',
        body: {token, password},
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
              message: 'Şifre Değiştirme Başarılı',
            });
          }
        } catch (error: any) {
          AlertDialog.showModal({
            type: 'error',
            message: error?.error?.data?.exceptionMessage || 'Bir hata oluştu',
          });
          AlertDialog.hideLoading();
        } finally {
          AlertDialog.dismissAll();
          setTimeout(() => {
            arg.goToLogin();
          }, 1000);
        }
      },
    }),
    forgotPassword: builder.mutation<ServiceResponse<DealerResponse>, string>({
      query: email => ({
        url: 'user/forgot-password?email=' + email,
        method: 'POST',
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
              message: 'Yeni Şifre E-posta Adresine Gönderildi',
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
  overrideExisting: true,
});

export const UserApi = userApi;
