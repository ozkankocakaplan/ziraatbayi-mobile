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
