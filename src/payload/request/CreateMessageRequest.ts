interface CreateMessageRequest {
  chatId: string;
  senderId: number;
  receiverId: number;
  content: string;
  contentType?: string;
  productId: number;
}
export default CreateMessageRequest;
