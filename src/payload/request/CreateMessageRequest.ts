interface CreateMessageRequest {
  chatId: string;
  senderId: string;
  receiverId: string;
  content: string;
  contentType?: string;
  productId: number;
}
export default CreateMessageRequest;
