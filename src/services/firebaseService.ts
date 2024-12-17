import CreateMessageRequest from '../payload/request/CreateMessageRequest';
import DeviceRequest from '../payload/request/DeviceRequest';
import MessageReadRequest from '../payload/request/MessageReadRequest';
import MessageUserInfo from '../payload/response/MessageInfoResponse';
import ServiceResponse from '../payload/response/ServiceResponse';
import {baseApi} from '../store/api/BaseApi';

const firebaseApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    createFirebase: builder.mutation<ServiceResponse<boolean>, DeviceRequest>({
      query: body => ({
        url: '/firebase/create-fcm-token',
        method: 'POST',
        body,
      }),
    }),
    sendMessage: builder.mutation<ServiceResponse<boolean>, FormData>({
      query: body => ({
        url: '/firebase/message/send',
        method: 'POST',
        body: body,
        headers: new Headers({
          'Content-Type': 'multipart/form-data',
        }),
      }),
    }),
    messageRead: builder.mutation<ServiceResponse<boolean>, MessageReadRequest>(
      {
        query: data => ({
          url: `/firebase/message/read`,
          method: 'POST',
          body: data,
        }),
      },
    ),
    getChatInfo: builder.mutation<
      ServiceResponse<MessageUserInfo>,
      {senderId: number; receiverId: number; productId: number}
    >({
      query: data => ({
        url: `/firebase/chat-info/${data.senderId}/${data.receiverId}/${data.productId}`,
        method: 'GET',
      }),
    }),
  }),
  overrideExisting: true,
});
const FirebaseApi = firebaseApi;
export default FirebaseApi;
