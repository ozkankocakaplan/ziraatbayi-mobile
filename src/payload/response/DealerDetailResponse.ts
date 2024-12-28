import AdvertResponse from './AdvertResponse';
import DealerResponse from './DealerResponse';

export default interface DealerDetailResponse {
  dealer: DealerResponse;
  adverts: AdvertResponse[];
}
