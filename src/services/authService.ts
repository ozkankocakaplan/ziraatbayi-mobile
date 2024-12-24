import AlertDialog from '../components/AlertDialog/AlertDialog';
import LoginRequest from '../payload/request/LoginRequest';
import LoginResponse from '../payload/response/LoginResponse';
import ServiceResponse from '../payload/response/ServiceResponse';
import {baseApi} from '../store/api/BaseApi';
import {AuthActions} from '../store/features/authReducer';
import auth from '@react-native-firebase/auth';

const authApi = baseApi.injectEndpoints({
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
        } catch (ex: any) {
          let errorMessage = ex?.error?.data?.exceptionMessage
            ? ex?.error?.data?.exceptionMessage.includes('Bad')
              ? 'Eposta veya şifreniz hatalı.'
              : ex?.error?.data?.exceptionMessage
            : 'Eposta veya şifreniz hatalı';
          AlertDialog.showModal({
            type: 'error',
            message: errorMessage,
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

export const AuthApi = authApi;
