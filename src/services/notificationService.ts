import NotificationResponse from '../payload/response/NotificationResponse';
import ServiceResponse from '../payload/response/ServiceResponse';
import {baseApi} from '../store/api/BaseApi';

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
    getNotificationCount: builder.query<
      ServiceResponse<NotificationResponse>,
      void
    >({
      query: () => ({
        url: '/notification/get-notification-not-read-count',
        method: 'GET',
      }),
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
