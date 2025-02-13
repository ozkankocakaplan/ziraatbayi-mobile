import AlertDialog from '../components/AlertDialog/AlertDialog';
import CreateAdvertRequest from '../payload/request/CreateAdvertRequest';
import FilterRequest from '../payload/request/FilterRequest';
import UpdateAdvertRequest from '../payload/request/UpdateAdvertRequest';
import AdvertResponse from '../payload/response/AdvertResponse';
import ServiceResponse from '../payload/response/ServiceResponse';
import {baseApi, imageApi} from '../store/api/BaseApi';

const advertApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getAdvertsByDealerId: builder.query<ServiceResponse<AdvertResponse>, void>({
      query: id => ({
        url: '/advert/get-adverts-by-dealer-id',
        method: 'GET',
      }),
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          AlertDialog.showLoading();
          let result = await queryFulfilled;

          AlertDialog.hideLoading();
        } finally {
          AlertDialog.hideLoading();
        }
      },
    }),
    getShowCaseAdverts: builder.query<ServiceResponse<AdvertResponse>, void>({
      query: () => ({
        url: '/advert/get-showcase-adverts-for-homepage',
        method: 'GET',
      }),
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          AlertDialog.showLoading();
          await queryFulfilled;
          AlertDialog.hideLoading();
        } catch (error: any) {
          AlertDialog.hideLoading();
        } finally {
          AlertDialog.hideLoading();
        }
      },
    }),
    getAdvertById: builder.mutation<ServiceResponse<AdvertResponse>, number>({
      query: id => ({
        url: `/advert/get-advert-by-id/${id}`,
        method: 'GET',
      }),
    }),
    searchAdvertsByName: builder.query<ServiceResponse<AdvertResponse>, string>(
      {
        query: query => ({
          url: '/advert/search-adverts?query=' + query,
          method: 'GET',
        }),
      },
    ),
    createAdvert: builder.mutation<
      ServiceResponse<AdvertResponse>,
      CreateAdvertRequest
    >({
      query: body => ({
        url: '/advert/create-advert',
        method: 'POST',
        body,
      }),
    }),

    updateAdvert: builder.mutation<
      ServiceResponse<AdvertResponse>,
      UpdateAdvertRequest
    >({
      query: body => ({
        url: '/advert/update-advert',
        method: 'POST',
        body,
      }),
    }),
    deleteAdvert: builder.mutation<ServiceResponse<AdvertResponse>, number>({
      query: id => ({
        url: '/advert/delete-advert/' + id,
        method: 'DELETE',
      }),
    }),
    getAdvertsFiltered: builder.mutation<
      ServiceResponse<AdvertResponse>,
      FilterRequest
    >({
      query: body => ({
        url: '/advert/filter',
        method: 'POST',
        body,
      }),
    }),
    getAdvertsByCategoryId: builder.query<
      ServiceResponse<AdvertResponse>,
      number
    >({
      query: id => ({
        url: '/advert/adverts-by-category/' + id,
        method: 'GET',
      }),
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          AlertDialog.showLoading();
          await queryFulfilled;
          AlertDialog.hideLoading();
        } catch (error: any) {
          AlertDialog.hideLoading();
        } finally {
          AlertDialog.hideLoading();
        }
      },
    }),
  }),
  overrideExisting: true,
});
export const AdvertApi = advertApi;

export const {useGetProductImageMutation} = imageApi.injectEndpoints({
  endpoints: builder => ({
    getProductImage: builder.mutation<Blob, {endpoint: string}>({
      query: ({endpoint}) => ({
        url: endpoint,
        method: 'GET',
        responseHandler: (response: Response) => {
          return response.blob();
        },
      }),
    }),
  }),
  overrideExisting: true,
});
