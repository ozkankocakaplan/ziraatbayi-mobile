import ProductResponse from '../payload/response/ProductResponse';
import ServiceResponse from '../payload/response/ServiceResponse';
import {baseApi, imageApi} from '../store/api/BaseApi';

const productApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getProductsByCategory: builder.mutation<
      ServiceResponse<ProductResponse>,
      number
    >({
      query: categoryId => ({
        url: '/product/products-by-category/' + categoryId,
        method: 'GET',
      }),
    }),
  }),
  overrideExisting: true,
});
export const ProductApi = productApi;
