import AlertDialog from '../components/AlertDialog/AlertDialog';
import CreateDealerRequest from '../payload/request/CreateDealerRequest';
import DealerResponse from '../payload/response/DealerResponse';
import ServiceResponse from '../payload/response/ServiceResponse';
import {baseApi} from '../store/api/BaseApi';
import {DealerActions} from '../store/features/dealerReducer';

const dealerApi = baseApi.injectEndpoints({
  endpoints: builder => ({
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
    uploadDealerImage: builder.mutation<ServiceResponse<Boolean>, FormData>({
      query: body => ({
        url: '/dealer/upload-image',
        method: 'POST',
        body: body,
        headers: new Headers({
          'Content-Type': 'multipart/form-data',
        }),
      }),
    }),
  }),
  overrideExisting: true,
});

export const DealerApi = dealerApi;
