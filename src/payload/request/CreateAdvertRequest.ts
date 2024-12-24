interface CreateAdvertRequest {
  productId: number;
  stockQuantity: any;
  minOrderQuantity?: any;
  startDate?: string;
  expiryDate: string;
}
export default CreateAdvertRequest;
