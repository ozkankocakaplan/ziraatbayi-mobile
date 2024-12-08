import ProductResponse from './ProductResponse';

interface MessageUserInfo {
  receiverFullName: string;
  senderFullName: string;
  receiverCompanyName: string;
  senderCompanyName: string;
  product: ProductResponse;
}
export default MessageUserInfo;
