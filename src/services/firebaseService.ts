import CreateMessageRequest from '../payload/request/CreateMessageRequest';
import DeviceRequest from '../payload/request/DeviceRequest';
import MessageUserInfo from '../payload/response/MessageUserInfo';
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
    sendMessage: builder.mutation<
      ServiceResponse<boolean>,
      CreateMessageRequest
    >({
      query: body => ({
        url: '/firebase/message/send',
        method: 'POST',
        body,
      }),
    }),
    getSenderReceiverNames: builder.mutation<
      ServiceResponse<MessageUserInfo>,
      {senderId: number; receiverId: number}
    >({
      query: data => ({
        url: `/firebase/sender-receiver-names/${data.senderId}/${data.receiverId}`,
        method: 'GET',
      }),
    }),
  }),
});
const FirebaseApi = firebaseApi;
export default FirebaseApi;
