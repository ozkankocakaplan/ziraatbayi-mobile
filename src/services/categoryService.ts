import CategoryResponse from '../payload/response/CategoryResponse';
import ServiceResponse from '../payload/response/ServiceResponse';
import {baseApi} from '../store/api/BaseApi';

export const categoryApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getCategories: builder.mutation<ServiceResponse<CategoryResponse>, void>({
      query: () => ({
        url: '/category/active-categories',
        method: 'GET',
      }),
    }),
  }),
});

export const CategoryApi = categoryApi;
