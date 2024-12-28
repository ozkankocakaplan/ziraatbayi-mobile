import ServiceResponse from '../payload/response/ServiceResponse';
import SubscriptionResponse from '../payload/response/SubscriptionResponse';
import {baseApi} from '../store/api/BaseApi';

const subscriptionApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getSubscription: builder.query<ServiceResponse<SubscriptionResponse>, void>(
      {
        query: () => ({
          url: '/subscription',
          method: 'GET',
        }),
      },
    ),
  }),
});
const SubscriptionApi = subscriptionApi;
export default SubscriptionApi;
