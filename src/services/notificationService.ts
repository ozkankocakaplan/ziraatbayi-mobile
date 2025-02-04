import NotificationResponse from '../payload/response/NotificationResponse';
import ServiceResponse from '../payload/response/ServiceResponse';
import {baseApi} from '../store/api/BaseApi';
import {AuthActions} from '../store/features/authReducer';

const notificationApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getNotifications: builder.query<
      ServiceResponse<NotificationResponse>,
      void
    >({
      query: () => ({
        url: '/notification/get-notifications',
        method: 'GET',
      }),
    }),
    getNotificationCount: builder.mutation<
      ServiceResponse<NotificationResponse>,
      void
    >({
      query: () => ({
        url: '/notification/get-notification-not-read-count',
        method: 'GET',
      }),
      onQueryStarted: async (arg, {dispatch, queryFulfilled}) => {
        const result = await queryFulfilled;

        dispatch(AuthActions.setNotificationCount(result.data.count));
      },
    }),
    updateNotificationRead: builder.mutation<
      ServiceResponse<NotificationResponse>,
      number
    >({
      query: id => ({
        url: `/notification/update-read-status/${id}`,
        method: 'POST',
      }),
    }),
  }),
});
export const NotificationApi = notificationApi;
