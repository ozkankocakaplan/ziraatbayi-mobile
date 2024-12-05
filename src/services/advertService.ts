import CreateAdvertRequest from '../payload/request/CreateAdvertRequest';
import AdvertResponse from '../payload/response/AdvertResponse';
import ServiceResponse from '../payload/response/ServiceResponse';
import {baseApi} from '../store/api/BaseApi';

export const advertApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getAdvertsByDealerId: builder.query<ServiceResponse<AdvertResponse>, void>({
      query: () => ({
        url: '/advert/get-adverts-by-dealer-id',
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
