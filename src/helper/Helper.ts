import dayjs from 'dayjs';

export const generateChatId = (
  senderId: number,
  receiverId: number,
): string => {
  if (senderId < receiverId) {
    return `${senderId}_${receiverId}`;
  } else {
    return `${receiverId}_${senderId}`;
  }
};
export const checkEqualChatId = (chatId: string): boolean => {
  const [firstId, secondId] = chatId.split('_');
  return firstId === secondId;
};
export const checkObject = (data: any): boolean => {
  let result = Object.keys(data).filter((k, i) => {
    if (data[k] == null || data[k].length == '' || data[k].length === 0) {
      return true;
    }
    return false;
  });
  return result.length == 0 ? false : true;
};
export const formatDate = (dateString: string) => {
  return dayjs(dateString).format('DD.MM.YYYY');
};
