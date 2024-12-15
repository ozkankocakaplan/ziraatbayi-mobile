import AlertDialog from '../components/AlertDialog/AlertDialog';
import CategoryResponse from '../payload/response/CategoryResponse';
import ServiceResponse from '../payload/response/ServiceResponse';
import {baseApi} from '../store/api/BaseApi';
import {CategoryActions} from '../store/features/categoryReducer';

const categoryApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getCategories: builder.query<ServiceResponse<CategoryResponse>, boolean>({
      query: () => ({
        url: '/category/active-categories',
        method: 'GET',
      }),
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          if (arg) {
            AlertDialog.showLoading();
          }
          let {data} = await queryFulfilled;
          let mainCategories = data.list.filter(x => x.parentCategoryId == 0);
          dispatch(CategoryActions.setMainCategories(mainCategories));
        } finally {
          if (arg) {
            AlertDialog.hideLoading();
          }
        }
      },
    }),
    getCategory: builder.query<ServiceResponse<CategoryResponse>, number>({
      query: id => ({
        url: '/getCategory/' + id,
        method: 'GET',
      }),
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          AlertDialog.showLoading();
          let result = await queryFulfilled;

          AlertDialog.hideLoading();
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

export const CategoryApi = categoryApi;
