interface MessageResponse {
  chatId: string;
  senderId: number;
  receiverId: number;
  content: string;
  type: string;
  productId?: number;
  messageId: string;
  timestamp: number;
  lastMessage: MessageResponse;
  receiverFullName: string;
  senderFullName: string;
}
export default MessageResponse;
