import CreateAdvertRequest from '../payload/request/CreateAdvertRequest';
import AdvertResponse from '../payload/response/AdvertResponse';
import ServiceResponse from '../payload/response/ServiceResponse';
import {baseApi, imageApi} from '../store/api/BaseApi';

export const advertApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getAdvertsByDealerId: builder.query<ServiceResponse<AdvertResponse>, void>({
      query: () => ({
        url: '/advert/get-adverts-by-dealer-id',
        method: 'GET',
      }),
    }),
    getShowCaseAdverts: builder.query<ServiceResponse<AdvertResponse>, void>({
      query: () => ({
        url: '/advert/get-showcase-adverts-for-homepage',
        method: 'GET',
      }),
    }),
    createAdvert: builder.mutation<ServiceResponse<AdvertResponse>, void>({
      query: credentials => ({
        url: '/advert/create-advert',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});
export const AdvertApi = advertApi;

export const {useGetProductImageQuery} = imageApi.injectEndpoints({
  endpoints: builder => ({
    getProductImage: builder.query<Blob, {endpoint: string}>({
      query: ({endpoint}) => ({
        url: endpoint,
        method: 'GET',
        responseHandler: (response: Response) => {
          return response.blob();
        },
      }),
    }),
  }),
});
