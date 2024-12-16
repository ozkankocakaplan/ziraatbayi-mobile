import DealerResponse from '../response/DealerResponse';
import ProductResponse from '../response/ProductResponse';

interface CreateAdvertRequest {
  productId: number;
  stockQuantity: number;
  price?: number;
  minOrderQuantity?: number;
  maxOrderQuantity?: number;
  startDate?: string;
  expiryDate: string;
}
export default CreateAdvertRequest;
