interface UpdateAdvertRequest {
  id: number;
  productId: number;
  stockQuantity: any;
  minOrderQuantity?: any;
  startDate?: string;
  expiryDate: string;
  isActive: boolean;
}
export default UpdateAdvertRequest;
