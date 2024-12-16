import DealerResponse from './DealerResponse';
import ProductResponse from './ProductResponse';

interface AdvertResponse {
  id: number;
  product: ProductResponse;
  dealer: DealerResponse;
  stockQuantity: number;
  price: number | null;
  minOrderQuantity: number | null;
  maxOrderQuantity: number | null;
  startDate: string | null;
  expiryDate: string;
  isActive: boolean;
}
export default AdvertResponse;
