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
