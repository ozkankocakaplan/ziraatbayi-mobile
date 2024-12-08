import CategoryResponse from '../payload/response/CategoryResponse';
import ServiceResponse from '../payload/response/ServiceResponse';
import {baseApi} from '../store/api/BaseApi';

export const categoryApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getCategories: builder.query<ServiceResponse<CategoryResponse>, void>({
      query: () => ({
        url: '/category/active-categories',
        method: 'GET',
      }),
    }),
    getCategory: builder.query<ServiceResponse<CategoryResponse>, number>({
      query: id => ({
        url: '/getCategory/' + id,
        method: 'GET',
      }),
    }),
  }),
});

export const CategoryApi = categoryApi;
