import ProductResponse from './ProductResponse';

interface MessageResponse {
  chatId: string;
  senderId: string;
  receiverId: string;
  content: string;
  contentType: string;
  productId?: number;
  messageId: string;
  timestamp: number;
  lastMessage: MessageResponse;
  receiverFullName: string;
  senderFullName: string;
  isRead: boolean;
  product: ProductResponse;
  advertId: string;
}
export default MessageResponse;
