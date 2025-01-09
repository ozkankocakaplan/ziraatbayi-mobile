interface UpdateAdvertRequest {
  id: number;
  productId: number;
  startDate?: string;
  expiryDate: string;
  isActive: boolean;
}
export default UpdateAdvertRequest;
